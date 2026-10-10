import Link from "next/link";
import { Icon } from "@/components/icons/icons";
import { site } from "@/config/site";
import { BrandLink } from "./brand-link";
import { MobileNav } from "./mobile-nav";
import { SearchTrigger } from "./search-trigger";
import { SidebarOpenButton } from "./sidebar-open-button";
import { ThemeIconButton } from "./theme-toggle";

/**
 * Compact header. On desktop the sidebar carries the brand, search and theme controls, so the
 * header only appears there when the sidebar is collapsed. On small screens it is always shown.
 */
export function Topbar({ homeLayout = false }: { homeLayout?: boolean }) {
  return (
    <header
      className={
        homeLayout
          ? "sticky top-0 z-20 border-b border-line bg-canvas/85 backdrop-blur supports-[backdrop-filter]:bg-canvas/70"
          : "docs-topbar sticky top-0 z-20 border-b border-line bg-canvas/90 backdrop-blur supports-[backdrop-filter]:bg-canvas/75"
      }
    >
      <div
        className={
          homeLayout
            ? "mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:px-6"
            : "flex h-14 items-center gap-1 px-2 sm:px-4"
        }
      >
        {!homeLayout && (
          <>
            <MobileNav />
            <SidebarOpenButton />
          </>
        )}
        <BrandLink />

        <div className="ml-auto flex items-center gap-0.5">
          {homeLayout && (
            <nav aria-label="Primary" className="mr-2 hidden items-center gap-1 sm:flex">
              <Link
                href="/docs/getting-started"
                className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                Getting started
              </Link>
              <Link
                href="/docs/installation"
                className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                Installation
              </Link>
            </nav>
          )}
          <SearchTrigger variant="icon" />
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kuro on GitHub (opens in a new tab)"
            className="hidden size-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg sm:inline-flex"
          >
            <Icon name="github" size={19} />
          </a>
          <ThemeIconButton />
        </div>
      </div>
    </header>
  );
}
