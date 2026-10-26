import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/** Sanity webhook: refresh editorial collections and their story pages. */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let slug: string | undefined;
  try {
    const body = (await request.json()) as {
      slug?: { current?: string };
      result?: { slug?: { current?: string } };
    };
    const candidate = body?.result?.slug?.current ?? body?.slug?.current;
    if (typeof candidate === "string" && /^[a-zA-Z0-9_-]+$/.test(candidate)) slug = candidate;
  } catch {
    // An empty webhook still refreshes the collections.
  }

  revalidatePath("/");
  for (const collection of ["blog", "stories", "lists"]) {
    revalidatePath(`/${collection}`);
    if (slug) revalidatePath(`/${collection}/${slug}`);
  }
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ revalidated: true, slug: slug ?? null });
}
