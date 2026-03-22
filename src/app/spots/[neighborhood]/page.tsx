import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllRestaurants } from "@/lib/restaurants-service";
import { defaultMetadata } from "@/lib/metadata";
import {
  getNeighborhoodBySlug,
  isSpotNeighborhoodSlug,
} from "@/lib/spots-config";
import { SpotsDirectoryClient } from "@/components/spots/spots-directory-client";

export const revalidate = 120;

type PageProps = {
  params: Promise<{ neighborhood: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateStaticParams() {
  return [
    { neighborhood: "condesa" },
    { neighborhood: "hipodromo" },
    { neighborhood: "roma-norte" },
    { neighborhood: "roma-sur" },
    { neighborhood: "juarez" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { neighborhood } = await params;
  if (!isSpotNeighborhoodSlug(neighborhood)) return defaultMetadata;

  const meta = getNeighborhoodBySlug(neighborhood);
  const name = meta?.name ?? neighborhood;
  const title = `Best Spots in ${name}, Mexico City | La Condesa`;
  const description = `Hand-picked restaurants, cafés, and local favorites in ${name}, CDMX — hours, photos, and links.`;
  const canonical = `https://lacondesa.mx/spots/${neighborhood}`;

  return {
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
}

export default async function NeighborhoodSpotsIndexPage({
  params,
  searchParams,
}: PageProps) {
  const { neighborhood } = await params;
  if (!isSpotNeighborhoodSlug(neighborhood)) notFound();

  const spots = await getAllRestaurants();
  const sp = await searchParams;
  const meta = getNeighborhoodBySlug(neighborhood);

  return (
    <SpotsDirectoryClient
      spots={spots}
      searchParams={sp}
      fixedNeighborhoodSlug={neighborhood}
      neighborhoodIntro={meta?.intro}
    />
  );
}
