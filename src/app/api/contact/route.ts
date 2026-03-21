import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextRequest, NextResponse } from "next/server";

const ses = new SESClient({
  region: process.env.AWS_SES_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  const { name, email, company, message } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const subject = `[Compli] Early Access Request from ${name}${company ? ` — ${company}` : ""}`;
  const body = `
New early access request from compli.in

Name:    ${name}
Email:   ${email}
Company: ${company || "—"}
Message: ${message || "—"}

Reply directly to this email to respond.
  `.trim();

  try {
    // Send email via SES
    await ses.send(new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL!,
      Destination: { ToAddresses: [process.env.SES_TO_EMAIL || process.env.SES_FROM_EMAIL!] },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: subject },
        Body: { Text: { Data: body } },
      },
    }));

    // Send Slack notification
    if (process.env.SLACK_WEBHOOK_URL) {
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
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
