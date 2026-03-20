import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { Twitter, Instagram, Linkedin, Globe } from "lucide-react";
import { getTeamMemberBySlug, getTeamMembers, getAuthorContent } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { portableTextComponents } from "@/components/portable-text";
import { defaultMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

function buildDescription(member: Awaited<ReturnType<typeof getTeamMemberBySlug>>): string | undefined {
  if (!member) return undefined;
  if (member.tagline?.trim()) return member.tagline.trim();
  if (Array.isArray(member.fullBio) && member.fullBio.length > 0) {
    const firstBlock = member.fullBio[0] as { children?: { text?: string }[] };
    const text = firstBlock?.children?.map((c) => c.text || "").join(" ").trim() || "";
    if (text) return text.length > 160 ? `${text.slice(0, 157)}...` : text;
  }
  return member.bio ?? undefined;
}

export async function generateStaticParams() {
  const members = await getTeamMembers();
  return members
    .filter((m) => m.slug)
    .map((m) => ({ slug: m.slug as string }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) return defaultMetadata;

  const description = buildDescription(member);
  const photoUrl =
    member.photo && typeof member.photo === "object"
      ? urlFor(member.photo).width(800).height(800).quality(85).url()
      : undefined;
  const title = `${member.name}, ${member.role} — La Condesa`;
  const ogTitle = `${member.name} — La Condesa Editorial Team`;
  const canonical = `https://lacondesa.mx/team/${slug}`;

  return {
    ...defaultMetadata,
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      type: "profile",
      title: ogTitle,
      description,
      url: canonical,
      ...(photoUrl && { images: [{ url: photoUrl, width: 800, height: 800 }] }),
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: ogTitle,
      description,
      ...(photoUrl && { images: [photoUrl] }),
    },
    alternates: {
      canonical,
    },
  };
}

function ExpertiseChips({ items }: { items?: string[] | null }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] bg-muted text-muted-foreground rounded-full"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) {
    return null;
  }

  const [content] = await Promise.all([getAuthorContent(member._id)]);
  const allPieces = [...content.listicles, ...content.articles];
  const piecesCount = allPieces.length;

  const photoUrl =
    member.photo && typeof member.photo === "object"
      ? urlFor(member.photo).width(900).height(900).quality(85).url()
      : null;
  const photoAlt =
    member.photo &&
    typeof member.photo === "object" &&
    "alt" in member.photo &&
    typeof (member.photo as { alt?: string }).alt === "string"
      ? (member.photo as { alt: string }).alt
      : `${member.name}, ${member.role}`;

  const currentYear = new Date().getFullYear();
  const yearsCovering =
    typeof member.yearsActive === "number" && member.yearsActive > 1900 && member.yearsActive <= currentYear
      ? currentYear - member.yearsActive + 1
      : null;

  const profileUrl = `https://lacondesa.mx/team/${slug}`;
  const description = buildDescription(member) ?? "";
  const sameAs = [
    member.twitterUrl,
    member.instagramUrl,
    member.linkedinUrl,
    member.personalWebsite,
  ].filter(Boolean) as string[];

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    description,
    url: profileUrl,
    image: photoUrl,
    worksFor: {
      "@type": "Organization",
      name: "La Condesa",
      url: "https://lacondesa.mx",
    },
    ...(sameAs.length ? { sameAs } : {}),
  };

  const featured = (member.featuredWork && member.featuredWork.length > 0
    ? member.featuredWork
    : allPieces
  ).slice(0, 6);

  return (
    <main className="min-h-screen bg-background pt-20 lg:pt-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end gap-8 md:gap-10 mb-12 lg:mb-16">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-xl overflow-hidden bg-muted">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={photoAlt}
                width={560}
                height={560}
                className="h-full w-full object-cover object-center"
                sizes="(max-width: 768px) 50vw, 280px"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl font-serif text-muted-foreground/60">
                {member.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground mb-2">
              La Condesa Editorial Team
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
              {member.name}
            </h1>
            <p className="mt-2 text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground">
              {member.role}
            </p>
            {member.tagline && (
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                {member.tagline}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              {yearsCovering && (
                <span>
                  Covering La Condesa for <strong>{yearsCovering}</strong>{" "}
                  {yearsCovering === 1 ? "year" : "years"}
                </span>
              )}
              {piecesCount > 0 && (
                <span>
                  <strong>{piecesCount}</strong> pieces published
                </span>
              )}
            </div>

            <ExpertiseChips items={member.expertise ?? undefined} />

            {(member.twitterUrl ||
              member.instagramUrl ||
              member.linkedinUrl ||
              member.personalWebsite) && (
              <div className="mt-5 flex flex-wrap items-center gap-3 text-muted-foreground">
                {member.twitterUrl && (
                  <Link
                    href={member.twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
                    aria-label="Twitter profile"
                  >
                    <Twitter className="h-4 w-4" />
                  </Link>
                )}
                {member.instagramUrl && (
                  <Link
                    href={member.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
                    aria-label="Instagram profile"
                  >
                    <Instagram className="h-4 w-4" />
                  </Link>
                )}
                {member.linkedinUrl && (
                  <Link
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                )}
                {member.personalWebsite && (
                  <Link
                    href={member.personalWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
                    aria-label="Personal website"
                  >
                    <Globe className="h-4 w-4" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Full bio */}
        {(member.fullBio && member.fullBio.length > 0) || member.bio ? (
          <section className="mb-12 lg:mb-16">
            <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
              About {member.name}
            </h2>
            {member.fullBio && member.fullBio.length > 0 ? (
              <div className="prose-condesa max-w-none text-muted-foreground">
                <PortableText
                  value={member.fullBio as Parameters<typeof PortableText>[0]["value"]}
                  components={portableTextComponents}
                />
              </div>
            ) : (
              <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
            )}
          </section>
        ) : null}

        {/* Credentials */}
        {member.credentials && member.credentials.length > 0 && (
          <section className="mb-12 lg:mb-16">
            <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
              Credentials &amp; background
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {member.credentials.map((c, idx) =>
                c?.credential ? (
                  <li key={`${c.credential}-${idx}`} className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{c.credential}</span>
                  </li>
                ) : null
              )}
            </ul>
          </section>
        )}

        {/* Author statement */}
        {member.authorStatement && (
          <section className="mb-12 lg:mb-16">
            <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
              About their perspective
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {member.authorStatement}
            </p>
          </section>
        )}

        {/* Featured work */}
        {featured.length > 0 && (
          <section className="mb-12 lg:mb-16">
            <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
              Featured coverage
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featured.map((item) => {
                const href =
                  item._type === "listicle"
                    ? `/lists/${item.slug}`
                    : `/blog/${item.slug}`;
                const image =
                  item.heroImage ?? item.image ??
                  (item as { heroImageUrl?: unknown }).heroImageUrl;
                const cardImage =
                  image && typeof image === "object"
                    ? urlFor(image).width(600).height(400).quality(80).url()
                    : null;

                return (
                  <Link
                    key={item._id}
                    href={href}
                    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-lg transition-shadow"
                  >
                    {cardImage && (
                      <div className="relative aspect-[4/3] bg-muted">
                        <Image
                          src={cardImage}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-1">
                        {item.category || (item._type === "listicle" ? "List" : "Story")}
                      </p>
                      <h3 className="font-serif text-lg font-semibold text-foreground group-hover:underline underline-offset-4 decoration-[1px]">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Full archive */}
        {allPieces.length > 0 && (
          <section className="border-t border-border pt-8 lg:pt-10">
            <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
              Full archive
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {allPieces.map((item) => {
                const href =
                  item._type === "listicle"
                    ? `/lists/${item.slug}`
                    : `/blog/${item.slug}`;
                return (
                  <li key={item._id}>
                    <Link
                      href={href}
                      className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 hover:text-foreground"
                    >
                      <span className="font-medium text-foreground">{item.title}</span>
                      <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {item.category || (item._type === "listicle" ? "List" : "Story")}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}

