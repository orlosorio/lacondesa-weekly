import { NextResponse } from "next/server";
import { sendEmail, CONTACT_EMAIL, isEmailConfigured } from "@/lib/email";
import { checkSubmitOpeningLimit } from "@/lib/rate-limit";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 3;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const PLACE_TYPES = [
  "Restaurant",
  "Bar",
  "Coffee Shop",
  "Barbershop",
  "Shop",
  "Gallery",
  "Other",
];
const NEIGHBORHOODS = [
  "La Condesa",
  "Hipódromo",
  "Hipódromo Condesa",
  "Roma Norte",
  "Roma Sur",
  "Other",
];

function validateOpeningBody(body: Record<string, unknown>): { ok: boolean; error?: string } {
  const name = typeof body.businessName === "string" ? body.businessName.trim() : "";
  const type = body.placeType;
  const address = typeof body.address === "string" ? body.address.trim() : "";
  const neighborhood = body.neighborhood;
  const openingSoon = body.openingSoon === true || body.openingSoon === "true";
  const openingDate = body.openingDate;
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const contactName = typeof body.contactName === "string" ? body.contactName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const consent = body.consent === true || body.consent === "true";

  if (!name || name.length < 2) {
    return { ok: false, error: "Business name is required." };
  }
  if (!PLACE_TYPES.includes(type as string)) {
    return { ok: false, error: "Invalid type of place." };
  }
  if (!address || address.length < 5) {
    return { ok: false, error: "Address is required." };
  }
  if (!NEIGHBORHOODS.includes(neighborhood as string)) {
    return { ok: false, error: "Invalid neighborhood." };
  }
  if (!openingSoon && (!openingDate || typeof openingDate !== "string")) {
    return {
      ok: false,
      error: 'Provide an opening date or mark "Opening soon".',
    };
  }
  if (!description || description.length < 20) {
    return {
      ok: false,
      error: "Short description is required (at least 20 characters).",
    };
  }
  if (description.length > 300) {
    return { ok: false, error: "Description max 300 characters." };
  }
  if (!contactName || contactName.length < 2) {
    return { ok: false, error: "Contact name is required." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "A valid contact email is required." };
  }
  if (!consent) {
    return {
      ok: false,
      error:
        "You must agree that La Condesa MX may publish this information in its editorial directory.",
    };
  }

  const extra = typeof body.extra === "string" ? body.extra.trim() : "";
  if (extra.length > 500) {
    return { ok: false, error: "Additional field max 500 characters." };
  }

  return { ok: true };
}

function buildOpeningEmailText(body: Record<string, unknown>): string {
  const lines: string[] = [
    "New opening submitted from lacondesa.mx",
    "",
    "--- About the place ---",
    `Business: ${body.businessName}`,
    `Type: ${body.placeType}`,
    `Address: ${body.address}`,
    `Neighborhood: ${body.neighborhood}`,
    `Opening soon: ${
      body.openingSoon === true || body.openingSoon === "true" ? "Yes" : "No"
    }`,
    body.openingDate ? `Opening date: ${body.openingDate}` : "",
    `Description: ${body.description}`,
    "",
    "--- Contact ---",
    `Name: ${body.contactName}`,
    `Email: ${body.email}`,
    body.phone ? `Phone / WhatsApp: ${body.phone}` : "",
    body.instagram ? `Instagram: ${body.instagram}` : "",
    body.website ? `Website: ${body.website}` : "",
  ];
  if (body.extra) {
    lines.push("", "--- Extras ---", String(body.extra));
  }
  if (body.photosCount) {
    lines.push("", `Attached photos: ${body.photosCount}`);
  }
  return lines.filter(Boolean).join("\n");
}

export async function POST(request: Request) {
  if (!isEmailConfigured() || !CONTACT_EMAIL) {
    return NextResponse.json(
      { error: "El envío de aperturas no está configurado." },
      { status: 503 }
    );
  }

  if (!checkSubmitOpeningLimit(request)) {
    return NextResponse.json(
      { error: "Solo puedes enviar una apertura cada 10 minutos. Intenta más tarde." },
      { status: 429 }
    );
  }

  const contentType = request.headers.get("content-type") || "";
  let body: Record<string, unknown> = {};
  const attachments: { filename: string; content: Buffer }[] = [];

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (!ALLOWED_TYPES.includes(value.type) && !value.type.includes("image")) {
          return NextResponse.json(
            { error: "Solo se permiten imágenes JPG o PNG." },
            { status: 400 }
          );
        }
        if (value.size > MAX_FILE_SIZE) {
          return NextResponse.json(
            { error: `Cada foto debe medir menos de 5 MB. "${value.name}" es demasiado grande.` },
            { status: 400 }
          );
        }
        const buf = Buffer.from(await value.arrayBuffer());
        attachments.push({ filename: value.name || `photo-${key}.jpg`, content: buf });
      } else {
        body[key] = typeof value === "string" ? value : value;
      }
    }
    if (attachments.length > MAX_FILES) {
      return NextResponse.json(
        { error: "Máximo 3 fotos." },
        { status: 400 }
      );
    }
    body.photosCount = attachments.length;
  } else {
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Cuerpo inválido." }, { status: 400 });
    }
  }

  const validation = validateOpeningBody(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const businessName = String(body.businessName ?? "").trim();
  const subject = `Nueva apertura: ${businessName} — lacondesa.mx`;
  const text = buildOpeningEmailText(body);
  const replyTo = typeof body.email === "string" ? body.email.trim() : undefined;

  const result = await sendEmail({
    to: CONTACT_EMAIL,
    subject,
    text,
    replyTo,
    attachments: attachments.length ? attachments : undefined,
  });

  if (!result.success) {
    return NextResponse.json(
      { error: result.error ?? "No se pudo enviar. Intenta más tarde." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
