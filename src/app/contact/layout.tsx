import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Contact — La Condesa",
  description:
    "Get in touch with the La Condesa editorial team. We welcome feedback, partnership proposals, editorial pitches, and general inquiries.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Contact — La Condesa",
    description:
      "Get in touch with the La Condesa editorial team. We welcome feedback, partnership proposals, editorial pitches, and general inquiries.",
    url: "https://lacondesa.mx/contact",
  },
  twitter: {
    ...defaultMetadata.twitter,
    title: "Contact — La Condesa",
    description:
      "Get in touch with the La Condesa editorial team. We welcome feedback, partnership proposals, editorial pitches, and general inquiries.",
  },
  alternates: {
    canonical: "https://lacondesa.mx/contact",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

