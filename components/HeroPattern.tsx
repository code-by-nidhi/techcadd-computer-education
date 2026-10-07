// The faint background pattern behind a page's blue hero — see the ".hero-pattern" block in
// globals.css for what each variant looks like. Render it as the first child of the hero section.
export type HeroPatternVariant =
  | "dots"
  | "grid"
  | "rings"
  | "plus"
  | "hex"
  | "waves"
  | "hatch"
  | "diamond"
  | "triangles"
  | "zigzag"
  | "blueprint";

export default function HeroPattern({ variant }: { variant: HeroPatternVariant }) {
  return <span className={`hero-pattern hp-${variant}`} aria-hidden="true" />;
}
