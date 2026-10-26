import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "/blog", label: "Journal" },
  { href: "/stories", label: "People" },
  { href: "/lists", label: "Lists" },
  { href: "/about", label: "About" },
];

export function HomeNavigation({ pathname = "/" }: { pathname?: string }) {
  const home = pathname === "/";
  const navigationLinks = links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={`he-header${home ? "" : " he-header-interior"}`}>
      <a href="#home-content" className="he-skip-link">Skip to content</a>
      <div className="he-header-inner">
        <Link href="/" className="he-nav-brand" aria-label="La Condesa Weekly home">La Condesa<span>.</span></Link>
        <nav className="he-desktop-nav" aria-label="Main navigation">{navigationLinks}</nav>
        <Link className="he-subscribe-link" href={home ? "/#newsletter" : "/subscribe"}>Newsletter <ArrowUpRight size={15} aria-hidden="true" /></Link>
        <details className="he-mobile-menu">
          <summary>Menu <span aria-hidden="true">+</span></summary>
          <nav aria-label="Mobile navigation">{navigationLinks}<Link href="/contact">Contact</Link></nav>
        </details>
      </div>
    </header>
  );
}
