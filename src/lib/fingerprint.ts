import FingerprintJS from "@fingerprintjs/fingerprintjs";

let cachedFingerprint: string | null = null;

/** Stable visitor id for Wall of Love duplicate voting checks (Layer 2). */
export async function getFingerprint(): Promise<string> {
  if (cachedFingerprint) return cachedFingerprint;

  const fp = await FingerprintJS.load();
  const result = await fp.get();
  cachedFingerprint = result.visitorId;
  return cachedFingerprint;
}
