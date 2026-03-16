import { NextResponse } from "next/server";

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

export async function POST(request: Request) {
  if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
    return NextResponse.json(
      { error: "Newsletter signup is not configured." },
      { status: 503 }
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: "lacondesa.mx",
      }),
    }
  );

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      typeof data?.message === "string"
        ? data.message
        : data?.errors?.[0]?.message ?? "Subscription failed.";
    return NextResponse.json(
      { error: message },
      { status: res.status >= 500 ? 503 : 400 }
    );
  }

  return NextResponse.json({ success: true });
}
