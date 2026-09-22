"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";
import { categories, coursesIn } from "@/lib/courses";
import DemoModal from "./DemoModal";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  // Full-width bar at the top of the page; floating pill once the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Page buttons (DemoButton) open the same Book Demo pop-up by dispatching "open-demo".
  useEffect(() => {
    const openDemo = () => setDemoOpen(true);
    window.addEventListener("open-demo", openDemo);
    return () => window.removeEventListener("open-demo", openDemo);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    // The home hero is light, so the bar uses dark text there until it turns into the dark scrolled pill.
    <header className={`header ${scrolled ? "is-scrolled" : pathname === "/" ? "header-light" : ""}`}>
      <div className="header-bar">
        <div className="header-inner">
          <Link href="/" className="brand" aria-label={`${site.fullName} home`}>
            <Image src="/techcadd-logo.webp" alt={site.fullName} width={952} height={262} priority />
          </Link>

          <nav className={`nav ${open ? "nav-open" : ""}`} aria-label="Main">
            {navLinks.map((link) =>
              link.dropdown ? (
                // Courses is the highlighted pill (the reference site's "AI" slot).
                <div className="nav-item has-dropdown" key={link.href}>
                  <Link href={link.href} className="nav-glow">
                    <span>
                      {link.label}
                      <Chevron />
                    </span>
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
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-item nav-link ${isActive(link.href) ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              )
            )}
            <button
              type="button"
              className="btn btn-white nav-cta"
              onClick={() => {
                setOpen(false);
                setDemoOpen(true);
              }}
            >
              Book Demo
            </button>
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
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </header>
  );
}

function Chevron() {
  return (
    <svg className="chev" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
