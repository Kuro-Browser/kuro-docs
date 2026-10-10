import { Inline } from "@/lib/inline";

/** Numbered path with a connecting rail. Real <ol> so the order is announced. */
export function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="!mt-5 !list-none !pl-0">
      {items.map((item, i) => (
        <li key={item.title} className="relative !mt-0 flex gap-4 pb-6 last:pb-0">
          {i < items.length - 1 && (
            <span aria-hidden="true" className="absolute left-[15px] top-9 h-[calc(100%-2.25rem)] w-px bg-line" />
          )}
          <span
            aria-hidden="true"
            className="z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface text-[13px] font-semibold text-fg"
          >
            {i + 1}
          </span>
          <div className="min-w-0 pt-1">
            <p className="!text-[16px] font-semibold !leading-snug text-fg">{item.title}</p>
            <p className="!mt-1 !text-[15px] !leading-relaxed text-muted">
              <Inline text={item.text} />
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
