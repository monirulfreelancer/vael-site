import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, budget, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const to = process.env.CONTACT_TO || "hello@vael.studio";
    const key = process.env.RESEND_API_KEY;

    // If Resend is configured, send a real email (zero extra deps — REST call)
    if (key) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM || "Vael <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject: `New inquiry from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nBudget: ${budget || "—"}\n\n${message}`,
        }),
      });
      if (!r.ok) {
        console.error("Resend error", await r.text());
        return NextResponse.json({ error: "Send failed" }, { status: 502 });
      }
    } else {
      // No email provider configured yet — log so nothing is lost in dev
      console.log("[contact]", { name, email, budget, message });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
