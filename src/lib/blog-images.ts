/**
 * Curated images for blog posts. Each post gets a deterministic image by slug
 * so every article has a distinct look while keeping hero/footer-style consistency.
 * All from Unsplash (Mexico City, La Condesa, cafes, food, lifestyle).
 */
const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1200&q=80",
  "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=1200&q=80",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
  "https://images.unsplash.com/photo-1552566624-323e8f1d8e62?w=1200&q=80",
];

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h << 5) - h + slug.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/**
 * Returns a stable, distinct image URL for a blog post by slug.
 * Use this for the main featured image and cards so each post looks different.
 */
export function getBlogPostImageUrl(slug: string, width = 1200): string {
  const base = BLOG_IMAGES[hashSlug(slug) % BLOG_IMAGES.length];
  return base.replace(/\?.*$/, `?w=${width}&q=80`);
}
