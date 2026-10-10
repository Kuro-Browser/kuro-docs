"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@/components/icons/icons";
import { Inline } from "@/lib/inline";

interface Item {
  id: string;
  q: string;
  a: string[];
}

/**
 * Accordion built on native <details>/<summary>, so it works without JavaScript and is keyboard
 * accessible by default. JavaScript only opens the question that a #hash (from search or a link) points to.
 */
export function FaqList({ items }: { items: Item[] }) {
  const refs = useRef<Record<string, HTMLDetailsElement | null>>({});

  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const el = refs.current[id];
      if (el) {
        el.open = true;
        el.scrollIntoView({ block: "start" });
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
      {items.map((item) => (
        <details
          key={item.id}
          id={item.id}
          ref={(el) => {
            refs.current[item.id] = el;
          }}
          className="group scroll-mt-20"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-left text-[15.5px] font-medium text-fg transition-colors hover:bg-surface-2/60 [&::-webkit-details-marker]:hidden">
            <h2 className="!m-0 !text-[15.5px] !font-medium !leading-snug !tracking-normal">{item.q}</h2>
            <Icon
              name="chevronDown"
              size={18}
              className="shrink-0 text-subtle transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="space-y-2.5 px-4 pb-4 pt-0.5">
            {item.a.map((para, i) => (
              <p key={i} className="!text-[15px] !leading-relaxed text-muted [&_strong]:text-fg">
                <Inline text={para} />
              </p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
