import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { EmailSignup } from "@/components/email-signup";
import { contentPillars } from "@/lib/data";
import { getArticles, getTestimonials, getNewOpenings } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { getBlogPostImageUrl } from "@/lib/blog-images";
import { ArrowRight, Utensils, Calendar, Gem, MapPin } from "lucide-react";
import { NewOpeningsCarousel } from "@/components/new-openings-carousel";
import { HomeCoverageGrid } from "@/components/home-coverage-grid";

const iconMap: Record<string, React.ReactNode> = {
  utensils: <Utensils className="h-6 w-6 text-primary" />,
  calendar: <Calendar className="h-6 w-6 text-primary" />,
  gem: <Gem className="h-6 w-6 text-primary" />,
  "map-pin": <MapPin className="h-6 w-6 text-primary" />,
};

export default async function HomePage() {
  const { articles, sanityArticles, usingSanity } = await getArticles();
  const { testimonials } = await getTestimonials();
  const { openings: newOpenings } = await getNewOpenings();

  const latestArticle = usingSanity ? sanityArticles![0] : articles[0];
  const latestHasImage = !!(latestArticle as { image?: unknown })?.image;
  const latestFromSanity = Boolean(usingSanity && latestHasImage);
  const latestImageSrc = latestArticle
    ? latestFromSanity
      ? urlFor((latestArticle as { image: unknown }).image).width(800).quality(80).url()
      : getBlogPostImageUrl(latestArticle.slug, 800)
    : "";
  // #region agent log
  fetch("http://127.0.0.1:7483/ingest/e5dcf654-c539-40d8-a49f-f3353a40d0e2", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "cf215d" },
    body: JSON.stringify({
      sessionId: "cf215d",
      location: "page.tsx:home",
      message: "Home latest issue image source",
      data: { usingSanity, latestHasImage, latestFromSanity, imagePrefix: (latestImageSrc || "").slice(0, 60), fromSanityCdn: (latestImageSrc || "").includes("cdn.sanity.io") },
      timestamp: Date.now(),
      hypothesisId: "H3",
    }),
  }).catch(() => {});
  // #endregion

  return (
    <>
      {/* Hero with La Condesa illustration */}
      <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-condesa.png"
            alt="La Condesa neighborhood: tree-lined streets, jacarandas, cafes and parks in Mexico City"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50"
            aria-hidden
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="max-w-xl">
            <p className="text-sm font-medium tracking-wide text-primary uppercase mb-4">
              Mexico City
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight text-balance">
              Your weekly guide to the best of La Condesa
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed">
              New openings, weekend picks, hidden gems, and everything worth
              doing in the neighborhood — delivered to your inbox every Thursday.
            </p>
            <div className="mt-8 max-w-[550px]">
              <EmailSignup
                variant="hero"
                ctaText="Subscribe — It's Free"
                showSocialProof
                socialProofText="Join 2,000+ Condesa insiders"
              />
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              ¿Abriste algo nuevo?{" "}
              <Link href="/nueva-apertura" className="text-primary hover:underline">
                Cuéntanos
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* New Openings carousel */}
      {newOpenings.length > 0 && <NewOpeningsCarousel openings={newOpenings} />}

      <HomeCoverageGrid />

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
              <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                <Image
                  src={latestImageSrc}
                  alt="Latest newsletter issue preview"
                  fill
                  className="object-cover object-center"
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

      {/* Blog grid — up to 6 posts */}
      {(usingSanity ? (sanityArticles ?? []) : articles).length > 0 && (
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">
                From the Blog
              </h2>
              <Link
                href="/blog"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(usingSanity ? sanityArticles ?? [] : articles)
                .slice(0, 6)
                .map((post, idx) => {
                  const slug = post.slug as string;
                  const sanityImage = (post as { image?: unknown }).image;
                  const useSanity = Boolean(usingSanity && sanityImage);
                  const imageSrc = useSanity
                    ? urlFor(sanityImage).width(600).height(340).quality(80).url()
                    : getBlogPostImageUrl(slug, 600);

                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group text-card-foreground flex flex-col rounded-xl border overflow-hidden border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                        <Image
                          src={imageSrc}
                          alt=""
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4 lg:p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs font-medium">
                            {(post as { category?: string }).category || "Blog"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                        </div>
                        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>
                        <span className="mt-3 text-sm font-medium text-primary group-hover:underline">
                          Read more
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      )}

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
          <div className="max-w-[550px] mx-auto">
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
