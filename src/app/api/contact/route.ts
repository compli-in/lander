import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, company, cloud, frameworks } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  if (!process.env.SLACK_WEBHOOK_URL) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const frameworksStr = Array.isArray(frameworks) && frameworks.length ? frameworks.join(", ") : "—";

  try {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `🚀 *New Early Access Request*`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `🚀 *New Early Access Request on compli.in*`,
            },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Email:*\n${email}` },
              { type: "mrkdwn", text: `*Company:*\n${company || "—"}` },
              { type: "mrkdwn", text: `*Primary cloud:*\n${cloud || "—"}` },
              { type: "mrkdwn", text: `*Frameworks:*\n${frameworksStr}` },
            ],
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: { type: "plain_text", text: "Reply via Email" },
                url: `mailto:${email}`,
                style: "primary",
              },
            ],
          },
        ],
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
