/**
 * Seeds the "Best Healthy Places to Eat in Mexico City" blog post into Sanity.
 * Run from project root with a write token:
 *   node --env-file=.env.local scripts/seed-healthy-places-article.mjs
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

const BODY = `Mexico City is one of the greatest food cities in the world. That's not even debatable at this point. But for a long time, "healthy eating" and "CDMX" didn't really belong in the same sentence. The city was built on tacos, tortas, and late-night quesadillas from street stands where the concept of a calorie count would get you laughed off the block.

That's changed. Dramatically.

Over the past few years, Mexico City has developed one of the most exciting healthy dining scenes in Latin America. From fully plant-based taquerías to wellness-focused cafés with cold-pressed juice programs, from fine dining restaurants centering seasonal vegetables to neighborhood spots that prove healthy food doesn't have to be boring or expensive, the city now offers something for every kind of health-conscious eater.

And the secret weapon? Mexico's produce. The avocados, tropical fruits, heirloom corn, nopales, and seasonal vegetables available here are among the best in the world. When your raw ingredients are this good, you don't need to do much to make them taste incredible.

Here are the best healthy places to eat across Mexico City right now.

## 1. Curiosa

**Neighborhood:** La Condesa
**Address:** Aguascalientes 214 B, Condesa
**Website:** [curiosacafe.mx](https://curiosacafe.mx)
**Best for:** Healthy breakfast, smoothies, cold-pressed juice, all-day wellness eating

Curiosa is the kind of place that makes healthy eating feel effortless. This café and juice bar in the heart of La Condesa has become a neighborhood institution for people who want real, nourishing food without sacrificing flavor or atmosphere.

The menu is seasonally inspired and built around fresh, whole ingredients. Cold-pressed juices and superfood smoothies are a core part of the experience, but the food is what makes Curiosa a destination rather than just a juice stop. Their Lemony Avo-Egg Toast with organic olive oil and pasture-raised eggs is a perfect morning starter. The Blueberry Parfait Yogurt Bowl with house-roasted cashews hits the sweet spot between indulgent and nutritious. And the Herb & Egg Mini Omelette with fresh spinach and tomatoes is the kind of simple, clean dish that reminds you how good food can be when the ingredients are right.

Curiosa caters to a range of dietary preferences including vegan and vegetarian, and the portions are generous without being excessive. The outdoor patio is dog-friendly, the vibe is peaceful, and the staff genuinely cares about what they're serving. If you're starting a day in Condesa or just looking for a place that gets healthy eating right at every level, this is where you go.

**Don't miss:** Any cold-pressed juice, the Lemony Avo-Egg Toast, the superfood smoothies

## 2. Ojo de Agua

**Neighborhood:** Multiple locations (Condesa, Polanco, Roma, and more)
**Best for:** Açaí bowls, fresh juice, health-conscious Mexican dishes

Ojo de Agua is probably the most well-known healthy eating chain in Mexico City, and the quality has held up remarkably well as they've expanded to over 20 locations. The concept is simple: fresh, clean food with a focus on fruits, salads, bowls, and smoothies, served in bright, welcoming spaces.

The Condesa and Polanco locations are particularly good. The açaí bowls are a citywide favorite, the juice bar offers both classic combinations and more creative superfood options with ingredients like lion's mane mushrooms and spirulina, and the full menu covers everything from chilaquiles to poached eggs with hoja santa. It's the kind of place where health-conscious locals eat regularly because the food is consistently good and the prices are reasonable.

**Don't miss:** Açaí bowl, any fresh juice combo, the superfood smoothie options

## 3. Forever Vegano

**Neighborhood:** Roma Norte (also in Polanco)
**Best for:** 100% vegan Mexican food, guilt-free comfort eating

Forever Vegano is one of the few fully vegan restaurants in Mexico City where everything on the menu is free of animal products, refined sugar, preservatives, and additives. And somehow, the food still tastes like comfort food.

The Roma Norte location has a relaxed, friendly atmosphere that makes it easy to linger. The vegan tacos are genuinely excellent, the enchiladas hold their own against non-vegan versions, and the breakfast menu offers continental and Mexican options that feel satisfying rather than restrictive. They source many of their ingredients organically and from within Mexico, which keeps the flavors authentic and the quality high.

Whether you're fully plant-based or just curious, Forever Vegano proves that vegan food in CDMX can be both healthy and deeply satisfying.

**Don't miss:** Vegan tacos, enchiladas, breakfast options

## 4. Quintonil

**Neighborhood:** Polanco
**Best for:** Fine dining with a vegetable-forward philosophy

It might seem surprising to see one of the world's top-ranked restaurants on a "healthy eating" list, but Quintonil deserves its spot. Chef Jorge Vallejo's two-Michelin-starred restaurant in Polanco is built around seasonal Mexican ingredients, with vegetables, greens, and local produce playing a starring role.

The restaurant offers a dedicated vegan tasting menu that stands shoulder to shoulder with the omnivorous version. Dishes like cactus ceviche, heirloom corn preparations, and creative vegetable courses showcase what's possible when you treat produce with the same respect and technique usually reserved for proteins.

This is healthy eating at the highest level. Reservations are essential, prices reflect the caliber, but if you want to see what Mexico's best ingredients look like in the hands of a world-class kitchen, Quintonil is the answer.

**Don't miss:** The vegan tasting menu, anything featuring seasonal vegetables or corn

## 5. La Pitahaya Vegana

**Neighborhood:** Roma Norte (corner of Chiapas and Manzanilla)
**Best for:** Colorful vegan Mexican classics, brunch

La Pitahaya Vegana has become one of the most Instagram-friendly restaurants in the city, but the food backs up the aesthetics. Named after the pink dragon fruit (pitahaya), the restaurant reimagines Mexican classics like mole, tacos, flautas, and nachos using plant-based ingredients and vibrant natural colors.

The pink taco shells are the signature, made with pitaya, and they're as delicious as they are photogenic. The raw breakfast bowls with cashew yogurt and amaranth are a great way to start the day, and the vegan desserts are some of the best in the city. It's women-owned, the vibe is warm and welcoming, and the prices are very accessible.

**Don't miss:** Pink pitaya tacos, raw breakfast bowl, vegan desserts

## 6. Mora Mora

**Neighborhood:** Condesa (also in Roma)
**Best for:** Plant-based café, juice bar, and health market all in one

Mora Mora is a triple-threat: a fully vegan café, a juice bar, and a small health market where you can pick up pantry staples, supplements, and snacks. The food focuses on nutrient-dense bowls, fresh juices, and smoothies made with high-quality plant-based ingredients.

It's a favorite among people with active lifestyles who want clean fuel without having to think too hard about it. The space is relaxed, the menu is straightforward, and the market component makes it a convenient one-stop shop for the health-conscious lifestyle beyond just dining.

**Don't miss:** Smoothie bowls, fresh juice, browse the market for take-home items

## 7. Gracias Madre

**Neighborhood:** Roma Norte
**Best for:** Vegan tacos, affordable plant-based Mexican street food

Gracias Madre is proof that vegan Mexican food can be cheap, fast, and incredibly flavorful. The taco menu is extensive, with every classic filling reimagined using soy meat, seitan, beans, and tofu. Every taco can also be turned into a gringa, volcano, or quesadilla.

The portions are generous, the prices are some of the most accessible on this list, and the outdoor seating on a sidewalk in Roma is the perfect setting for a casual, healthy lunch. If you're skeptical about vegan tacos, this is the place that will change your mind.

**Don't miss:** Taco trio (try the pastor), any gringa variation, green juice

## 8. Máximo Bistrot

**Neighborhood:** Roma Norte
**Best for:** Market-driven seasonal cooking, vegetable-forward fine dining

Máximo Bistrot is chef Eduardo García's celebrated neighborhood restaurant that sources directly from local markets and builds its menu around what's fresh and in season. While not exclusively vegetarian, the approach naturally leads to dishes that are lighter, more produce-driven, and thoughtfully balanced.

The menu changes frequently based on availability, but expect creative preparations of seasonal vegetables, fresh seafood, and dishes that let the ingredients speak for themselves. It's the kind of restaurant where "healthy" isn't a marketing angle; it's just what happens when you cook with the best ingredients available.

**Don't miss:** Whatever's seasonal on the day's menu, vegetable-forward dishes

## 9. Yug Vegetariano

**Neighborhood:** Juárez
**Address:** C. Varsovia 3, Juárez
**Best for:** Traditional Mexican vegetarian food, budget-friendly healthy eating

Yug Vegetariano has been serving meatless Mexican classics since 1963, making it one of the oldest vegetarian restaurants in the city. Long before plant-based dining became trendy, Yug was quietly turning out chilaquiles, enchiladas, mole, and soy-based chorizo that kept locals coming back for decades.

The space is modest, the prices are very low, and the food is hearty and comforting. The breakfast options are particularly strong, with fresh tortillas, egg dishes, and soy-based proteins. Fresh juices and smoothies round out the drink menu. It's not the most polished experience on this list, but for authentic, affordable vegetarian Mexican food with history behind it, Yug is hard to beat.

**Don't miss:** Chilaquiles, breakfast specials, fresh juice

## 10. Seven Buddhas

**Neighborhood:** La Condesa
**Best for:** Post-workout fuel, wellness-focused smoothies and bowls

Seven Buddhas is the go-to for Condesa's fitness crowd. The menu is built around the idea of nourishing your body through food (they tie it to chakra-balancing, which you can take or leave), but the smoothies, green juices, topped toasts, and smoothie bowls are genuinely excellent regardless of your feelings about energy alignment.

It's a great spot after a run in Parque México or a yoga class, offering quick, clean options that won't slow you down. The juices are the highlight, but the food quality is consistently high for a café of this type.

**Don't miss:** Green juice, smoothie bowl, topped toast

## Healthy Eating in CDMX: Neighborhood by Neighborhood

**La Condesa** is the epicenter of wellness dining. Curiosa, Ojo de Agua, Mora Mora, and Seven Buddhas are all within walking distance, making it easy to build an entire healthy eating routine in a single neighborhood.

**Roma Norte** is where you'll find the most variety, from vegan taquerías like Gracias Madre to fine dining at Máximo Bistrot. The neighborhood rewards exploration and has more plant-based options per block than anywhere else in the city.

**Polanco** is the spot for upscale healthy eating. Quintonil's vegetable-forward tasting menu is a world-class experience, and Ojo de Agua and Forever Vegano both have strong Polanco locations.

**Juárez** is the sleeper pick. Yug Vegetariano has been there since the 1960s, and newer spots are starting to pop up in the neighborhood, making it an increasingly interesting area for health-conscious diners.

**Coyoacán** is worth the trip for a change of pace, with smaller vegan cafés and bakeries that feel more local and less tourist-oriented.

## Tips for Eating Healthy in Mexico City

**Embrace the produce.** Mexico's fruits, vegetables, and herbs are world-class. The best healthy restaurants here succeed because they let those ingredients shine.

**Don't skip the markets.** Places like Mercado de Medellín and Mercado Roma have fresh juice stands, smoothie bars, and healthy prepared food options that are both affordable and delicious.

**Breakfast is your friend.** The morning meal in Mexico City tends to be lighter and more produce-driven than lunch or dinner. Many of the best healthy options are breakfast spots.

**Ask about seasonal specials.** The best restaurants change their menus based on what's available. Seasonal dishes are almost always the freshest and most flavorful options.

**Use Uber Eats and Rappi strategically.** Many of the spots on this list deliver. On days when you don't feel like going out, having Curiosa or Forever Vegano delivered to your door is a solid move.

Mexico City's healthy dining scene has gone from afterthought to one of the most exciting parts of the city's food culture. The produce is unmatched, the creativity is real, and the variety means you never have to eat the same thing twice. Whether you're starting your morning with a cold-pressed juice at Curiosa in Condesa or ending it with a vegetable tasting menu at Quintonil in Polanco, eating well in this city has never been easier or more delicious.`;

async function main() {
  const env = loadEnv();
  const token = process.env.SANITY_API_WRITE_TOKEN || env.SANITY_API_WRITE_TOKEN;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || env.NEXT_PUBLIC_SANITY_DATASET || "production";

  if (!token) {
    console.error(
      "Missing SANITY_API_WRITE_TOKEN. Add it to .env.local or run:\n  SANITY_API_WRITE_TOKEN=your_token node scripts/seed-healthy-places-article.mjs"
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
    title: "The Best Healthy Places to Eat in Mexico City (2026 Guide)",
    slug: { _type: "slug", current: "best-healthy-places-to-eat-mexico-city-2026" },
    excerpt:
      "Mexico City's healthy dining scene has exploded. From plant-based taquerías to vegetable-forward fine dining, here are the best healthy places to eat in CDMX right now.",
    category: "Food & Drink",
    date: "2026-03-16",
    readTime: "18 min read",
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
  console.log("Slug: best-healthy-places-to-eat-mexico-city-2026");
  console.log("View in Studio: https://www.sanity.io/manage/personal/project/" + projectId + "?path=content;article");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
