import Link from "next/link";

const links = [
  { href: "/blog", label: "Journal" },
  { href: "/stories", label: "People" },
  { href: "/lists", label: "Lists" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Our team" },
  { href: "/contact", label: "Contact" },
  { href: "/subscribe", label: "Newsletter" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="he-footer he-site-footer">
      <p>Made in La Condesa.</p>
      <nav aria-label="Footer navigation">
        {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        <a href="https://instagram.com/lacondesaweekly" target="_blank" rel="noopener noreferrer">Instagram</a>
      </nav>
    </footer>
  );
}
