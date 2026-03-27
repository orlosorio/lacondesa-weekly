import type { MetadataRoute } from "next";
import { HISTORIAS } from "@/lib/historias-data";
import { getAllRestaurants } from "@/lib/restaurants-service";
import { SPOT_NEIGHBORHOODS } from "@/lib/spots-config";
import { client } from "@/sanity/client";
import { allHistoriaSlugsQuery } from "@/sanity/queries";

const base = "https://lacondesa.mx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const restaurants = await getAllRestaurants();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/lists`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/listas`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/team`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/equipo`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/contacto`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/subscribe`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/submit`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/nueva-apertura`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/advertise`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/archive`, changeFrequency: "monthly", priority: 0.5 },
    {
      url: `${base}/historias`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/stories`,
      changeFrequency: "weekly",
      priority: 0.86,
    },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
    {
      url: `${base}/spots`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...SPOT_NEIGHBORHOODS.map((n) => ({
      url: `${base}/spots/${n.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  const historiasPages: MetadataRoute.Sitemap = HISTORIAS.map((h) => ({
    url: `${base}/historias/${h.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
    lastModified: new Date(),
  }));

  let cmsStoryPages: MetadataRoute.Sitemap = [];
  try {
    const rows = await client.fetch<{ slug: string }[]>(allHistoriaSlugsQuery);
    cmsStoryPages = (rows ?? []).map((r) => ({
      url: `${base}/stories/${r.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.78,
      lastModified: new Date(),
    }));
  } catch {
    cmsStoryPages = [];
  }

  const profiles: MetadataRoute.Sitemap = restaurants.map((r) => ({
    url: `${base}/spots/${r.neighborhood.slug}/${r.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.75,
    lastModified: r.listingAddedAt
      ? new Date(r.listingAddedAt)
      : new Date(),
  }));

  return [...staticPages, ...historiasPages, ...cmsStoryPages, ...profiles];
}
