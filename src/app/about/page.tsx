import { EmailSignup } from "@/components/email-signup";
import { contentPillars } from "@/lib/data";
import { Utensils, Calendar, Gem, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "A free weekly newsletter for people who want to make the most of living in (or visiting) one of Mexico City's most vibrant neighborhoods.",
};

const iconMap: Record<string, React.ReactNode> = {
  utensils: <Utensils className="h-6 w-6 text-primary" />,
  calendar: <Calendar className="h-6 w-6 text-primary" />,
  gem: <Gem className="h-6 w-6 text-primary" />,
  "map-pin": <MapPin className="h-6 w-6 text-primary" />,
};

export default function AboutPage() {
  return (
    <>
      <main className="pt-20 lg:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              About La Condesa Weekly
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A free weekly newsletter for people who want to make the most of
              living in (or visiting) one of Mexico City&apos;s most vibrant
              neighborhoods.
            </p>
          </div>

          {/* Story */}
          <div className="prose-condesa max-w-prose">
            <h2>Why We Started This</h2>
            <p>
              La Condesa is one of the most vibrant neighborhoods in Latin
              America. With its tree-lined streets, art deco architecture, and
              seemingly endless array of restaurants, cafes, and bars, it&apos;s
              the kind of place where there&apos;s always something new to
              discover.
            </p>
            <p>
              But keeping up with everything that&apos;s opening, closing, and
              happening? That&apos;s a full-time job. New restaurants pop up
              weekly. Pop-up events come and go before you hear about them. And
              the best places often don&apos;t have much of an online presence at
              all.
            </p>
            <p>
              We started La Condesa Weekly to solve this problem for ourselves -
              and then realized other people might find it useful too.
            </p>
            <p>
              Every Thursday, we send out a carefully curated email with the best
              of what&apos;s happening in the neighborhood. We personally visit
              every spot we recommend, and we only write about places we&apos;d
              actually tell a friend about.
            </p>
            <p>
              No paid placements. No sponsored content. Just honest
              recommendations from people who live here and want to share what
              they love about this neighborhood.
            </p>
          </div>

          {/* What We Cover */}
          <div className="mt-16">
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              What We Cover
            </h2>
            <p className="text-muted-foreground mb-8">
              Every issue covers the neighborhood from multiple angles.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {contentPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {iconMap[pillar.icon]}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* CTA */}
      <section className="border-t border-border bg-secondary py-16 lg:py-24">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-4">
            Join the Community
          </h2>
          <p className="text-muted-foreground mb-8">
            Get the best of La Condesa delivered to your inbox every Thursday.
            It&apos;s free, and you can unsubscribe anytime.
          </p>
          <div className="max-w-[550px] mx-auto">
            <EmailSignup
              variant="hero"
              ctaText="Subscribe - It's Free"
              showSocialProof
              socialProofText="Join 2,000+ Condesa insiders"
            />
          </div>
        </div>
      </section>
    </>
  );
}
