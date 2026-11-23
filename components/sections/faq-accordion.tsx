"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({
  items,
  theme = "light",
}: {
  items: readonly FaqItem[];
  theme?: "light" | "dark";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isDark = theme === "dark";

  return (
    <div
      className={`divide-y ${
        isDark
          ? "divide-white/12 border-y border-white/12"
          : "divide-black/12 border-y border-black/12"
      }`}
    >
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question} className="py-5 sm:py-6">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-6 text-left"
            >
              <span
                className={`font-heading text-[20px] font-normal leading-[1.2] tracking-[-0.02em] sm:text-[24px] ${
                  isDark ? "text-white" : "text-[#111111]"
                }`}
              >
                {item.question}
              </span>
              <span
                className={`mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                  isOpen
                    ? isDark
                      ? "border-white bg-white text-[#111111]"
                      : "border-[#111111] bg-[#111111] text-white"
                    : isDark
                      ? "border-white/20 text-neutral-300"
                      : "border-black/15 text-[#111111]"
                }`}
              >
                {isOpen ? (
                  <Minus className="h-3.5 w-3.5" />
                ) : (
                  <Plus className="h-3.5 w-3.5" />
                )}
              </span>
            </button>

            {isOpen && (
              <p
                className={`mt-4 max-w-3xl text-base leading-relaxed ${
                  isDark ? "text-neutral-300" : "text-neutral-600"
                }`}
              >
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
