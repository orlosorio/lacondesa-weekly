import type { Metadata } from "next";
import { getAllRestaurants } from "@/lib/restaurants-service";
import { defaultMetadata } from "@/lib/metadata";
import { SpotsDirectoryClient } from "@/components/spots/spots-directory-client";

export const revalidate = 120;

const canonical = "https://lacondesa.mx/spots";
const title = "Explore Spots in Mexico City | La Condesa";
const description =
  "Discover the best restaurants, cafés, juice bars, and local spots in Condesa, Roma, and Hipódromo — curated for English speakers living in Mexico City.";

export const metadata: Metadata = {
  ...defaultMetadata,
  title,
  description,
  openGraph: {
    ...defaultMetadata.openGraph,
    title,
    description,
    url: canonical,
  },
  alternates: { canonical },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Explore Spots — La Condesa",
  description:
    "Curated local directory of restaurants, cafés, and spots in Condesa, Roma, and Hipódromo, Mexico City.",
  url: canonical,
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SpotsPage({ searchParams }: PageProps) {
  const spots = await getAllRestaurants();
  const params = await searchParams;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SpotsDirectoryClient
        spots={spots}
        searchParams={params}
        showDirectoryHero
      />
    </>
  );
}
