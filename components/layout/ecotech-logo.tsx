"use client";

import { useSyncExternalStore } from "react";

export type CoreLogoVariant = "ring" | "cutaway";

const STORAGE_KEY = "ec-core-o";
let currentVariant: CoreLogoVariant | null = null;
const listeners = new Set<() => void>();

function readStored(): CoreLogoVariant {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "cutaway" ? "cutaway" : "ring";
  } catch {
    return "ring";
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CoreLogoVariant {
  if (currentVariant === null) currentVariant = readStored();
  return currentVariant;
}

function getServerSnapshot(): CoreLogoVariant {
  return "ring";
}

export function setCoreLogoVariant(next: CoreLogoVariant) {
  currentVariant = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l());
}

export function useCoreLogoVariant(): [
  CoreLogoVariant,
  (v: CoreLogoVariant) => void,
] {
  const variant = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return [variant, setCoreLogoVariant];
}

/**
 * The "O" in CORE drawn as a core. Both options use currentColor, so they
 * read black on white sections and white on the dark footer.
 *
 * - "ring" (option 1): the old badge, shrunk to letter size. Black outer
 *   border, a band of white, then a solid black core where the red dot was.
 * - "cutaway" (option 2): a sphere with its upper right quarter cut away,
 *   showing the solid core inside.
 */
export function CoreOGlyph({
  variant,
  className = "inline-block h-[0.74em] w-[0.74em] mx-[0.03em] self-center",
}: {
  variant: CoreLogoVariant;
  className?: string;
}) {
  if (variant === "ring") {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label="O"
      >
        <circle cx="16" cy="16" r="13.6" stroke="currentColor" strokeWidth="4.8" />
        <circle cx="16" cy="16" r="5.6" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="O"
    >
      {/* Shell: three quarters of the sphere outline */}
      <path
        d="M16 2.4 A13.6 13.6 0 1 0 29.6 16"
        stroke="currentColor"
        strokeWidth="4.6"
        strokeLinecap="butt"
      />
      {/* Cut faces running into the centre */}
      <path
        d="M16 0.1 V16 H31.9"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="miter"
      />
      {/* Inner layer boundary, visible inside the cut */}
      <path
        d="M16 5.2 A10.8 10.8 0 0 1 26.8 16"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {/* Exposed solid core */}
      <path d="M16 16 V9.4 A6.6 6.6 0 0 1 22.6 16 Z" fill="currentColor" />
    </svg>
  );
}

/**
 * Brand wordmark: only "ECOTECH CORE", no leading icon, with the O of CORE
 * replaced by CoreOGlyph.
 */
export function EcotechLogo({
  variant: forcedVariant,
  className = "font-heading text-[21px] font-semibold tracking-[-0.03em]",
}: {
  variant?: CoreLogoVariant;
  className?: string;
}) {
  const [activeVariant] = useCoreLogoVariant();
  const variant = forcedVariant ?? activeVariant;

  return (
    <span
      className={`inline-flex items-center gap-[0.3em] leading-none ${className}`}
    >
      <span>ECOTECH</span>
      <span className="inline-flex items-center">
        <span>C</span>
        <CoreOGlyph variant={variant} />
        <span>RE</span>
      </span>
    </span>
  );
}
