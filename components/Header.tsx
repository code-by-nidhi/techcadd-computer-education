"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";
import { categories, coursesIn } from "@/lib/courses";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  // Full-width bar at the top of the page; floating pill once the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-contact">
            <a href={site.phoneHref}>📞 {site.phone}</a>
            <a href={`mailto:${site.email}`}>✉️ {site.email}</a>
            <span className="hide-sm">🕘 {site.hours}</span>
          </div>
          <div className="topbar-social">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={site.social.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>

      <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-bar">
          <div className="header-inner">
            <Link href="/" className="logo" aria-label={`${site.fullName} home`}>
              <span className="logo-mark">tc</span>
              <span>
                <strong>{site.name}</strong>
                <small>Computer Education · {site.city}</small>
              </span>
            </Link>

            <nav className={`nav ${open ? "nav-open" : ""}`} aria-label="Main">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div className="nav-item has-dropdown" key={link.href}>
                    <Link href={link.href} className={isActive(link.href) ? "active" : ""}>
                      {link.label} ▾
                    </Link>
                    <div className="dropdown">
                      {categories.map((cat) => (
                        <div key={cat.id} className="dropdown-col">
                          <Link href={`/courses#${cat.id}`} className="dropdown-head">
                            {cat.icon} {cat.name}
                          </Link>
                          {coursesIn(cat.id).map((c) => (
                            <Link key={c.slug} href={`/courses/${c.slug}`}>
                              {c.title}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link key={link.href} href={link.href} className={`nav-item ${isActive(link.href) ? "active" : ""}`}>
                    {link.label}
                  </Link>
                )
              )}
              <Link href="/contact" className="btn btn-primary nav-cta">
                Book Free Demo
              </Link>
            </nav>

            <button
              className="menu-toggle"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
