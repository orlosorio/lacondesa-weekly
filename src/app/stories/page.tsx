import type { Metadata } from "next";
import { StoriesCollectionClient } from "@/components/stories/stories-collection-client";
import { client } from "@/sanity/client";
import { allHistoriasQuery } from "@/sanity/queries";
import type { HistoriaListItem } from "@/types/historia";

const title = "Stories from La Condesa | La Condesa Weekly";
const description =
  "Intimate portraits of the people who live, work, and create in La Condesa — from the neighborhood, for the neighborhood.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://lacondesa.mx/stories",
  },
};

export const revalidate = 3600;

export default async function StoriesPage() {
  const historias = await client.fetch<HistoriaListItem[]>(allHistoriasQuery);
  return <StoriesCollectionClient historias={historias ?? []} />;
}
