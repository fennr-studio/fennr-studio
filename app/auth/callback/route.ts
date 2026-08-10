import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAllowedEmail } from "@/lib/supabase/auth";

// Google redirects here after sign-in with a ?code — we exchange it for a session.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.exchangeCodeForSession(code);
    const email = data.user?.email;
    if (email && isAllowedEmail(email)) {
      return NextResponse.redirect(`${origin}/admin`);
    }
    // Signed in with Google, but not on the allowlist — sign them out.
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/admin/login?error=not_allowed`);
  }

  return NextResponse.redirect(`${origin}/admin/login?error=auth`);
}
