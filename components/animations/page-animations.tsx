"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mobile URL bars resizing the viewport should not force a full refresh.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * One animation engine for every page. Render `<PageAnimations />` as the
 * last child of a page's `<main>`.
 *
 * It lives inside the page segment on purpose: Next hydrates the page after
 * the root layout, so an effect up in the layout would write GSAP inline
 * styles into markup React has not hydrated yet (hydration mismatch and a
 * full client re-render). Here the effect runs only once its page is live.
 *
 * Everything that runs per scroll frame only touches `transform`, `opacity`
 * or `clip-path`, so the browser never re-runs layout while scrolling.
 * Pass `rebuildKey` when the page swaps content in place (blog filters).
 */
export function PageAnimations({ rebuildKey }: { rebuildKey?: string }) {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;
    const container: HTMLElement = marker.closest("main") ?? document.body;

    let ctx: gsap.Context | null = null;

    const start = () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const isSmall = window.matchMedia("(max-width: 767px)").matches;

      ctx = gsap.context(() => {
        if (prefersReduced) {
          gsap.set(container.querySelectorAll(".scale, .scale img"), {
            scale: 1,
          });
          gsap.set(container.querySelectorAll(".t-line-fill"), {
            backgroundPositionX: "0%",
          });
          return;
        }

        // 1. Full-bleed reveal. `.go_full` is laid out at 100vw by CSS and
        //    starts clipped to the container width with rounded corners, then
        //    opens to the screen edges. Paint only, no layout per frame.
        container.querySelectorAll<HTMLElement>(".go_full").forEach((item) => {
          const inset = () => {
            const host = item.parentElement;
            const hostWidth = host ? host.clientWidth : window.innerWidth;
            return Math.max(0, (window.innerWidth - hostWidth) / 2);
          };
          gsap.fromTo(
            item,
            { clipPath: () => `inset(0px ${inset()}px round 15px)` },
            {
              clipPath: "inset(0px 0px round 0px)",
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom bottom",
                scrub: 0.4,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        // 2. "What services we provide you actually": pinned line fill, then
        //    zoom through to black.
        const actuallySection =
          container.querySelector<HTMLElement>(".actually-area");
        if (actuallySection) {
          const title =
            actuallySection.querySelector<HTMLElement>(".actually-title");
          const lines =
            actuallySection.querySelectorAll<HTMLElement>(".t-line-fill");

          if (title && lines.length > 0) {
            lines.forEach((target) => {
              gsap.to(target, {
                backgroundPositionX: "0%",
                ease: "none",
                scrollTrigger: {
                  trigger: target,
                  scrub: 1,
                  start: "top 70%",
                  end: "center 30%",
                },
              });
            });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: actuallySection,
                pin: true,
                scrub: 1,
                start: "top top",
                end: "bottom+=1400 top",
                invalidateOnRefresh: true,
              },
            });

            // Swap the clipped gradient for solid ink before scaling so the
            // text is never re-rasterised as a background-clip at 28x.
            tl.to(lines, {
              backgroundPositionX: "0%",
              duration: 0.2,
              ease: "none",
            })
              .set(lines, { color: "#111111" })
              .to(title, {
                scale: 28,
                opacity: 0,
                ease: "power4.inOut",
                delay: 0.15,
                duration: 0.75,
                force3D: true,
              })
              .to(
                actuallySection,
                {
                  backgroundColor: "#111111",
                  duration: 0.45,
                  ease: "none",
                },
                "-=0.50",
              );
          }
        }

        // 3. Counter-scale reveal on work cards (box 0.9 -> 1, image 1.3 -> 1).
        container.querySelectorAll<HTMLElement>(".scale").forEach((item) => {
          gsap.to(item, {
            scale: 1,
            duration: 1,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              toggleActions: "play reverse play reverse",
            },
          });
        });
        container
          .querySelectorAll<HTMLElement>(".scale img")
          .forEach((img) => {
            gsap.fromTo(
              img,
              { scale: 1.3 },
              {
                scale: 1,
                duration: 1.1,
                ease: "power2.out",
                force3D: true,
                scrollTrigger: {
                  trigger: img,
                  start: "top bottom",
                  end: "bottom top",
                  toggleActions: "play reverse play reverse",
                },
              },
            );
          });

        // 4. Scroll-scrubbed moving headline.
        container
          .querySelectorAll<HTMLElement>(".moving-text")
          .forEach((el, index) => {
            const wrapper = el.querySelector<HTMLElement>(".wrapper-text");
            if (!wrapper) return;

            const delta = () =>
              Math.min(-350, el.offsetWidth - wrapper.scrollWidth);

            gsap.fromTo(
              wrapper,
              { x: () => (index % 2 === 0 ? 0 : delta()) },
              {
                x: () => (index % 2 === 0 ? delta() : 0),
                ease: "none",
                force3D: true,
                scrollTrigger: {
                  trigger: el,
                  scrub: 0.5,
                  start: "20% bottom",
                  end: "80% top",
                  invalidateOnRefresh: true,
                },
              },
            );
          });

        // 5. Parallax over images. The image is over-scaled by exactly the
        //    travel distance so its edges never show inside the frame.
        container
          .querySelectorAll<HTMLElement>(".parallax-view")
          .forEach((wrap) => {
            const img = wrap.querySelector<HTMLElement>("img");
            if (!img) return;

            const speed = parseFloat(img.dataset.speed || "0.8");
            const raw = (1 - speed) * 50;
            const travel = Math.min(isSmall ? 8 : 14, Math.max(5, raw));
            const scale = 1 + (travel * 2) / 100 + 0.02;

            gsap.fromTo(
              img,
              { yPercent: -travel, scale },
              {
                yPercent: travel,
                scale,
                ease: "none",
                force3D: true,
                scrollTrigger: {
                  trigger: wrap,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.35,
                },
              },
            );
          });

        // 6. Fade-in reveals. One-shot: each trigger removes itself after it
        //    plays, so long pages do not keep hundreds of live triggers.
        container
          .querySelectorAll<HTMLElement>(".fade-anim")
          .forEach((item) => {
            const direction = item.dataset.direction || "bottom";
            const offset = parseFloat(item.dataset.offset || "45");
            const vars: gsap.TweenVars = {
              opacity: 0,
              duration: parseFloat(item.dataset.duration || "1"),
              delay: parseFloat(item.dataset.delay || "0.1"),
              ease: "power2.out",
              force3D: true,
              scrollTrigger: { trigger: item, start: "top 88%", once: true },
            };

            if (direction === "top") vars.y = -offset;
            else if (direction === "left") vars.x = -offset;
            else if (direction === "right") vars.x = offset;
            else vars.y = offset;

            gsap.from(item, vars);
          });

        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, container);
    };

    // Wait two frames so fonts and layout of the fresh route are settled.
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(start);
    });

    // Late-loading images change page height; re-measure once they settle.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      ctx?.revert();
    };
  }, [rebuildKey]);

  return <span ref={markerRef} hidden aria-hidden="true" />;
}
