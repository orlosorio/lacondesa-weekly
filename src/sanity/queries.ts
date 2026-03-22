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

export const allNewOpeningsQuery = groq`
  *[_type == "newOpening" && highlighted == true] | order(coalesce(openedAt, _createdAt) desc)[0...10] {
    _id,
    title,
    "slug": slug.current,
    neighborhood,
    shortDescription,
    category,
    openedAt,
    image,
    externalUrl,
    article->{
      _type,
      "slug": slug.current
    }
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
    body,
    author->{
      _id,
      name,
      role,
      "slug": slug.current,
      photo
    }
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

export const teamMembersQuery = groq`
  *[_type == "teamMember" && active == true] | order(order asc, _createdAt asc) {
    _id,
    name,
    role,
    bio,
    photo,
    "slug": slug.current,
    tagline,
    expertise,
    yearsActive,
    twitterUrl,
    instagramUrl,
    linkedinUrl,
    personalWebsite
  }
`;

export const teamMemberBySlugQuery = groq`
  *[_type == "teamMember" && slug.current == $slug][0] {
    _id,
    name,
    role,
    bio,
    photo,
    "slug": slug.current,
    tagline,
    fullBio,
    expertise,
    credentials,
    authorStatement,
    yearsActive,
    twitterUrl,
    instagramUrl,
    linkedinUrl,
    personalWebsite,
    featuredWork[]->{
      _id,
      _type,
      title,
      "slug": slug.current,
      category,
      publishedAt,
      date,
      heroImage,
      image
    }
  }
`;

export const authorContentByAuthorIdQuery = groq`
  {
    "listicles": *[_type == "listicle" && author._ref == $authorId] | order(publishedAt desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      category,
      publishedAt,
      heroImage
    },
    "articles": *[_type == "article" && author._ref == $authorId] | order(date desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      category,
      "publishedAt": date,
      image
    }
  }
`;

export const listicleBySlugQuery = groq`
  *[_type == "listicle" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    author->{
      _id,
      name,
      role,
      "slug": slug.current,
      photo
    },
    heroImage,
    summary,
    seoDescription,
    entries[] {
      _key,
      name,
      tagline,
      photo,
      description,
      pullQuote,
      address,
      hours,
      priceRange,
      externalUrl,
      externalLinkLabel
    }
  }
`;

export const listicleSlugsQuery = groq`
  *[_type == "listicle" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const listiclesQuery = groq`
  *[_type == "listicle" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    seoDescription,
    heroImage
  }
`;

export const allPublishedRestaurantsQuery = groq`
  *[_type == "restaurant" && published == true] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    neighborhoodName,
    "neighborhoodSlug": lower(neighborhoodSlug),
    category,
    description,
    features,
    street,
    colonia,
    city,
    postalCode,
    latitude,
    longitude,
    phone,
    website,
    instagram,
    facebook,
    googleMaps,
    hours[] { day, open, close, closed },
    images[] { image, alt, isCover },
    menu[] {
      category,
      items[] { name, description, price }
    },
    ratingAverage,
    ratingCount,
    reviews[] { author, rating, date, text },
    claimed
  }
`;

export const restaurantBySlugsQuery = groq`
  *[_type == "restaurant" && published == true && slug.current == $restaurantSlug && lower(neighborhoodSlug) == $neighborhoodSlug][0] {
    _id,
    name,
    "slug": slug.current,
    neighborhoodName,
    "neighborhoodSlug": lower(neighborhoodSlug),
    category,
    description,
    features,
    street,
    colonia,
    city,
    postalCode,
    latitude,
    longitude,
    phone,
    website,
    instagram,
    facebook,
    googleMaps,
    hours[] { day, open, close, closed },
    images[] { image, alt, isCover },
    menu[] {
      category,
      items[] { name, description, price }
    },
    ratingAverage,
    ratingCount,
    reviews[] { author, rating, date, text },
    claimed
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
    heroImage,
    siteTitle,
    titleTemplate,
    metaDescription,
    ogTitle,
    ogDescription,
    ogImage,
    favicon,
    twitterCard
  }
`;
