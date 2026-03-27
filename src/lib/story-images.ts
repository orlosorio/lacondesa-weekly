import { urlFor } from "@/sanity/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safeUrlFor(source: any) {
  if (!source) return null;
  return urlFor(source);
}

/** Collection card portrait */
export function storyCardImageUrl(source: unknown) {
  const b = safeUrlFor(source);
  return b
    ? b.width(600).height(800).fit("crop").auto("format").quality(85).url()
    : "";
}

/** Profile hero (full-bleed) */
export function storyHeroImageUrl(source: unknown) {
  const b = safeUrlFor(source);
  return b
    ? b.width(1400).height(1800).fit("crop").auto("format").quality(85).url()
    : "";
}

/** Open Graph / large hero */
export function storyOgImageUrl(source: unknown) {
  const b = safeUrlFor(source);
  return b
    ? b.width(1200).height(1600).fit("crop").auto("format").quality(85).url()
    : "";
}

/** Secondary strip */
export function storySecondaryImageUrl(source: unknown) {
  const b = safeUrlFor(source);
  return b
    ? b.width(800).height(600).fit("crop").auto("format").quality(85).url()
    : "";
}

/** Next story background */
export function storyNextBgImageUrl(source: unknown) {
  const b = safeUrlFor(source);
  return b ? b.width(1200).fit("crop").auto("format").quality(70).url() : "";
}
