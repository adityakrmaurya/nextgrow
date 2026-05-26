import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    // Log submission server-side (replace with Resend when API key is configured)
    console.log("[Contact form]", {
      name: body.name,
      email: body.email,
      company: body.company,
      industry: body.industry,
      budget: body.budget,
      services: body.services,
    });

    // TODO: uncomment when RESEND_API_KEY is set in .env.local
    // const { Resend } = await import("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "NextGrow Website <noreply@nextgrow.in>",
    //   to: "connect@nextgrow.in",
    //   subject: `New enquiry from ${body.name} — ${body.company}`,
    //   text: JSON.stringify(body, null, 2),
    // });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
  }
}
