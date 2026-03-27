"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useMemo } from "react";
import { ArrowUp } from "lucide-react";
import type { HistoriaCategory, HistoriaListItem } from "@/types/historia";
import { storyCardImageUrl } from "@/lib/story-images";

const FILTERS: { id: "all" | HistoriaCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "resident", label: "Residents" },
  { id: "business", label: "Businesses" },
  { id: "artist", label: "Artists" },
  { id: "project", label: "Projects" },
];

const CATEGORY_UI: Record<HistoriaCategory, string> = {
  resident: "Resident",
  business: "Business",
  artist: "Artist",
  project: "Project",
};

export function StoriesCollectionClient({
  historias,
}: {
  historias: HistoriaListItem[];
}) {
  const [active, setActive] = useState<"all" | HistoriaCategory>("all");

  const filtered = useMemo(() => {
    if (active === "all") return historias;
    return historias.filter((h) => h.category === active);
  }, [historias, active]);

  if (historias.length === 0) {
    return (
      <div className="stories-empty">
        <p>No stories published yet.</p>
        <p style={{ marginTop: "0.75rem" }}>
          Add a <strong>Story</strong> document in{" "}
          <a href="/studio">Sanity Studio</a> → Stories (La Condesa), then publish.
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="stories-collection-hero" aria-labelledby="stories-hero-heading">
        <h1 id="stories-hero-heading" className="stories-collection-hero__title stories-display">
          Stories from La Condesa
        </h1>
        <p className="stories-collection-hero__subtitle">
          The people who give this neighborhood its soul.
        </p>
        <div className="stories-collection-hero__rule" aria-hidden />
      </section>

      <section className="stories-filters" aria-label="Filter by category">
        <div className="stories-filters__inner" role="tablist">
          {FILTERS.map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-category={f.id}
                className={`stories-filter-pill stories-label ${isActive ? "is-active" : ""}`}
                onClick={() => setActive(f.id)}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="stories-grid" aria-live="polite">
        {filtered.length === 0 ? (
          <p className="stories-empty" style={{ gridColumn: "1 / -1" }}>
            No stories in this category yet.
          </p>
        ) : (
          filtered.map((h, index) => {
            const originalIndex = historias.findIndex((x) => x._id === h._id);
            return (
              <StoryCard
                key={h._id}
                historia={h}
                listIndex={index}
                isFeatured={Boolean(h.featured) || (originalIndex + 1) % 5 === 0}
              />
            );
          })
        )}
      </section>

      <footer className="stories-footer">
        <p className="stories-footer__credit">
          A project by <strong>La Condesa Weekly</strong>
        </p>
        <button
          type="button"
          className="stories-footer__top stories-label"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <ArrowUp size={16} aria-hidden />
          Back to top
        </button>
      </footer>
    </>
  );
}

function StoryCard({
  historia,
  listIndex,
  isFeatured,
}: {
  historia: HistoriaListItem;
  listIndex: number;
  isFeatured: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const src = storyCardImageUrl(historia.heroPhoto);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
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
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`stories-card-wrap ${isFeatured ? "stories-card-wrap--featured" : ""}`}
      data-category={historia.category}
    >
      <Link href={`/stories/${historia.slug}`} className="stories-card">
        <div className="stories-card__photo">
          {src ? (
            <Image
              src={src}
              alt={`Portrait of ${historia.name}`}
              fill
              className="stories-card__img"
              sizes="(min-width: 768px) 45vw, 100vw"
              priority={listIndex < 3}
            />
          ) : null}
          <span className="stories-card__accent-bar" aria-hidden />
        </div>
        <div className="stories-card__body">
          <span className="stories-card__cat stories-label">{CATEGORY_UI[historia.category]}</span>
          <h2 className="stories-card__name stories-display">{historia.name}</h2>
          <p className="stories-card__tagline">{historia.tagline}</p>
        </div>
      </Link>
    </div>
  );
}
