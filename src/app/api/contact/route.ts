import { NextResponse } from "next/server";
import { sendEmail, CONTACT_EMAIL, isEmailConfigured } from "@/lib/email";
import { checkContactLimit } from "@/lib/rate-limit";

const SUBJECT_OPTIONS = [
  "Feedback or comment",
  "Editorial proposal",
  "Partnership or sponsorship",
  "Correction or error",
  "Other",
];

function validateContactBody(body: Record<string, unknown>): { ok: boolean; error?: string } {
  if (body.website !== undefined && body.website !== "") {
    return { ok: false, error: "Invalid submission." };
  }
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = body.subject;
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const newsletter = body.newsletter === true || body.newsletter === "true";

  if (!name || name.length < 2) {
    return { ok: false, error: "Name is required." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "A valid email is required." };
  }
  if (!SUBJECT_OPTIONS.includes(subject as string)) {
    return { ok: false, error: "Please choose a reason for contact." };
  }
  if (!message || message.length < 20) {
    return {
      ok: false,
      error: "Message is required (minimum 20 characters).",
    };
  }
  if (message.length > 1000) {
    return { ok: false, error: "Message max 1000 characters." };
  }

  return { ok: true };
}

function buildContactEmailText(body: Record<string, unknown>): string {
  const lines = [
    "Contact message from lacondesa.mx",
    "",
    `Subject: ${body.subject}`,
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    "",
    "Mensaje:",
    String(body.message || ""),
  ];
  if (body.newsletter === true || body.newsletter === "true") {
    lines.push("", "Interested in newsletter: Yes");
  }
  return lines.join("\n");
}

export async function POST(request: Request) {
  if (!isEmailConfigured() || !CONTACT_EMAIL) {
    return NextResponse.json(
      { error: "The contact form is not configured." },
      { status: 503 }
    );
  }

  if (!checkContactLimit(request)) {
    return NextResponse.json(
      {
        error:
          "You’ve sent several messages. Please wait a bit before trying again.",
      },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validation = validateContactBody(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const subject = `${body.subject} — Message from ${body.name}`;
  const text = buildContactEmailText(body);
  const replyTo = typeof body.email === "string" ? body.email.trim() : undefined;

  const result = await sendEmail({
    to: CONTACT_EMAIL,
    subject,
    text,
    replyTo,
  });

  if (!result.success) {
    return NextResponse.json(
      {
        error:
          result.error ??
          "We couldn’t send your message. Please try again later.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
