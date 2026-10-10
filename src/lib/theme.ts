/**
 * Client-side theme store. The initial value is applied before first paint by the inline
 * script in components/shell/theme-script.tsx; this module handles changes after that.
 *
 *   preference:  "system" | "light" | "dark"   (persisted; "system" means nothing is stored)
 *   resolved:    "light" | "dark"              (what is actually shown)
 */
export type ThemePref = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export const THEME_KEY = "kuro-docs-theme";
const EVENT = "kuro-docs-theme-change";

function prefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolve(pref: ThemePref): ResolvedTheme {
  if (pref === "system") return prefersDark() ? "dark" : "light";
  return pref;
}

function apply(pref: ThemePref, animate: boolean) {
  const root = document.documentElement;
  if (animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 300);
  }
  root.dataset.theme = resolve(pref);
  root.dataset.themePref = pref;
  window.dispatchEvent(new Event(EVENT));
}

export function setThemePref(pref: ThemePref) {
  try {
    if (pref === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, pref);
  } catch {
    /* storage unavailable: the choice still applies for this page view */
  }
  apply(pref, true);
}

export function subscribeTheme(onChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");

  const onSystemChange = () => {
    if (document.documentElement.dataset.themePref === "system") apply("system", false);
  };
  const onStorage = (e: StorageEvent) => {
    if (e.key !== THEME_KEY) return;
    const next = e.newValue === "light" || e.newValue === "dark" ? e.newValue : "system";
    apply(next, false);
  };

  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage);
  mq.addEventListener("change", onSystemChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
    mq.removeEventListener("change", onSystemChange);
  };
}

/** Primitive string snapshot ("pref:resolved") so useSyncExternalStore stays stable. */
export function getThemeSnapshot(): string {
  const root = document.documentElement;
  return `${root.dataset.themePref ?? "system"}:${root.dataset.theme ?? "light"}`;
}

export const getServerThemeSnapshot = () => "system:light";

export function parseThemeSnapshot(snapshot: string): { pref: ThemePref; resolved: ResolvedTheme } {
  const [pref, resolved] = snapshot.split(":");
  return {
    pref: pref === "light" || pref === "dark" ? pref : "system",
    resolved: resolved === "dark" ? "dark" : "light",
  };
}
