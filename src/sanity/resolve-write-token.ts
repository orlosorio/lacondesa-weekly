/**
 * Server-only: which env vars supply Sanity mutations (vote, submit-restaurant, scripts).
 * Trims values; whitespace-only counts as unset.
 */
const WRITE_TOKEN_KEYS = [
  "SANITY_API_WRITE_TOKEN",
  "SANITY_WRITE_TOKEN",
  "SANITY_API_TOKEN",
] as const;

export function resolveSanityWriteToken(): string | undefined {
  for (const key of WRITE_TOKEN_KEYS) {
    const v = process.env[key];
    if (typeof v !== "string") continue;
    const t = v.trim();
    if (t.length > 0) return t;
  }
  return undefined;
}

export function isSanityWriteTokenConfigured(): boolean {
  return !!resolveSanityWriteToken();
}
