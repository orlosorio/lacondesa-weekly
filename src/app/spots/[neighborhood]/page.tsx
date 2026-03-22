import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getAllRestaurants,
  getRestaurantsByNeighborhood,
} from "@/lib/restaurants-service";
import { defaultMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ neighborhood: string }>;
};

export async function generateStaticParams() {
  const all = await getAllRestaurants();
  const slugs = new Set(all.map((r) => r.neighborhood.slug));
  return [...slugs].map((neighborhood) => ({ neighborhood }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { neighborhood } = await params;
  const list = await getRestaurantsByNeighborhood(neighborhood);
  if (list.length === 0) return defaultMetadata;
  const name = list[0]!.neighborhood.name;
  const title = `Places in ${name}, Mexico City | La Condesa Weekly`;
  const description = `Directory of restaurants and cafés in ${name}, Mexico City. Hours, menus, and addresses.`;
  const canonical = `https://lacondesa.mx/spots/${neighborhood}`;
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

export default async function NeighborhoodSpotsPage({ params }: PageProps) {
  const { neighborhood } = await params;
  const list = await getRestaurantsByNeighborhood(neighborhood);
  if (list.length === 0) notFound();

  const title = list[0]!.neighborhood.name;

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
          {title}
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Restaurants and spots in this area. Each listing includes hours, contact info, and a link to the official site.
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
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {r.category.join(" · ")}
                    </p>
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
