import Image from "next/image";
import Link from "next/link";
import { CategoryId, coursesIn } from "@/lib/courses";
import ArrowIcon from "./ArrowIcon";

// Home "Categories" row, after techcaddjalandhar.com: square cards that widen on hover to reveal a
// short description and an Explore link. Software logos stand in for the reference site's photos.
type Tile = { logo: string } | { text: string; bg: string; fg: string } | { social: "ig" | "fb" | "yt" | "google" };

const cards: { id: CategoryId; name: string; text: string; tone: string; tiles: Tile[] }[] = [
  {
    id: "basic-accounting",
    name: "Basic & Accounting",
    text: "MS Office, Tally Prime, GST and computerised accounts for office jobs.",
    tone: "cat-tone-1",
    tiles: [{ logo: "word" }, { logo: "excel" }, { logo: "tally" }],
  },
  {
    id: "graphic-design",
    name: "Graphic Designing",
    text: "Photoshop, Illustrator and CorelDRAW for branding, print and social media.",
    tone: "cat-tone-2",
    tiles: [{ logo: "photoshop" }, { logo: "coreldraw" }, { text: "Ai", bg: "#330000", fg: "#ff9a00" }],
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    text: "SEO, social media, Google Ads and analytics, practised on live campaigns.",
    tone: "cat-tone-3",
    tiles: [{ social: "google" }, { social: "ig" }, { social: "yt" }],
  },
  {
    id: "civil-mechanical",
    name: "CAD & Design",
    text: "AutoCAD, SolidWorks, Revit and 3ds Max for civil and mechanical careers.",
    tone: "cat-tone-4",
    tiles: [{ logo: "autocad" }, { logo: "solidworks" }, { text: "3D", bg: "#0a32b8", fg: "#fff" }],
  },
];

export default function HomeCategories() {
  return (
    <section className="cat" id="categories">
      <div className="container">
        <div className="cat-head">
          <div>
            <span className="cat-badge">Categories</span>
            <h2>Crafting careers with skills that work for you</h2>
          </div>
          <Link href="/courses" className="cat-all">
            All categories
            <span aria-hidden="true">
              <ArrowIcon />
            </span>
          </Link>
        </div>

        <div className="cat-row">
          {cards.map((c) => (
            <Link key={c.id} href={`/courses#${c.id}`} className={`cat-card ${c.tone}`}>
              <div className="cat-tiles" aria-hidden="true">
                {c.tiles.map((t, i) => (
                  <span key={i} className="cat-tile">
                    <TileContent tile={t} />
                  </span>
                ))}
              </div>
              <div className="cat-top">
                <h3>{c.name}</h3>
                <span className="cat-count">{coursesIn(c.id).length} courses</span>
              </div>
              <div className="cat-more">
                <p>{c.text}</p>
                <span className="cat-explore">
                  Explore <ArrowIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TileContent({ tile }: { tile: Tile }) {
  if ("logo" in tile) return <Image src={`/logos/${tile.logo}.png`} alt="" width={64} height={64} />;
  if ("text" in tile)
    return (
      <span className="cat-tile-text" style={{ background: tile.bg, color: tile.fg }}>
        {tile.text}
      </span>
    );
  switch (tile.social) {
    case "google":
      return (
        <svg viewBox="0 0 48 48">
          <path fill="#FBBC05" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
          <path fill="#EA4335" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
          <path fill="#34A853" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
          <path fill="#4285F4" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
        </svg>
      );
    case "ig":
      return (
        <span className="cat-tile-text cat-ig">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <rect x="4" y="4" width="16" height="16" rx="5" />
            <circle cx="12" cy="12" r="3.6" />
            <circle cx="17" cy="7" r="0.6" fill="#fff" />
          </svg>
        </span>
      );
    case "yt":
      return (
        <span className="cat-tile-text" style={{ background: "#ff0000" }}>
          <svg viewBox="0 0 24 24" fill="#fff">
            <path d="M9 7.5v9l7.5-4.5z" />
          </svg>
        </span>
      );
    default:
      return (
        <span className="cat-tile-text" style={{ background: "#1877f2", color: "#fff" }}>
          f
        </span>
      );
  }
}
