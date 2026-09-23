// Shown by Next while a page's data/JS is still coming over the network — a slow connection sees this
// shimmer instead of a blank screen. Used by every route that has no loading.tsx of its own.
export default function Loading() {
  return (
    <div className="container sk-page" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div className="sk-head">
        <div className="skeleton sk-eyebrow sk-line" />
        <div className="skeleton sk-title sk-line" />
        <div className="skeleton sk-line" style={{ maxWidth: "560px" }} />
      </div>
      <div className="grid grid-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="sk-card">
            <div className="skeleton sk-thumb" />
            <div className="skeleton sk-line" style={{ width: "70%" }} />
            <div className="skeleton sk-line" />
            <div className="skeleton sk-line" style={{ width: "45%" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
