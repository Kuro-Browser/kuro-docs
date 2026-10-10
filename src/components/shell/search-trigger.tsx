"use client";

import { Icon } from "@/components/icons/icons";
import { cn } from "@/lib/cn";
import { ShortcutHint, useSearch } from "./search-provider";

/** Opens the search dialog. "field" looks like an input; "icon" is a compact button for small screens. */
export function SearchTrigger({ variant, className }: { variant: "field" | "icon"; className?: string }) {
  const { open, preload } = useSearch();

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={open}
        onPointerEnter={preload}
        onFocus={preload}
        aria-label="Search documentation"
        aria-haspopup="dialog"
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg",
          className,
        )}
      >
        <Icon name="search" size={19} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      onPointerEnter={preload}
      onFocus={preload}
      aria-haspopup="dialog"
      aria-keyshortcuts="Control+K Meta+K"
      className={cn(
        "flex h-10 w-full items-center gap-2.5 rounded-xl border border-line bg-surface px-3 text-left text-sm text-muted transition-colors hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      <Icon name="search" size={17} className="shrink-0" />
      <span className="flex-1 truncate">Search</span>
      <ShortcutHint />
    </button>
  );
}
