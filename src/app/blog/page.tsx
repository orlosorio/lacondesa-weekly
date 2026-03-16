"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StickySignupBar } from "@/components/sticky-signup-bar";
import { articles as fallbackArticles, categories } from "@/lib/data";
import { Calendar } from "lucide-react";

interface DisplayArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [articleList, setArticleList] = useState<DisplayArticle[]>(
    fallbackArticles.map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      category: a.category,
      date: a.date,
      image: a.image,
    }))
  );

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId || projectId === "your-project-id") return;

    fetch(
      `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${
        process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
      }?query=${encodeURIComponent(
        `*[_type == "article"] | order(date desc) { title, "slug": slug.current, excerpt, category, date, "image": image.asset->url }`
      )}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.result && data.result.length > 0) {
          setArticleList(
            data.result.map((a: Record<string, string>) => ({
              slug: a.slug,
              title: a.title,
              excerpt: a.excerpt,
              category: a.category,
              date: new Date(a.date + "T00:00:00").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              image: a.image || fallbackArticles[0].image,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const filtered =
    activeCategory === "All"
      ? articleList
      : articleList.filter((a) => a.category === activeCategory);

  return (
    <>
      <main className="pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mb-12">
            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Stories from La Condesa
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              New openings, hidden gems, weekend picks, and everything happening
              in the neighborhood.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-border">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                className={
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-secondary"
                }
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Article grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm overflow-hidden border-border hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-transparent text-xs">
                      {article.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </span>
                  </div>
                  <h2 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">
                No articles in this category yet. Check back soon.
              </p>
            </div>
          )}
        </div>
      </main>

      <StickySignupBar />
    </>
  );
}
