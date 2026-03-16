import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { ExitIntentPopup } from "@/components/exit-intent-popup";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://lacondesa.mx"),
  title: {
    default: "La Condesa Weekly | Your Guide to the Best of La Condesa",
    template: "%s | La Condesa Weekly",
  },
  description:
    "A free weekly newsletter covering the best of La Condesa, Mexico City. New openings, weekend picks, hidden gems, and everything worth doing in the neighborhood.",
  keywords: [
    "La Condesa",
    "Mexico City",
    "CDMX",
    "newsletter",
    "restaurants",
    "events",
    "local guide",
  ],
  authors: [{ name: "La Condesa Weekly" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lacondesa.mx",
    siteName: "La Condesa Weekly",
    title: "La Condesa Weekly | Your Guide to the Best of La Condesa",
    description:
      "A free weekly newsletter covering the best of La Condesa, Mexico City. New openings, weekend picks, hidden gems, and everything worth doing in the neighborhood.",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Condesa Weekly | Your Guide to the Best of La Condesa",
    description:
      "A free weekly newsletter covering the best of La Condesa, Mexico City.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
      </body>
    </html>
  );
}
