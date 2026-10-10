import Link from "next/link";
import { Icon } from "@/components/icons/icons";
import { docHref, type NavItem } from "@/config/nav";

type Neighbour = (NavItem & { group: string }) | undefined;

/** Previous / next page links at the foot of every doc page. */
export function Pager({ prev, next }: { prev: Neighbour; next: Neighbour }) {
  if (!prev && !next) return null;
  return (
    <nav aria-label="Previous and next pages" className="mt-16 grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Link
          href={docHref(prev.slug)}
          rel="prev"
          className="group flex flex-col gap-1 rounded-xl border border-line bg-surface px-4 py-3.5 transition-colors hover:border-line-strong hover:bg-surface-2/50"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-subtle">
            <Icon name="arrowLeft" size={14} className="transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" />
            Previous
          </span>
          <span className="text-[15px] font-medium text-fg">{prev.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}
      {next && (
        <Link
          href={docHref(next.slug)}
          rel="next"
          className="group flex flex-col items-end gap-1 rounded-xl border border-line bg-surface px-4 py-3.5 text-right transition-colors hover:border-line-strong hover:bg-surface-2/50"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-subtle">
            Next
            <Icon name="arrowRight" size={14} className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </span>
          <span className="text-[15px] font-medium text-fg">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
