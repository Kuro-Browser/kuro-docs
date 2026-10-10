import { Icon, type IconName } from "@/components/icons/icons";
import { Inline } from "@/lib/inline";
import { cn } from "@/lib/cn";
import type { CalloutTone } from "@/content/types";

const TONES: Record<CalloutTone, { icon: IconName; label: string; box: string; icon_: string }> = {
  note: {
    icon: "info",
    label: "Note",
    box: "border-line bg-surface",
    icon_: "text-muted",
  },
  warning: {
    icon: "alert",
    label: "Warning",
    box: "border-accent/40 bg-accent-soft",
    icon_: "text-accent",
  },
  placeholder: {
    icon: "file",
    label: "Information needed",
    box: "border-dashed border-line-strong bg-surface-2/50",
    icon_: "text-subtle",
  },
};

export function Callout({
  tone,
  title,
  text,
}: {
  tone: CalloutTone;
  title?: string;
  text: string | string[];
}) {
  const t = TONES[tone];
  const paragraphs = Array.isArray(text) ? text : [text];
  return (
    <aside className={cn("flex gap-3 rounded-xl border p-4", t.box)} aria-label={title ?? t.label}>
      <Icon name={t.icon} size={19} className={cn("mt-0.5 shrink-0", t.icon_)} />
      <div className="min-w-0 space-y-1.5 text-[15px] leading-relaxed">
        <p className="font-semibold text-fg">
          {tone === "placeholder" && <span className="mr-1.5 text-xs font-medium uppercase tracking-wider text-subtle">Needed ·</span>}
          {title ?? t.label}
        </p>
        {paragraphs.map((p, i) => (
          <p key={i} className="text-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-fg">
            <Inline text={p} />
          </p>
        ))}
      </div>
    </aside>
  );
}
