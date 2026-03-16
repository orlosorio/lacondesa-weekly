import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { EmailSignup } from "@/components/email-signup";
import { contentPillars } from "@/lib/data";
import { getArticles, getTestimonials } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { ArrowRight, Utensils, Calendar, Gem, MapPin } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  utensils: <Utensils className="h-6 w-6 text-primary" />,
  calendar: <Calendar className="h-6 w-6 text-primary" />,
  gem: <Gem className="h-6 w-6 text-primary" />,
  "map-pin": <MapPin className="h-6 w-6 text-primary" />,
};

export default async function HomePage() {
  const { articles, sanityArticles, usingSanity } = await getArticles();
  const { testimonials } = await getTestimonials();

  const latestArticle = usingSanity ? sanityArticles![0] : articles[0];
  const latestImageSrc = usingSanity && latestArticle
    ? urlFor((latestArticle as { image: unknown }).image).width(800).quality(80).url()
    : (latestArticle as { image: string }).image;

  return (
    <>
      {/* Hero with background image */}
      <section className="relative min-h-screen flex items-center pt-20 lg:pt-0">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1600&q=80"
            alt="Tree-lined street in La Condesa, Mexico City"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight text-balance">
              Your weekly guide to the best of La Condesa
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
              New openings, weekend picks, hidden gems, and everything worth
              doing in the neighborhood - delivered to your inbox every Thursday.
            </p>
            <div className="mt-8 max-w-md">
              <EmailSignup
                variant="hero"
                ctaText="Subscribe - It's Free"
                showSocialProof
                socialProofText="Join 2,000+ Condesa insiders"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Issue */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">
              Latest Issue
            </h2>
            <Link
              href="/archive"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              View all issues
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm overflow-hidden border-border hover:shadow-lg transition-shadow duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={latestImageSrc}
                  alt="Latest newsletter issue preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-transparent">
                    Issue #47
                  </Badge>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {latestArticle.date}
                  </span>
                </div>
                <h3 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-3">
                  {latestArticle.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {latestArticle.excerpt}
                </p>
                <Link
                  href={`/blog/${latestArticle.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors group"
                >
                  Read this issue
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              What You Get Every Thursday
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              One email. Everything you need to make the most of your week in La
              Condesa.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-border bg-card hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-6">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              What Readers Are Saying
            </h2>
            <p className="text-muted-foreground">
              Join thousands of neighbors who trust us for their weekly Condesa
              intel.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-border bg-card hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-6">
                  <blockquote className="text-foreground leading-relaxed mb-6">
                    &quot;{t.quote}&quot;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {t.initials}
                    </span>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-primary-foreground mb-4">
            Never miss a weekend in La Condesa
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Get the best of the neighborhood delivered to your inbox every
            Thursday. Free forever.
          </p>
          <div className="max-w-md mx-auto">
            <EmailSignup
              variant="hero"
              ctaText="Subscribe Now"
              className="[&_input]:bg-white [&_input]:border-white/20"
            />
          </div>
        </div>
      </section>
    </>
  );
}
