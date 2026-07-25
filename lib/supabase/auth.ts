/**
 * Auth helpers for the admin area.
 * Access is granted only to Supabase-authenticated users whose email is in
 * the ADMIN_EMAILS allowlist. Google sign-in alone is NOT enough — the email
 * must be explicitly allowed, so random Google accounts can't get in.
 */
export function isAllowedEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

export const PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
