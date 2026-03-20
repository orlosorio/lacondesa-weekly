import type { Metadata } from "next";

const DEFAULT_OG_IMAGE = "https://lacondesa.mx/images/hero-condesa.png";

export const defaultMetadata: Metadata = {
  openGraph: {
    type: "website",
    siteName: "La Condesa",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lacondesa",
  },
};

