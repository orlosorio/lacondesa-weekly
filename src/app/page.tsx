import Link from "next/link";
import { EmailSignup } from "@/components/email-signup";
import { getArticles, getListicles } from "@/sanity/fetch";

const upcomingCoverage = [
  { title: "Restaurants", description: "New tables, neighborhood classics, and honest reviews worth keeping close." },
  { title: "Coffee & cafés", description: "Espresso bars, slow mornings, and a good corner to spend an afternoon." },
  { title: "People & local stories", description: "The neighbors, makers, and everyday lives that give this place its character." },
  { title: "Culture & events", description: "Galleries, exhibitions, small stages, and what is happening around the corner." },
  { title: "Nightlife & bars", description: "Mezcalerías, wine bars, and the places where an evening unfolds." },
  { title: "Parks & outdoors", description: "Walking routes, green spaces, and a little more time outside." },
  { title: "Hotels & stays", description: "Thoughtful stays, rooftops, and addresses to share with visiting friends." },
  { title: "Wellness", description: "Studios, movement, spas, and rituals for a slower day in the city." },
  { title: "Shopping", description: "Independent shops, local design, and the people making things here." },
  { title: "Everyday services", description: "Barbers, salons, and useful neighborhood addresses, explored through stories and guides." },
];

export default async function HomePage() {
  const [{ articles, sanityArticles, usingSanity }, guides] = await Promise.all([
    getArticles(),
    getListicles(),
  ]);
  const posts = (usingSanity ? sanityArticles ?? [] : articles).slice(0, 5);

  return (
    <main className="home-editorial" id="home-top">
      <div className="he-wrap">
        <header className="he-masthead">
          <p className="he-label">Mexico City · A neighborhood journal</p>
          <h1 className="he-wordmark">La Condesa<span>.</span></h1>
          <p className="he-intro">People, places, and the everyday life in between.</p>
          <nav className="he-page-index" aria-label="On this page">
            {posts.length > 0 && <a href="#journal">Read</a>}
            <a href="#people">People</a>
            {guides.length > 0 && <a href="#guides">Guides</a>}
            <a href="#coverage">What we cover</a>
            <a href="#community">Get involved</a>
          </nav>
        </header>

        {posts.length > 0 && (
          <section className="he-reading" id="journal" aria-labelledby="he-reading-heading">
            <h2 className="he-label" id="he-reading-heading">From the journal</h2>
            <div className="he-stories">
              {posts.map((post) => (
                <article key={post.slug} className="he-story">
                  <Link href={`/blog/${post.slug}`} className="he-story-link">
                    <span className="he-meta">{post.category || "Journal"}{post.readTime ? ` · ${post.readTime}` : ""}</span>
                    <h3>{post.title}</h3>
                    <p className="he-excerpt">{post.excerpt}</p>
                    <span className="he-read">Read the story ↗</span>
                  </Link>
                </article>
              ))}
            </div>
            <Link href="/blog" className="he-text-link">More from the journal ↗</Link>
          </section>
        )}

        <section className="he-section" id="people" aria-labelledby="he-people-heading">
          <p className="he-label">People of La Condesa</p>
          <h2 id="he-people-heading">A neighborhood is its people.</h2>
          <p>Conversations with the people who live, work, cook, and create here. Their stories, in their own words.</p>
          <Link href="/stories" className="he-text-link">Meet the people ↗</Link>
        </section>

        {guides.length > 0 && (
          <section className="he-section" id="guides" aria-labelledby="he-guides-heading">
            <p className="he-label">A few good starting points</p>
            <h2 id="he-guides-heading">Keep these close.</h2>
            <p>Our neighborhood guides bring a few addresses together, so you can spend less time looking and more time out in the city.</p>
            <ul className="he-link-list he-guide-list">
              {guides.slice(0, 4).map((guide) => (
                <li key={guide._id}>
                  <Link href={`/lists/${guide.slug}`}>{guide.title} ↗</Link>
                  {guide.seoDescription && <p>{guide.seoDescription}</p>}
                </li>
              ))}
            </ul>
            <Link href="/lists" className="he-text-link">All neighborhood guides ↗</Link>
          </section>
        )}

        <section className="he-section" id="coverage" aria-labelledby="he-coverage-heading">
          <p className="he-label">What we’ll cover · More stories coming soon</p>
          <h2 id="he-coverage-heading">Across the neighborhood.</h2>
          <p>We’re expanding our coverage, one story at a time. Expect interviews, reviews, practical tips, and carefully chosen lists across these corners of neighborhood life.</p>
          <ul className="he-link-list he-coverage-list">
            {upcomingCoverage.map((category) => (
              <li key={category.title}>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="he-section he-community" id="community" aria-labelledby="he-community-heading">
          <p className="he-label">A neighborhood made together</p>
          <h2 id="he-community-heading">There is always more to discover.</h2>
          <p>Know someone we should interview, a place worth reviewing, or a story we should tell? <Link href="/contact">Send us your idea ↗</Link>.</p>
          <p>Get to know <Link href="/team">the people behind the journal ↗</Link>, read <Link href="/about">a little about us ↗</Link>, or <Link href="/contact">send us a note ↗</Link>. We would love to hear from you.</p>
        </section>

        <section className="he-newsletter" id="newsletter" aria-labelledby="he-newsletter-heading">
          <h2 id="he-newsletter-heading">A letter from the neighborhood.</h2>
          <p>A few good places, stories, and ideas for your week.<br className="he-desktop-break" /> In your inbox every Thursday.</p>
          <EmailSignup variant="hero" ctaText="Subscribe" className="he-signup-form" />
          <p className="he-small-print">Free to read. Unsubscribe anytime.</p>
          <Link href="/archive" className="he-text-link">Browse the newsletter archive ↗</Link>
        </section>

        <footer className="he-footer">
          <p>Made in La Condesa.</p>
          <nav aria-label="Footer navigation">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/team">Our team</Link>
            <Link href="https://instagram.com/lacondesaweekly" target="_blank" rel="noopener noreferrer">Instagram</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}
