import Link from "next/link";
import { Facebook, Instagram, MapPin } from "lucide-react";
import type { Restaurant } from "@/types/restaurant";
import { formatWebsiteDisplay } from "@/lib/restaurant-format";
import { OpeningHoursTable } from "@/components/restaurant/opening-hours-table";
import { cn } from "@/lib/utils";

type Props = {
  restaurant: Restaurant;
};

function GoogleMapsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

/** Sticky card: address, hours, contact, claim — inspired by listing side panels. */
export function RestaurantStickySidebar({ restaurant }: Props) {
  const { address, contact } = restaurant;
  const full = `${address.street}, ${address.colonia}, ${address.city} ${address.postalCode}`;
  const mapsHref =
    contact.googleMaps ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(full)}`;

  return (
    <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm ring-1 ring-foreground/5">
      <div className="space-y-5">
        <div>
          <h2 className="font-serif text-lg font-semibold text-foreground">
            Location & contact
          </h2>
          <address className="not-italic mt-2 text-sm text-muted-foreground leading-relaxed">
            {full}
          </address>
          <Link
            href={`/spots/${restaurant.neighborhood.slug}`}
            className="mt-1 inline-block text-sm font-medium text-primary hover:underline underline-offset-2"
          >
            {restaurant.neighborhood.name}
          </Link>
          <Link
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
          >
            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            Directions
          </Link>
        </div>

        <section id="hours" className="scroll-mt-32 border-t border-border pt-5">
          <OpeningHoursTable hours={restaurant.hours} />
        </section>

        <div className="border-t border-border pt-5 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Online
          </h3>
          {contact.phone && (
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="text-sm font-medium text-primary hover:underline underline-offset-2"
              >
                {contact.phone}
              </a>
            </div>
          )}
          {contact.website && (
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Website</p>
              <a
                href={contact.website}
                target="_blank"
                rel="noopener"
                className="text-sm text-primary hover:underline underline-offset-2 break-all"
              >
                {formatWebsiteDisplay(contact.website)}
              </a>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {contact.instagram && (
              <Link
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            )}
            {contact.facebook && (
              <Link
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Link>
            )}
            {contact.tiktok && (
              <Link
                href={contact.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-4 w-4" />
              </Link>
            )}
            <Link
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Google Maps"
            >
              <GoogleMapsIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="border-t border-border pt-5 space-y-2">
          {contact.uberEats && (
            <Link
              href={contact.uberEats}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Order on Uber Eats
            </Link>
          )}
          <Link
            href="/contacto"
            className={cn(
              "flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              contact.uberEats
                ? "border border-border bg-card text-foreground hover:bg-muted"
                : "bg-accent text-accent-foreground hover:bg-accent/90"
            )}
          >
            Claim listing
          </Link>
          <p className="text-center text-[11px] text-muted-foreground leading-snug">
            Own this place? Update details, photos, and links.
          </p>
        </div>
      </div>
    </div>
  );
}
