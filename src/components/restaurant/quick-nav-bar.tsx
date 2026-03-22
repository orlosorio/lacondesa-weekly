"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "overview", label: "Overview" },
  { id: "menu", label: "Menu" },
  { id: "photos", label: "Photos" },
  { id: "hours", label: "Hours" },
  { id: "location", label: "Location" },
] as const;

export function QuickNavBar() {
  return (
    <nav
      aria-label="Page sections"
      className={cn(
        "sticky top-16 lg:top-20 z-40 border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80",
        "-mx-4 px-4 sm:mx-0 sm:px-0"
      )}
    >
      <div className="max-w-7xl mx-auto">
        <ul className="flex gap-1 overflow-x-auto py-3 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {LINKS.map(({ id, label }) => (
            <li key={id} className="shrink-0">
              <Link
                href={`#${id}`}
                className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium tracking-wide text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
