import Image from "next/image";
import Link from "next/link";
import { getListicles } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import type { Metadata } from "next";

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

export default async function ListasPage() {
  const listicles = await getListicles();

  return (
    <main className="pt-20 lg:pt-24 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <header className="mb-12 lg:mb-16">
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground tracking-tight mb-4">
            Lists
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Curated neighborhood guides: the best bars, cafés, restaurants, and
            more in La Condesa. No filler — just what’s worth it.
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
                    className="group block rounded-lg border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {heroUrl && (
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        <Image
                          src={heroUrl}
                          alt={heroAlt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      {l.category && (
                        <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-2">
                          {l.category}
                        </p>
                      )}
                      <h2 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {l.title}
                      </h2>
                      {l.publishedAt && (
                        <time
                          dateTime={l.publishedAt}
                          className="mt-2 block text-sm text-muted-foreground"
                        >
                          {formatDate(l.publishedAt)}
                        </time>
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
