import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation for Stories (Sanity webhook).
 * Set REVALIDATE_SECRET in .env.local and call:
 * POST /api/revalidate?secret=YOUR_SECRET
 * Body may include Sanity webhook payload with `result.slug.current` or `slug.current`.
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let slug: string | undefined;
  try {
    const body = (await request.json()) as {
      slug?: { current?: string };
      result?: { slug?: { current?: string }; _type?: string };
    };
    slug = body?.result?.slug?.current ?? body?.slug?.current;
  } catch {
    /* empty body ok */
  }

  if (slug) {
    revalidatePath(`/stories/${slug}`);
  }
  revalidatePath("/stories");

  return NextResponse.json({ revalidated: true, slug: slug ?? null });
}
