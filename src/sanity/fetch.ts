import { client } from "./client";
import {
  allArticlesQuery,
  articleBySlugQuery,
  articleSlugsQuery,
  allTestimonialsQuery,
  allArchiveIssuesQuery,
  siteSettingsQuery,
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

export interface SanitySettings {
  subscriberCount?: string;
  openRate?: string;
  localReaders?: string;
  clickRate?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  heroImage?: unknown;
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

export async function getSiteSettings(): Promise<SanitySettings | null> {
  if (!isSanityConfigured()) return null;

  try {
    return await client.fetch<SanitySettings | null>(siteSettingsQuery, {}, { next: { revalidate: 120 } });
  } catch {
    return null;
  }
}
