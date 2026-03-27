import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoriesPullQuote } from "@/components/stories/stories-pull-quote";
import {
  storyHeroImageUrl,
  storyNextBgImageUrl,
  storyOgImageUrl,
  storySecondaryImageUrl,
} from "@/lib/story-images";
import { defaultMetadata } from "@/lib/metadata";
import { client } from "@/sanity/client";
import {
  allHistoriaSlugsQuery,
  historiaBySlugQuery,
  nextHistoriaQuery,
} from "@/sanity/queries";
import type { HistoriaCategory, HistoriaDetail, HistoriaNextTeaser } from "@/types/historia";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_UI: Record<HistoriaCategory, string> = {
  resident: "Resident",
  business: "Business",
  artist: "Artist",
  project: "Project",
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const rows = await client.fetch<{ slug: string }[]>(allHistoriaSlugsQuery);
  return (rows ?? []).map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const historia = await client.fetch<HistoriaDetail | null>(historiaBySlugQuery, { slug });
  if (!historia) return defaultMetadata;

  const title = `${historia.name} — Stories from La Condesa`;
  const description = historia.tagline;
  const og = storyOgImageUrl(historia.heroPhoto);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://lacondesa.mx/stories/${slug}`,
      ...(og ? { images: [{ url: og, width: 1200, height: 1600, alt: historia.name }] } : {}),
    },
  };
}

function formatYears(n: number | undefined) {
  if (n === undefined || n === null) return null;
  if (n === 0) return "Less than a year";
  if (n === 1) return "1 year";
  return `${n} years`;
}

export default async function StoryProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const historia = await client.fetch<HistoriaDetail | null>(historiaBySlugQuery, { slug });
  if (!historia) notFound();

  const currentPublishedAt = historia.publishedAt ?? historia._createdAt;
  const nextHistoria =
    currentPublishedAt != null
      ? await client.fetch<HistoriaNextTeaser | null>(nextHistoriaQuery, {
          currentPublishedAt,
        })
      : null;

  const heroUrl = storyHeroImageUrl(historia.heroPhoto);
  const catLabel = CATEGORY_UI[historia.category] ?? historia.category;

  return (
    <article>
      <section className="stories-profile-hero">
        {heroUrl ? (
          <Image
            src={heroUrl}
            alt={`Portrait of ${historia.name}`}
            fill
            priority
            className="stories-profile-hero__img"
            sizes="100vw"
          />
        ) : null}
        <div className="stories-profile-hero__gradient" aria-hidden />
        <div className="stories-profile-hero__grain" aria-hidden />
        <div className="stories-profile-hero__content">
          <span className="stories-profile-hero__cat stories-label">{catLabel}</span>
          <h1 className="stories-profile-hero__title stories-display">{historia.name}</h1>
          <p className="stories-profile-hero__tagline">{historia.tagline}</p>
        </div>
      </section>

      <section className="stories-summary">
        <p className="stories-summary__text">{historia.summary}</p>
        <dl className="stories-summary__meta">
          {historia.metadata?.neighborhood ? (
            <div>
              <dt>Neighborhood</dt>
              <dd>{historia.metadata.neighborhood}</dd>
            </div>
          ) : null}
          {historia.metadata?.profession ? (
            <div>
              <dt>Profession</dt>
              <dd>{historia.metadata.profession}</dd>
            </div>
          ) : null}
          {formatYears(historia.metadata?.yearsInCondesa) ? (
            <div>
              <dt>Years in La Condesa</dt>
              <dd>{formatYears(historia.metadata?.yearsInCondesa)}</dd>
            </div>
          ) : null}
        </dl>
      </section>

      <section className="stories-pull" aria-labelledby="pull-quote-heading">
        <h2 id="pull-quote-heading" className="stories-sr-only">
          Pull quote
        </h2>
        <StoriesPullQuote>
          <div className="stories-pull__rule" aria-hidden />
          <p className="stories-pull__text stories-display">
            <span className="stories-pull__mark" aria-hidden>
              &ldquo;
            </span>
            <span style={{ position: "relative", zIndex: 1 }}>{historia.pullQuote}</span>
          </p>
          <div className="stories-pull__rule" style={{ marginTop: "2.5rem" }} aria-hidden />
        </StoriesPullQuote>
      </section>

      <section className="stories-qa" aria-label="Interview">
        {historia.interview?.map((pair, index) => (
          <div key={pair._key ?? index} className="stories-qa-pair">
            <p className="stories-qa__q stories-label">{pair.question}</p>
            <p className="stories-qa__a">{pair.answer}</p>
          </div>
        ))}
      </section>

      {historia.secondaryPhotos && historia.secondaryPhotos.length > 0 ? (
        <section className="stories-strip-wrap" aria-label="More photos">
          <div className="stories-strip">
            {historia.secondaryPhotos.map((photo, i) => {
              const url = storySecondaryImageUrl(photo);
              if (!url) return null;
              return (
                <div key={i} className="stories-strip__item">
                  <Image
                    src={url}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 78vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {nextHistoria?.slug ? (
        <section className="stories-next" aria-label="Next story">
          <Link href={`/stories/${nextHistoria.slug}`} className="stories-next__link">
            {storyNextBgImageUrl(nextHistoria.heroPhoto) ? (
              <Image
                src={storyNextBgImageUrl(nextHistoria.heroPhoto)!}
                alt=""
                fill
                className="stories-next__bg"
                sizes="100vw"
                aria-hidden
              />
            ) : null}
            <div className="stories-next__shade" aria-hidden />
            <div className="stories-next__content">
              <h2 className="stories-next__name stories-display">{nextHistoria.name}</h2>
              <span className="stories-next__cta">
                Next story <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        </section>
      ) : null}
    </article>
  );
}
