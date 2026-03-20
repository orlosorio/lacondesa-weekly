import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import { getListicleBySlug, getListicleSlugs } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { portableTextComponents } from "@/components/portable-text";
import type { SanityListicle, SanityListicleEntry } from "@/sanity/fetch";
import { defaultMetadata } from "@/lib/metadata";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getListicleSlugs();
  return slugs.map((slug) => ({ slug }));
}

function buildDescription(listicle: SanityListicle): string | undefined {
  if (listicle.seoDescription?.trim()) return listicle.seoDescription.trim();
  if (Array.isArray(listicle.summary) && listicle.summary.length > 0) {
    const firstBlock = listicle.summary[0] as { children?: { text?: string }[] };
    const text =
      firstBlock?.children?.map((c) => c.text || "").join(" ").trim() || "";
    if (text) {
      return text.length > 160 ? `${text.slice(0, 157)}...` : text;
    }
  }
  return undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listicle = await getListicleBySlug(slug);
  if (!listicle) return defaultMetadata;

  const description = buildDescription(listicle);
  const ogImageUrl =
    listicle.heroImage && typeof listicle.heroImage === "object"
      ? urlFor(listicle.heroImage).width(1200).height(630).quality(80).url()
      : undefined;
  const title = `${listicle.title} — La Condesa`;
  const canonical = `https://lacondesa.mx/lists/${slug}`;

  return {
    ...defaultMetadata,
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      type: "article",
      url: canonical,
      ...(ogImageUrl && { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }),
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
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

function EntryDescription({
  description,
}: {
  description: unknown[] | null | undefined;
}) {
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
      ? urlFor(listicle.heroImage).width(1400).height(900).quality(80).url()
      : null;
  const heroAlt =
    listicle.heroImage &&
    typeof listicle.heroImage === "object" &&
    "alt" in listicle.heroImage &&
    typeof (listicle.heroImage as { alt?: string }).alt === "string"
      ? (listicle.heroImage as { alt: string }).alt
      : listicle.title;

  return (
    <main className="min-h-screen bg-background pt-20 lg:pt-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
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
        <header className="mb-10 lg:mb-12">
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-muted-foreground mb-3">
            {listicle.category || "Guide"}
          </p>
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground tracking-tight mb-4">
            {listicle.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {listicle.author?.name && listicle.author.slug && (
              <Link
                href={`/team/${listicle.author.slug}`}
                className="underline-offset-4 hover:underline"
              >
                By {listicle.author.name}
              </Link>
            )}
            {listicle.publishedAt && (
              <>
                <span aria-hidden>•</span>
                <time dateTime={listicle.publishedAt}>
                  {formatBylineDate(listicle.publishedAt)}
                </time>
              </>
            )}
          </div>
        </header>

        {heroUrl && (
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted mb-10 lg:mb-12">
            <Image
              src={heroUrl}
              alt={heroAlt}
              width={1400}
              height={900}
              className="h-full w-full object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
              priority
            />
          </div>
        )}

        <section className="mb-12 lg:mb-16">
          <ListicleSummary summary={listicle.summary} />
        </section>

        <section aria-label="List entries" className="space-y-10 lg:space-y-12">
          {listicle.entries?.map((entry: SanityListicleEntry, index: number) => {
            const photoUrl =
              entry.photo && typeof entry.photo === "object"
                ? urlFor(entry.photo).width(900).height(600).quality(80).url()
                : null;
            const photoAlt =
              entry.photo &&
              typeof entry.photo === "object" &&
              "alt" in entry.photo &&
              typeof (entry.photo as { alt?: string }).alt === "string"
                ? (entry.photo as { alt: string }).alt
                : entry.name;

            return (
              <div
                key={entry._key ?? `${entry.name}-${index}`}
                className="border-t border-border pt-8 lg:pt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.6fr)] gap-6 lg:gap-10"
              >
                <div className="flex flex-col gap-4">
                  <p className="text-xs font-medium tracking-[0.16em] uppercase text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">
                      {entry.name}
                    </h2>
                    {entry.tagline && (
                      <p className="mt-1 text-xs font-medium tracking-[0.14em] uppercase text-muted-foreground">
                        {entry.tagline}
                      </p>
                    )}
                  </div>
                  {entry.pullQuote && (
                    <blockquote className="border-l-2 border-muted-foreground/40 pl-4 text-sm italic text-muted-foreground">
                      {entry.pullQuote}
                    </blockquote>
                  )}
                  <dl className="text-xs text-muted-foreground space-y-1">
                    {entry.address && (
                      <div>
                        <dt className="sr-only">Address</dt>
                        <dd>{entry.address}</dd>
                      </div>
                    )}
                    {entry.hours && (
                      <div>
                        <dt className="sr-only">Hours</dt>
                        <dd>{entry.hours}</dd>
                      </div>
                    )}
                    {entry.priceRange && (
                      <div>
                        <dt className="sr-only">Price range</dt>
                        <dd>{entry.priceRange}</dd>
                      </div>
                    )}
                    {entry.externalUrl && (
                      <div>
                        <dt className="sr-only">Link</dt>
                        <dd>
                          <Link
                            href={entry.externalUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary hover:underline"
                          >
                            {entry.externalLinkLabel || "More info"}
                          </Link>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
                <div>
                  {photoUrl && (
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                      <Image
                        src={photoUrl}
                        alt={photoAlt}
                        width={900}
                        height={600}
                        className="h-full w-full object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </div>
                  )}
                  <EntryDescription description={entry.description} />
                </div>
              </div>
            );
          })}
        </section>

        <footer className="mt-16 border-t border-border pt-8 lg:pt-10 text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p>
            Want to suggest a place for a future list?{" "}
            <Link href="/contact" className="text-primary font-medium hover:underline">
              Get in touch with the editors.
            </Link>
          </p>
          <Link
            href="/lists"
            className="text-xs font-medium tracking-[0.16em] uppercase text-muted-foreground hover:text-foreground"
          >
            Back to all lists
          </Link>
        </footer>
      </article>
    </main>
  );
}

