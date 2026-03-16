import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-terracotta">
        404
      </p>
      <h1 className="mt-3 font-heading text-4xl text-foreground sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base text-muted-foreground">
        Looks like this page wandered off somewhere in the neighborhood. Let&apos;s
        get you back on track.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-forest px-5 text-sm font-medium text-cream transition-colors hover:bg-forest-light"
        >
          Back to home
        </Link>
        <Link
          href="/blog"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          Read the blog
        </Link>
      </div>
    </div>
  );
}
