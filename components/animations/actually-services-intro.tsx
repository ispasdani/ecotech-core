/**
 * Exact recreation of Redox `/creative-agency` ActuallyArea (`actually-area.tsx`):
 * Pure markup component; its scroll-pinned line-fill and zoom-to-black
 * transition are orchestrated in document order by `GsapProvider` (`serviceAnimation`).
 */
export function ActuallyServicesIntro() {
  return (
    <section
      aria-label="What services we provide you actually"
      className="actually-area"
    >
      <div className="actually-area-inner section-spacing">
        <div className="rx-container">
          <div className="bg-area" />
          <h2 className="actually-title font-display max-w-[760px] text-[44px] font-normal leading-[0.94] tracking-[-0.07em] sm:text-[64px] lg:text-[92px] xl:text-[106px]">
            <span className="t-line-fill">What services</span>
            <span className="t-line-fill">we provide you</span>
            <span className="t-line-fill">actually</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
