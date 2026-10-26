import type { Metadata } from "next";
import { getArticles } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { getBlogPostImageUrl } from "@/lib/blog-images";
import { BlogPageContent } from "@/components/blog-page-content";

export const metadata: Metadata = {
  title: "Journal",
  description: "People, places, practical tips, and restaurant reviews from La Condesa, Mexico City.",
  alternates: { canonical: "https://lacondesa.mx/blog" },
};

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


  return <BlogPageContent articles={displayArticles} />;
}
