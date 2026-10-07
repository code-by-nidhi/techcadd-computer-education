"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";
import { aboutMenuItems } from "@/lib/aboutData";
import { resourceMenuLinks, resourceTools } from "@/lib/resourcesData";
import { categories, categorySlug, coursesIn } from "@/lib/courses";
import DemoModal from "./DemoModal";
import CertificateProgramsMenu from "./CertificateProgramsMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoPhone, setDemoPhone] = useState("");
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  // Full-width bar at the top of the page; floating pill once the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Page buttons (DemoButton) open the same Book Demo pop-up by dispatching "open-demo". LeadForm
  // dispatches it with a { phone } detail so the modal opens with that number pre-filled.
  useEffect(() => {
    const openDemo = (e: Event) => {
      setDemoPhone((e as CustomEvent<{ phone?: string }>).detail?.phone ?? "");
      setDemoOpen(true);
    };
    window.addEventListener("open-demo", openDemo);
    return () => window.removeEventListener("open-demo", openDemo);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // These pages have a light hero, so at the very top of the page the bar is fully transparent with
  // dark text/logo (merged into the hero) — see .header-light in globals.css. Once scrolled, every
  // page (light-hero or not) gets the same dark glassmorphism pill, so header-light and is-scrolled
  // are mutually exclusive: scrolling away from the top always drops header-light.
  // Sitewide scheme: every page opens on a blue hero, so no route uses the light variant any more.
  const isLightPage = false;

  return (
    <header className={`header ${scrolled ? "is-scrolled" : isLightPage ? "header-light" : ""}`}>
      <div className="header-bar">
        <div className="header-inner">
          <Link href="/" className="brand" aria-label={`${site.fullName} home`}>
            <Image src="/techcadd-logo.webp" alt={site.fullName} width={952} height={262} priority />
          </Link>

          <nav className={`nav ${open ? "nav-open" : ""}`} aria-label="Main">
            {navLinks.map((link) =>
              link.dropdown ? (
                // Courses is the highlighted pill (the reference site's "AI" slot). Certificate
                // Programs (below) gets its own, visually distinct card-grid dropdown instead of this
                // text-column one — see components/CertificateProgramsMenu.tsx.
                <div className="nav-item has-dropdown" key={link.href}>
                  <Link href={link.href} className="nav-glow">
                    <span>
                      {link.label}
                      <Chevron />
                    </span>
                  </Link>
                  <div className="dropdown courses-dropdown">
                    <div className="cd-grid">
                      {categories.map((cat, i) => (
                        <div key={cat.id} className="cd-col">
                          <span className="cd-num">{String(i + 1).padStart(2, "0")}</span>
                          <Link href={`/courses/${categorySlug(cat.id)}`} className="cd-title">
                            {cat.name}
                          </Link>
                          <p className="cd-blurb">{cat.blurb}</p>
                          <div className="cd-list">
                            {coursesIn(cat.id).map((c) => {
                              const tag = COURSE_TAGS[c.slug];
                              return (
                                <Link key={c.slug} href={`/courses/${c.slug}`}>
                                  {c.title}
                                  {tag && <span className={`cd-tag cd-tag-${tag.toLowerCase()}`}>{tag}</span>}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="cd-foot">
                      <p>
                        <span aria-hidden="true">“</span>
                        Learn the software offices actually use and turn it into a job in just a few months.
                      </p>
                      <Link href={link.href}>Browse all courses →</Link>
                    </div>
                  </div>
                </div>
              ) : link.cardMenu ? (
                <div className="nav-item has-dropdown" key={link.href}>
                  <Link href={link.href} className={`nav-link ${isActive(link.href) ? "active" : ""}`}>
                    <span>
                      {link.label}
                      <Chevron />
                    </span>
                  </Link>
                  <CertificateProgramsMenu />
                </div>
              ) : link.aboutMega ? (
                <div className="nav-item has-dropdown" key={link.href}>
                  <Link href={link.href} className={`nav-link ${isActive(link.href) ? "active" : ""}`}>
                    <span>
                      {link.label}
                      <Chevron />
                    </span>
                  </Link>
                  <div className="dropdown about-dropdown">
                    <div className="about-nav">
                      <div className="about-nav-list">
                        {aboutMenuItems.map((item) => (
                          <Link
                            key={item.slug}
                            href={item.href}
                            className={`about-nav-item ${isActive(item.href) ? "is-active" : ""}`}
                          >
                            {item.navLabel}
                          </Link>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="about-nav-cta"
                        onClick={() => {
                          setOpen(false);
                          setDemoPhone("");
                          setDemoOpen(true);
                        }}
                      >
                        Talk to a counsellor →
                      </button>
                    </div>
                    <div className="about-cards">
                      {aboutMenuItems.map((item) => (
                        <Link key={item.slug} href={item.href} className="about-card">
                          <span className="about-card-media">
                            <span className="about-card-img" style={{ backgroundImage: `url(${item.navImage})` }} />
                          </span>
                          <strong className="about-card-title">{item.navLabel}</strong>
                          <span className="about-card-meta">
                            <span className="about-card-badge">{item.navBadge}</span>
                            {item.navMeta}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <details className="about-accordion">
                    <summary>{link.label}</summary>
                    <div className="about-accordion-body">
                      {aboutMenuItems.map((item) => (
                        <Link key={item.slug} href={item.href} className="about-accordion-link">
                          <strong>{item.navLabel}</strong>
                          <span>{item.subtitle}</span>
                        </Link>
                      ))}
                    </div>
                  </details>
                </div>
              ) : link.resourcesMenu ? (
                // Same shell as the About mega menu: link list on the left, poster cards on the right.
                // The interactive tools live on the reference site, so those open in a new tab.
                <div className="nav-item has-dropdown" key={link.href}>
                  <Link href={link.href} className={`nav-link ${isActive(link.href) ? "active" : ""}`}>
                    <span>
                      {link.label}
                      <Chevron />
                    </span>
                  </Link>
                  <div className="dropdown about-dropdown res-dropdown">
                    <div className="about-nav">
                      <div className="about-nav-list">
                        {resourceMenuLinks.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="about-nav-item"
                          >
                            {item.label}
                            {item.isNew && <span className="res-new">New</span>}
                          </a>
                        ))}
                      </div>
                      <Link href={link.href} className="about-nav-cta">
                        All free tools &amp; resources →
                      </Link>
                    </div>
                    <div className="about-cards">
                      {resourceTools
                        .filter((tool) => tool.image)
                        .map((tool) => (
                          <a key={tool.title} href={tool.href} target="_blank" rel="noopener noreferrer" className="about-card">
                            <span className="about-card-media">
                              <span className="about-card-img" style={{ backgroundImage: `url(${tool.image})` }} />
                            </span>
                            <strong className="about-card-title">{tool.title}</strong>
                            <span className="about-card-meta">
                              <span className="about-card-badge">Free tool</span>
                              {tool.tag}
                            </span>
                          </a>
                        ))}
                    </div>
                  </div>
                  <details className="about-accordion">
                    <summary>{link.label}</summary>
                    <div className="about-accordion-body">
                      <Link href={link.href} className="about-accordion-link">
                        <strong>All free tools &amp; resources</strong>
                        <span>Tools, free learning modules and capstone projects</span>
                      </Link>
                      {resourceMenuLinks.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="about-accordion-link"
                        >
                          <strong>
                            {item.label}
                            {item.isNew && <span className="res-new">New</span>}
                          </strong>
                        </a>
                      ))}
                    </div>
                  </details>
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
                setDemoPhone("");
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
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} defaultPhone={demoPhone} />
    </header>
  );
}

// Popularity badges shown beside a few courses in the Courses dropdown — marketing labels, edit freely.
const COURSE_TAGS: Record<string, "Hot" | "Trending" | "New"> = {
  "tally-prime-training-in-jalandhar": "Hot",
  "advanced-excel-training-in-jalandhar": "Trending",
  "punjabi-typing": "Trending",
  "autocad-training-in-jalandhar": "Hot",
  "solidworks-training-in-jalandhar": "Trending",
  "digital-marketing-training-in-jalandhar": "Trending",
  "google-ads-ppc-training-in-jalandhar": "Hot",
  "graphic-design-course-in-jalandhar": "Hot",
};

function Chevron() {
  return (
    <svg className="chev" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
