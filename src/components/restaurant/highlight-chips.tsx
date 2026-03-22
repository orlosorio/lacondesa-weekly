import type { Restaurant } from "@/types/restaurant";

type Props = {
  restaurant: Restaurant;
};

export function HighlightChips({ restaurant }: Props) {
  if (restaurant.features.length === 0) return null;
  return (
    <div className="mt-8">
      <h3 className="sr-only">Highlights</h3>
      <ul
        role="list"
        className="flex flex-wrap gap-2"
      >
        {restaurant.features.map((f) => (
          <li
            key={f}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"
          >
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
