import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Restaurant } from "@/types/restaurant";
import { Badge } from "@/components/ui/badge";
import { getSpotAvailabilityLine, isOpenNow } from "@/lib/restaurant-hours";
import { truncateSpotDescription } from "@/lib/spots-directory-logic";

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
