/**
 * Seeds the "Best Healthy Breakfast Spots" blog post into Sanity.
 * Run from project root with a write token:
 *   node --env-file=.env.local scripts/seed-breakfast-article.mjs
 * Or: SANITY_API_WRITE_TOKEN=your_token node scripts/seed-breakfast-article.mjs
 */

import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const { buildPortableTextBody } = require("./build-portable-text.js");

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


const BODY = `La Condesa has quietly become one of the best neighborhoods in Mexico City for people who want to start their morning feeling *good*. Not just full, but actually energized. Between the tree-lined streets, the parks, and the dog-friendly patios, there's something about this neighborhood that just makes you want to eat better.

Whether you're a local looking for your new go-to or a visitor trying to eat well without sacrificing flavor, here are the spots that consistently deliver a healthy, delicious breakfast in La Condesa.

## 1. Curiosa

**Address:** Aguascalientes 214 B, Condesa
**Website:** [curiosacafe.mx](https://curiosacafe.mx)
**Vibe:** Fresh, wellness-forward, laid-back

If you're serious about a healthy breakfast in Condesa, Curiosa is where you start. This café and juice bar has become a neighborhood staple for people who want real food that tastes incredible without the post-breakfast crash.

The menu is built around fresh, seasonal ingredients with plenty of vegan and vegetarian options. Their cold-pressed juices and superfood smoothies are some of the best in the neighborhood, but the food is what keeps people coming back. The Lemony Avo-Egg Toast with organic olive oil, avocado mash, and pasture-raised eggs nails that balance of protein and healthy fats. The Blueberry Parfait Yogurt Bowl with house-roasted cashews and honey feels indulgent but fuels your entire morning. And if you're in the mood for something a little sweet, the Honey Maple Apple Mini-Waffles are a much healthier take on the classic waffle.

The outdoor patio is dog-friendly, the staff remembers your order, and the whole space just feels calm and intentional. It's the kind of place where you sit down for 20 minutes and end up staying for an hour.

**What to order:** Lemony Avo-Egg Toast, Blueberry Parfait Yogurt Bowl, any cold-pressed juice

## 2. Ojo de Agua

**Address:** Citlaltepetl 23C, Hipódromo Condesa
**Vibe:** Casual, bright, health-conscious chain done right

Ojo de Agua has been a go-to for healthy eaters in Mexico City for over a decade, and the Condesa location is one of its best. The space is clean and airy with big windows and outdoor seating that catches the morning sun.

Their açaí bowls are a neighborhood favorite, but the menu goes way deeper than that. Dishes like their poached eggs with hoja santa and refried beans bring traditional Mexican flavors into a health-conscious context. They also have a solid juice bar right next door for fresh-pressed combinations with mango, passion fruit, and pineapple.

It's a great option when you want something wholesome but still want variety on the menu.

**What to order:** Açaí bowl, Santos Ahogados, any fresh juice from the bar

## 3. Fruto de Raíz

**Address:** Av. Vicente Suárez 91, Condesa
**Vibe:** Cozy, garden-like, toast-forward

Fruto de Raíz has earned a loyal following for its artisan topped toasts and its philosophy around food. Their approach is refreshingly simple: real food, no judgment about what's "good" or "bad," just quality ingredients prepared with care.

The space itself feels like an extension of someone's garden, with an open-air patio, a plant-filled deck, and a cozy indoor area. The burrata with heirloom tomatoes toast is a standout, and the fig and goat cheese option is worth the trip on its own. Pair it with a kombucha and you've got one of the best light breakfasts in the neighborhood.

Fair warning: the coffee isn't their strongest suit, so you might want to grab your caffeine fix elsewhere.

**What to order:** Burrata and heirloom tomato toast, fig and goat cheese toast, kombucha

## 4. Mora Mora

**Address:** Condesa (also in Roma)
**Vibe:** 100% plant-based café, market, and juice bar

If you're fully plant-based or just want to explore that world for a morning, Mora Mora is the move. It's a vegan café, juice bar, and mini market all in one, and the quality is consistently high.

The menu covers everything from smoothie bowls to heartier plates, and everything is made with whole, plant-based ingredients. It's also a great spot to pick up snacks, supplements, or pantry items for the week. The atmosphere is relaxed and welcoming, perfect for a slow morning.

**What to order:** Smoothie bowl, plant-based chilaquiles, fresh juice

## 5. Chilpa

**Address:** Condesa
**Vibe:** Buzzy, social, build-your-own breakfast

Chilpa is technically more of a brunch spot than a strict "healthy" restaurant, but the build-your-own chilaquiles concept makes it easy to keep things balanced. You pick your base, your salsa, your protein, and your toppings, so you're in full control.

Skip the heavier toppings, load up on avocado and fresh salsa, and you've got a solid, nutrient-dense Mexican breakfast. The outdoor seating is great for people-watching and the energy is always upbeat.

**What to order:** Build-your-own chilaquiles with avocado, panela cheese, and green salsa

## 6. La Pitahaya Vegana

**Address:** Condesa
**Vibe:** Colorful, cozy, women-owned

La Pitahaya Vegana takes Mexican classics like mole, tacos, and nachos and reimagines them using pitaya and other plant-based ingredients. It's inventive, colorful, and genuinely delicious. This is the kind of place that makes you forget you're eating vegan because the flavors are so rich and well-developed.

It's women-owned and has a warm, welcoming atmosphere that makes it perfect for a relaxed breakfast or weekend brunch.

**What to order:** Vegan chilaquiles, pitaya tacos, any of the brunch specials

## 7. Farmacia Internacional

**Address:** Condesa (also in Juárez)
**Vibe:** Art Deco charm, neighborhood classic

Farmacia Internacional isn't exclusively a health spot, but it earns a place on this list for its simple, well-executed breakfast options. The avocado toast uses those incredible Mexican avocados that are in a league of their own, and the lighter plates are fresh and satisfying.

The Condesa location is bright and airy, and it's a lovely spot to settle in with a coffee and ease into your day. If you want something more indulgent they have options for that too, but the healthy choices hold their own.

**What to order:** Avocado toast, light egg dishes, fresh fruit

## Tips for a Healthy Breakfast in La Condesa

**Go early on weekends.** Most of these spots get packed by 10 AM on Saturdays and Sundays. Arriving before 9 gives you a much more relaxed experience.

**Sit outside.** Mexico City mornings are beautiful, and almost every spot on this list has outdoor seating. Take advantage of it.

**Bring your dog.** Condesa is one of the most pet-friendly neighborhoods in the city, and spots like Curiosa and Ojo de Agua are happy to welcome your furry companion.

**Mix it up.** One of the best things about this neighborhood is the variety. Alternate between your favorites and you'll never get bored.

La Condesa's breakfast scene keeps getting better. Whether you're fueling up for a run in Parque México or just starting a slow Sunday, these spots prove that eating healthy in this neighborhood doesn't mean sacrificing flavor, atmosphere, or that feeling of sitting somewhere that just gets it right.`;

async function main() {
  const env = loadEnv();
  const token = process.env.SANITY_API_WRITE_TOKEN || env.SANITY_API_WRITE_TOKEN;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || env.NEXT_PUBLIC_SANITY_DATASET || "production";

  if (!token) {
    console.error(
      "Missing SANITY_API_WRITE_TOKEN. Add it to .env.local or run:\n  SANITY_API_WRITE_TOKEN=your_token node scripts/seed-breakfast-article.mjs"
    );
    console.error("Create a token at: https://www.sanity.io/manage → your project → API → Tokens → Add API token (Editor)");
    process.exit(1);
  }
  if (!projectId) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
    process.exit(1);
  }

  const body = buildPortableTextBody(BODY);
  const doc = {
    _type: "article",
    title: "The Best Healthy Breakfast Spots in La Condesa, Mexico City (2026 Guide)",
    slug: { _type: "slug", current: "best-healthy-breakfast-spots-condesa-2026" },
    excerpt:
      "La Condesa has become one of the best neighborhoods in Mexico City for a healthy, delicious breakfast. Here are the spots that consistently deliver—from juice bars to plant-based cafés to build-your-own chilaquiles.",
    category: "Food & Drink",
    date: "2026-03-15",
    readTime: "12 min read",
    body,
  };

  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      mutations: [{ create: doc }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Sanity API error:", res.status, text);
    process.exit(1);
  }

  const data = await res.json();
  const id = data.results?.[0]?.id;
  console.log("Article created in Sanity.");
  console.log("ID:", id);
  console.log("View in Studio: https://www.sanity.io/manage/personal/project/" + projectId + "?path=content;article");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
