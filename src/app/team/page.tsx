import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTeamMembers } from "@/sanity/fetch";
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

  return (
    <main className="min-h-screen pt-20 lg:pt-24">
      <div className="max-w-5xl mx-auto px-6 py-14 lg:py-20">
        <header className="max-w-2xl mb-16">
          <p className="he-label mb-4">Our team</p>
          <h1 className="mb-6">The people behind La Condesa.</h1>
          <p className="text-muted-foreground leading-relaxed">
            Writers, neighbors, and curious people with different perspectives on the same city.
            Meet the team behind our stories, interviews, and neighborhood guides.
          </p>
        </header>

        {members.length === 0 ? (
          <p className="text-muted-foreground">Meet our editorial team soon. <Link href="/contact" className="underline underline-offset-4">Get in touch ↗</Link></p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-16 list-none p-0 m-0" aria-label="Editorial team">
            {members.map((member) => {
              const photoUrl = member.photo && typeof member.photo === "object"
                ? urlFor(member.photo).width(600).height(600).quality(85).url()
                : null;
              const profileHref = member.slug ? `/team/${member.slug}` : undefined;
              return (
                <li key={member._id}>
                  <div className="relative aspect-square w-full max-w-60 overflow-hidden bg-muted mb-6">
                    {photoUrl ? (
                      <Image src={photoUrl} alt={member.name} fill className="object-cover" sizes="(max-width: 480px) 70vw, 240px" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-muted-foreground" aria-hidden="true">{member.name.charAt(0)}</span>
                    )}
                  </div>
                  <p className="he-label mb-2">{member.role}</p>
                  <h2 className="text-3xl">
                    {profileHref ? <Link href={profileHref} className="hover:text-primary">{member.name}</Link> : member.name}
                  </h2>
                  {(member.bio || member.tagline) && <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-md">{member.bio || member.tagline}</p>}
                  {profileHref && <Link href={profileHref} className="he-text-link mt-3">Meet {member.name.split(" ")[0]} ↗</Link>}
                </li>
              );
            })}
          </ul>
        )}

        <section className="mt-20 max-w-xl" aria-labelledby="team-contact-heading">
          <h2 id="team-contact-heading" className="text-3xl">A story to share?</h2>
          <p className="mt-4 text-muted-foreground">We’re always curious about the people and places that make this neighborhood their own.</p>
          <Link href="/contact" className="he-text-link">Send us a note ↗</Link>
        </section>
      </div>
    </main>
  );
}
