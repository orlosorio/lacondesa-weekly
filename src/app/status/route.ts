import { NextResponse } from "next/server";
import { isSanityWriteTokenConfigured } from "@/sanity/resolve-write-token";

export async function GET() {
  const onVercel = !!process.env.VERCEL;
  return NextResponse.json({
    ok: true,
    message: "La Condesa Weekly is running",
    sanityVoteWritable: isSanityWriteTokenConfigured(),
    /** Helps confirm you are editing env on the same host that runs this deployment (no secrets). */
    deployment: onVercel
      ? {
          provider: "vercel",
          vercelEnv: process.env.VERCEL_ENV ?? null,
          vercelUrl: process.env.VERCEL_URL ?? null,
        }
      : { provider: "other" },
  });
}
