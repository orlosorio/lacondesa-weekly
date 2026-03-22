import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTeamMembers, getAuthorContent } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { defaultMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Meet the Team — La Condesa",
  description:
    "The editors and contributors behind La Condesa, your hyperlocal guide to the best of Colonia Condesa in Mexico City.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Meet the Team — La Condesa",
    description:
      "The editors and contributors behind La Condesa, your hyperlocal guide to the best of Colonia Condesa in Mexico City.",
    url: "https://lacondesa.mx/team",
  },
  twitter: {
    ...defaultMetadata.twitter,
    title: "Meet the Team — La Condesa",
    description:
      "The editors and contributors behind La Condesa, your hyperlocal guide to the best of Colonia Condesa in Mexico City.",
  },
  alternates: {
    canonical: "https://lacondesa.mx/team",
  },
};

export const revalidate = 60;

export default async function TeamPage() {
  const members = await getTeamMembers();

  const counts = await Promise.all(
    members.map(async (member) => {
      const content = await getAuthorContent(member._id);
      return {
        id: member._id,
        pieces: content.listicles.length + content.articles.length,
      };
    })
  );

  const piecesById = new Map(counts.map((c) => [c.id, c.pieces]));

  return (
    <main className="min-h-screen bg-[#fafaf9] pt-20 lg:pt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <header className="max-w-2xl mb-16 lg:mb-24">
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground tracking-tight mb-6">
            The people behind La Condesa
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            The editors, writers, and collaborators who keep you in the loop on what
            actually matters in the neighborhood. No fluff, no hype — just what&apos;s
            worth your time.
          </p>
        </header>

        {members.length === 0 ? (
          <p className="text-muted-foreground">
            Editorial team coming soon.
          </p>
        ) : (
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 list-none p-0 m-0"
            aria-label="Editorial team"
          >
            {members.map((member) => {
              const photoUrl =
                member.photo && typeof member.photo === "object"
                  ? urlFor(member.photo).width(600).height(600).quality(85).url()
                  : null;
              const alt =
                member.photo &&
                typeof member.photo === "object" &&
                "alt" in member.photo &&
                typeof (member.photo as { alt?: string }).alt === "string"
                  ? (member.photo as { alt: string }).alt
                  : `${member.name}, ${member.role}`;

              const pieces = piecesById.get(member._id) ?? 0;

              return (
                <li key={member._id} className="flex flex-col">
                  <Link
                    href={member.slug ? `/team/${member.slug}` : "#"}
                    className="group flex flex-col h-full"
                  >
                    <div className="relative h-40 w-40 sm:h-44 sm:w-44 self-start overflow-hidden bg-muted rounded-full shrink-0">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={alt}
                          width={600}
                          height={600}
                          className="h-full w-full object-cover object-center rounded-full grayscale group-hover:grayscale-0 transition-[filter] duration-500"
                          sizes="176px"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 font-serif text-4xl"
                          aria-hidden
                        >
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="mt-6">
                      <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground tracking-tight group-hover:underline underline-offset-4 decoration-[1px]">
                        {member.name}
                      </h2>
                      <p className="mt-1 text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
                        {member.role}
                      </p>
                      {member.tagline && (
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {member.tagline}
                        </p>
                      )}
                      {member.expertise && member.expertise.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {member.expertise.slice(0, 3).map((area) => (
                            <span
                              key={area}
                              className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="mt-4 text-xs text-muted-foreground">
                        {pieces > 0 ? `${pieces} piece${pieces === 1 ? "" : "s"} published` : "New contributor"}
                      </p>
                      {member.slug && (
                        <span className="mt-3 inline-block text-xs font-medium tracking-[0.12em] uppercase text-primary group-hover:underline underline-offset-2">
                          View profile →
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}

