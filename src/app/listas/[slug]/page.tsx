import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getListicleBySlug, getListicleSlugs } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { portableTextComponents } from "@/components/portable-text";
import type { Metadata } from "next";
import type { SanityListicle, SanityListicleEntry } from "@/sanity/fetch";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getListicleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listicle = await getListicleBySlug(slug);
  if (!listicle) return {};
  const title = `${listicle.title} — La Condesa`;
  const description = listicle.seoDescription ?? undefined;
  const canonical = `https://lacondesa.mx/lists/${slug}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
    },
    alternates: {
      canonical,
    },
  };
}

function formatBylineDate(iso: string | null | undefined): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function ListicleSummary({ summary }: { summary: unknown[] | null | undefined }) {
  if (!summary?.length) return null;
  return (
    <div className="prose-condesa max-w-none">
      <PortableText
        value={summary as Parameters<typeof PortableText>[0]["value"]}
        components={portableTextComponents}
      />
    </div>
  );
}

function EntryDescription({ description }: { description: unknown[] | null | undefined }) {
  if (!description?.length) return null;
  return (
    <div className="prose-condesa prose-sm max-w-none mt-3">
      <PortableText
        value={description as Parameters<typeof PortableText>[0]["value"]}
        components={portableTextComponents}
      />
    </div>
  );
}

export default async function ListiclePage({ params }: PageProps) {
  const { slug } = await params;
  const listicle = await getListicleBySlug(slug);
  if (!listicle) notFound();

  const heroUrl =
    listicle.heroImage && typeof listicle.heroImage === "object"
      ? urlFor(listicle.heroImage).width(1400).height(800).quality(85).url()
      : null;
  const heroAlt =
    listicle.heroImage &&
    typeof listicle.heroImage === "object" &&
    "alt" in listicle.heroImage &&
    typeof (listicle.heroImage as { alt?: string }).alt === "string"
      ? (listicle.heroImage as { alt: string }).alt
      : listicle.title;

  const categoryLabel = listicle.category ? `${listicle.category} · La Condesa` : "La Condesa";
  const bylineDate = formatBylineDate(listicle.publishedAt);
  const authorName = listicle.author?.name;

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        {listicle.author && listicle.author.slug && (
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                author: {
                  "@type": "Person",
                  name: listicle.author.name,
                  url: `https://lacondesa.mx/team/${listicle.author.slug}`,
                },
              }),
            }}
          />
        )}
        <header className="mb-8 lg:mb-10">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">
            {categoryLabel}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight leading-tight">
            {listicle.title}
          </h1>
          {(authorName || bylineDate) && (
            <p className="mt-4 text-sm text-muted-foreground">
              {authorName && listicle.author?.slug && (
                <Link
                  href={`/team/${listicle.author.slug}`}
                  className="underline-offset-4 hover:underline"
                >
                  {authorName}
                </Link>
              )}
              {authorName && bylineDate && " · "}
              {bylineDate && (
                <time dateTime={listicle.publishedAt ?? undefined}>
                  {bylineDate}
                </time>
              )}
            </p>
          )}
        </header>

        {heroUrl && (
          <figure className="mb-10 lg:mb-14 -mx-4 sm:mx-0">
            <div className="relative aspect-[16/10] sm:rounded-lg overflow-hidden bg-muted">
              <Image
                src={heroUrl}
                alt={heroAlt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 896px"
                priority
              />
            </div>
          </figure>
        )}

        {listicle.summary?.length ? (
          <section className="mb-14 lg:mb-20 text-lg text-muted-foreground leading-relaxed">
            <ListicleSummary summary={listicle.summary} />
          </section>
        ) : null}

        {listicle.entries?.length ? (
          <ol className="list-none p-0 m-0 space-y-16 lg:space-y-20" start={1}>
            {listicle.entries.map((entry: SanityListicleEntry, i: number) => {
              const num = String(i + 1).padStart(2, "0");
              const entryPhotoUrl =
                entry.photo && typeof entry.photo === "object"
                  ? urlFor(entry.photo).width(900).height(560).quality(80).url()
                  : null;
              const entryPhotoAlt =
                entry.photo &&
                typeof entry.photo === "object" &&
                "alt" in entry.photo &&
                typeof (entry.photo as { alt?: string }).alt === "string"
                  ? (entry.photo as { alt: string }).alt
                  : entry.name;

              return (
                <li key={entry._key} className="flex flex-col">
                  <span
                    className="font-serif text-4xl lg:text-5xl font-semibold text-foreground/15 mb-2 tabular-nums"
                    aria-hidden
                  >
                    {num}
                  </span>
                  <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground tracking-tight mt-2">
                    {entry.name}
                  </h2>
                  {entry.tagline && (
                    <p className="mt-1 text-xs font-medium tracking-[0.12em] uppercase text-muted-foreground">
                      {entry.tagline}
                    </p>
                  )}

                  {entryPhotoUrl && (
                    <div className="relative aspect-[16/10] mt-4 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={entryPhotoUrl}
                        alt={entryPhotoAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 896px"
                      />
                    </div>
                  )}

                  {entry.pullQuote && (
                    <blockquote className="mt-4 pl-4 border-l-2 border-primary text-foreground italic">
                      {entry.pullQuote}
                    </blockquote>
                  )}

                  <EntryDescription description={entry.description} />

                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                    {entry.address && <span>{entry.address}</span>}
                    {entry.hours && <span>{entry.hours}</span>}
                    {entry.priceRange && <span>{entry.priceRange}</span>}
                  </div>

                  {entry.externalUrl && (
                    <p className="mt-3">
                      <a
                        href={entry.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {entry.externalLinkLabel || "View on map"}
                      </a>
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        ) : null}

        <footer className="mt-20 lg:mt-24 pt-10 border-t border-border">
          <p className="text-muted-foreground text-center text-sm">
            Know a place that should be on this list?{" "}
            <Link href="/contact" className="text-primary font-medium hover:underline">
              Get in touch
            </Link>
            .
          </p>
        </footer>
      </article>
    </main>
  );
}
