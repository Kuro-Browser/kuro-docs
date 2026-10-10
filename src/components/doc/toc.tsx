"use client";

import { useEffect, useRef, useState } from "react";
import type { Heading } from "@/content/types";
import { cn } from "@/lib/cn";

/** A heading counts as "current" once its top has passed this line (px from the viewport top). */
const ACTIVATION_LINE = 140;

/**
 * "On this page" with scroll-spy.
 *
 * The current section is the last heading whose top has passed the activation line. Two cases need
 * care: at the very bottom of the page the final section can never reach the line, so it is
 * activated explicitly; and after a click or #hash jump the chosen entry is held until the reader
 * scrolls by hand, so the highlight never contradicts what they just selected.
 */
export function Toc({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");
  const lockedRef = useRef<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    let frame = 0;
    const compute = () => {
      frame = 0;
      if (lockedRef.current) return;

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActiveId(elements[elements.length - 1]!.id);
        return;
      }
      let current = elements[0]!.id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= ACTIVATION_LINE) current = el.id;
        else break;
      }
      setActiveId(current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };

    const lockToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && elements.some((el) => el.id === id)) {
        lockedRef.current = id;
        setActiveId(id);
      }
    };
    const releaseLock = () => {
      if (lockedRef.current) {
        lockedRef.current = null;
        schedule();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) releaseLock();
    };

    lockToHash();
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", lockToHash);
    window.addEventListener("wheel", releaseLock, { passive: true });
    window.addEventListener("touchmove", releaseLock, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", lockToHash);
      window.removeEventListener("wheel", releaseLock);
      window.removeEventListener("touchmove", releaseLock);
      window.removeEventListener("keydown", onKey);
    };
  }, [headings]);

  return (
    <nav aria-label="On this page">
      <p className="mb-3 text-[13px] font-semibold text-fg">On this page</p>
      <ul className="space-y-0.5 border-l border-line">
        {headings.map((h) => {
          const active = activeId === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l py-1 text-[13.5px] leading-snug transition-colors",
                  h.level === 3 ? "pl-7" : "pl-4",
                  active
                    ? "border-accent font-medium text-fg"
                    : "border-transparent text-muted hover:border-line-strong hover:text-fg",
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
