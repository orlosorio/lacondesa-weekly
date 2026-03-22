import Image from "next/image";
import Link from "next/link";
import type { Restaurant } from "@/types/restaurant";
type Props = {
  restaurant: Restaurant;
};

export function NearbySpotCard({ restaurant }: Props) {
  const cover =
    restaurant.images.find((i) => i.isCover) ?? restaurant.images[0];
  const href = `/spots/${restaurant.neighborhood.slug}/${restaurant.slug}`;
  const cat = restaurant.category[0] ?? "";

  return (
    <Link
      href={href}
      className="group flex gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:bg-muted/50"
    >
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
        {cover ? (
          <Image
            src={cover.url}
            alt={`${restaurant.name} — ${cover.alt}`}
            width={96}
            height={80}
            className="h-full w-full object-cover"
            sizes="96px"
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {cat && (
            <span className="hover:underline">
              {cat}
            </span>
          )}
        </p>
        <p className="font-serif text-base font-semibold text-foreground group-hover:underline underline-offset-2 line-clamp-2">
          {restaurant.name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {restaurant.neighborhood.name}
        </p>
      </div>
    </Link>
  );
}
