"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { NewOpeningCard } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";

const AUTOPLAY_MS = 2500;
const SWIPE_THRESHOLD = 50;

interface Props {
  openings: NewOpeningCard[];
}

function OpeningCard({ opening }: { opening: NewOpeningCard }) {
  const hasInternalLink = opening.href.startsWith("/");
  const Wrapper: typeof Link | "a" = hasInternalLink ? Link : "a";
  const imageSrc =
    opening.image && typeof opening.image === "object"
      ? urlFor(opening.image).width(600).height(380).quality(80).url()
      : "/images/hero-condesa.png";

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageSrc}
          alt={opening.title}
          fill
          sizes="(max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs font-medium">
            {opening.category || "New Opening"}
          </Badge>
          {opening.neighborhood && (
            <span className="text-xs text-muted-foreground">
              {opening.neighborhood}
            </span>
          )}
          {opening.openedAtLabel && (
            <span className="text-xs text-muted-foreground">
              Opened {opening.openedAtLabel}
            </span>
          )}
        </div>
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {opening.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {opening.description}
        </p>
        {opening.href !== "#" && (
          <Wrapper
            href={opening.href as never}
            className="mt-3 inline-flex text-sm font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline"
            target={hasInternalLink ? undefined : "_blank"}
            rel={hasInternalLink ? undefined : "noopener noreferrer"}
          >
            Learn more
          </Wrapper>
        )}
      </div>
    </div>
  );
}

export function NewOpeningsCarousel({ openings }: Props) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % openings.length);
  }, [openings.length]);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + openings.length) % openings.length);
  }, [openings.length]);

  useEffect(() => {
    if (openings.length <= 1) return;
    const id = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [openings.length, goNext]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current == null || openings.length <= 1) return;
      const endX = e.changedTouches[0].clientX;
      const delta = touchStartX.current - endX;
      touchStartX.current = null;
      if (delta > SWIPE_THRESHOLD) goNext();
      else if (delta < -SWIPE_THRESHOLD) goPrev();
    },
    [openings.length, goNext, goPrev]
  );

  if (!openings.length) return null;

  const visibleCount = Math.min(2, openings.length);
  const visibleOpenings =
    visibleCount === 2
      ? [openings[index], openings[(index + 1) % openings.length]]
      : [openings[0]];

  return (
    <section className="py-12 lg:py-16 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase mb-2">
              New openings
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">
              Fresh spots around La Condesa
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {openings.map((o, i) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${o.title}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-primary" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-4 sm:gap-6 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "pan-y" }}
        >
          {visibleOpenings.map((opening) => (
            <OpeningCard key={opening.id} opening={opening} />
          ))}
        </div>
      </div>
    </section>
  );
}

