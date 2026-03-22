import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteSettings } from "@/sanity/fetch";
import {
  getAllRestaurants,
  getNearbyRestaurants,
  getRestaurantBySlugs,
} from "@/lib/restaurants-service";
import { buildProfileMetaDescription, buildRestaurantPageJsonLd } from "@/lib/restaurant-jsonld";
import { defaultMetadata } from "@/lib/metadata";
import { RestaurantPhotoGrid } from "@/components/restaurant/restaurant-photo-grid";
import { RestaurantPageHeader } from "@/components/restaurant/restaurant-page-header";
import { QuickNavBar } from "@/components/restaurant/quick-nav-bar";
import { RestaurantStickySidebar } from "@/components/restaurant/restaurant-sticky-sidebar";
import { HighlightChips } from "@/components/restaurant/highlight-chips";
import { MenuSection } from "@/components/restaurant/menu-section";
import { PhotoGallery } from "@/components/restaurant/photo-gallery";
import { MapEmbed } from "@/components/restaurant/map-embed";
import { ReviewList } from "@/components/restaurant/review-list";
import { OwnerClaimBanner } from "@/components/restaurant/owner-claim-banner";

export const revalidate = 120;
/** Allow new Sanity slugs without redeploying when combined with ISR. */
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ neighborhood: string; restaurantSlug: string }>;
};

export async function generateStaticParams() {
  const restaurants = await getAllRestaurants();
  return restaurants.map((r) => ({
    neighborhood: r.neighborhood.slug,
    restaurantSlug: r.slug,
  }));
}

function directoryName(siteTitle: string | undefined): string {
  const t = siteTitle?.trim();
  if (t) return t.split("|")[0]?.trim() || "La Condesa Weekly";
  return "La Condesa Weekly";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { neighborhood, restaurantSlug } = await params;
  const r = await getRestaurantBySlugs(neighborhood, restaurantSlug);
  if (!r) return defaultMetadata;

  const settings = await getSiteSettings();
  const dir = directoryName(settings?.siteTitle);
  const title =
    r.seo?.title ??
    `${r.name} - ${r.neighborhood.name}, Mexico City | ${dir}`;
  const description =
    r.seo?.description ?? buildProfileMetaDescription(r);
  const cover =
    r.images.find((i) => i.isCover) ?? r.images[0];
  const ogImage =
    cover?.url ?? "https://lacondesa.mx/images/hero-condesa.png";

  const canonical = `https://lacondesa.mx/spots/${r.neighborhood.slug}/${r.slug}`;
  const ogTitle = r.seo?.ogTitle ?? `${r.name} - ${dir}`;
  const ogDescription = r.seo?.ogDescription ?? description;

  return {
    ...defaultMetadata,
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
    alternates: { canonical },
    other: {
      "og:type": "restaurant",
    },
  };
}

export default async function RestaurantProfilePage({ params }: PageProps) {
  const { neighborhood, restaurantSlug } = await params;
  const restaurant = await getRestaurantBySlugs(neighborhood, restaurantSlug);
  if (!restaurant) notFound();

  const nearby = await getNearbyRestaurants(restaurant, 3);
  const cover =
    restaurant.images.find((i) => i.isCover) ?? restaurant.images[0];
  const heroImageUrl = cover?.url ?? "";

  const canonical = `https://lacondesa.mx/spots/${restaurant.neighborhood.slug}/${restaurant.slug}`;
  const jsonLd = buildRestaurantPageJsonLd(restaurant, canonical, heroImageUrl);

  const descriptionParagraphs = restaurant.description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background pt-16 lg:pt-20">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <RestaurantPhotoGrid
        restaurantName={restaurant.name}
        images={restaurant.images}
      />
      <RestaurantPageHeader restaurant={restaurant} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
        <QuickNavBar />

        <div className="mt-6 lg:mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] lg:gap-10 xl:gap-12 lg:items-start">
          <div>
            <article
              id="overview"
              className="scroll-mt-32 rounded-xl border border-border bg-card p-6 sm:p-8 lg:p-10 ring-1 ring-foreground/5"
            >
              {descriptionParagraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-base text-muted-foreground leading-relaxed mb-4 last:mb-0"
                >
                  {para}
                </p>
              ))}
              <HighlightChips restaurant={restaurant} />
            </article>
            <MenuSection restaurant={restaurant} />
          </div>

          <aside className="mt-10 lg:mt-0 lg:sticky lg:top-28 lg:self-start">
            <RestaurantStickySidebar restaurant={restaurant} />
          </aside>
        </div>

        <PhotoGallery
          restaurantName={restaurant.name}
          images={restaurant.images}
        />

        <MapEmbed restaurant={restaurant} nearby={nearby} />

        <ReviewList reviews={restaurant.reviews} />

        <OwnerClaimBanner restaurantName={restaurant.name} />
      </div>
    </div>
  );
}
