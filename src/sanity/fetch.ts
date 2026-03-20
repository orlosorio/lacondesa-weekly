import { client } from "./client";
import {
  allArticlesQuery,
  articleBySlugQuery,
  articleSlugsQuery,
  allTestimonialsQuery,
  allArchiveIssuesQuery,
  siteSettingsQuery,
  allNewOpeningsQuery,
  teamMembersQuery,
  teamMemberBySlugQuery,
  authorContentByAuthorIdQuery,
  listicleBySlugQuery,
  listicleSlugsQuery,
  listiclesQuery,
} from "./queries";
import {
  articles as fallbackArticles,
  testimonials as fallbackTestimonials,
  archiveIssues as fallbackArchiveIssues,
} from "@/lib/data";
import type { Article, Testimonial, ArchiveIssue } from "@/lib/data";

function isSanityConfigured(): boolean {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  return !!projectId && projectId !== "your-project-id";
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Sanity returns image objects; we need to handle both formats
export interface SanityArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: unknown;
  body?: unknown[];
  hasBody?: boolean;
  author?: {
    _id: string;
    name: string;
    role?: string;
    slug?: string;
    photo?: unknown;
  } | null;
}

export interface SanityTestimonial {
  _id: string;
  name: string;
  initials: string;
  quote: string;
  detail: string;
}

export interface SanityArchiveIssue {
  _id: string;
  number: number;
  title: string;
  date: string;
  slug: string;
}

export interface SanityNewOpening {
  _id: string;
  title: string;
  slug: string;
  neighborhood?: string;
  shortDescription: string;
  category?: string;
  openedAt?: string;
  image?: unknown;
  externalUrl?: string;
  article?: {
    _type: string;
    slug?: string;
  } | null;
}

export interface SanitySettings {
  subscriberCount?: string;
  openRate?: string;
  localReaders?: string;
  clickRate?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  heroImage?: unknown;
  siteTitle?: string;
  titleTemplate?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: unknown;
  favicon?: unknown;
  twitterCard?: string;
}

export interface NewOpeningCard {
  id: string;
  title: string;
  slug: string;
  neighborhood?: string;
  description: string;
  category?: string;
  openedAtLabel?: string;
  image: unknown | null;
  href: string;
}

export async function getArticles(): Promise<{
  articles: Article[];
  sanityArticles: SanityArticle[] | null;
  usingSanity: boolean;
}> {
  if (!isSanityConfigured()) {
    return { articles: fallbackArticles, sanityArticles: null, usingSanity: false };
  }

  try {
    const sanityArticles = await client.fetch<SanityArticle[]>(allArticlesQuery, {}, { next: { revalidate: 60 } });
    if (!sanityArticles || sanityArticles.length === 0) {
      return { articles: fallbackArticles, sanityArticles: null, usingSanity: false };
    }
    // #region agent log
    const first = sanityArticles[0];
    const img = (first as { image?: unknown }).image;
    fetch("http://127.0.0.1:7483/ingest/e5dcf654-c539-40d8-a49f-f3353a40d0e2", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "cf215d" },
      body: JSON.stringify({
        sessionId: "cf215d",
        location: "fetch.ts:getArticles",
        message: "Sanity articles image check",
        data: { count: sanityArticles.length, firstSlug: first?.slug, hasImage: img != null, imageType: img == null ? "null" : typeof img, imageKeys: img && typeof img === "object" && !Array.isArray(img) ? Object.keys(img as object).slice(0, 8) : undefined },
        timestamp: Date.now(),
        hypothesisId: "H1",
      }),
    }).catch(() => {});
    // #endregion
    return { articles: [], sanityArticles, usingSanity: true };
  } catch {
    return { articles: fallbackArticles, sanityArticles: null, usingSanity: false };
  }
}

export async function getArticleBySlug(slug: string): Promise<{
  article: Article | null;
  sanityArticle: SanityArticle | null;
  usingSanity: boolean;
}> {
  if (!isSanityConfigured()) {
    const article = fallbackArticles.find((a) => a.slug === slug) || null;
    return { article, sanityArticle: null, usingSanity: false };
  }

  try {
    const sanityArticle = await client.fetch<SanityArticle | null>(
      articleBySlugQuery,
      { slug },
      { next: { revalidate: 60 } }
    );
    if (!sanityArticle) {
      const article = fallbackArticles.find((a) => a.slug === slug) || null;
      return { article, sanityArticle: null, usingSanity: false };
    }
    return { article: null, sanityArticle, usingSanity: true };
  } catch {
    const article = fallbackArticles.find((a) => a.slug === slug) || null;
    return { article, sanityArticle: null, usingSanity: false };
  }
}

export async function getArticleSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) {
    return fallbackArticles.filter((a) => a.body).map((a) => a.slug);
  }

  try {
    const slugs = await client.fetch<{ slug: string }[]>(articleSlugsQuery, {}, { next: { revalidate: 60 } });
    if (!slugs || slugs.length === 0) {
      return fallbackArticles.filter((a) => a.body).map((a) => a.slug);
    }
    return slugs.map((s) => s.slug);
  } catch {
    return fallbackArticles.filter((a) => a.body).map((a) => a.slug);
  }
}

export async function getTestimonials(): Promise<{
  testimonials: Testimonial[];
  usingSanity: boolean;
}> {
  if (!isSanityConfigured()) {
    return { testimonials: fallbackTestimonials, usingSanity: false };
  }

  try {
    const data = await client.fetch<SanityTestimonial[]>(allTestimonialsQuery, {}, { next: { revalidate: 120 } });
    if (!data || data.length === 0) {
      return { testimonials: fallbackTestimonials, usingSanity: false };
    }
    return {
      testimonials: data.map((t) => ({
        name: t.name,
        initials: t.initials,
        quote: t.quote,
        detail: t.detail,
      })),
      usingSanity: true,
    };
  } catch {
    return { testimonials: fallbackTestimonials, usingSanity: false };
  }
}

export async function getArchiveIssues(): Promise<{
  issues: ArchiveIssue[];
  usingSanity: boolean;
}> {
  if (!isSanityConfigured()) {
    return { issues: fallbackArchiveIssues, usingSanity: false };
  }

  try {
    const data = await client.fetch<SanityArchiveIssue[]>(allArchiveIssuesQuery, {}, { next: { revalidate: 60 } });
    if (!data || data.length === 0) {
      return { issues: fallbackArchiveIssues, usingSanity: false };
    }
    return {
      issues: data.map((issue) => ({
        number: issue.number,
        title: issue.title,
        date: formatDate(issue.date),
        slug: issue.slug,
      })),
      usingSanity: true,
    };
  } catch {
    return { issues: fallbackArchiveIssues, usingSanity: false };
  }
}

export async function getNewOpenings(): Promise<{
  openings: NewOpeningCard[];
  usingSanity: boolean;
}> {
  if (!isSanityConfigured()) {
    return { openings: [], usingSanity: false };
  }

  try {
    const data = await client.fetch<SanityNewOpening[]>(allNewOpeningsQuery, {}, { next: { revalidate: 60 } });
    if (!data || data.length === 0) {
      return { openings: [], usingSanity: false };
    }

    const openings: NewOpeningCard[] = data.map((o) => {
      const date = o.openedAt || "";
      const openedAtLabel = date
        ? new Date(date + "T00:00:00").toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : undefined;

      let href = "#";
      if (o.article?.slug) {
        href = `/blog/${o.article.slug}`;
      } else if (o.externalUrl) {
        href = o.externalUrl;
      }

      return {
        id: o._id,
        title: o.title,
        slug: o.slug,
        neighborhood: o.neighborhood,
        description: o.shortDescription,
        category: o.category,
        openedAtLabel,
        image: o.image || null,
        href,
      };
    });

    return { openings, usingSanity: true };
  } catch {
    return { openings: [], usingSanity: false };
  }
}

export interface SanityTeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string | null;
  photo: unknown;
  slug?: string;
  tagline?: string | null;
  fullBio?: unknown[] | null;
  expertise?: string[] | null;
  credentials?: { credential?: string | null }[] | null;
  authorStatement?: string | null;
  yearsActive?: number | null;
  twitterUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  personalWebsite?: string | null;
  featuredWork?: SanityAuthorWorkItem[] | null;
  piecesCount?: number;
}

export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  if (!isSanityConfigured()) {
    const { placeholderTeamMembers } = await import("@/lib/placeholders");
    return placeholderTeamMembers;
  }
  try {
    const members = await client.fetch<SanityTeamMember[]>(teamMembersQuery, {}, { next: { revalidate: 60 } });
    const list = Array.isArray(members) ? members : [];
    if (list.length === 0) {
      const { placeholderTeamMembers } = await import("@/lib/placeholders");
      return placeholderTeamMembers;
    }
    return list;
  } catch {
    const { placeholderTeamMembers } = await import("@/lib/placeholders");
    return placeholderTeamMembers;
  }
}

export interface SanityAuthorWorkItem {
  _id: string;
  _type: "listicle" | "article";
  title: string;
  slug: string;
  category?: string | null;
  publishedAt?: string | null;
  heroImage?: unknown;
  image?: unknown;
}

export interface SanityAuthorContent {
  listicles: SanityAuthorWorkItem[];
  articles: SanityAuthorWorkItem[];
}

export async function getTeamMemberBySlug(
  slug: string
): Promise<SanityTeamMember | null> {
  if (!isSanityConfigured()) {
    const { placeholderTeamMembers } = await import("@/lib/placeholders");
    return placeholderTeamMembers.find((m) => m.slug === slug) ?? null;
  }
  try {
    const member = await client.fetch<SanityTeamMember | null>(
      teamMemberBySlugQuery,
      { slug },
      { next: { revalidate: 60 } }
    );
    return member;
  } catch {
    const { placeholderTeamMembers } = await import("@/lib/placeholders");
    return placeholderTeamMembers.find((m) => m.slug === slug) ?? null;
  }
}

export async function getAuthorContent(
  authorId: string
): Promise<SanityAuthorContent> {
  if (!isSanityConfigured()) {
    const { getPlaceholderAuthorContent } = await import("@/lib/placeholders");
    return getPlaceholderAuthorContent(authorId);
  }
  try {
    const data = await client.fetch<{
      listicles: SanityAuthorWorkItem[];
      articles: SanityAuthorWorkItem[];
    }>(authorContentByAuthorIdQuery, { authorId }, { next: { revalidate: 60 } });
    return {
      listicles: Array.isArray(data.listicles) ? data.listicles : [],
      articles: Array.isArray(data.articles) ? data.articles : [],
    };
  } catch {
    return { listicles: [], articles: [] };
  }
}

export interface SanityListicleEntry {
  _key: string;
  name: string;
  tagline?: string | null;
  photo?: unknown;
  description?: unknown[] | null;
  pullQuote?: string | null;
  address?: string | null;
  hours?: string | null;
  priceRange?: string | null;
  externalUrl?: string | null;
  externalLinkLabel?: string | null;
}

export interface SanityListicle {
  _id: string;
  title: string;
  slug: string;
  category?: string | null;
  publishedAt?: string | null;
  author?: { _id: string; name: string; role: string; slug?: string | null; photo?: unknown } | null;
  heroImage?: unknown;
  summary?: unknown[] | null;
  seoDescription?: string | null;
  entries?: SanityListicleEntry[] | null;
}

export interface SanityListicleCard {
  _id: string;
  title: string;
  slug: string;
  category?: string | null;
  publishedAt?: string | null;
  seoDescription?: string | null;
  heroImage?: unknown;
}

export async function getListicleBySlug(slug: string): Promise<SanityListicle | null> {
  if (!isSanityConfigured()) {
    const { getPlaceholderListicleBySlug } = await import("@/lib/placeholders");
    return getPlaceholderListicleBySlug(slug);
  }
  try {
    const doc = await client.fetch<SanityListicle | null>(listicleBySlugQuery, { slug }, { next: { revalidate: 60 } });
    if (doc) return doc;
    const { getPlaceholderListicleBySlug } = await import("@/lib/placeholders");
    return getPlaceholderListicleBySlug(slug);
  } catch {
    const { getPlaceholderListicleBySlug } = await import("@/lib/placeholders");
    return getPlaceholderListicleBySlug(slug);
  }
}

export async function getListicleSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) {
    const { placeholderListicleSlugs } = await import("@/lib/placeholders");
    return placeholderListicleSlugs;
  }
  try {
    const slugs = await client.fetch<{ slug: string }[]>(listicleSlugsQuery, {}, { next: { revalidate: 60 } });
    const list = Array.isArray(slugs) ? slugs.map((s) => s.slug) : [];
    if (list.length === 0) {
      const { placeholderListicleSlugs } = await import("@/lib/placeholders");
      return placeholderListicleSlugs;
    }
    return list;
  } catch {
    const { placeholderListicleSlugs } = await import("@/lib/placeholders");
    return placeholderListicleSlugs;
  }
}

export async function getListicles(): Promise<SanityListicleCard[]> {
  if (!isSanityConfigured()) {
    const { placeholderListicles } = await import("@/lib/placeholders");
    return placeholderListicles;
  }
  try {
    const list = await client.fetch<SanityListicleCard[]>(listiclesQuery, {}, { next: { revalidate: 60 } });
    const result = Array.isArray(list) ? list : [];
    if (result.length === 0) {
      const { placeholderListicles } = await import("@/lib/placeholders");
      return placeholderListicles;
    }
    return result;
  } catch {
    const { placeholderListicles } = await import("@/lib/placeholders");
    return placeholderListicles;
  }
}

export async function getSiteSettings(): Promise<SanitySettings | null> {
  if (!isSanityConfigured()) return null;

  try {
    return await client.fetch<SanitySettings | null>(siteSettingsQuery, {}, { next: { revalidate: 120 } });
  } catch {
    return null;
  }
}
