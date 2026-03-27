import FingerprintJS from "@fingerprintjs/fingerprintjs";

let cachedFingerprint: string | null = null;

/*
 * PHASE 2: Replace localStorage + fingerprint vote tracking with authenticated user votes.
 * Before calling the vote API, check if user is logged in.
 * If not logged in, show a modal: "Sign in to vote — it only takes a second."
 * Capture email + magic link or password.
 * Store votes linked to user ID + restaurant ID.
 * This makes vote integrity airtight and gives us an email list.
 */

/** Stable visitor id for Wall of Love duplicate voting checks (Layer 2). */
export async function getFingerprint(): Promise<string> {
  if (cachedFingerprint) return cachedFingerprint;

  const fp = await FingerprintJS.load();
  const result = await fp.get();
  cachedFingerprint = result.visitorId;
  return cachedFingerprint;
}
