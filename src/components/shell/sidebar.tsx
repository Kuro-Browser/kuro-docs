"use client";

import { Icon } from "@/components/icons/icons";
import { site } from "@/config/site";
import { setSidebarCollapsed } from "@/lib/sidebar";
import { BrandLink } from "./brand-link";
import { NavList } from "./nav-list";
import { SearchTrigger } from "./search-trigger";
import { ThemeToggle } from "./theme-toggle";

/** Persistent desktop sidebar (lg and up). Collapsible; the choice is remembered. */
export function Sidebar() {
  return (
    <aside
      id="docs-sidebar"
      aria-label="Sidebar"
      className="shell-sidebar fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-line bg-canvas lg:flex"
    >
      <div className="flex h-14 shrink-0 items-center justify-between pl-3 pr-2">
        <BrandLink />
        <button
          id="sidebar-collapse"
          type="button"
          onClick={() => setSidebarCollapsed(true)}
          aria-label="Collapse sidebar"
          title="Collapse sidebar"
          className="inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
        >
          <Icon name="panel" size={18} />
        </button>
      </div>

      <div className="px-3 pb-3">
        <SearchTrigger variant="field" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-6 pt-1">
        <NavList />
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-line px-3 py-3">
        <a
          href={site.links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Kuro on GitHub (opens in a new tab)"
          title="GitHub"
          className="inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
        >
          <Icon name="github" size={19} />
        </a>
        <ThemeToggle />
      </div>
    </aside>
  );
}
