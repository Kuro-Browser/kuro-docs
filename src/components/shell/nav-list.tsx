"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { Icon } from "@/components/icons/icons";
import { docHref, navGroups } from "@/config/nav";
import { cn } from "@/lib/cn";

/**
 * The grouped page list used by both the desktop sidebar and the mobile drawer.
 * Groups are collapsible (real buttons with aria-expanded). The group that holds the
 * current page is always expanded, so the active page is never hidden.
 */
export function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  // The sidebar and the mobile drawer both render this list, so ids must be unique per instance.
  const uid = useId();

  return (
    <nav aria-label="Documentation" className="space-y-5">
      {navGroups.map((group) => {
        const groupId = `${uid}-${group.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        const hasActive = group.items.some((item) => pathname === docHref(item.slug));
        const isOpen = hasActive || !collapsed[group.label];

        return (
          <div key={group.label}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={groupId}
              disabled={hasActive}
              onClick={() => setCollapsed((c) => ({ ...c, [group.label]: isOpen }))}
              className="group flex w-full items-center justify-between rounded-md px-2.5 py-1 text-left text-[13px] font-semibold tracking-wide text-fg disabled:cursor-default"
            >
              <span>{group.label}</span>
              {!hasActive && (
                <Icon
                  name="chevronDown"
                  size={15}
                  className={cn(
                    "text-subtle transition-transform duration-200 group-hover:text-fg",
                    !isOpen && "-rotate-90",
                  )}
                />
              )}
            </button>

            <div
              id={groupId}
              className="grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
              inert={!isOpen}
            >
              <ul className="min-h-0 overflow-hidden">
                {group.items.map((item) => {
                  const href = docHref(item.slug);
                  const current = pathname === href;
                  return (
                    <li key={item.slug} className="pt-0.5 first:pt-1.5">
                      <Link
                        href={href}
                        onClick={onNavigate}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[14.5px] transition-colors",
                          current
                            ? "bg-surface-2 font-medium text-fg"
                            : "text-muted hover:bg-surface-2/70 hover:text-fg",
                        )}
                      >
                        <Icon name={item.icon} size={17} className={cn(current ? "text-accent" : "text-subtle")} />
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
