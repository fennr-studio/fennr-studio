import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function allowed(email: string | undefined | null): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: req });

  // Auth not configured. In local dev, leave the app usable without Supabase.
  // In production this must fail CLOSED — a missing env var should never be
  // the reason /admin is publicly reachable.
  if (!SUPABASE_URL || !SUPABASE_ANON) {
    if (process.env.NODE_ENV !== "production") return res;
    // The digest cron authorises itself with CRON_SECRET, not with Supabase,
    // so it still needs to get through.
    if (req.nextUrl.pathname.startsWith("/api/admin/digest")) return res;
    return req.nextUrl.pathname.startsWith("/api/admin")
      ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      : new NextResponse("Not found", { status: 404 });
  }

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          res.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = req.nextUrl.pathname;
  const isAdminApi = path.startsWith("/api/admin");
  // The digest endpoint is called by cron with its own secret — let it through.
  const isCron = path.startsWith("/api/admin/digest");
  // The login page must stay public (or we'd redirect it to itself).
  const isLogin = path === "/admin/login";

  const ok = allowed(user?.email);

  // If already signed in, skip the login page and go to the dashboard.
  if (isLogin && ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  // Protect the admin page: bounce to the sign-in screen if not allowed.
  if (!isLogin && (path === "/admin" || path.startsWith("/admin/"))) {
    if (!ok) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  // Protect admin APIs (except the cron digest, which authorises itself).
  if (isAdminApi && !isCron && !ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
