import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "@/lib/supabase/auth";

/**
 * Supabase client bound to the request's cookies — used in Server Components
 * and Route Handlers to read the signed-in user.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // called from a Server Component — safe to ignore; middleware refreshes.
        }
      },
    },
  });
}

/** Returns the signed-in user's email, or null. */
export async function getSessionEmail(): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.email ?? null;
}
