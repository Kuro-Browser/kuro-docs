import { Icon } from "@/components/icons/icons";

/** A short left-to-right (top-to-bottom on small screens) chain of steps. */
export function Flow({ label, steps }: { label: string; steps: { title: string; text: string }[] }) {
  return (
    <figure className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      <ol aria-label={label} className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {steps.map((step, i) => (
          <li key={step.title} className="flex flex-1 flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <div className="flex-1 rounded-lg border border-line bg-surface-2/60 px-3.5 py-3 text-center">
              <p className="text-[14px] font-semibold text-fg">{step.title}</p>
              <p className="mt-0.5 text-[12.5px] leading-snug text-muted">{step.text}</p>
            </div>
            {i < steps.length - 1 && (
              <Icon
                name="arrowRight"
                size={16}
                className="mx-auto shrink-0 rotate-90 text-subtle sm:mx-0 sm:rotate-0"
              />
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-center text-[13px] text-muted">{label}</figcaption>
    </figure>
  );
}
