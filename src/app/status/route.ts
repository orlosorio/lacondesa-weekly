import { NextResponse } from "next/server";
import { isSanityWriteTokenConfigured } from "@/sanity/resolve-write-token";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "La Condesa Weekly is running",
    sanityVoteWritable: isSanityWriteTokenConfigured(),
  });
}
