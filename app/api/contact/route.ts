import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@fennr.studio";
// Must be an address on a domain you've verified in Resend.
// For quick testing without a verified domain, use "fennr <onboarding@resend.dev>"
// (that can only deliver to the email you signed up to Resend with).
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "fennr <onboarding@resend.dev>";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email is not configured yet. Add RESEND_API_KEY to .env.local." },
      { status: 500 },
    );
  }

  let data: {
    name?: string;
    email?: string;
    company?: string;
    interests?: string[];
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
  const message = (data.message || "").trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || !message) {
    return NextResponse.json(
      { error: "Please provide your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company / website: ${company}` : null,
    interests.length ? `Interested in: ${interests.join(", ")}` : null,
    "",
    message,
  ].filter(Boolean) as string[];

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#101013;line-height:1.6;font-size:15px">
      <h2 style="margin:0 0 12px">New enquiry from ${escapeHtml(name)}</h2>
      <p style="margin:0"><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${company ? `<p style="margin:0"><strong>Company / website:</strong> ${escapeHtml(company)}</p>` : ""}
      ${interests.length ? `<p style="margin:0"><strong>Interested in:</strong> ${escapeHtml(interests.join(", "))}</p>` : ""}
      <hr style="border:none;border-top:1px solid #e0e2df;margin:16px 0" />
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>`;

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${name}`,
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
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
