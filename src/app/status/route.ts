import { NextResponse } from "next/server";

/** Mirrors vote + submit-restaurant write-client env resolution (no token values exposed). */
function sanityWriteTokenConfigured(): boolean {
  return !!(
    process.env.SANITY_API_WRITE_TOKEN ??
    process.env.SANITY_WRITE_TOKEN ??
    process.env.SANITY_API_TOKEN
  );
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "La Condesa Weekly is running",
    sanityVoteWritable: sanityWriteTokenConfigured(),
  });
}
