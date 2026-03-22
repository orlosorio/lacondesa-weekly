import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getAllCategorySlugs,
  getAllRestaurants,
  getRestaurantsByCategorySlug,
} from "@/lib/restaurants-service";
import { slugifyCategory } from "@/lib/restaurant-slug";
import { defaultMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

async function labelForSlug(slug: string): Promise<string> {
  const all = await getAllRestaurants();
  for (const r of all) {
    for (const c of r.category) {
      if (slugifyCategory(c) === slug) return c;
    }
  }
  return slug;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const list = await getRestaurantsByCategorySlug(slug);
  if (list.length === 0) return defaultMetadata;
  const label = await labelForSlug(slug);
  const title = `${label} in Mexico City | La Condesa Weekly`;
  const description = `Places in Mexico City: ${label}. Directory with hours and links.`;
  const canonical = `https://lacondesa.mx/categoria/${slug}`;
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

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const list = await getRestaurantsByCategorySlug(slug);
  if (list.length === 0) notFound();

  const label = await labelForSlug(slug);

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
          {label}
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Listings in our directory for this category.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2" role="list">
          {list.map((r) => {
            const cover = r.images.find((i) => i.isCover) ?? r.images[0];
            const href = `/spots/${r.neighborhood.slug}/${r.slug}`;
            return (
              <li key={r.id}>
                <Link
                  href={href}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card ring-1 ring-foreground/5 transition-shadow hover:shadow-md"
                >
                  {cover && (
                    <div className="relative aspect-[16/9] bg-muted">
                      <Image
                        src={cover.url}
                        alt={`${r.name} — ${cover.alt}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground">{r.neighborhood.name}</p>
                    <h2 className="font-serif text-lg font-semibold text-foreground group-hover:underline underline-offset-2">
                      {r.name}
                    </h2>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
