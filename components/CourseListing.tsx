"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ListGroup } from "@/lib/listing";
import ArrowIcon from "./ArrowIcon";

// Searchable course directory: a search box followed by one section per group, laid out like
// techcaddjalandhar.com's course pages. Groups with no matching course are hidden while searching.
export default function CourseListing({ groups, examples }: { groups: ListGroup[]; examples: string }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  // Distinct courses (a course can appear in several groups; format cards aren't courses).
  const total = new Set(groups.flatMap((g) => g.items.map((i) => i.href)).filter((h) => h.startsWith("/courses/"))).size;
  const visible = groups
    .map((g) => ({ ...g, items: q ? g.items.filter((i) => i.search.includes(q)) : g.items }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <section className="lx-search">
        <div className="container">
          <label className="lx-search-box">
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${total} courses: try ${examples}`}
              aria-label="Search courses"
            />
          </label>
        </div>
      </section>

      {visible.map((g, i) => (
        <section key={g.id} id={g.id} className={`lx-section ${i % 2 ? "lx-section-alt" : ""}`}>
          <div className="container">
            <h2 className="lx-title">{g.title}</h2>
            <div className="lx-grid">
              {g.items.map((item) => (
                <Link key={item.title} href={item.href} className="lx-card">
                  <span
                    className={item.icon.text.length === 1 ? "lx-icon lx-icon-glyph" : "lx-icon"}
                    aria-hidden="true"
                    style={{ backgroundColor: item.icon.logo ? "#f1f5f9" : `${item.icon.color}1a`, color: item.icon.color }}
                  >
                    {item.icon.logo ? (
                      <Image src={`/logos/${item.icon.logo}.png`} alt="" width={28} height={28} />
                    ) : (
                      item.icon.text
                    )}
                  </span>
                  <span className="lx-text">
                    <span className="lx-name">{item.title}</span>
                    <span className="lx-meta">{item.meta}</span>
                  </span>
                  <span className="lx-arrow" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {visible.length === 0 && (
        <section className="lx-section">
          <div className="container lx-empty">
            No courses match “{query}”. Try another word, or book a free demo and a counsellor will help you choose.
          </div>
        </section>
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}
