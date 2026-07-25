import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "fennr.studio@gmail.com";
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
  let data: {
    name?: string;
    email?: string;
    company?: string;
    interests?: string[];
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

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const company = (data.company || "").trim();
  const interests = Array.isArray(data.interests) ? data.interests : [];
  const budget = (data.budget || "").trim();
  const timeline = (data.timeline || "").trim();
  const message = (data.message || "").trim();
  const source = (data.source || "contact").trim();

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
