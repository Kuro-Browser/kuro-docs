"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/icons";

type State = "idle" | "copied" | "failed";

/** Copies `text` to the clipboard and announces the result to assistive technology. */
export function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<State>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    let next: State = "copied";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      next = fallbackCopy(text) ? "copied" : "failed";
    }
    setState(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code to clipboard"
        title="Copy"
        className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted transition-colors hover:bg-surface-2 hover:text-fg"
      >
        <Icon name={state === "copied" ? "check" : "copy"} size={14} className={state === "copied" ? "text-accent" : undefined} />
        <span aria-hidden="true">{state === "copied" ? "Copied" : state === "failed" ? "Failed" : "Copy"}</span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? "Copied to clipboard" : state === "failed" ? "Copy failed" : ""}
      </span>
    </>
  );
}

/** For non-secure contexts or older browsers where the async clipboard API is unavailable. */
function fallbackCopy(text: string): boolean {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  area.remove();
  return ok;
}
