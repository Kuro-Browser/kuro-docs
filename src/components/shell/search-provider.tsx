"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Icon, type IconName } from "@/components/icons/icons";
import { docHref, flatNav } from "@/config/nav";
import type { SearchEntry } from "@/content/types";
import { cn } from "@/lib/cn";
import { trapTab } from "@/lib/focus";
import { searchEntries, type Segment } from "@/lib/search";

interface SearchContextValue {
  open: () => void;
  /** Start fetching the index early (called on hover/focus of a trigger). */
  preload: () => void;
}

const SearchContext = createContext<SearchContextValue>({ open: () => {}, preload: () => {} });
export const useSearch = () => useContext(SearchContext);

const noopSubscribe = () => () => {};
const isApplePlatform = () => /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);

/** Platform-correct shortcut hint. Renders "Ctrl" on the server and swaps to "⌘" on Apple devices. */
export function ShortcutHint({ className }: { className?: string }) {
  const apple = useSyncExternalStore(noopSubscribe, isApplePlatform, () => false);
  return (
    <span className={cn("inline-flex items-center gap-1", className)} aria-hidden="true">
      <kbd className="kbd">{apple ? "⌘" : "Ctrl"}</kbd>
      <kbd className="kbd">K</kbd>
    </span>
  );
}

interface ResultItem {
  key: string;
  href: string;
  title: string;
  meta: string;
  icon: IconName;
  snippet?: Segment[];
}

const iconBySlug = new Map(flatNav.map((n) => [n.slug, n.icon]));
const iconForHref = (href: string): IconName => {
  const slug = href.replace(/^\/docs\//, "").split("#")[0] ?? "";
  return iconBySlug.get(slug) ?? "file";
};

const BROWSE_ITEMS: ResultItem[] = flatNav.map((n) => ({
  key: n.slug,
  href: docHref(n.slug),
  title: n.title,
  meta: n.group,
  icon: n.icon,
}));

export function SearchProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const loadingRef = useRef(false);
  const listId = useId();

  const [entries, setEntries] = useState<SearchEntry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const preload = useCallback(() => {
    if (entries || loadingRef.current) return;
    loadingRef.current = true;
    fetch("/search-index.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Search index request failed: ${res.status}`);
        return res.json() as Promise<SearchEntry[]>;
      })
      .then((data) => {
        setEntries(data);
        setFailed(false);
      })
      .catch(() => setFailed(true))
      .finally(() => {
        loadingRef.current = false;
      });
  }, [entries]);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    preload();
  }, [preload]);

  const close = useCallback(() => dialogRef.current?.close(), []);

  // Ctrl+K / Cmd+K toggles search from anywhere, including while typing in a field.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "k" || !(e.ctrlKey || e.metaKey) || e.altKey || e.shiftKey) return;
      e.preventDefault();
      const dialog = dialogRef.current;
      if (dialog?.open) dialog.close();
      else open();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const trimmed = query.trim();
  const items: ResultItem[] = useMemo(() => {
    if (!trimmed) return BROWSE_ITEMS;
    if (!entries) return [];
    return searchEntries(entries, trimmed).map(({ entry, snippet }) => ({
      key: entry.id,
      href: entry.href,
      title: entry.heading ?? entry.page,
      meta: entry.heading ? `${entry.page} · ${entry.group}` : entry.group,
      icon: iconForHref(entry.href),
      snippet,
    }));
  }, [trimmed, entries]);

  const activeIndex = Math.min(active, Math.max(items.length - 1, 0));
  const optionId = (i: number) => `${listId}-opt-${i}`;

  // Keep the highlighted option scrolled into view.
  useEffect(() => {
    document.getElementById(`${listId}-opt-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, items, listId]);

  const go = (item: ResultItem | undefined) => {
    if (!item) return;
    close();
    router.push(item.href);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (items.length) setActive((activeIndex + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (items.length) setActive((activeIndex - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(items[activeIndex]);
    }
  };

  const loading = trimmed !== "" && !entries && !failed;
  const showList = !failed && !loading && !(trimmed && items.length === 0);
  const statusText = failed
    ? "Search is unavailable."
    : loading
      ? "Loading search."
      : trimmed
        ? `${items.length} ${items.length === 1 ? "result" : "results"}`
        : "";

  return (
    <SearchContext.Provider value={{ open, preload }}>
      {children}
      <dialog
        ref={dialogRef}
        className="search-dialog"
        aria-label="Search documentation"
        onKeyDown={(e) => trapTab(e, dialogRef.current)}
        onClose={() => {
          setQuery("");
          setActive(0);
        }}
        onClick={(e) => {
          // A click on the backdrop targets the <dialog> itself.
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 focus-within:shadow-[inset_0_-2px_0_0_var(--accent)]">
          <Icon name="search" size={19} className="shrink-0 text-muted" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-label="Search documentation"
            aria-expanded={showList}
            aria-controls={showList ? listId : undefined}
            aria-autocomplete="list"
            aria-activedescendant={showList && items.length ? optionId(activeIndex) : undefined}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="go"
            placeholder="Search the docs…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            className="h-14 min-w-0 flex-1 rounded-none bg-transparent text-base text-fg outline-none placeholder:text-subtle focus-visible:outline-none"
          />
          <button
            type="button"
            onClick={close}
            className="inline-flex h-8 shrink-0 items-center rounded-md px-1.5 text-xs text-muted hover:text-fg sm:hidden"
          >
            <span className="sr-only">Close search</span>
            <Icon name="close" size={18} />
          </button>
          <kbd className="kbd hidden sm:inline-block" aria-hidden="true">
            Esc
          </kbd>
        </div>

        <div tabIndex={-1} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 outline-none">
          <p role="status" aria-live="polite" className="sr-only">
            {statusText}
          </p>

          {failed ? (
            <EmptyState title="Search is unavailable right now" body="Reload the page and try again." />
          ) : loading ? (
            <p className="px-3 py-8 text-center text-sm text-muted">Loading…</p>
          ) : trimmed && items.length === 0 ? (
            <EmptyState
              title={`No results for “${trimmed}”`}
              body="Check the spelling, or try fewer or more general words."
            />
          ) : (
            <>
              <p className="px-3 pb-1.5 pt-2 text-xs font-medium text-subtle" aria-hidden="true">
                {trimmed ? "Results" : "Browse the docs"}
              </p>
              <ul id={listId} role="listbox" aria-label={trimmed ? "Search results" : "Documentation pages"} className="space-y-0.5">
                {items.map((item, i) => (
                  <li key={item.key} role="presentation">
                    <Link
                      id={optionId(i)}
                      href={item.href}
                      role="option"
                      aria-selected={i === activeIndex}
                      tabIndex={-1}
                      onClick={close}
                      onMouseMove={() => i !== activeIndex && setActive(i)}
                      className={cn(
                        "flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                        i === activeIndex ? "bg-surface-2" : "hover:bg-surface-2",
                      )}
                    >
                      <Icon name={item.icon} size={18} className="mt-0.5 shrink-0 text-muted" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] font-medium text-fg">{item.title}</span>
                        <span className="block truncate text-xs text-subtle">{item.meta}</span>
                        {item.snippet && item.snippet.length > 0 && (
                          <span className="mt-1 line-clamp-2 block text-[13px] leading-5 text-muted">
                            {item.snippet.map((seg, idx) =>
                              seg.hit ? (
                                <mark key={idx} className="rounded-sm bg-accent-soft font-medium text-fg">
                                  {seg.text}
                                </mark>
                              ) : (
                                <span key={idx}>{seg.text}</span>
                              ),
                            )}
                          </span>
                        )}
                      </span>
                      {i === activeIndex && (
                        <Icon name="arrowRight" size={16} className="mt-1 hidden shrink-0 text-subtle sm:block" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div
          className="hidden items-center gap-4 border-t border-line px-4 py-2.5 text-xs text-subtle sm:flex"
          aria-hidden="true"
        >
          <span className="inline-flex items-center gap-1.5">
            <kbd className="kbd">↑</kbd>
            <kbd className="kbd">↓</kbd> to navigate
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="kbd">↵</kbd> to open
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="kbd">esc</kbd> to close
          </span>
        </div>
      </dialog>
    </SearchContext.Provider>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <span className="mb-3 inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface-2 text-muted">
        <Icon name="search" size={20} />
      </span>
      <p className="text-[15px] font-medium text-fg">{title}</p>
      <p className="mt-1 max-w-xs text-sm text-muted">{body}</p>
    </div>
  );
}
