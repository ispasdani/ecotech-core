"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface GsapProviderProps {
  children: React.ReactNode;
}

/**
 * Exact Redox `/startup-agency` & `/creative-agency` animation engine:
 * 1. `fadeAnimation()` on `.fade-anim`
 * 2. `scaleAnim()` counter-scale reveal on `.works-wrapper-4 .image.scale` & `.scale img`
 * 3. `movingTextAnimation()` scroll-scrubbed horizontal marquee on `.moving-text .wrapper-text`
 * 4. `goFullAnimation()` full-bleed `100vw` expansion on `.go_full` (the image above ActuallyArea)
 * 5. `parallaxViewAnimation()` vertical depth parallax on `.parallax-view img[data-speed]`
 */
export function GsapProvider({ children }: GsapProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReduced) {
        gsap.set(container.querySelectorAll(".fade-anim, .scale, .scale img"), {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
        return;
      }

      // 1. fadeAnimation() from Redox src/utils/title-anim.ts
      const fadeItems = container.querySelectorAll<HTMLElement>(".fade-anim");
      fadeItems.forEach((item) => {
        const direction = item.getAttribute("data-direction") || "bottom";
        const offset = parseFloat(item.getAttribute("data-offset") || "50");
        const duration = parseFloat(
          item.getAttribute("data-duration") || "1.05",
        );
        const delay = parseFloat(item.getAttribute("data-delay") || "0.12");

        const fromVars: gsap.TweenVars = {
          opacity: 0,
          duration,
          delay,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: item,
            start: "top 86%",
          },
        };

        if (direction === "top") fromVars.y = -offset;
        else if (direction === "left") fromVars.x = -offset;
        else if (direction === "right") fromVars.x = offset;
        else fromVars.y = offset;

        gsap.from(item, fromVars);
      });

      // 2. scaleAnim() from Redox src/utils/img-anim.ts
      const scaleBoxes = container.querySelectorAll<HTMLElement>(".scale");
      const scaleImgs = container.querySelectorAll<HTMLElement>(".scale img");
      scaleBoxes.forEach((item) => {
        gsap.to(item, {
          scale: 1,
          duration: 1,
          ease: "power1.out",
          force3D: true,
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play reverse play reverse",
          },
        });
      });
      scaleImgs.forEach((img) => {
        gsap.set(img, { scale: 1.3 });
        gsap.to(img, {
          scale: 1,
          duration: 1,
          ease: "power1.out",
          force3D: true,
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play reverse play reverse",
          },
        });
      });

      // 3. movingTextAnimation() from Redox src/utils/moving-anim.ts
      const movingSections =
        container.querySelectorAll<HTMLElement>(".moving-text");
      movingSections.forEach((el, index) => {
        const wrapper = el.querySelector<HTMLElement>(".wrapper-text");
        if (!wrapper) return;

        const computeDelta = () => {
          const sectionWidth = el.offsetWidth;
          const scrollWidth = wrapper.scrollWidth;
          return Math.min(-350, sectionWidth - scrollWidth);
        };

        gsap.fromTo(
          wrapper,
          { x: () => (index % 2 === 0 ? 0 : computeDelta()) },
          {
            x: () => (index % 2 === 0 ? computeDelta() : 0),
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

      // 4. goFullAnimation() from Redox src/utils/img-anim.ts (expands image above ActuallyArea to 100vw)
      const goFullItems = container.querySelectorAll<HTMLElement>(".go_full");
      goFullItems.forEach((item) => {
        gsap.set(item, {
          position: "relative",
          left: "50%",
          xPercent: -50,
          width: "100%",
        });
        gsap.to(item, {
          width: "100vw",
          ease: "none",
          scrollTrigger: {
            trigger: item,
            scrub: 0,
            start: "top bottom",
            end: "bottom bottom",
            invalidateOnRefresh: true,
          },
        });
      });

      // 5. Parallax effect on .parallax-view images (data-speed="0.8", "0.7", "0.6")
      const parallaxWrappers =
        container.querySelectorAll<HTMLElement>(".parallax-view");
      parallaxWrappers.forEach((wrap) => {
        const img = wrap.querySelector<HTMLElement>("img");
        if (!img) return;
        const speedAttr = parseFloat(img.getAttribute("data-speed") || "0.8");
        const intensity = Math.max(10, Math.round((1 - speedAttr) * 70));

        gsap.set(img, { scale: 1.18, force3D: true });
        gsap.fromTo(
          img,
          { yPercent: -intensity },
          {
            yPercent: intensity,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
}
