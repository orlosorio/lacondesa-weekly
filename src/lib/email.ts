import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL =
  process.env.FROM_EMAIL?.trim() || "La Condesa <onboarding@resend.dev>";
const CONTACT_EMAIL = process.env.CONTACT_EMAIL?.trim();

export function isEmailConfigured(): boolean {
  return !!(
    process.env.RESEND_API_KEY?.trim() &&
    CONTACT_EMAIL
  );
}

export async function sendEmail({
  to,
  subject,
  text,
  replyTo,
  attachments,
}: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}): Promise<{ success: boolean; error?: string }> {
  if (!resend || !CONTACT_EMAIL) {
    return { success: false, error: "Email is not configured." };
  }

  const payload: Parameters<Resend["emails"]["send"]>[0] = {
    from: FROM_EMAIL,
    to: [to],
    subject,
    text,
    replyTo,
  };

  if (attachments?.length) {
    payload.attachments = attachments.map((a) => ({
      filename: a.filename,
      content: a.content,
    }));
  }

  const { data, error } = await resend.emails.send(payload);

  if (error) {
    return { success: false, error: error.message };
  }
  if (data?.id) {
    return { success: true };
  }
  return { success: false, error: "Unknown send error." };
}

export { CONTACT_EMAIL };
