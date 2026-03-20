import { getArticles } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { getBlogPostImageUrl } from "@/lib/blog-images";
import { categories } from "@/lib/data";
import { BlogPageContent } from "@/components/blog-page-content";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const { articles, sanityArticles, usingSanity } = await getArticles();

  const displayArticles = (usingSanity ? sanityArticles ?? [] : articles).map(
    (a) => {
      const slug = a.slug as string;
      const rawImage = (a as { image?: unknown }).image;
      const hasSanityImage =
        usingSanity &&
        rawImage != null &&
        typeof rawImage === "object";
      const imageUrl = hasSanityImage
        ? urlFor((a as { image: unknown }).image)
            .width(800)
            .quality(80)
            .url()
        : "image" in a && typeof (a as { image?: string }).image === "string"
          ? (a as { image: string }).image
          : getBlogPostImageUrl(slug, 800);

      return {
        slug,
        title: a.title,
        excerpt: a.excerpt,
        category: a.category,
        date: usingSanity ? formatDate(a.date) : a.date,
        image: imageUrl,
      };
    }
  );

  // #region agent log
  const firstDisplay = displayArticles[0];
  if (firstDisplay) {
    const firstSource = (usingSanity ? sanityArticles ?? [] : articles)[0];
    const rawImg = firstSource && (firstSource as { image?: unknown }).image;
    fetch("http://127.0.0.1:7483/ingest/e5dcf654-c539-40d8-a49f-f3353a40d0e2", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "cf215d" },
      body: JSON.stringify({
        sessionId: "cf215d",
        location: "blog/page.tsx",
        message: "Blog index first article image source",
        data: { usingSanity, hasSanityImage: usingSanity && rawImg != null && typeof rawImg === "object", imagePrefix: (firstDisplay.image || "").slice(0, 60), fromSanityCdn: (firstDisplay.image || "").includes("cdn.sanity.io") },
        timestamp: Date.now(),
        hypothesisId: "H2",
      }),
    }).catch(() => {});
  }
  // #endregion

  return <BlogPageContent articles={displayArticles} categories={categories} />;
}
