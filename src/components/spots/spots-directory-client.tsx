"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import type { Restaurant } from "@/types/restaurant";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  SPOT_CATEGORY_FILTERS,
  SPOT_NEIGHBORHOODS,
  SPOT_SORT_OPTIONS,
  type SpotSortId,
} from "@/lib/spots-config";
import {
  buildSpotsUrl,
  filterAndSortSpots,
  parseSpotsSearchParams,
  type SpotsFilterState,
} from "@/lib/spots-directory-logic";
import { SpotCard } from "@/components/spots/spot-card";

const PAGE_SIZE = 12;

function normalizeState(
  s: SpotsFilterState,
  fixedNeighborhoodSlug: string | undefined
): SpotsFilterState {
  if (fixedNeighborhoodSlug) {
    return { ...s, neighborhood: fixedNeighborhoodSlug };
  }
  return s;
}

type Props = {
  spots: Restaurant[];
  searchParams: Record<string, string | string[] | undefined>;
  fixedNeighborhoodSlug?: string;
  showDirectoryHero?: boolean;
  neighborhoodIntro?: string;
};

export function SpotsDirectoryClient({
  spots,
  searchParams: initialParams,
  fixedNeighborhoodSlug,
  showDirectoryHero,
  neighborhoodIntro,
}: Props) {
  const router = useRouter();
  const [state, setState] = useState<SpotsFilterState>(() =>
    normalizeState(
      initialStateFromProps(initialParams, fixedNeighborhoodSlug),
      fixedNeighborhoodSlug
    )
  );
  const [visible, setVisible] = useState(PAGE_SIZE);

  const commit = useCallback(
    (next: SpotsFilterState) => {
      const merged = normalizeState(next, fixedNeighborhoodSlug);
      setState(merged);
      setVisible(PAGE_SIZE);
      const url = fixedNeighborhoodSlug
        ? buildSpotsUrl(merged, {
            kind: "neighborhood",
            slug: fixedNeighborhoodSlug,
          })
        : buildSpotsUrl(merged, { kind: "root" });
      router.replace(url, { scroll: false });
    },
    [router, fixedNeighborhoodSlug]
  );

  const filtered = useMemo(
    () => filterAndSortSpots(spots, state),
    [spots, state]
  );

  const visibleList = useMemo(
    () => filtered.slice(0, visible),
    [filtered, visible]
  );

  const clearFilters = useCallback(() => {
    commit({
      neighborhood: fixedNeighborhoodSlug ?? null,
      categorySlugs: [],
      sort: "featured",
    });
  }, [commit, fixedNeighborhoodSlug]);

  const toggleCategory = (slug: string) => {
    const has = state.categorySlugs.includes(slug);
    const categorySlugs = has
      ? state.categorySlugs.filter((s) => s !== slug)
      : [...state.categorySlugs, slug];
    commit({ ...state, categorySlugs });
  };

  return (
    <div className="min-h-screen bg-background pb-20 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showDirectoryHero && (
          <header className="mb-8 max-w-3xl">
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
              Explore Spots
            </h1>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              The best places to eat, drink, and hang in Condesa, Roma &amp;
              Hipódromo — hand-picked for the English-speaking community.
            </p>
            <Badge variant="secondary" className="mt-4 font-normal">
              {spots.length} spots and counting
            </Badge>
          </header>
        )}

        {fixedNeighborhoodSlug && neighborhoodIntro && (
          <header className="mb-8 max-w-3xl">
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
              {SPOT_NEIGHBORHOODS.find((n) => n.slug === fixedNeighborhoodSlug)
                ?.name ?? fixedNeighborhoodSlug}
            </h1>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              {neighborhoodIntro}
            </p>
            <Link
              href="/spots"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline underline-offset-2"
            >
              View all neighborhoods
            </Link>
          </header>
        )}

        <div
          className={cn(
            "sticky z-30 -mx-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8",
            "top-16 lg:top-20"
          )}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end">
            {!fixedNeighborhoodSlug && (
              <label className="flex min-w-[180px] flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Neighborhood
                </span>
                <select
                  className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm"
                  value={state.neighborhood ?? "all"}
                  onChange={(e) => {
                    const v = e.target.value;
                    commit({
                      ...state,
                      neighborhood: v === "all" ? null : v,
                    });
                  }}
                >
                  <option value="all">All</option>
                  {SPOT_NEIGHBORHOODS.map((n) => (
                    <option key={n.slug} value={n.slug}>
                      {n.name}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Category
              </span>
              <div className="mt-1.5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => commit({ ...state, categorySlugs: [] })}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    state.categorySlugs.length === 0
                      ? "border-foreground bg-secondary text-foreground"
                      : "border-border bg-card text-muted-foreground hover:bg-muted"
                  )}
                >
                  All
                </button>
                {SPOT_CATEGORY_FILTERS.map((c) => {
                  const on = state.categorySlugs.includes(c.slug);
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => toggleCategory(c.slug)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                        on
                          ? "border-foreground bg-secondary text-foreground"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="flex min-w-[160px] flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Sort
              </span>
              <select
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm"
                value={state.sort}
                onChange={(e) =>
                  commit({
                    ...state,
                    sort: e.target.value as SpotSortId,
                  })
                }
              >
                {SPOT_SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
            <MapPin
              className="mb-4 h-12 w-12 text-muted-foreground/50"
              aria-hidden
            />
            <p className="font-medium text-foreground">
              No spots found for these filters.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-6"
              onClick={clearFilters}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            <ul
              className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3"
              role="list"
            >
              {visibleList.map((r) => (
                <li key={r.id}>
                  <SpotCard restaurant={r} />
                </li>
              ))}
            </ul>
            {visible < filtered.length && (
              <div className="mt-10 flex justify-center">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    setVisible((v) => Math.min(v + PAGE_SIZE, filtered.length))
                  }
                >
                  Load more
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function initialStateFromProps(
  searchParams: Record<string, string | string[] | undefined>,
  fixedNeighborhoodSlug: string | undefined
): SpotsFilterState {
  const base = parseSpotsSearchParams(searchParams);
  if (fixedNeighborhoodSlug) {
    return { ...base, neighborhood: fixedNeighborhoodSlug };
  }
  return base;
}
