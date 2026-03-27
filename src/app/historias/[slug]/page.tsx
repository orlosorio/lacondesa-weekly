import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HistoriasPullQuote } from "@/components/historias/historias-pull-quote";
import {
  getHistoriaBySlug,
  getNextHistoriaSlug,
  historiaPortraitUrl,
  HISTORIAS,
} from "@/lib/historias-data";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return HISTORIAS.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getHistoriaBySlug(slug);
  if (!profile) return { title: "Historia | La Condesa Weekly" };

  const title = `${profile.name} — Historias de La Condesa`;
  const description = profile.tagline;
  const ogImage = historiaPortraitUrl(profile.portraitPhotoId, 1200, 1600);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://lacondesa.mx/historias/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 1600, alt: profile.name }],
    },
  };
}

export default async function HistoriaProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const profile = getHistoriaBySlug(slug);
  if (!profile) notFound();

  const nextSlug = getNextHistoriaSlug(slug);
  const next = nextSlug ? getHistoriaBySlug(nextSlug) : undefined;
  const heroSrc = historiaPortraitUrl(profile.portraitPhotoId, 1200, 1600);

  return (
    <article>
      {/* Hero: portrait + biography */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 lg:items-center">
            {/* Portrait */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[420px] lg:max-w-none">
                <div className="relative aspect-[3/4] rounded-[2px] overflow-hidden bg-[#e8e2d9] border border-[#1a1612]/12 shadow-[0_28px_64px_-24px_rgba(26,22,18,0.35)] ring-1 ring-[#1a1612]/5">
                  <Image
                    src={heroSrc}
                    alt={`Retrato de ${profile.name}`}
                    fill
                    priority
                    className="object-cover object-[center_18%] historias-hero-image"
                    sizes="(min-width: 1024px) 38vw, 90vw"
                  />
                  <div className="historias-grain pointer-events-none z-[1]" aria-hidden />
                </div>
                <p className="mt-3 text-center lg:text-left font-sans text-[11px] uppercase tracking-[0.16em] text-[#6b6358]">
                  Fotografía — Historias de La Condesa
                </p>
              </div>
            </div>

            {/* Name, details, bio */}
            <div className="lg:col-span-7 flex flex-col justify-center min-w-0">
              <span className="inline-flex w-fit rounded-full border border-[#c4552a]/35 bg-[#c4552a]/[0.06] px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#c4552a] font-sans font-semibold">
                {profile.categoryLabel}
              </span>
              <h1 className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-semibold text-[#1a1612] leading-[1.08] mt-5 tracking-tight">
                {profile.name}
              </h1>
              <p className="font-historias-body mt-4 text-xl sm:text-2xl italic text-[#4a433c] leading-snug max-w-2xl">
                {profile.tagline}
              </p>
              <div className="mt-8 h-px w-full max-w-md bg-gradient-to-r from-[#c4552a]/70 via-[#c4552a]/25 to-transparent" aria-hidden />

              <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 font-sans border-t border-b border-[#1a1612]/10 py-6">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-[#6b6358] mb-1.5">
                    Barrio
                  </dt>
                  <dd className="text-sm text-[#1a1612] font-medium leading-snug">
                    {profile.neighborhood}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-[#6b6358] mb-1.5">
                    Oficio
                  </dt>
                  <dd className="text-sm text-[#1a1612] font-medium leading-snug">
                    {profile.profession}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-[#6b6358] mb-1.5">
                    En La Condesa
                  </dt>
                  <dd className="text-sm text-[#1a1612] font-medium leading-snug">
                    {profile.yearsInCondesa}
                  </dd>
                </div>
              </dl>

              <p className="font-historias-body mt-10 text-[1.0625rem] sm:text-lg leading-[1.82] text-[#1a1612] max-w-2xl">
                {profile.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <HistoriasPullQuote className="max-w-4xl mx-auto text-center px-2">
          <div className="h-px w-16 bg-[#c4552a]/50 mx-auto mb-10" aria-hidden />
          <p className="relative font-serif text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.25] text-[#1a1612] font-medium">
            <span
              className="absolute -left-2 sm:left-0 top-[-0.35em] font-serif text-[clamp(4rem,14vw,9rem)] leading-none text-[#c4552a]/15 select-none pointer-events-none"
              aria-hidden
            >
              &ldquo;
            </span>
            <span className="relative z-[1]">{profile.pullQuote}</span>
          </p>
          <div className="h-px w-16 bg-[#c4552a]/50 mx-auto mt-10" aria-hidden />
        </HistoriasPullQuote>
      </section>

      {/* Interview */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
        <div className="max-w-[680px] mx-auto space-y-12">
          {profile.qa.map((block, i) => (
            <div
              key={i}
              className={cn(
                "rounded-sm py-8 px-5 sm:px-8 -mx-2 sm:-mx-0",
                i % 2 === 1 && "bg-[#1a1612]/[0.03]",
              )}
            >
              <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.18em] text-[#c4552a] font-semibold mb-4">
                {block.q}
              </p>
              <p className="font-historias-body text-[1.05rem] sm:text-[1.125rem] leading-[1.8] text-[#1a1612]">
                {block.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary photos */}
      {profile.secondaryPhotoIds && profile.secondaryPhotoIds.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
          <div className="max-w-6xl mx-auto">
            <div className="flex md:grid md:grid-cols-3 gap-4 historias-photo-strip overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none">
              {profile.secondaryPhotoIds.map((photoId) => (
                <div
                  key={photoId}
                  className="relative shrink-0 w-[78vw] max-w-[320px] md:w-auto md:max-w-none snap-center aspect-[4/5] rounded-[4px] overflow-hidden border border-[#1a1612]/12 bg-[#e8e2d9]"
                >
                  <Image
                    src={historiaPortraitUrl(photoId, 800, 1000)}
                    alt={`Momento en el taller o la calle — ${profile.name}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 78vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next story */}
      {next && (
        <section className="relative min-h-[40vh] flex items-stretch bg-[#2c1810]">
          <Link
            href={`/historias/${next.slug}`}
            className="group relative flex w-full min-h-[40vh] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/80"
          >
            <Image
              src={historiaPortraitUrl(next.portraitPhotoId, 1600, 1200)}
              alt=""
              fill
              className="object-cover opacity-45 transition-opacity duration-500 group-hover:opacity-70"
              sizes="100vw"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2c1810]/95 via-[#2c1810]/70 to-transparent z-[1]" />
            <div className="relative z-[2] flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 max-w-3xl">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                {next.name}
              </h2>
              <span className="mt-8 inline-flex items-center gap-2 text-white font-sans text-base font-medium tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                Siguiente historia
                <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        </section>
      )}
    </article>
  );
}
