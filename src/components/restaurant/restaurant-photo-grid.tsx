import Image from "next/image";
import Link from "next/link";
import { Images } from "lucide-react";
import type { RestaurantImage } from "@/types/restaurant";
import { cn } from "@/lib/utils";

const GRID_SLOTS = 5;

type Props = {
  restaurantName: string;
  images: RestaurantImage[];
};

/** Airbnb-style grid: one large tile + four smaller; compact max height for weak photography. */
export function RestaurantPhotoGrid({ restaurantName, images }: Props) {
  const ordered = [...images].sort((a, b) => {
    if (a.isCover) return -1;
    if (b.isCover) return 1;
    return 0;
  });
  const cells: (RestaurantImage | null)[] = [];
  for (let i = 0; i < GRID_SLOTS; i++) {
    cells.push(ordered[i] ?? null);
  }

  const [main, ...rest] = cells;
  const small = rest;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      <div
        className={cn(
          "grid gap-2 overflow-hidden rounded-xl bg-muted ring-1 ring-border",
          "grid-cols-2 grid-rows-[minmax(0,1fr)_minmax(0,1fr)]",
          "h-[220px] sm:h-[260px] md:grid-cols-4 md:grid-rows-2 md:h-[min(320px,38vh)] lg:h-[min(360px,36vh)]"
        )}
      >
        <div className="relative col-span-2 row-span-2 min-h-0">
          {main ? (
            <Image
              src={main.url}
              alt={`${restaurantName} — ${main.alt}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
              No photo
            </div>
          )}
        </div>

        {small.map((img, i) => {
          const isLast = i === small.length - 1;
          return (
            <div key={img?.url ?? `empty-${i}`} className="relative min-h-0 hidden md:block">
              {img ? (
                <Image
                  src={img.url}
                  alt={`${restaurantName} — ${img.alt}`}
                  fill
                  loading="lazy"
                  sizes="25vw"
                  className="object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-muted/80 text-[10px] text-muted-foreground"
                  aria-hidden
                >
                  —
                </div>
              )}
              {isLast && (
                <Link
                  href="#photos"
                  className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-muted"
                >
                  <Images className="h-3.5 w-3.5" aria-hidden />
                  View all
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: single row of thumbs isn’t shown on md+; on small screens show link under grid */}
      <div className="mt-3 flex justify-end md:hidden">
        <Link
          href="#photos"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
        >
          <Images className="h-3.5 w-3.5" aria-hidden />
          View all photos
        </Link>
      </div>
    </div>
  );
}
