const ANON_DOMAIN = "@anon.iq-rest.com";

export const isAnonymousEmail = (email: string) => email.endsWith(ANON_DOMAIN);

export const generateAnonymousEmail = () =>
  `anon_${Date.now()}_${Math.random().toString(36).slice(2, 7)}${ANON_DOMAIN}`;
