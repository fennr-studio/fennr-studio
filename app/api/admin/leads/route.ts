import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getSessionEmail } from "@/lib/supabase/server";
import { isAllowedEmail } from "@/lib/supabase/auth";

// Verify the signed-in user is on the allowlist, then return the service client.
// (Middleware already blocks unauthorised requests; this is defense-in-depth.)
async function guard() {
  const email = await getSessionEmail();
  if (!isAllowedEmail(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured." }, { status: 500 });
  }
  return supabase;
}

const VALID = ["new", "contacted", "quoted", "won", "lost"];

/**
 * Log the real database error server-side and return a generic one.
 * Postgres messages leak column names, constraints and query shape — useful
 * to an attacker who has got this far, useless to the person using the panel.
 */
function dbFailure(op: string, error: { message: string }) {
  console.error(`[admin/leads] ${op} failed:`, error.message);
  return NextResponse.json(
    { error: "Something went wrong. Please try again." },
    { status: 500 },
  );
}

// List all leads (newest first)
export async function GET() {
  const supabase = await guard();
  if (supabase instanceof NextResponse) return supabase;
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return dbFailure("list", error);
  return NextResponse.json({ leads: data });
}

// Manually add a lead
export async function POST(req: Request) {
  const supabase = await guard();
  if (supabase instanceof NextResponse) return supabase;
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const name = String(b.name || "").trim();
  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  const { error } = await supabase.from("leads").insert({
    name,
    email: String(b.email || "").trim() || "—",
    phone: String(b.phone || "").trim() || null,
    company: String(b.company || "").trim() || null,
    interests: Array.isArray(b.interests) && b.interests.length ? b.interests : null,
    budget: String(b.budget || "").trim() || null,
    message: String(b.message || "").trim() || null,
    source: String(b.source || "manual").trim(),
    status: "new",
  });
  if (error) return dbFailure("insert", error);
  return NextResponse.json({ ok: true });
}

// Update status and/or notes
export async function PATCH(req: Request) {
  const supabase = await guard();
  if (supabase instanceof NextResponse) return supabase;
  let b: { id?: string; status?: string; notes?: string };
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!b.id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  const patch: Record<string, unknown> = {};
  if (b.status !== undefined) {
    if (!VALID.includes(b.status)) {
      return NextResponse.json({ error: "Bad status." }, { status: 400 });
    }
    patch.status = b.status;
  }
  if (b.notes !== undefined) patch.notes = b.notes;
  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  const { error } = await supabase.from("leads").update(patch).eq("id", b.id);
  if (error) return dbFailure("update", error);
  return NextResponse.json({ ok: true });
}

// Delete a lead
export async function DELETE(req: Request) {
  const supabase = await guard();
  if (supabase instanceof NextResponse) return supabase;
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) return dbFailure("delete", error);
  return NextResponse.json({ ok: true });
}
