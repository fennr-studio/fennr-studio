import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin, type Lead } from "@/lib/supabase";
import { safeEqual } from "@/lib/security";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "fennr.studio@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "fennr <onboarding@resend.dev>";
const SITE_URL = process.env.SITE_URL || "https://www.fennrstudio.com";

const DAY = 86400000;

// Cron endpoint — authorised by the CRON_SECRET only (Vercel cron sends it as
// an Authorization: Bearer header; ?secret= also works for manual runs).
function allowed(req: Request): boolean {
  const cron = process.env.CRON_SECRET;
  if (!cron) return false;
  const auth = req.headers.get("authorization");
  if (safeEqual(auth, `Bearer ${cron}`)) return true;
  if (safeEqual(new URL(req.url).searchParams.get("secret"), cron)) return true;
  return false;
}

const esc = (s: string) =>
  s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] as string);

export async function GET(req: Request) {
  if (!allowed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured." }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .in("status", ["contacted", "quoted"])
    .order("updated_at", { ascending: true });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const now = Date.now();
  const stale = (data as Lead[]).filter(
    (l) => now - new Date(l.updated_at).getTime() > 3 * DAY,
  );
  const newCount = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("status", "new");

  // Nothing to nudge about — don't spam yourself.
  if (stale.length === 0) {
    return NextResponse.json({ ok: true, stale: 0, emailed: false });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: true, stale: stale.length, emailed: false });
  }

  const rows = stale
    .map((l) => {
      const days = Math.floor((now - new Date(l.updated_at).getTime()) / DAY);
      const contact = l.phone || l.email || "";
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee"><strong>${esc(l.name)}</strong></td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee">${esc(l.status)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#C77D2E">${days}d</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee">${esc(contact)}</td>
      </tr>`;
    })
    .join("");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#101013;font-size:15px;line-height:1.6">
      <h2 style="margin:0 0 6px">${stale.length} lead${stale.length > 1 ? "s" : ""} need a follow-up</h2>
      <p style="margin:0 0 16px;color:#5b6169">These have been sitting in contacted/quoted for 3+ days.
        ${newCount.count ? `You also have <strong>${newCount.count}</strong> new lead${newCount.count > 1 ? "s" : ""} to reply to.` : ""}
      </p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        <tr style="text-align:left;background:#101013;color:#FFD21E">
          <th style="padding:8px 12px">Lead</th><th style="padding:8px 12px">Stage</th>
          <th style="padding:8px 12px">Waiting</th><th style="padding:8px 12px">Contact</th>
        </tr>
        ${rows}
      </table>
      <p style="margin:18px 0 0">
        <a href="${SITE_URL}/admin" style="background:#101013;color:#FFD21E;text-decoration:none;font-weight:700;padding:10px 18px;border-radius:8px;display:inline-block">Open dashboard →</a>
      </p>
    </div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `⚠ ${stale.length} lead${stale.length > 1 ? "s" : ""} to follow up — Fennr`,
      html,
      text: stale
        .map(
          (l) =>
            `${l.name} (${l.status}) — ${Math.floor((now - new Date(l.updated_at).getTime()) / DAY)}d — ${l.phone || l.email}`,
        )
        .join("\n"),
    });
  } catch (err) {
    console.error("Digest email failed:", err);
    return NextResponse.json({ ok: false, stale: stale.length, emailed: false });
  }

  return NextResponse.json({ ok: true, stale: stale.length, emailed: true });
}
