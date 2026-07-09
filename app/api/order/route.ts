import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, timeline, details } = body ?? {};

    if (!name || !email || !service || !details) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(String(email))) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "-"}`,
      `Service: ${service}`,
      `Budget: ${budget || "-"}`,
      `Timeline: ${timeline || "-"}`,
      "",
      "Details:",
      details,
    ].join("\n");

    if (!process.env.RESEND_API_KEY) {
      // No mail provider configured (e.g. local dev): log so nothing is lost.
      console.log("New project inquiry:\n" + text);
      return NextResponse.json({ ok: true });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "Vael <onboarding@resend.dev>",
        to: process.env.CONTACT_TO || "monirulfreelancer@gmail.com",
        reply_to: email,
        subject: `New project inquiry from ${name}`,
        text,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to send" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
