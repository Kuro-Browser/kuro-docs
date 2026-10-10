import Link from "next/link";
import { Icon } from "@/components/icons/icons";
import { Inline } from "@/lib/inline";
import { cn } from "@/lib/cn";
import type { FeatureStatus } from "@/content/types";

export const STATUS_INFO: Record<FeatureStatus, { label: string; description: string; dot: string; pill: string }> = {
  listed: {
    label: "Listed",
    description: "Named in the project's own feature list.",
    dot: "bg-fg",
    pill: "border-line-strong text-fg",
  },
  experimental: {
    label: "Experimental",
    description: "Under active development. Behavior may change.",
    dot: "bg-accent",
    pill: "border-accent/50 bg-accent-soft text-fg",
  },
  planned: {
    label: "Planned",
    description: "On the roadmap. Not available yet.",
    dot: "border border-subtle bg-transparent",
    pill: "border-dashed border-line-strong text-muted",
  },
};

export function StatusPill({ status }: { status: FeatureStatus }) {
  const info = STATUS_INFO[status];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium",
        info.pill,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", info.dot)} />
      {info.label}
    </span>
  );
}

export function StatusLegend() {
  return (
    <dl className="grid gap-2.5 rounded-xl border border-line bg-surface p-4 sm:grid-cols-3" aria-label="Status labels">
      {(Object.keys(STATUS_INFO) as FeatureStatus[]).map((status) => (
        <div key={status} className="space-y-1">
          <dt>
            <StatusPill status={status} />
          </dt>
          <dd className="text-[13px] leading-snug text-muted">{STATUS_INFO[status].description}</dd>
        </div>
      ))}
    </dl>
  );
}

export function FeatureList({
  items,
}: {
  items: { name: string; status: FeatureStatus; text: string; href?: string }[];
}) {
  return (
    <ul className="!mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface !pl-0 [list-style:none]">
      {items.map((item) => (
        <li key={item.name} className="flex flex-col gap-1.5 !mt-0 px-4 py-3.5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="min-w-0 space-y-0.5">
            <p className="!text-[15px] font-medium !leading-snug text-fg">
              {item.href ? (
                <Link href={item.href} className="no-prose-link inline-flex items-center gap-1 hover:text-accent">
                  {item.name}
                  <Icon name="arrowRight" size={14} className="text-subtle" />
                </Link>
              ) : (
                item.name
              )}
            </p>
            <p className="!text-[14px] !leading-relaxed text-muted">
              <Inline text={item.text} />
            </p>
          </div>
          <div className="sm:pt-0.5">
            <StatusPill status={item.status} />
            <span className="sr-only">: {STATUS_INFO[item.status].description}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
