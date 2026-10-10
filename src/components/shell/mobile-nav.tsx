"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/icons/icons";
import { site } from "@/config/site";
import { trapTab } from "@/lib/focus";
import { BrandLink } from "./brand-link";
import { NavList } from "./nav-list";
import { ThemeToggle } from "./theme-toggle";

/**
 * Small-screen navigation drawer. Uses a native <dialog>, so the browser provides inertness of the
 * page behind it, Escape-to-close and return of focus to the menu button; trapTab keeps Tab cycling
 * inside it instead of escaping to the browser's own UI.
 */
export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  const close = () => dialogRef.current?.close();

  // Close if the route changes while open (e.g. browser back).
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      dialogRef.current?.close();
    }
  }, [pathname]);

  // If the viewport grows to desktop width while open, the drawer is no longer relevant.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && dialogRef.current?.close();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        className="inline-flex size-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg lg:hidden"
      >
        <Icon name="menu" size={21} />
      </button>

      <dialog
        ref={dialogRef}
        className="drawer-dialog"
        aria-label="Navigation menu"
        onKeyDown={(e) => trapTab(e, dialogRef.current)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="flex h-14 shrink-0 items-center justify-between pl-3 pr-2">
          <BrandLink onClick={close} />
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation menu"
            className="inline-flex size-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-6 pt-3">
          <NavList onNavigate={close} />
        </div>

        <div className="flex shrink-0 items-center justify-between border-t border-line px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kuro on GitHub (opens in a new tab)"
            className="inline-flex size-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <Icon name="github" size={20} />
          </a>
          <ThemeToggle />
        </div>
      </dialog>
    </>
  );
}
