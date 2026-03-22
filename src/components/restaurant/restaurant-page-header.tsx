import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Restaurant } from "@/types/restaurant";
import { isOpenNow } from "@/lib/restaurant-hours";
import { slugifyCategory } from "@/lib/restaurant-slug";

type Props = {
  restaurant: Restaurant;
};

/** Title and meta below the photo grid (H1 in document, not on image). */
export function RestaurantPageHeader({ restaurant }: Props) {
  const open = isOpenNow(restaurant.hours);
  const rating = restaurant.rating;

  return (
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 border-b border-border">
      <p className="text-sm text-muted-foreground mb-2 flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {restaurant.category.map((c, i) => (
          <span key={c} className="inline-flex items-center gap-1.5">
            {i > 0 && <span className="text-border">·</span>}
            <Link
              href={`/spots?category=${slugifyCategory(c)}`}
              className="hover:text-foreground hover:underline underline-offset-2"
            >
              {c}
            </Link>
          </span>
        ))}
        <span className="text-border">·</span>
        <Link
          href={`/spots/${restaurant.neighborhood.slug}`}
          className="hover:text-foreground hover:underline underline-offset-2"
        >
          {restaurant.neighborhood.name}
        </Link>
      </p>
      <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold text-foreground tracking-tight">
        {restaurant.name}
      </h1>
      {restaurant.tagline && (
        <p className="mt-2 text-base text-muted-foreground leading-snug max-w-3xl">
          {restaurant.tagline}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <Badge variant="secondary" className="font-normal">
          {open ? "Open now" : "Closed"}
        </Badge>
        {restaurant.priceRange && (
          <Badge variant="outline" className="font-normal tabular-nums">
            {restaurant.priceRange}
          </Badge>
        )}
        {rating && rating.count > 0 && (
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
            <span className="font-medium tabular-nums text-foreground">
              {rating.average.toFixed(1)}
            </span>
            <span>({rating.count} reviews)</span>
          </span>
        )}
      </div>
    </header>
  );
}
