import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "fennr.studio@gmail.com";
// Must be an address on a domain you've verified in Resend.
// For quick testing without a verified domain, use "fennr <onboarding@resend.dev>"
// (that can only deliver to the email you signed up to Resend with).
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
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        error: "Email is not configured yet. Add RESEND_API_KEY to .env.local.",
      },
      { status: 500 },
    );
  }

  let data: {
    name?: string;
    email?: string;
    company?: string;
    interests?: string[];
    budget?: string;
    timeline?: string;
    message?: string;
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

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // A valid submission needs a name, a good email, and either a message or picked services.
  if (!name || !emailOk || (!message && interests.length === 0)) {
    return NextResponse.json(
      {
        error: "Please provide your name, a valid email, and a little detail.",
      },
      { status: 400 },
    );
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company / website: ${company}` : null,
    interests.length ? `Services: ${interests.join(", ")}` : null,
    budget ? `Budget: ${budget}` : null,
    timeline ? `Timeline: ${timeline}` : null,
    message ? "" : null,
    message || null,
  ].filter((l) => l !== null) as string[];

  const row = (label: string, value: string) =>
    `<p style="margin:0 0 4px"><strong>${label}:</strong> ${escapeHtml(value)}</p>`;

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#101013;line-height:1.6;font-size:15px">
      <h2 style="margin:0 0 14px">New brief from ${escapeHtml(name)}</h2>
      ${row("Email", email)}
      ${company ? row("Company / website", company) : ""}
      ${interests.length ? row("Services", interests.join(", ")) : ""}
      ${budget ? row("Budget", budget) : ""}
      ${timeline ? row("Timeline", timeline) : ""}
      ${
        message
          ? `<hr style="border:none;border-top:1px solid #e0e2df;margin:16px 0" />
             <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>`
          : ""
      }
    </div>`;

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `${interests.length ? "New brief" : "New enquiry"} from ${name}`,
      text: lines.join("\n"),
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please email or WhatsApp us." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
