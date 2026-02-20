// Admin configuration
export const ADMIN_EMAILS = ["sobogd@gmail.com", "support@iq-rest.com"];

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
