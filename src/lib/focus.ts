const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

function focusableWithin(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (el) =>
      el.tabIndex >= 0 && // programmatically-focusable-only items (tabindex="-1") are not Tab stops
      !el.closest("[inert]") &&
      el.getClientRects().length > 0 &&
      getComputedStyle(el).visibility !== "hidden",
  );
}

/**
 * Keeps Tab / Shift+Tab cycling inside a modal. A native modal <dialog> already makes the rest of the
 * page inert, but at the first/last control the browser would hand focus to its own UI (address bar).
 * Call from the dialog's onKeyDown.
 */
export function trapTab(event: { key: string; shiftKey: boolean; preventDefault: () => void }, root: HTMLElement | null) {
  if (event.key !== "Tab" || !root) return;
  const items = focusableWithin(root);
  if (items.length === 0) {
    event.preventDefault();
    return;
  }
  const first = items[0]!;
  const last = items[items.length - 1]!;
  const active = document.activeElement;

  if (event.shiftKey && (active === first || !root.contains(active))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (active === last || !root.contains(active))) {
    event.preventDefault();
    first.focus();
  }
}
