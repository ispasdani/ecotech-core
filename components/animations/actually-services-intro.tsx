"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Exact recreation of Redox `/creative-agency` ActuallyArea:
 * "What services / we provide you / actually"
 *
 * Pure minimal typography on white that pins on scroll, fills each line
 * sequentially via `backgroundPositionX: 0%`, zooms through the headline,
 * and smoothly transitions the section background to `#111111` black.
 */
export function ActuallyServicesIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!section || !title) return;

      const lines = section.querySelectorAll<HTMLElement>(".t-line-fill");
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const lowCoreDevice =
        typeof navigator !== "undefined" &&
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 4;

      if (prefersReduced) {
        gsap.set(lines, { backgroundPositionX: "0%" });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (lowCoreDevice) {
          gsap.to(lines, {
            backgroundPositionX: "0%",
            stagger: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "center 40%",
              scrub: 0.6,
            },
          });
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.85,
            start: "top top",
            end: "+=1400",
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        lines.forEach((line, idx) => {
          tl.to(
            line,
            {
              backgroundPositionX: "0%",
              ease: "none",
              duration: 0.45,
            },
            idx * 0.28,
          );
        });

        tl.to(
          title,
          {
            scale: 16,
            opacity: 0,
            ease: "power3.in",
            duration: 0.85,
            force3D: true,
          },
          "+=0.15",
        );

        tl.to(
          section,
          {
            backgroundColor: "#111111",
            duration: 0.55,
            ease: "power2.inOut",
          },
          "-=0.55",
        );
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.to(lines, {
          backgroundPositionX: "0%",
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "center 45%",
            scrub: 0.5,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="What services we provide you actually"
      className="actually-area"
    >
      <div className="rx-container flex items-center justify-center">
        <h2
          ref={titleRef}
          className="actually-title font-display max-w-[780px] text-[44px] font-normal leading-[0.94] tracking-[-0.07em] sm:text-[64px] lg:text-[92px] xl:text-[110px]"
        >
          <span className="t-line-fill">What services</span>
          <span className="t-line-fill">we provide you</span>
          <span className="t-line-fill">actually</span>
        </h2>
      </div>
    </section>
  );
}
