/**
 * Exact recreation of Redox `/startup-agency` MarqueeText:
 * Scroll-scrubbed `.moving-text > .wrapper-text` driven by `movingTextAnimation()`.
 */
export function MarqueeBand() {
  return (
    <section
      aria-label="Crafting sovereign digital products"
      className="marquee-text-area section-light"
    >
      <div className="moving-text">
        <div className="wrapper-text">
          <h2 className="section-title">Crafting sovereign digital products</h2>
        </div>
      </div>
    </section>
  );
}
