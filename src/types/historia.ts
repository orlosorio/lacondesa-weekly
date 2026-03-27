export type HistoriaCategory = "resident" | "business" | "artist" | "project";

/** Sanity image object — passed to `urlFor` */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SanityImageRef = any;

export interface HistoriaListItem {
  _id: string;
  name: string;
  slug: string;
  category: HistoriaCategory;
  tagline: string;
  featured: boolean;
  heroPhoto: SanityImageRef;
  publishedAt?: string;
}

export interface HistoriaQAPair {
  _key?: string;
  question: string;
  answer: string;
}

export interface HistoriaDetail extends HistoriaListItem {
  _createdAt?: string;
  summary: string;
  metadata?: {
    neighborhood?: string;
    profession?: string;
    yearsInCondesa?: number;
  };
  pullQuote: string;
  interview?: HistoriaQAPair[];
  secondaryPhotos?: SanityImageRef[];
}

export interface HistoriaNextTeaser {
  name: string;
  slug: string;
  tagline: string;
  heroPhoto: SanityImageRef;
  publishedAt?: string;
}
