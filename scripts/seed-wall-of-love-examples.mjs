/**
 * Creates approved Wall of Love example documents in Sanity (current month).
 * Re-runnable: uses fixed _ids and createOrReplace.
 *
 *   node --env-file=.env.local scripts/seed-wall-of-love-examples.mjs
 *
 * Requires: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
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

function monthYm() {
  return new Date().toISOString().slice(0, 7);
}

const EXAMPLES = (month) => [
  {
    _id: "wol-seed-contramar",
    name: "Contramar",
    slugCurrent: `contramar-wol-${month}`,
    submittedBy: "Mariana",
    description:
      "Iconic seafood — the tuna tostadas and pescado a la talla are worth every minute of the wait.",
    cuisine: "seafood",
    upvotes: 24,
    downvotes: 2,
  },
  {
    _id: "wol-seed-rosetta",
    name: "Rosetta",
    slugCurrent: `rosetta-wol-${month}`,
    submittedBy: "Diego",
    description:
      "Elena Reygadas magic in a townhouse — pastas and breads that feel like a quiet celebration.",
    cuisine: "italian",
    upvotes: 19,
    downvotes: 1,
  },
  {
    _id: "wol-seed-lardo",
    name: "Lardo",
    slugCurrent: `lardo-wol-${month}`,
    submittedBy: "Ana",
    description:
      "Morning pastries and mortadella sandwiches — the best kind of chaos before noon on Michoacán.",
    cuisine: "cafe",
    upvotes: 16,
    downvotes: 3,
  },
  {
    _id: "wol-seed-maximo",
    name: "Máximo Bistrot",
    slugCurrent: `maximo-bistrot-wol-${month}`,
    submittedBy: "Orlando",
    description:
      "Bistro energy with Mexican ingredients — special-occasion dinner that still feels neighborhood.",
    cuisine: "other",
    upvotes: 14,
    downvotes: 2,
  },
  {
    _id: "wol-seed-mog",
    name: "Mog Bistro",
    slugCurrent: `mog-bistro-wol-${month}`,
    submittedBy: "Yuki",
    description:
      "Cozy Japanese comfort on Álvaro Obregón — curries, teishoku sets, and a calm room.",
    cuisine: "japanese",
    upvotes: 11,
    downvotes: 4,
  },
  {
    _id: "wol-seed-nin",
    name: "Café Nin",
    slugCurrent: `cafe-nin-wol-${month}`,
    submittedBy: "Bethany",
    description:
      "Bright corner for coffee and a croissant — the kind of place you run into half the neighborhood.",
    cuisine: "cafe",
    upvotes: 9,
    downvotes: 1,
  },
];

async function main() {
  const env = loadEnv();
  const token = process.env.SANITY_API_WRITE_TOKEN || env.SANITY_API_WRITE_TOKEN;
  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET || env.NEXT_PUBLIC_SANITY_DATASET || "production";

  if (!token) {
    console.error(
      "Missing SANITY_API_WRITE_TOKEN. Add it to .env.local or pass it in the environment.\n" +
        "Sanity → Manage → project → API → Tokens (Editor)."
    );
    process.exit(1);
  }
  if (!projectId) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
    process.exit(1);
  }

  const month = monthYm();
  const submittedAt = new Date().toISOString();
  const mutations = EXAMPLES(month).map((ex) => ({
    createOrReplace: {
      _id: ex._id,
      _type: "wallOfLoveRestaurant",
      name: ex.name,
      slug: { _type: "slug", current: ex.slugCurrent },
      submittedBy: ex.submittedBy,
      description: ex.description,
      cuisine: ex.cuisine,
      upvotes: ex.upvotes,
      downvotes: ex.downvotes,
      approved: true,
      month,
      submittedAt,
    },
  }));

  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Sanity API error:", res.status, text);
    process.exit(1);
  }

  console.log(`Wall of Love: upserted ${mutations.length} approved examples for ${month}.`);
  console.log("Open Studio → Wall of Love — Restaurants to edit or add photos.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
