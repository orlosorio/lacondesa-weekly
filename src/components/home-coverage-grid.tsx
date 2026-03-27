import {
  Building2,
  Coffee,
  ConciergeBell,
  HeartPulse,
  Martini,
  Palmtree,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CoverageItem = {
  title: string;
  blurb: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Larger tile for visual hierarchy */
  featured?: boolean;
};

const COVERAGE: CoverageItem[] = [
  {
    title: "Restaurants",
    blurb: "New tables, neighborhood classics, and the reservations worth planning around.",
    icon: UtensilsCrossed,
    featured: true,
  },
  {
    title: "Hotels",
    blurb: "Stays, rooftops, and guest-worthy addresses in the barrio.",
    icon: Building2,
  },
  {
    title: "Wellness",
    blurb: "Studios, spas, and rituals that fit a walking city.",
    icon: HeartPulse,
  },
  {
    title: "Services",
    blurb: "Salons, fix-it pros, and everyday help you actually trust.",
    icon: ConciergeBell,
  },
  {
    title: "Coffee & cafés",
    blurb: "Espresso bars, work-friendly corners, and weekend brunch.",
    icon: Coffee,
  },
  {
    title: "Culture & events",
    blurb: "Galleries, openings, and what’s on this week.",
    icon: Sparkles,
  },
  {
    title: "Nightlife & bars",
    blurb: "Mezcalerías, wine, and where the night loosens up.",
    icon: Martini,
  },
  {
    title: "Parks & outdoors",
    blurb: "Parques, dog runs, and green pockets between streets.",
    icon: Palmtree,
  },
  {
    title: "Shopping",
    blurb: "Boutiques, design shops, and local makers.",
    icon: ShoppingBag,
  },
];

export function HomeCoverageGrid() {
  return (
    <section
      className="relative py-16 lg:py-24 bg-gradient-to-b from-secondary/80 via-background to-background border-t border-border/60"
      aria-labelledby="coverage-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(30,102,38,0.06),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 lg:mb-14">
          <p className="text-sm font-medium tracking-wide text-primary uppercase mb-3">
            What we cover
          </p>
          <h2
            id="coverage-heading"
            className="font-serif text-3xl sm:text-4xl font-semibold text-foreground tracking-tight text-balance"
          >
            La Condesa Weekly, across the neighborhood
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Each Thursday we surface the places, people, and rhythms that make this
            corner of Mexico City feel alive — from a morning coffee to a late table.
          </p>
        </div>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 list-none p-0 m-0"
          role="list"
        >
          {COVERAGE.map((item, index) => {
            const Icon = item.icon;
            const isFeatured = item.featured;

            return (
              <li
                key={item.title}
                className={cn(
                  "group relative flex flex-col rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-primary/25 hover:shadow-md",
                  isFeatured
                    ? "lg:col-span-6 lg:row-span-2 lg:min-h-[320px] lg:justify-end lg:p-8"
                    : "lg:col-span-3",
                )}
              >
                <div
                  className={cn(
                    "mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105",
                    isFeatured && "lg:h-14 lg:w-14",
                  )}
                  aria-hidden
                >
                  <Icon className={cn("h-6 w-6", isFeatured && "lg:h-7 lg:w-7")} />
                </div>
                <h3
                  className={cn(
                    "font-serif font-semibold text-foreground tracking-tight",
                    isFeatured ? "text-2xl sm:text-3xl" : "text-xl",
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm leading-relaxed text-muted-foreground",
                    isFeatured && "mt-3 text-base max-w-md",
                  )}
                >
                  {item.blurb}
                </p>
                <span className="sr-only">(Not linked — editorial focus areas)</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
