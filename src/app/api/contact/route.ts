import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, company, message } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  if (!process.env.SLACK_WEBHOOK_URL) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

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
              { type: "mrkdwn", text: `*Name:*\n${name}` },
              { type: "mrkdwn", text: `*Email:*\n${email}` },
              { type: "mrkdwn", text: `*Company:*\n${company || "—"}` },
            ],
          },
          ...(message ? [{
            type: "section",
            text: { type: "mrkdwn", text: `*Message:*\n${message}` },
          }] : []),
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
