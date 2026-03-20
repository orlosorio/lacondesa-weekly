/**
 * Seeds sample "New Openings" for the homepage carousel.
 * Run: node --env-file=.env.local scripts/seed-new-openings.mjs
 */

import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  const path = join(root, ".env.local");
  if (!existsSync(path)) return {};
  const content = readFileSync(path, "utf8");
  const env = {};
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*["']?([^"'\n]*)["']?\s*$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

const SAMPLE_OPENINGS = [
  {
    title: "Café Merci",
    slug: "cafe-merci-condesa",
    neighborhood: "La Condesa",
    openedAt: "2026-03-01",
    shortDescription:
      "A tiny French-inspired café on Amsterdam with exceptional croissants and single-origin pour-over. The terrace is perfect for weekend mornings.",
    category: "Cafe",
    externalUrl: "https://instagram.com",
    highlighted: true,
  },
  {
    title: "Terraza Verde",
    slug: "terraza-verde-roma",
    neighborhood: "Roma Norte",
    openedAt: "2026-02-15",
    shortDescription:
      "Rooftop bar and kitchen with a focus on local mezcal and small plates. Opens at 5pm; get there early for sunset views.",
    category: "Bar",
    externalUrl: "https://google.com",
    highlighted: true,
  },
  {
    title: "Panadería La Migaja",
    slug: "panaderia-la-migaja",
    neighborhood: "La Condesa",
    openedAt: "2026-02-01",
    shortDescription:
      "Sourdough, conchas, and seasonal pastries from a former Contramar baker. Lines form by 8am on weekends.",
    category: "Bakery",
    highlighted: true,
  },
  {
    title: "Casa Tamaulipas",
    slug: "casa-tamaulipas",
    neighborhood: "La Condesa",
    openedAt: "2026-01-20",
    shortDescription:
      "Natural wine and shared plates in a restored townhouse. The menu changes weekly based on what’s at the market.",
    category: "Restaurant",
    externalUrl: "https://lacondesa.mx",
    highlighted: true,
  },
  {
    title: "Bazar Oaxaca",
    slug: "bazar-oaxaca-condesa",
    neighborhood: "La Condesa",
    openedAt: "2026-01-10",
    shortDescription:
      "Small shop selling Oaxacan textiles, ceramics, and mole pastes. A great stop for gifts and pantry staples.",
    category: "Shop",
    highlighted: true,
  },
];

async function main() {
  const env = loadEnv();
  const token = process.env.SANITY_API_WRITE_TOKEN || env.SANITY_API_WRITE_TOKEN;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || env.NEXT_PUBLIC_SANITY_DATASET || "production";

  if (!token) {
    console.error("Missing SANITY_API_WRITE_TOKEN. Add it to .env.local or set the env var.");
    process.exit(1);
  }
  if (!projectId) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
    process.exit(1);
  }

  const docs = SAMPLE_OPENINGS.map((o) => ({
    _type: "newOpening",
    title: o.title,
    slug: { _type: "slug", current: o.slug },
    neighborhood: o.neighborhood,
    openedAt: o.openedAt,
    shortDescription: o.shortDescription,
    category: o.category,
    externalUrl: o.externalUrl || undefined,
    highlighted: o.highlighted !== false,
  }));

  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      mutations: docs.map((doc) => ({ create: doc })),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Sanity API error:", res.status, text);
    process.exit(1);
  }

  const data = await res.json();
  if (data.results && data.results.some((r) => r.error)) {
    console.error("Sanity mutation errors:", JSON.stringify(data.results, null, 2));
    process.exit(1);
  }
  const count = (data.results || []).length;
  console.log("Created", count, "New Openings in Sanity.");
  SAMPLE_OPENINGS.slice(0, count).forEach((o, i) => console.log(" ", i + 1, o.title));
  console.log("\nView in Studio: Content → New Openings");
  console.log("Homepage carousel will show these (refresh lacondesa.mx).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
