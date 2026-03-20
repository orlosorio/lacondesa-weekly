import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Submit Your Opening — La Condesa",
  description:
    "Opened a new restaurant, bar, or coffee shop in La Condesa? Tell us about it and we'll consider it for editorial coverage.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Submit Your Opening — La Condesa",
    description:
      "Opened a new restaurant, bar, or coffee shop in La Condesa? Tell us about it and we'll consider it for editorial coverage.",
    url: "https://lacondesa.mx/submit",
  },
  twitter: {
    ...defaultMetadata.twitter,
    title: "Submit Your Opening — La Condesa",
    description:
      "Opened a new restaurant, bar, or coffee shop in La Condesa? Tell us about it and we'll consider it for editorial coverage.",
  },
  alternates: {
    canonical: "https://lacondesa.mx/submit",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SubmitOpeningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

