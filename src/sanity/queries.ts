import { groq } from "next-sanity";

export const allArticlesQuery = groq`
  *[_type == "article"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    date,
    readTime,
    image,
    "hasBody": defined(body)
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    date,
    readTime,
    image,
    body
  }
`;

export const articleSlugsQuery = groq`
  *[_type == "article" && defined(body) && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    initials,
    quote,
    detail
  }
`;

export const allArchiveIssuesQuery = groq`
  *[_type == "archiveIssue"] | order(number desc) {
    _id,
    number,
    title,
    date,
    "slug": slug.current
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    subscriberCount,
    openRate,
    localReaders,
    clickRate,
    instagramUrl,
    tiktokUrl,
    heroImage
  }
`;
