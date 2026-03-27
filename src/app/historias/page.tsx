import type { Metadata } from "next";
import { HistoriasCollection } from "@/components/historias/historias-collection";
import { HISTORIAS } from "@/lib/historias-data";

const title = "Historias de La Condesa | La Condesa Weekly";
const description =
  "Intimate portraits of the people who live, work, and create in La Condesa — editorial stories from the neighborhood.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://lacondesa.mx/historias",
  },
};

export default function HistoriasPage() {
  return <HistoriasCollection profiles={HISTORIAS} />;
}
