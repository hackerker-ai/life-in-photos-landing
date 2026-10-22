import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { welcomeEmail } from "@/emails/welcome-email";

export const runtime = "nodejs";

type ResendError = {
  message?: string;
  name?: string;
  statusCode?: number;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isAlreadyRegistered(error: ResendError | null) {
  const message = error?.message?.toLowerCase() || "";
  return error?.statusCode === 409 || message.includes("already exists") || message.includes("already added");
}

function response(body: Record<string, string | boolean>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" }
  });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 8_192) {
    return response({ error: "That request is too large.", code: "failed" }, 413);
  }

  let payload: { email?: unknown; website?: unknown };
  try {
    payload = (await request.json()) as { email?: unknown; website?: unknown };
  } catch {
    return response({ error: "Please enter a valid email address.", code: "invalid" }, 400);
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return response({ message: "You are on the list. Watch your inbox.", code: "joined" });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (!emailPattern.test(email) || email.length > 254) {
    return response({ error: "Please enter a valid email address.", code: "invalid" }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_WAITLIST_SEGMENT_ID;
  const from = process.env.WAITLIST_FROM_EMAIL;
  if (!apiKey || !segmentId || !from) {
    return response({ error: "Early access is temporarily unavailable. Please try again later.", code: "unavailable" }, 503);
  }

  const resend = new Resend(apiKey);
  const contactResult = await resend.contacts.create({
    email,
    unsubscribed: false,
    segments: [{ id: segmentId }]
  });

  let alreadyJoined = false;
  if (contactResult.error) {
    alreadyJoined = isAlreadyRegistered(contactResult.error as ResendError);
    if (!alreadyJoined) {
      return response({ error: "We could not add you right now. Please try again.", code: "failed" }, 502);
    }

    const segmentResult = await resend.contacts.segments.add({ email, segmentId });
    if (segmentResult.error && !isAlreadyRegistered(segmentResult.error as ResendError)) {
      return response({ error: "We could not add you right now. Please try again.", code: "failed" }, 502);
    }
  }

  if (alreadyJoined) {
    return response({ message: "You are already on the list. We will keep you posted.", code: "alreadyJoined", alreadyJoined: true });
  }

  const welcome = welcomeEmail();
  const emailKey = createHash("sha256").update(email).digest("hex").slice(0, 48);
  const welcomeResult = await resend.emails.send(
    {
      from,
      to: email,
      replyTo: process.env.WAITLIST_REPLY_TO,
      subject: welcome.subject,
      text: welcome.text,
      html: welcome.html
    },
    { idempotencyKey: `life-in-photos-welcome-${emailKey}` }
  );

  if (welcomeResult.error) {
    return response({
      message: "You are on the list. Your confirmation email may take a little longer.",
      code: "joinedEmailDelayed"
    });
  }

  const notificationEmail = process.env.WAITLIST_NOTIFICATION_EMAIL;
  if (notificationEmail) {
    await resend.emails.send({
      from,
      to: notificationEmail,
      subject: "New Life in Photos waitlist signup",
      text: "A new subscriber joined the Life in Photos early-access list."
    });
  }

  return response({ message: "You are on the list. Watch your inbox.", code: "joined" });
}
