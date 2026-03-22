import Link from "next/link";
import type { Restaurant } from "@/types/restaurant";
import { NearbySpotCard } from "@/components/restaurant/nearby-spot-card";

type Props = {
  restaurant: Restaurant;
  nearby: Restaurant[];
};

export function MapEmbed({ restaurant, nearby }: Props) {
  const { address } = restaurant;
  const full = `${address.street}, ${address.colonia}, ${address.city} ${address.postalCode}`;
  const q = encodeURIComponent(`${address.coordinates.lat},${address.coordinates.lng}`);
  const embedSrc = `https://www.google.com/maps?q=${q}&z=16&output=embed&hl=en`;

  return (
    <section id="location" className="scroll-mt-32 mt-16 lg:mt-20">
      <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
        Location
      </h2>
      <div className="overflow-hidden rounded-xl border border-border bg-muted ring-1 ring-border">
        <iframe
          title={`Map of ${restaurant.name}`}
          src={embedSrc}
          className="aspect-[16/9] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="mt-6 space-y-2 text-sm text-muted-foreground">
        <p>{full}</p>
        <p>
          <Link
            href={`/spots/${restaurant.neighborhood.slug}`}
            className="font-medium text-foreground hover:text-primary hover:underline underline-offset-2"
          >
            {restaurant.neighborhood.name}
          </Link>
        </p>
      </div>

      {nearby.length > 0 && (
        <div className="mt-10">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
            Nearby in {restaurant.neighborhood.name}
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {nearby.map((r) => (
              <li key={r.id}>
                <NearbySpotCard restaurant={r} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
