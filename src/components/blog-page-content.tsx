"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface DisplayArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

interface BlogPageContentProps {
  articles: DisplayArticle[];
}

export function BlogPageContent({ articles }: BlogPageContentProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...new Set(articles.map((article) => article.category).filter(Boolean))];

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <main className="pt-20 lg:pt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mb-12">
            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              The journal
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              People, places, practical tips, and honest restaurant reviews.
              Stories from everyday life in La Condesa.
            </p>
          </div>

          {categories.length > 2 && (
            <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2" role="group" aria-label="Filter stories by category">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`min-h-11 text-sm underline-offset-8 hover:text-primary ${activeCategory === category ? "text-foreground underline" : "text-muted-foreground"}`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Article grid */}
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-14">
            {filtered.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-muted-foreground">{article.category}</span>
                    {article.date && <span className="text-xs text-muted-foreground">{article.date}</span>}
                  </div>
                  <h2 className="font-serif text-2xl font-normal text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
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
  );
}
