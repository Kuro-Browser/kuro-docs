"use client";

import { Icon } from "@/components/icons/icons";
import { setSidebarCollapsed } from "@/lib/sidebar";

/** Desktop-only: re-opens the sidebar after it has been collapsed. Hidden by CSS otherwise. */
export function SidebarOpenButton() {
  return (
    <button
      id="sidebar-open"
      type="button"
      onClick={() => setSidebarCollapsed(false)}
      aria-label="Expand sidebar"
      title="Expand sidebar"
      className="sidebar-open-btn size-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      <Icon name="panel" size={19} />
    </button>
  );
}
