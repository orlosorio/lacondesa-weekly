import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "/blog", label: "Journal" },
  { href: "/spots", label: "Places" },
  { href: "/stories", label: "People" },
  { href: "/lists", label: "Guides" },
  { href: "/about", label: "About" },
];

export function HomeNavigation() {
  return (
    <header className="he-header">
      <a href="#home-content" className="he-skip-link">Skip to content</a>
      <div className="he-header-inner">
        <Link href="/" className="he-nav-brand" aria-label="La Condesa Weekly home">La Condesa<span>.</span></Link>
        <nav className="he-desktop-nav" aria-label="Main navigation">{links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
        <a className="he-subscribe-link" href="#newsletter">The weekly letter <ArrowUpRight size={15} aria-hidden="true" /></a>
        <details className="he-mobile-menu"><summary>Menu <span aria-hidden="true">+</span></summary><nav aria-label="Mobile navigation">{links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}<Link href="/submit">Add a place</Link><Link href="/advertise">For businesses</Link><Link href="/subscribe">Subscribe</Link></nav></details>
      </div>
    </header>
  );
}
