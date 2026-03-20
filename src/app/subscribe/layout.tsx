import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        header:first-of-type { display: none !important; }
        footer { display: none !important; }
      `}</style>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to home
            </Link>
            <Link href="/" className="flex items-center absolute left-1/2 -translate-x-1/2">
              <span className="font-serif text-xl font-semibold text-foreground">
                La Condesa Weekly
              </span>
            </Link>
            <div className="w-24" aria-hidden />
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
