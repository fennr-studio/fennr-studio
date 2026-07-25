import { createBrowserClient } from "@supabase/ssr";
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "@/lib/supabase/auth";

/** Supabase client for use in Client Components (browser). */
export function createSupabaseBrowserClient() {
  return createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
}
