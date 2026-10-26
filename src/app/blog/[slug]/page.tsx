import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArticleBody } from "@/components/portable-text";
import {
  getArticleBySlug,
  getArticleSlugs,
  getArticles,
} from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { articles as fallbackArticles } from "@/lib/data";
import { getBlogPostImageUrl } from "@/lib/blog-images";
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
      elements.push(
        <p key={`p-${i}`} className="text-muted-foreground leading-relaxed mb-6 text-lg">
          {text}
        </p>
      );

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
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {articleJsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
          )}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5 font-mono text-xs text-muted-foreground">
              <span>
                {source.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">

                {source.date}
              </span>
              {source.readTime && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">

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

          <div className="relative aspect-[16/9] mb-12 overflow-hidden">
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-8">
              More from La Condesa Weekly
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-14">
              {relatedItems.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={a.imageSrc}
                      alt={a.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-muted-foreground">
                        {a.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">

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

    </>
  );
}
