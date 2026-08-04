import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { LIMITS, capped, clientIp, rateLimit } from "@/lib/security";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@fennrstudio.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "fennr <onboarding@resend.dev>";

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] as string,
  );

export async function POST(req: Request) {
  // Rate limit: max 5 submissions per minute per IP.
  if (!rateLimit(`contact:${clientIp(req)}`, 5, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let data: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    interests?: unknown;
    budget?: string;
    timeline?: string;
    message?: string;
    source?: string;
  };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = capped(data.name, LIMITS.name);
  const email = capped(data.email, LIMITS.email);
  const phone = capped(data.phone, LIMITS.phone);
  const company = capped(data.company, LIMITS.company);
  const interests = (Array.isArray(data.interests) ? data.interests : [])
    .slice(0, LIMITS.maxInterests)
    .map((i) => capped(i, LIMITS.interest))
    .filter(Boolean);
  const budget = capped(data.budget, LIMITS.budget);
  const timeline = capped(data.timeline, LIMITS.timeline);
  const message = capped(data.message, LIMITS.message);
  const source = capped(data.source, LIMITS.source) || "contact";

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || (!message && interests.length === 0)) {
    return NextResponse.json(
      {
        error: "Please provide your name, a valid email, and a little detail.",
      },
      { status: 400 },
    );
  }

  // ---------- 1. Save the lead to Supabase (if configured) ----------
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      company: company || null,
      interests: interests.length ? interests : null,
      budget: budget || null,
      timeline: timeline || null,
      message: message || null,
      source,
    });
    if (error) console.error("Supabase insert error:", error.message);
  }

  // ---------- 2. Email the lead to you (if Resend is configured) ----------
  if (process.env.RESEND_API_KEY) {
    const row = (label: string, value: string) =>
      `<p style="margin:0 0 4px"><strong>${label}:</strong> ${escapeHtml(value)}</p>`;
    const html = `
      <div style="font-family:Inter,Arial,sans-serif;color:#101013;line-height:1.6;font-size:15px">
        <h2 style="margin:0 0 14px">New ${interests.length ? "brief" : "enquiry"} from ${escapeHtml(name)}</h2>
        ${row("Email", email)}
        ${phone ? row("Phone", phone) : ""}
        ${company ? row("Company / website", company) : ""}
        ${interests.length ? row("Services", interests.join(", ")) : ""}
        ${budget ? row("Budget", budget) : ""}
        ${timeline ? row("Timeline", timeline) : ""}
        ${row("Source", source)}
        ${
          message
            ? `<hr style="border:none;border-top:1px solid #e0e2df;margin:16px 0" />
               <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>`
            : ""
        }
      </div>`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      company ? `Company / website: ${company}` : null,
      interests.length ? `Services: ${interests.join(", ")}` : null,
      budget ? `Budget: ${budget}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      `Source: ${source}`,
      message ? "" : null,
      message || null,
    ]
      .filter((l) => l !== null)
      .join("\n");

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        replyTo: email,
        subject: `New ${interests.length ? "brief" : "enquiry"} from ${name}`,
        text,
        html,
      });
      if (error) console.error("Resend error:", error);
    } catch (err) {
      console.error("Email send failed:", err);
    }
  }

  // As long as we captured it somewhere (or at least validated), tell the user it worked.
  if (!supabase && !process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Not configured yet. Add Supabase or Resend keys to .env.local." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
