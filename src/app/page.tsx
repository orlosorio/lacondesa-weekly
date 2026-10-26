import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { EmailSignup } from "@/components/email-signup";
import { getArticles, getNewOpenings } from "@/sanity/fetch";
import { client } from "@/sanity/client";
import { allHistoriasQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { getBlogPostImageUrl } from "@/lib/blog-images";
import { getAllRestaurants } from "@/lib/restaurants-service";
import { SPOT_NEIGHBORHOODS } from "@/lib/spots-config";
import { storyCardImageUrl } from "@/lib/story-images";
import type { HistoriaListItem } from "@/types/historia";
import "./home-editorial.css";

function articleImage(post: { slug: string; image?: unknown }, usingSanity: boolean, width = 1000) {
  return usingSanity && post.image
    ? urlFor(post.image).width(width).quality(85).auto("format").url()
    : getBlogPostImageUrl(post.slug, width);
}

async function getHomePeople(): Promise<HistoriaListItem[]> {
  try {
    const people = await client.fetch<HistoriaListItem[]>(allHistoriasQuery, {}, { next: { revalidate: 120 } });
    return (people ?? []).filter((person) => person.slug && person.heroPhoto).slice(0, 3);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [articleData, restaurants, people, { openings }] = await Promise.all([
    getArticles(), getAllRestaurants(), getHomePeople(), getNewOpenings(),
  ]);
  const { articles, sanityArticles, usingSanity } = articleData;
  const posts = usingSanity ? sanityArticles ?? [] : articles;
  const [lead, ...remainingPosts] = posts;
  const sideStories = remainingPosts.slice(0, 2);
  const journal = remainingPosts.slice(2, 5);
  const places = [...restaurants].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 3);
  const uniqueOpenings = openings.filter((opening, index, items) =>
    items.findIndex((item) => item.title.trim().toLowerCase() === opening.title.trim().toLowerCase()
      && item.neighborhood === opening.neighborhood) === index
  );

  return (
    <div className="home-editorial" id="home-top">
      <div className="he-wrap">
        <section className="he-masthead" aria-label="La Condesa Weekly">
          <div className="he-edition"><span>Mexico City · A neighborhood journal</span><span>People, places & everyday life</span></div>
          <p className="he-wordmark" aria-hidden="true">La Condesa<span>.</span></p>
          <div className="he-intro"><h1>A little closer to the neighborhood.</h1><p>Good places. Interesting people. And plenty of reasons to take the long way home.</p></div>
        </section>

        {lead && (
          <section className="he-lead-grid" aria-label="Featured stories">
            <article className="he-lead-story">
              <Link href={`/blog/${lead.slug}`} className="he-story-link">
                <div className="he-image he-lead-image"><Image src={articleImage(lead, usingSanity, 1400)} alt={lead.title} fill priority sizes="(max-width: 850px) 100vw, 65vw" /></div>
                <div className="he-meta"><span>{lead.category || "From the journal"}</span>{lead.readTime && <span>{lead.readTime}</span>}</div>
                <h2>{lead.title}</h2><p className="he-excerpt">{lead.excerpt}</p>
                <span className="he-text-link">Read the story <ArrowUpRight size={17} aria-hidden="true" /></span>
              </Link>
            </article>
            <aside className="he-side-stories" aria-labelledby="he-reading-heading">
              <div className="he-section-kicker"><h2 id="he-reading-heading">A little reading</h2><span>01 / Journal</span></div>
              {sideStories.map((post) => (
                <article key={post.slug} className="he-side-story"><Link href={`/blog/${post.slug}`} className="he-story-link">
                  <div className="he-image he-side-image"><Image src={articleImage(post, usingSanity, 600)} alt={post.title} fill sizes="(max-width: 850px) 100vw, 30vw" /></div>
                  <div className="he-meta"><span>{post.category || "Journal"}</span></div><h3>{post.title}</h3>
                </Link></article>
              ))}
              <Link href="/blog" className="he-text-link he-all-stories">All stories <ArrowRight size={16} aria-hidden="true" /></Link>
            </aside>
          </section>
        )}

        <section className="he-neighborhoods" aria-labelledby="he-neighborhood-heading">
          <div><span className="he-label">Start with a walk</span><h2 id="he-neighborhood-heading">Find your corner.</h2></div>
          <nav aria-label="Explore places by neighborhood">{SPOT_NEIGHBORHOODS.map((hood) => <Link key={hood.slug} href={`/spots/${hood.slug}`}>{hood.name}<ArrowUpRight size={15} aria-hidden="true" /></Link>)}</nav>
        </section>

        {places.length > 0 && (
          <section className="he-section" id="places" aria-labelledby="he-places-heading">
            <div className="he-section-heading"><div><span className="he-label">02 / The local address book</span><h2 id="he-places-heading">Somewhere to stay a while.</h2></div><Link href="/spots" className="he-text-link">Explore all places <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
            <div className="he-places-grid">{places.map((place, index) => {
              const cover = place.images.find((image) => image.isCover) ?? place.images[0];
              return <article key={place.id}><Link href={`/spots/${place.neighborhood.slug}/${place.slug}`} className="he-story-link">
                {cover && <div className="he-image he-place-image"><Image src={cover.url} alt={cover.alt || place.name} fill sizes="(max-width: 600px) 100vw, 33vw" /></div>}
                <div className="he-meta"><span>{String(index + 1).padStart(2, "0")} / {place.neighborhood.name}</span><span>{place.category[0]}</span></div>
                <h3>{place.name}</h3><p className="he-place-description">{place.tagline || place.description}</p>
                <span className="he-text-link">Take a look <ArrowUpRight size={15} aria-hidden="true" /></span>
              </Link></article>;
            })}</div>
            <div className="he-business-note"><p>Know a place that belongs here?</p><Link href="/submit" className="he-text-link">Tell us about it <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
          </section>
        )}

        {people.length > 0 && (
          <section className="he-section he-people" aria-labelledby="he-people-heading">
            <div className="he-section-heading"><div><span className="he-label">03 / People of La Condesa</span><h2 id="he-people-heading">The neighborhood, in good company.</h2></div><Link href="/stories" className="he-text-link">Meet the neighbors <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
            <div className="he-people-grid">{people.map((person) => <article key={person._id}><Link className="he-story-link" href={`/stories/${person.slug}`}><div className="he-image he-portrait"><Image src={storyCardImageUrl(person.heroPhoto)} alt={`Portrait of ${person.name}`} fill sizes="(max-width: 600px) 100vw, 33vw" /></div><div className="he-meta"><span>{person.category}</span></div><h3>{person.name}</h3><p>{person.tagline}</p><span className="he-text-link">Read the conversation <ArrowUpRight size={15} aria-hidden="true" /></span></Link></article>)}</div>
          </section>
        )}

        {journal.length > 0 && (
          <section className="he-section" aria-labelledby="he-journal-heading">
            <div className="he-section-heading"><div><span className="he-label">From the journal</span><h2 id="he-journal-heading">For the curious.</h2></div><Link href="/blog" className="he-text-link">Keep reading <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
            <div className={`he-journal-grid${journal.length === 1 ? " he-journal-single" : ""}`}>{journal.map((post) => <article key={post.slug}><Link className="he-story-link" href={`/blog/${post.slug}`}><div className="he-image he-journal-image"><Image src={articleImage(post, usingSanity, 700)} alt={post.title} fill sizes="(max-width: 680px) 100vw, 50vw" /></div><div className="he-meta"><span>{post.category || "Journal"}</span>{post.readTime && <span>{post.readTime}</span>}</div><h3>{post.title}</h3><p className="he-place-description">{post.excerpt}</p></Link></article>)}</div>
          </section>
        )}

        {uniqueOpenings.length > 0 && (
          <section className="he-section he-radar" aria-labelledby="he-radar-heading">
            <div className="he-section-heading"><div><span className="he-label">The neighborhood notebook</span><h2 id="he-radar-heading">On our radar.</h2></div><Link href="/nueva-apertura" className="he-text-link">Share an opening <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
            <div className="he-radar-grid">{uniqueOpenings.slice(0, 3).map((opening) => <article key={opening.id}><div className="he-meta"><span>{opening.neighborhood || opening.category || "La Condesa"}</span>{opening.openedAtLabel && <span>Opened {opening.openedAtLabel}</span>}</div><h3>{opening.title}</h3><p>{opening.description}</p>{opening.href !== "#" && <Link href={opening.href} className="he-text-link" {...(opening.href.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" })}>Find out more <ArrowUpRight size={15} aria-hidden="true" /></Link>}</article>)}</div>
          </section>
        )}

        <section className="he-newsletter" id="newsletter" aria-labelledby="he-newsletter-heading">
          <div><span className="he-label">La Condesa Weekly / Every Thursday</span><h2 id="he-newsletter-heading">A letter from<br />the neighborhood.</h2><p>New places, weekend ideas and stories worth a little of your time. One free email, every week.</p><Link href="/archive" className="he-text-link">Browse the archive <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
          <div className="he-signup"><span className="he-label">Make yourself at home.</span><EmailSignup variant="hero" ctaText="Count me in" className="he-signup-form" /><p>Free to read. Easy to leave. Unsubscribe anytime.</p></div>
        </section>
        <div className="he-signoff"><p>Made of people.<br /><em>Made in La Condesa.</em></p><Link href="/about" className="he-text-link">A little about us <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      </div>
    </div>
  );
}
