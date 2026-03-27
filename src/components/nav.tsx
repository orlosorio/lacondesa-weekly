"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { SPOT_NEIGHBORHOODS } from "@/lib/spots-config";

const secondaryLinks = [
  { href: "/blog", label: "Stories" },
  { href: "/stories", label: "Condesa stories" },
  { href: "/historias", label: "Historias" },
  { href: "/wall-of-love", label: "Wall of Love" },
  { href: "/lists", label: "Lists" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/archive", label: "Archive" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoodOpen, setHoodOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center">
            <span className="font-serif text-xl lg:text-2xl font-semibold text-foreground">
              La Condesa Weekly
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
            <Link
              href="/spots"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Spots
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors outline-none"
              >
                Neighborhoods
                <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[12rem]">
                {SPOT_NEIGHBORHOODS.map((n) => (
                  <DropdownMenuItem
                    key={n.slug}
                    onSelect={() => router.push(`/spots/${n.slug}`)}
                  >
                    {n.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/submit"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Add a place
            </Link>
            <Link
              href="/advertise"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              For businesses
            </Link>

            <span
              className="hidden lg:inline text-border select-none"
              aria-hidden
            >
              |
            </span>

            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/subscribe"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign up
            </Link>

            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground/90 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Subscribe
            </Link>
          </nav>

          {/* Mobile nav */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className="inline-flex items-center justify-center rounded-md size-9 hover:bg-accent hover:text-accent-foreground text-foreground transition-all"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background border-border">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <div className="mt-8 flex flex-col gap-1">
                  <Link
                    href="/spots"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    Spots
                  </Link>
                  <button
                    type="button"
                    onClick={() => setHoodOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-md px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary text-left"
                    aria-expanded={hoodOpen}
                  >
                    Neighborhoods
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        hoodOpen && "rotate-180"
                      )}
                      aria-hidden
                    />
                  </button>
                  {hoodOpen && (
                    <ul className="ml-2 border-l border-border pl-2 space-y-0.5" role="list">
                      {SPOT_NEIGHBORHOODS.map((n) => (
                        <li key={n.slug}>
                          <Link
                            href={`/spots/${n.slug}`}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-4 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                          >
                            {n.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    href="/submit"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    Add a place
                  </Link>
                  <Link
                    href="/advertise"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    For businesses
                  </Link>
                  <div className="flex gap-4 px-4 py-2 text-sm">
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/subscribe"
                      onClick={() => setOpen(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Sign up
                    </Link>
                  </div>
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 px-4">
                    <Link
                      href="/subscribe"
                      onClick={() => setOpen(false)}
                      className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                    >
                      Subscribe
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
