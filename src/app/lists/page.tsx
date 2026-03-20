import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getListicles } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { defaultMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Best Of La Condesa — Curated Lists",
  description:
    "Curated guides to the best bars, coffee shops, restaurants, barbershops, and more in Colonia Condesa, Mexico City.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Best Of La Condesa — Curated Lists",
    description:
      "Curated guides to the best bars, coffee shops, restaurants, barbershops, and more in Colonia Condesa, Mexico City.",
    url: "https://lacondesa.mx/lists",
  },
  twitter: {
    ...defaultMetadata.twitter,
    title: "Best Of La Condesa — Curated Lists",
    description:
      "Curated guides to the best bars, coffee shops, restaurants, barbershops, and more in Colonia Condesa, Mexico City.",
  },
  alternates: {
    canonical: "https://lacondesa.mx/lists",
  },
};

export const revalidate = 60;

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function ListsPage() {
  const listicles = await getListicles();

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <header className="mb-12 lg:mb-16">
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground tracking-tight mb-4">
            Lists
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Curated neighborhood guides: the best bars, coffee shops, restaurants,
            and more in La Condesa. No filler — just what&apos;s worth it.
          </p>
        </header>

        {listicles.length === 0 ? (
          <p className="text-muted-foreground">
            Lists and guides coming soon.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 list-none p-0 m-0">
            {listicles.map((l) => {
              const heroUrl =
                l.heroImage && typeof l.heroImage === "object"
                  ? urlFor(l.heroImage).width(600).height(400).quality(80).url()
                  : null;
              const heroAlt = l.title;

              return (
                <li key={l._id}>
                  <Link
                    href={`/lists/${l.slug}`}
                    className="group flex flex-col h-full"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                      {heroUrl ? (
                        <Image
                          src={heroUrl}
                          alt={heroAlt}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 font-serif text-4xl">
                          {heroAlt.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <p className="text-xs font-medium tracking-[0.14em] uppercase text-muted-foreground mb-2">
                        {l.category || "Guide"}
                      </p>
                      <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground group-hover:underline underline-offset-4 decoration-[1px]">
                        {l.title}
                      </h2>
                      {l.publishedAt && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          {formatDate(l.publishedAt)}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}

