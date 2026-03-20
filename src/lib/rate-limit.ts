/**
 * In-memory rate limit by IP. Best-effort on serverless (per-instance).
 * Keys: IP string. Values: array of timestamps (ms).
 */
const store = new Map<string, number[]>();

const TEN_MINUTES_MS = 10 * 60 * 1000;
const ONE_HOUR_MS = 60 * 60 * 1000;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function prune(now: number, windowMs: number): void {
  const cutoff = now - windowMs;
  for (const [key, timestamps] of store.entries()) {
    const kept = timestamps.filter((t) => t > cutoff);
    if (kept.length === 0) store.delete(key);
    else store.set(key, kept);
  }
}

/** Max 1 submission per IP per 10 minutes. */
export function checkSubmitOpeningLimit(request: Request): boolean {
  const ip = getClientIp(request);
  const now = Date.now();
  prune(now, TEN_MINUTES_MS);
  const timestamps = store.get(ip) ?? [];
  if (timestamps.length >= 1) return false;
  store.set(ip, [...timestamps, now]);
  return true;
}

/** Max 3 submissions per IP per hour. */
export function checkContactLimit(request: Request): boolean {
  const ip = getClientIp(request);
  const now = Date.now();
  prune(now, ONE_HOUR_MS);
  const timestamps = store.get(ip) ?? [];
  if (timestamps.length >= 3) return false;
  store.set(ip, [...timestamps, now]);
  return true;
}
