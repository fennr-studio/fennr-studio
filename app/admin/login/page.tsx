"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.3 5.3C41.4 35.5 44 30.2 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  );
}

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const notAllowed =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("error") === "not_allowed";

  const signIn = async () => {
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <main className="min-h-screen bg-mist grid place-items-center container-px">
      <div className="w-full max-w-sm text-center">
        <p className="eyebrow text-accent mb-3">Fennr admin</p>
        <h1 className="display text-4xl text-ink mb-3">Leads dashboard</h1>
        <p className="text-ink/70 mb-8 text-sm">
          Sign in with your Fennr Google account to continue.
        </p>

        <button
          onClick={signIn}
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-3 bg-white ring-1 ring-hairline rounded-md h-[54px] font-semibold text-ink hover:ring-ink transition-smooth shadow-soft disabled:opacity-60"
        >
          <GoogleIcon />
          {loading ? "Redirecting…" : "Sign in with Google"}
        </button>

        {notAllowed && (
          <p className="mt-5 text-sm text-red-600">
            That account isn&rsquo;t authorised for this dashboard.
          </p>
        )}
      </div>
    </main>
  );
}
