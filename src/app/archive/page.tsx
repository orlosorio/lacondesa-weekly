import Link from "next/link";
import { EmailSignup } from "@/components/email-signup";
import { getArchiveIssues } from "@/sanity/fetch";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Browse past issues of La Condesa Weekly. Every issue is packed with new openings, weekend picks, and hidden gems.",
};

export default async function ArchivePage() {
  const { issues } = await getArchiveIssues();

  return (
    <>
      <main className="pt-20 lg:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mb-12">
            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Newsletter Archive
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Browse past issues of La Condesa Weekly. Every issue is packed with
              new openings, weekend picks, and hidden gems.
            </p>
          </div>

          <div className="space-y-0">
            {issues.map((issue) => (
              <Link
                key={issue.slug}
                href={`/archive/${issue.slug}`}
                className="flex items-center justify-between py-5 border-b border-border group hover:bg-secondary/50 -mx-4 px-4 rounded-lg transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h2 className="font-serif text-base lg:text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {issue.title}
                  </h2>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-transparent text-xs"
                    >
                      Issue #{issue.number}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {issue.date}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* CTA */}
      <section className="border-t border-border bg-secondary py-16 lg:py-24">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-4">
            Don&apos;t Miss the Next Issue
          </h2>
          <p className="text-muted-foreground mb-8">
            Get the best of La Condesa delivered to your inbox every Thursday.
          </p>
          <div className="max-w-[550px] mx-auto">
            <EmailSignup variant="hero" ctaText="Subscribe - It's Free" />
          </div>
        </div>
      </section>
    </>
  );
}
