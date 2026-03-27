import {
  wallOfLoveExistingVoteByFingerprintQuery,
  wallOfLoveExistingVoteByIpQuery,
} from "@/sanity/queries";
import { getSanityWriteClient } from "@/sanity/write-client";

// In-memory rate limiter — replace with Upstash Redis in production
const rateLimit = new Map<string, { count: number; start: number }>();
const RATE_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip) ?? { count: 0, start: now };

  if (now - record.start > RATE_WINDOW_MS) {
    rateLimit.set(ip, { count: 1, start: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) return true;

  rateLimit.set(ip, { ...record, count: record.count + 1 });
  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const fromForwarded = forwarded?.split(",")[0]?.trim();
  return (
    fromForwarded ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

/**
 * LAYER 4: Rate limiting (server)
 * LAYER 3: IP check (server)
 * LAYER 2: Fingerprint (client sends, server stores)
 * LAYER 1: localStorage — handled on client in voteTracking.ts
 */
export async function POST(request: Request) {
  let writeClient;
  try {
    writeClient = getSanityWriteClient();
  } catch {
    return Response.json(
      { error: "Voting is temporarily unavailable." },
      { status: 503 }
    );
  }

  let body: { restaurantId?: string; voteType?: string; fingerprint?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { restaurantId, voteType, fingerprint } = body;

  if (!restaurantId || !["upvote", "downvote"].includes(voteType ?? "")) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const ip = clientIp(request);
  const month = new Date().toISOString().slice(0, 7);

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Slow down." },
      { status: 429 }
    );
  }

  if (fingerprint) {
    const existingByFingerprint = await writeClient.fetch(
      wallOfLoveExistingVoteByFingerprintQuery,
      { restaurantId, fingerprint, month }
    );
    if (existingByFingerprint) {
      return Response.json({ error: "Already voted" }, { status: 429 });
    }
  }

  if (ip !== "unknown") {
    const existingByIP = await writeClient.fetch(
      wallOfLoveExistingVoteByIpQuery,
      { restaurantId, ip, month }
    );
    if (existingByIP) {
      return Response.json({ error: "Already voted" }, { status: 429 });
    }
  }

  const field = voteType === "upvote" ? "upvotes" : "downvotes";

  try {
    await writeClient
      .patch(restaurantId)
      .setIfMissing({ upvotes: 0, downvotes: 0 })
      .inc({ [field]: 1 })
      .commit();

    await writeClient.create({
      _type: "wallOfLoveVote",
      restaurantId,
      voteType,
      fingerprint: fingerprint || null,
      ip,
      month,
      votedAt: new Date().toISOString(),
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Vote failed" }, { status: 500 });
  }
}
