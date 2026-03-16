import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/data";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <Link
        href={`/blog/${article.slug}`}
        className="group block overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
      >
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <Badge
              variant="secondary"
              className="mb-3 w-fit rounded-md bg-forest/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-forest"
            >
              {article.category}
            </Badge>
            <h3 className="font-heading text-2xl leading-tight text-foreground transition-colors group-hover:text-forest sm:text-3xl">
              {article.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {article.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{article.date}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <Badge
          variant="secondary"
          className="mb-2.5 rounded-md bg-forest/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-forest"
        >
          {article.category}
        </Badge>
        <h3 className="font-heading text-lg leading-snug text-foreground transition-colors group-hover:text-forest">
          {article.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{article.date}</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>{article.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
