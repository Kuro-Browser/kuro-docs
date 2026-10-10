"use client";

import { useSyncExternalStore } from "react";
import { Icon, type IconName } from "@/components/icons/icons";
import { cn } from "@/lib/cn";
import {
  getServerThemeSnapshot,
  getThemeSnapshot,
  parseThemeSnapshot,
  setThemePref,
  subscribeTheme,
  type ThemePref,
} from "@/lib/theme";

function useTheme() {
  const snapshot = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  return parseThemeSnapshot(snapshot);
}

const OPTIONS: { value: ThemePref; label: string; icon: IconName }[] = [
  { value: "system", label: "Use system theme", icon: "monitor" },
  { value: "light", label: "Light theme", icon: "sun" },
  { value: "dark", label: "Dark theme", icon: "moon" },
];

/** Segmented control: system / light / dark. */
export function ThemeToggle({ className }: { className?: string }) {
  const { pref } = useTheme();
  return (
    <div
      role="group"
      aria-label="Color theme"
      className={cn("inline-flex items-center gap-0.5 rounded-full border border-line bg-surface-2 p-0.5", className)}
    >
      {OPTIONS.map((option) => {
        const active = pref === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            aria-label={option.label}
            title={option.label}
            onClick={() => setThemePref(option.value)}
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-full transition-colors",
              active ? "bg-surface text-fg shadow-sm ring-1 ring-line" : "text-muted hover:text-fg",
            )}
          >
            <Icon name={option.icon} size={15} />
          </button>
        );
      })}
    </div>
  );
}

/** Single button for tight spaces: flips between light and dark. */
export function ThemeIconButton({ className }: { className?: string }) {
  const { resolved } = useTheme();
  const next = resolved === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setThemePref(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg",
        className,
      )}
    >
      <Icon name={resolved === "dark" ? "sun" : "moon"} size={19} />
    </button>
  );
}
