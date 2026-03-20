import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { getSiteSettings } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import "./globals.css";
import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { ExitIntentPopup } from "@/components/exit-intent-popup";

const DEFAULT_TITLE = "La Condesa Weekly | Your Guide to the Best of La Condesa";
const DEFAULT_TEMPLATE = "%s | La Condesa Weekly";
const DEFAULT_DESCRIPTION =
  "A free weekly newsletter covering the best of La Condesa, Mexico City. New openings, weekend picks, hidden gems, and everything worth doing in the neighborhood.";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const FALLBACK_OG_IMAGE = "https://lacondesa.mx/images/hero-condesa.png";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.siteTitle?.trim() || DEFAULT_TITLE;
  const template = settings?.titleTemplate?.trim() || DEFAULT_TEMPLATE;
  const description = settings?.metaDescription?.trim() || DEFAULT_DESCRIPTION;
  const ogTitle = settings?.ogTitle?.trim() || title;
  const ogDescription = settings?.ogDescription?.trim() || description;
  const twitterCard = (settings?.twitterCard as "summary" | "summary_large_image") || "summary_large_image";

  const ogImageUrl =
    settings?.ogImage && typeof settings.ogImage === "object"
      ? urlFor(settings.ogImage).width(1200).height(630).url()
      : FALLBACK_OG_IMAGE;
  const faviconUrl =
    settings?.favicon && typeof settings.favicon === "object"
      ? urlFor(settings.favicon).width(64).height(64).url()
      : undefined;

  return {
    metadataBase: new URL("https://lacondesa.mx"),
    title: { default: title, template },
    description,
    keywords: [
      "La Condesa",
      "Mexico City",
      "CDMX",
      "newsletter",
      "restaurants",
      "events",
      "local guide",
    ],
    authors: [{ name: title.split("|")[0]?.trim() || "La Condesa Weekly" }],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://lacondesa.mx",
      siteName: title.split("|")[0]?.trim() || "La Condesa Weekly",
      title: ogTitle,
      description: ogDescription,
      ...(ogImageUrl && { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: twitterCard,
      title: ogTitle,
      description: ogDescription,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
    robots: { index: true, follow: true },
    ...(faviconUrl && { icons: { icon: faviconUrl } }),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <ExitIntentPopup />
        <Analytics />
      </body>
    </html>
  );
}
