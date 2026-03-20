import Image from "next/image";
import { getTeamMembers } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Team",
  description:
    "The people behind La Condesa. Who writes and curates what happens in the neighborhood.",
};

export const revalidate = 60;

export default async function EquipoPage() {
  const members = await getTeamMembers();

  return (
    <main className="min-h-screen bg-[#fafaf9] pt-20 lg:pt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <header className="max-w-2xl mb-16 lg:mb-24">
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground tracking-tight mb-6">
            The people behind La Condesa
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            Who writes and curates what happens in the neighborhood. No fluff, no
            sponsors: just what’s worth your time.
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

              return (
                <li key={member._id} className="flex flex-col">
                  <div className="relative aspect-square w-full overflow-hidden bg-muted">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={alt}
                        width={600}
                        height={600}
                        className="object-cover object-center grayscale hover:grayscale-0 transition-[filter] duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                    <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground tracking-tight">
                      {member.name}
                    </h2>
                    <p className="mt-1 text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
