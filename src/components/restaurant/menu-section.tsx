import type { Restaurant } from "@/types/restaurant";
import { formatPriceMxn } from "@/lib/restaurant-format";

type Props = {
  restaurant: Restaurant;
};

export function MenuSection({ restaurant }: Props) {
  const menu = restaurant.menu;
  if (!menu?.length) return null;

  return (
    <section id="menu" className="scroll-mt-32 mt-12 lg:mt-14">
      <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
        Menu
      </h2>
      <div className="space-y-10">
        {menu.map((cat) => (
          <div key={cat.category}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">
              {cat.category}
            </h3>
            <ul className="divide-y divide-border border border-border rounded-xl bg-card overflow-hidden">
              {cat.items.map((item, itemIdx) => (
                <li
                  key={`${cat.category}-${itemIdx}-${item.name}`}
                  className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 px-4 py-3.5"
                >
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-0.5 shrink-0 sm:min-w-[5rem]">
                    {item.price != null && (
                      <p className="text-sm font-medium tabular-nums text-foreground">
                        {formatPriceMxn(item.price)}
                      </p>
                    )}
                    {item.note && (
                      <span className="text-xs text-muted-foreground">
                        {item.note}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
