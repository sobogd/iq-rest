import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AppleCallbackDto, EmailLoginDto, GoogleAuthDto, HandoffDto, SendOtpDto, VerifyOtpDto } from "./dto";
import { AUTH_COOKIE_ISSUED_COOKIE, issueAuthCookies, refreshAuthCookies } from "../common/session-utils";
import { getRequestCurrency } from "../common/geo";
import { sessionMeta } from "../common/session-meta";

const SESSION_COOKIE = "iqr_session";
const EMAIL_COOKIE = "iqr_email";
// Legacy monolith (iq-rest.com) reads these cookie names. We mirror the
// new API's cookies under the legacy names on the apex domain so that a
// user signing in on the new SPA stays signed in when redirected to the
// old dashboard (and vice versa).
const LEGACY_SESSION_COOKIE = "session";
const LEGACY_EMAIL_COOKIE = "user_email";
// Host-only cookie on this API domain, set by restaurant create/switch
// (restaurant.controller). AuthGuard validates it per-request, but the usage
// tracker used to trust it blindly — so a login must not leave a value that
// points at another account's venue.
const ACTIVE_RESTAURANT_COOKIE = "iqr_active_restaurant_id";

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post("send-otp")
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() dto: SendOtpDto, @Req() req: Request) {
    // Always detect currency — the seeder uses it both for create-flow signups and the
    // default-template fallback for plain-login new users.
    const currency = getRequestCurrency(req);
    const result = await this.auth.sendOtp(
      dto.email,
      dto.locale || "en",
      dto.signupContext,
      currency,
    );
    return { ok: true, isNewUser: result.isNewUser };
  }

  @Post("verify-otp")
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() dto: VerifyOtpDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { token, onboardingStep, isNewUser, legacyDashboard } = await this.auth.verifyOtp(dto.email, dto.code, sessionMeta(req));
    const domain = this.config.get<string>("COOKIE_DOMAIN") || undefined;
    issueAuthCookies(res, token, dto.email, domain);
    await this.dropStaleActiveRestaurant(req, res, dto.email);
    return { ok: true, onboardingStep, isNewUser, legacyDashboard };
  }

  @Post("google")
  @HttpCode(HttpStatus.OK)
  async google(@Body() body: GoogleAuthDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    // Prefer the app locale the SPA is currently on (sent in body) over the browser's
    // Accept-Language header — they often disagree (e.g. RU UI on a Chrome with en-US default).
    const acceptLang = req.headers["accept-language"]?.toString().split(",")[0]?.split("-")[0];
    const currency = getRequestCurrency(req);
    // Custom-button OAuth flow sends `code` from initCodeClient; legacy renderButton
    // flow sends `credential` (an id_token). Exchange code → id_token here so the
    // downstream verifier only deals with one shape.
    let credential = body.credential || "";
    if (!credential && body.code) {
      credential = await this.auth.exchangeGoogleCode(body.code);
    }
    const result = await this.auth.verifyGoogleCredential(
      credential,
      body.signupContext,
      currency,
      body.locale || acceptLang || null,
      sessionMeta(req),
    );
    const domain = this.config.get<string>("COOKIE_DOMAIN") || undefined;
    issueAuthCookies(res, result.token, result.email, domain);
    await this.dropStaleActiveRestaurant(req, res, result.email);
    return {
      ok: true,
      email: result.email,
      userId: result.userId,
      onboardingStep: result.onboardingStep,
      isNewUser: result.isNewUser,
      legacyDashboard: result.legacyDashboard,
    };
  }

  /**
   * Full-page-redirect OAuth callback. The landing constructs a Google sign-in
   * URL with `redirect_uri=<this>` and `state=<base64url(json)>`, and Google
   * redirects the browser back here with `?code=...&state=...`. We exchange
   * the code, set the session cookies on .iq-rest.com, then 302 to the
   * dashboard. Visible warnings still apply until the OAuth app is verified.
   */
  @Get("google/callback")
  async googleCallback(
    @Query("code") code: string | undefined,
    @Query("state") state: string | undefined,
    @Query("error") error: string | undefined,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const landingBase = this.config.get<string>("LANDING_URL") || "https://iq-rest.com";
    const dashboardBase = this.config.get<string>("DASHBOARD_URL") || "https://dashboard.iq-rest.com";
    const apiBase = this.config.get<string>("API_PUBLIC_URL") || "https://dashboard-api.iq-rest.com";

    let parsedState: { locale?: string; signupContext?: { cuisine: string; restaurantName: string }; claim?: boolean; keepData?: boolean } = {};
    try {
      if (state) {
        const json = Buffer.from(state, "base64url").toString("utf8");
        parsedState = JSON.parse(json);
      }
    } catch {
      // Malformed state — fall through with empty defaults.
    }
    const locale = parsedState.locale || "en";

    if (error || !code) {
      this.logger.warn(`google callback without code (error=${error ?? "none"}, locale=${locale})`);
      return res.redirect(302, `${landingBase}/${locale}`);
    }

    try {
      const credential = await this.auth.exchangeGoogleCode(code, `${apiBase}/api/auth/google/callback`);

      const acceptLang = req.headers["accept-language"]?.toString().split(",")[0]?.split("-")[0];
      const currency = getRequestCurrency(req);
      const result = await this.auth.verifyGoogleCredential(
        credential,
        parsedState.signupContext,
        currency,
        locale || acceptLang || null,
        sessionMeta(req),
      );
      // We do NOT set the session cookie on this redirect response — in-app
      // webviews and Safari ITP routinely drop a cookie set by a domain that
      // only appears as a mid-redirect intermediary. Instead hand a one-time
      // code to the dashboard origin (in the URL fragment so it never hits a
      // server log or Referer header); the SPA exchanges it via a first-party
      // XHR that installs the cookie reliably (POST /auth/handoff).
      const code2 = await this.auth.createHandoff(result.token, result.email);
      return res.redirect(302, `${dashboardBase}/${locale}/auth#ott=${code2}`);
    } catch (err) {
      this.logger.error(`google callback failed: ${err instanceof Error ? err.message : String(err)}`);
      return res.redirect(302, `${landingBase}/${locale}?google_error=1`);
    }
  }

  /**
   * Sign in with Apple — full-page-redirect callback. The landing builds an
   * appleid.apple.com/auth/authorize URL with `redirect_uri=<this>`,
   * `response_mode=form_post` and `state=<base64url(json)>`. Apple POSTs the
   * browser back here (urlencoded) with `code`, `state` and — only on the
   * first authorization — a `user` JSON blob carrying the name. We exchange
   * the code, set the session cookies on .iq-rest.com, then 302 to the
   * dashboard. Mirrors googleCallback.
   */
  @Post("apple/callback")
  async appleCallback(
    @Body() body: AppleCallbackDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const landingBase = this.config.get<string>("LANDING_URL") || "https://iq-rest.com";
    const dashboardBase = this.config.get<string>("DASHBOARD_URL") || "https://dashboard.iq-rest.com";
    const apiBase = this.config.get<string>("API_PUBLIC_URL") || "https://dashboard-api.iq-rest.com";

    let parsedState: { locale?: string; signupContext?: { cuisine: string; restaurantName: string }; claim?: boolean; keepData?: boolean } = {};
    try {
      if (body.state) {
        parsedState = JSON.parse(Buffer.from(body.state, "base64url").toString("utf8"));
      }
    } catch {
      // Malformed state — fall through with empty defaults.
    }
    const locale = parsedState.locale || "en";

    if (body.error || !body.code) {
      this.logger.warn(`apple callback without code (error=${body.error ?? "none"}, locale=${locale})`);
      return res.redirect(302, `${landingBase}/${locale}`);
    }

    // Name arrives only on the first authorization, as a JSON string.
    let displayName: string | null = null;
    if (body.user) {
      try {
        const parsed = JSON.parse(body.user) as { name?: { firstName?: string; lastName?: string } };
        const first = parsed.name?.firstName?.trim() || "";
        const last = parsed.name?.lastName?.trim() || "";
        displayName = `${first} ${last}`.trim() || null;
      } catch {
        // Ignore malformed name blob — falls back to the email local part.
      }
    }

    try {
      const idToken = await this.auth.exchangeAppleCode(
        body.code,
        `${apiBase}/api/auth/apple/callback`,
      );

      const acceptLang = req.headers["accept-language"]?.toString().split(",")[0]?.split("-")[0];
      const currency = getRequestCurrency(req);
      const result = await this.auth.verifyAppleCredential(
        idToken,
        displayName,
        parsedState.signupContext,
        currency,
        locale || acceptLang || null,
        sessionMeta(req),
      );
      // Same one-time-code handoff as the Google callback — see the note there.
      // Apple's form_post lands here cross-site, so a cookie set on this
      // response is even more likely to be dropped by the browser.
      const code = await this.auth.createHandoff(result.token, result.email);
      return res.redirect(302, `${dashboardBase}/${locale}/auth#ott=${code}`);
    } catch (err) {
      this.logger.error(`apple callback failed: ${err instanceof Error ? err.message : String(err)}`);
      return res.redirect(302, `${landingBase}/${locale}?apple_error=1`);
    }
  }

  /**
   * Exchange a one-time handoff code (issued by the Google/Apple full-page
   * callback) for the session cookies. Called by the dashboard SPA as a
   * first-party XHR right after the OAuth redirect lands on
   * dashboard.iq-rest.com/<locale>/auth — this is what actually persists the
   * session in in-app webviews and Safari, where a cookie set mid-redirect by
   * the callback gets dropped. Mirrors the cookie set of verify-otp.
   */
  @Post("handoff")
  @HttpCode(HttpStatus.OK)
  async handoff(@Body() dto: HandoffDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.consumeHandoff(dto.ott);
    if (!result) throw new UnauthorizedException();
    const domain = this.config.get<string>("COOKIE_DOMAIN") || undefined;
    issueAuthCookies(res, result.token, result.email, domain);
    await this.dropStaleActiveRestaurant(req, res, result.email);
    return { ok: true, email: result.email };
  }

  /**
   * Exchange a permanent email-login token (minted when the admin sends the
   * personal welcome email) for the session cookies. Same first-party-XHR
   * shape as /handoff, but the token is reusable and never expires — the
   * "Open dashboard" link in the email must keep working on any later click,
   * from any device. The SPA calls this from /<locale>/auth#lt=<token>.
   */
  @Post("email-login")
  @HttpCode(HttpStatus.OK)
  async emailLogin(@Body() dto: EmailLoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.resolveEmailLoginToken(dto.token);
    if (!result) throw new UnauthorizedException();
    const domain = this.config.get<string>("COOKIE_DOMAIN") || undefined;
    issueAuthCookies(res, result.token, result.email, domain);
    await this.dropStaleActiveRestaurant(req, res, result.email);
    return { ok: true, email: result.email };
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cookies = req.cookies as Record<string, string | undefined> | undefined;
    const adminOrigEmail = cookies?.["iqr_admin_original_email"];
    // If inside impersonation, log out the admin (real user); otherwise the
    // user identified by iqr_email.
    const emailToLogOut = adminOrigEmail || cookies?.[EMAIL_COOKIE];
    const cookieToLogOut = cookies?.["iqr_admin_original_session"] || cookies?.[SESSION_COOKIE];
    await this.auth.logout(emailToLogOut, cookieToLogOut);
    this.clearAuthCookies(res);
    return { ok: true };
  }

  private clearAuthCookies(res: Response): void {
    const domain = this.config.get<string>("COOKIE_DOMAIN") || undefined;
    const baseOpts = { path: "/", ...(domain ? { domain } : {}) };
    res.clearCookie(SESSION_COOKIE, baseOpts);
    res.clearCookie(EMAIL_COOKIE, baseOpts);
    res.clearCookie(LEGACY_SESSION_COOKIE, baseOpts);
    res.clearCookie(LEGACY_EMAIL_COOKIE, baseOpts);
    res.clearCookie(AUTH_COOKIE_ISSUED_COOKIE, baseOpts);
    res.clearCookie("iqr_admin_original_session", baseOpts);
    res.clearCookie("iqr_admin_original_email", baseOpts);
    res.clearCookie("iqr_admin_original_user_id", baseOpts);
    // Host-only (no domain) — must be cleared without the domain attribute.
    res.clearCookie(ACTIVE_RESTAURANT_COOKIE, { path: "/" });
  }

  /** Drop a stale active-restaurant cookie after login. The cookie survives
   *  account switches in the same browser (it is set on restaurant
   *  create/switch, never at login), so a user signing into a different
   *  account would keep the previous account's venue id — harmless for
   *  AuthGuard (which validates membership) but it mislabeled usage events.
   *  Keep it when the new user is a member of that restaurant, so a
   *  multi-restaurant owner re-logging in keeps their selection. */
  private async dropStaleActiveRestaurant(req: Request, res: Response, email: string): Promise<void> {
    const cookies = req.cookies as Record<string, string | undefined> | undefined;
    const active = cookies?.[ACTIVE_RESTAURANT_COOKIE];
    if (!active) return;
    const member = await this.auth.isMemberOfRestaurant(email, active).catch(() => false);
    if (!member) res.clearCookie(ACTIVE_RESTAURANT_COOKIE, { path: "/" });
  }

  @Get("check")
  async check(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cookies = req.cookies as Record<string, string | undefined> | undefined;
    const session = cookies?.[SESSION_COOKIE];
    const email = cookies?.[EMAIL_COOKIE];
    if (!session || !email) return { authenticated: false };
    const adminOrigSession = cookies?.["iqr_admin_original_session"];
    const adminOrigEmail = cookies?.["iqr_admin_original_email"];
    try {
      const user = await this.auth.resolveSession(session, email, {
        adminOrigSession,
        adminOrigEmail,
      });
      // Same sliding-session refresh AuthGuard does — this endpoint bypasses the
      // guard, and it is the first call the SPA makes on load.
      refreshAuthCookies(res, cookies, this.config.get<string>("COOKIE_DOMAIN") || undefined);
      void this.auth.extendSession(adminOrigSession || session);
      return {
        authenticated: true,
        email: user.email,
        userId: user.userId,
        onboardingStep: user.onboardingStep,
        legacyDashboard: user.legacyDashboard,
        isDemo: user.isDemo,
        defaultDark: user.defaultDark,
        accountCreatedAt: user.accountCreatedAt,
        impersonatedBy: adminOrigEmail || null,
      };
    } catch {
      return { authenticated: false };
    }
  }
}
