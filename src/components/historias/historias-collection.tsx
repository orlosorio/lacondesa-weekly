"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import type { HistoriaCategory, HistoriaProfile } from "@/lib/historias-data";
import { historiaPortraitUrl } from "@/lib/historias-data";
import { cn } from "@/lib/utils";

const FILTERS: { id: "all" | HistoriaCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "residentes", label: "Residentes" },
  { id: "negocios", label: "Negocios" },
  { id: "artistas", label: "Artistas" },
  { id: "proyectos", label: "Proyectos" },
];

export function HistoriasCollection({ profiles }: { profiles: HistoriaProfile[] }) {
  const [active, setActive] = useState<"all" | HistoriaCategory>("all");
  const visible = useCallback(
    (p: HistoriaProfile) => active === "all" || p.category === active,
    [active],
  );

  return (
    <>
      {/* Hero ~50vh */}
      <section className="relative min-h-[50vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-16 lg:py-20">
        <h1 className="font-serif text-[clamp(2.5rem,8vw,4.75rem)] font-semibold leading-[1.05] tracking-tight text-[#1a1612] max-w-4xl">
          Historias de
          <br />
          La Condesa
        </h1>
        <p className="font-historias-body mt-6 max-w-xl text-lg sm:text-xl italic text-[#6b6358] leading-relaxed">
          The people who give this neighborhood its soul.
        </p>
        <div
          className="mt-10 h-px w-24 bg-[#c4552a]/80"
          aria-hidden
        />
      </section>

      {/* Filters */}
      <section className="sticky top-16 lg:top-20 z-30 bg-[#faf7f2]/95 backdrop-blur-sm border-b border-[#1a1612]/8 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 sm:gap-3" role="tablist" aria-label="Filtrar por categoría">
          {FILTERS.map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(f.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4552a]",
                  isActive
                    ? "bg-[#c4552a] text-white"
                    : "border border-[#1a1612]/25 bg-transparent text-[#1a1612] hover:border-[#c4552a] hover:text-[#c4552a]",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {profiles.map((profile, index) => {
            const isFeatured = (index + 1) % 5 === 0;
            const show = visible(profile);
            return (
              <HistoriaCard
                key={profile.slug}
                profile={profile}
                listIndex={index}
                isFeatured={isFeatured}
                hidden={!show}
              />
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1612]/10 px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="font-historias-body text-sm text-[#6b6358] text-center sm:text-left">
          Un proyecto de{" "}
          <span className="text-[#1a1612] font-medium">La Condesa Weekly</span>
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#c4552a] hover:text-[#a34422] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4552a] rounded-md"
          aria-label="Volver arriba"
        >
          <ArrowUp className="h-4 w-4" aria-hidden />
          Back to top
        </button>
      </footer>
    </>
  );
}

function HistoriaCard({
  profile,
  listIndex,
  isFeatured,
  hidden,
}: {
  profile: HistoriaProfile;
  listIndex: number;
  isFeatured: boolean;
  hidden: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hidden) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [hidden]);

  if (hidden) return null;

  const src = historiaPortraitUrl(profile.portraitPhotoId);

  return (
    <div
      ref={ref}
      className={cn(
        "historia-card-observe",
        isFeatured && "md:col-span-2",
      )}
    >
      <Link
        href={`/historias/${profile.slug}`}
        className={cn(
          "group flex h-full flex-col rounded-sm overflow-hidden bg-[#f0ebe3] border border-[#1a1612]/8 shadow-sm transition-transform duration-500 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4552a]",
          isFeatured && "md:flex-row md:min-h-[400px]",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-[#e8e2d9]",
            isFeatured
              ? "w-full md:w-[48%] min-h-[280px] md:min-h-[400px]"
              : "w-full aspect-[3/4] max-h-[420px] sm:max-h-[460px]",
          )}
        >
          <Image
            src={src}
            alt={`Retrato de ${profile.name}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes={isFeatured ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
            priority={listIndex < 3}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-[#c4552a] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            aria-hidden
          />
        </div>

        <div
          className={cn(
            "relative flex flex-col justify-center p-6 sm:p-8 md:p-10",
            isFeatured ? "md:w-[52%] md:flex-1" : "flex-1",
          )}
        >
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#c4552a] font-sans font-semibold mb-3">
            {profile.categoryLabel}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#1a1612] leading-tight group-hover:underline decoration-[#c4552a]/50 decoration-1 underline-offset-4">
            {profile.name}
          </h2>
          <p className="font-historias-body mt-4 text-lg italic text-[#6b6358] leading-snug">
            {profile.tagline}
          </p>
        </div>
      </Link>
    </div>
  );
}
