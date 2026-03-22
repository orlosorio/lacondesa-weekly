"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Bookmark, Star } from "lucide-react";
import type { Restaurant } from "@/types/restaurant";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getSpotAvailabilityLine, isOpenNow } from "@/lib/restaurant-hours";
import { truncateSpotDescription } from "@/lib/spots-directory-logic";

const SAVED_KEY = "lacondesa-saved-spots";

function useSavedSpot(id: string) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      setSaved(Array.isArray(list) && list.includes(id));
    } catch {
      setSaved(false);
    }
  }, [id]);

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setSaved((prev) => {
        const next = !prev;
        try {
          const raw = localStorage.getItem(SAVED_KEY);
          let list: string[] = raw ? JSON.parse(raw) : [];
          if (!Array.isArray(list)) list = [];
          if (next) {
            if (!list.includes(id)) list.push(id);
          } else {
            list = list.filter((x) => x !== id);
          }
          localStorage.setItem(SAVED_KEY, JSON.stringify(list));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [id]
  );

  return { saved, toggle };
}

type Props = {
  restaurant: Restaurant;
};

export function SpotCard({ restaurant }: Props) {
  const cover =
    restaurant.images.find((i) => i.isCover) ?? restaurant.images[0];
  const href = `/spots/${restaurant.neighborhood.slug}/${restaurant.slug}`;
  const open = isOpenNow(restaurant.hours);
  const availability = getSpotAvailabilityLine(restaurant.hours);
  const desc = truncateSpotDescription(restaurant.description);
  const hasReviews =
    restaurant.rating && restaurant.rating.count > 0;
  const { saved, toggle } = useSavedSpot(restaurant.id);
  const imgAlt = `${restaurant.name} — ${restaurant.neighborhood.name}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card ring-1 ring-foreground/5 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-video w-full bg-muted">
        {cover ? (
          <Image
            src={cover.url}
            alt={imgAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <Image
            src="/images/hero-condesa.png"
            alt={imgAlt}
            fill
            className="object-cover opacity-40"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        <Badge
          variant={open ? "secondary" : "outline"}
          className="pointer-events-none absolute left-2 top-2 bg-card/95 font-normal shadow-sm"
        >
          {open ? "Open" : "Closed"}
        </Badge>
        <button
          type="button"
          onClick={toggle}
          className={cn(
            "absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/95 text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground",
            saved && "text-primary"
          )}
          aria-label={saved ? "Remove from saved" : "Save spot"}
        >
          <Bookmark
            className={cn("h-4 w-4", saved && "fill-current")}
            aria-hidden
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-muted-foreground">
          <span className="line-clamp-1">
            {restaurant.category.slice(0, 2).join(" · ")}
            {restaurant.category.length > 2 ? " · …" : ""}
          </span>
          <span className="text-border"> · </span>
          <span>{restaurant.neighborhood.name}</span>
        </p>
        <h2 className="font-serif text-lg font-semibold text-foreground group-hover:underline group-hover:underline-offset-2">
          {restaurant.name}
        </h2>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
          {hasReviews ? (
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden />
              <span className="font-medium tabular-nums text-foreground">
                {restaurant.rating!.average.toFixed(1)}
              </span>
              <span className="text-xs">
                ({restaurant.rating!.count} reviews)
              </span>
            </span>
          ) : (
            <Badge variant="outline" className="text-[10px] font-normal">
              New
            </Badge>
          )}
          {restaurant.priceRange && (
            <span className="text-xs tabular-nums text-muted-foreground">
              {restaurant.priceRange}
            </span>
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {desc}
        </p>
        <p className="mt-auto pt-3 text-xs text-muted-foreground">
          {availability}
        </p>
      </div>
    </Link>
  );
}
