import Link from "next/link";

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
          <div className="flex items-center justify-center h-16">
            <Link href="/" className="flex items-center">
              <span className="font-serif text-xl font-semibold text-foreground">
                La Condesa Weekly
              </span>
            </Link>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
