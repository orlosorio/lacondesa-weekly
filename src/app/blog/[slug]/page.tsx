import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EmailSignup } from "@/components/email-signup";
import { StickySignupBar } from "@/components/sticky-signup-bar";
import { ArticleBody } from "@/components/portable-text";
import {
  getArticleBySlug,
  getArticleSlugs,
  getArticles,
} from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { articles as fallbackArticles } from "@/lib/data";
import { getBlogPostImageUrl } from "@/lib/blog-images";
import { Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { article, sanityArticle, usingSanity } = await getArticleBySlug(slug);
  const source = usingSanity ? sanityArticle : article;
  if (!source) return {};

  return {
    title: source.title,
    description: source.excerpt,
    openGraph: {
      title: source.title,
      description: source.excerpt,
      type: "article",
    },
  };
}

function renderStaticBody(body: string[]) {
  const elements: React.ReactNode[] = [];
  let insertedCta = false;
  let paragraphCount = 0;

  for (let i = 0; i < body.length; i++) {
    const text = body[i];
    if (text.startsWith("## ")) {
      elements.push(
        <h2 key={`h2-${i}`} className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
          {text.slice(3)}
        </h2>
      );
    } else if (text.startsWith('"')) {
      elements.push(
        <blockquote key={`bq-${i}`} className="border-l-4 border-primary pl-5 my-8 italic text-foreground">
          <p>{text}</p>
        </blockquote>
      );
    } else {
      paragraphCount++;
      elements.push(
        <p key={`p-${i}`} className="text-muted-foreground leading-relaxed mb-6 text-lg">
          {text}
        </p>
      );
      if (paragraphCount === 3 && !insertedCta) {
        insertedCta = true;
        elements.push(
          <div key="inline-cta" className="my-10">
            <EmailSignup variant="inline" />
          </div>
        );
      }
    }
  }
  return elements;
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const { article, sanityArticle, usingSanity } = await getArticleBySlug(slug);

  if (!article && !sanityArticle) {
    notFound();
  }

  const source = usingSanity ? sanityArticle! : article!;
  const hasBody = usingSanity ? !!sanityArticle?.body : !!article?.body;

  if (!hasBody) {
    notFound();
  }

  const hasSanityImage = Boolean(usingSanity && sanityArticle?.image);
  const imageSrc = hasSanityImage
    ? urlFor(sanityArticle!.image).width(1200).quality(80).url()
    : article?.image
      ? (article.image as string)
      : getBlogPostImageUrl(source.slug, 1200);
  // #region agent log
  fetch("http://127.0.0.1:7483/ingest/e5dcf654-c539-40d8-a49f-f3353a40d0e2", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "cf215d" },
    body: JSON.stringify({
      sessionId: "cf215d",
      location: "blog/[slug]/page.tsx",
      message: "Blog post hero image source",
      data: { slug, usingSanity, hasSanityImage, imagePrefix: (imageSrc || "").slice(0, 60), fromSanityCdn: (imageSrc || "").includes("cdn.sanity.io") },
      timestamp: Date.now(),
      hypothesisId: "H4",
    }),
  }).catch(() => {});
  // #endregion

  /** Related stories exclude "New Openings" (separate carousel) for now. */
  const EXCLUDE_RELATED_CATEGORY = "New Openings";
  const { sanityArticles, usingSanity: hasSanityArticleList } =
    await getArticles();

  const relatedItems =
    hasSanityArticleList && sanityArticles?.length
      ? sanityArticles
          .filter(
            (a) =>
              a.slug !== slug &&
              a.category !== EXCLUDE_RELATED_CATEGORY &&
              a.hasBody
          )
          .slice(0, 3)
          .map((a) => ({
            slug: a.slug,
            title: a.title,
            category: a.category,
            date: a.date,
            imageSrc: a.image
              ? urlFor(a.image).width(600).quality(80).url()
              : getBlogPostImageUrl(a.slug, 600),
          }))
      : fallbackArticles
          .filter(
            (a) =>
              a.slug !== slug &&
              a.category !== EXCLUDE_RELATED_CATEGORY &&
              Boolean(a.body?.length)
          )
          .slice(0, 3)
          .map((a) => ({
            slug: a.slug,
            title: a.title,
            category: a.category,
            date: a.date,
            imageSrc: getBlogPostImageUrl(a.slug, 600),
          }));

  const author = (source as typeof sanityArticle | typeof article & {
    author?: { _id: string; name: string; slug?: string | null } | null;
  })?.author;
  const articleJsonLd =
    author && author.slug
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          author: {
            "@type": "Person",
            name: author.name,
            url: `https://lacondesa.mx/team/${author.slug}`,
          },
        }
      : null;

  return (
    <>
      <main className="pt-20 lg:pt-24">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {articleJsonLd && (
            <script
              type="application/ld+json"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
          )}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-transparent">
                {source.category}
              </Badge>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {source.date}
              </span>
              {source.readTime && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {source.readTime}
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
              {source.title}
            </h1>
            {author?.name && (
              <p className="mt-4 text-sm text-muted-foreground">
                {author.slug ? (
                  <Link
                    href={`/team/${author.slug}`}
                    className="underline-offset-4 hover:underline"
                  >
                    By {author.name}
                  </Link>
                ) : (
                  <>By {author.name}</>
                )}
              </p>
            )}
          </header>

          <div className="relative aspect-[16/9] mb-10 rounded-lg overflow-hidden mask-cloud-fade">
            <Image
              src={imageSrc}
              alt={source.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 900px) 100vw, 900px"
              priority
            />
          </div>

          <div className="max-w-prose mx-auto">
            {usingSanity ? (
              <ArticleBody body={sanityArticle!.body as unknown[]} />
            ) : (
              <div className="prose-condesa">
                {renderStaticBody(article!.body!)}
              </div>
            )}
          </div>
        </article>

        {/* Related articles */}
        <section className="border-t border-border bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-8">
              More from La Condesa Weekly
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedItems.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm overflow-hidden border-border bg-card hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl">
                    <Image
                      src={a.imageSrc}
                      alt={a.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-transparent text-xs">
                        {a.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {a.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <StickySignupBar />
    </>
  );
}
