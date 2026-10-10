import type { FigureName } from "@/content/types";

interface FigureDef {
  alt: string;
  node: React.ReactNode;
}

/** Fixed-width SVG text helper so labels inherit the page font. */
const label = {
  fontFamily: "var(--font-sans)",
  fontSize: 15,
  fontWeight: 600,
} as const;
const sub = {
  fontFamily: "var(--font-sans)",
  fontSize: 12.5,
  fontWeight: 400,
} as const;

const LAYERS: FigureDef = {
  alt: "Diagram of three stacked layers. At the top is the user interface, in the middle Kuro Core, and at the bottom the browser engine, which is Firefox's Gecko today.",
  node: (
    <svg viewBox="0 0 560 296" fill="none" className="mx-auto h-auto w-full max-w-xl">
      <g>
        <rect x="40" y="16" width="480" height="68" rx="16" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.5" />
        <text x="68" y="46" fill="var(--fg)" style={label}>User interface</text>
        <text x="68" y="66" fill="var(--muted)" style={sub}>Tabs, sidebar, address bar, menus, themes, onboarding</text>
        <rect x="452" y="38" width="44" height="24" rx="12" fill="var(--surface-2)" stroke="var(--line)" />
        <circle cx="474" cy="50" r="5" stroke="var(--muted)" strokeWidth="1.5" />
      </g>

      <path d="M280 90v14m0 0-5-5m5 5 5-5" stroke="var(--subtle)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

      <g>
        <rect x="40" y="114" width="480" height="68" rx="16" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.8" />
        <text x="68" y="144" fill="var(--fg)" style={label}>Kuro Core</text>
        <text x="68" y="164" fill="var(--muted)" style={sub}>Tabs, workspaces, profiles, history, downloads, settings, privacy</text>
        <path d="M486 140h14M486 148h14M486 156h14" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      <path d="M280 188v14m0 0-5-5m5 5 5-5" stroke="var(--subtle)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

      <g>
        <rect x="40" y="212" width="480" height="68" rx="16" fill="var(--surface-2)" stroke="var(--line-strong)" strokeWidth="1.5" />
        <text x="68" y="242" fill="var(--fg)" style={label}>Browser engine</text>
        <text x="68" y="262" fill="var(--muted)" style={sub}>Rendering, networking, web standards — Firefox (Gecko) today</text>
        <rect x="454" y="236" width="40" height="22" rx="6" stroke="var(--muted)" strokeWidth="1.5" />
        <path d="M454 244h40" stroke="var(--muted)" strokeWidth="1.5" />
      </g>
    </svg>
  ),
};

const EMPTY_SETTINGS: FigureDef = {
  alt: "Illustration of three empty slider controls, representing a settings reference that has not been written yet.",
  node: (
    <svg viewBox="0 0 220 124" fill="none" className="mx-auto h-auto w-44">
      <g strokeLinecap="round" strokeWidth="2">
        <path d="M30 34h160" stroke="var(--line-strong)" strokeDasharray="1 7" />
        <path d="M30 62h160" stroke="var(--line-strong)" strokeDasharray="1 7" />
        <path d="M30 90h160" stroke="var(--line-strong)" strokeDasharray="1 7" />
      </g>
      <circle cx="78" cy="34" r="9" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="2" />
      <circle cx="140" cy="62" r="9" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
      <circle cx="104" cy="90" r="9" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="2" />
    </svg>
  ),
};

const EMPTY_ISSUES: FigureDef = {
  alt: "Illustration of an empty dashed circle with a check mark, representing that no known issues are listed.",
  node: (
    <svg viewBox="0 0 220 124" fill="none" className="mx-auto h-auto w-44">
      <circle cx="110" cy="62" r="40" stroke="var(--line-strong)" strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" />
      <circle cx="110" cy="62" r="26" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="2" />
      <path d="m99 63 8 8 15-17" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const FIGURES: Record<FigureName, FigureDef> = {
  layers: LAYERS,
  "empty-settings": EMPTY_SETTINGS,
  "empty-issues": EMPTY_ISSUES,
};

/** Informative figure: the SVG is exposed as an image with a meaningful accessible name. */
export function Figure({ name, alt, caption }: { name: FigureName; alt?: string; caption?: string }) {
  const def = FIGURES[name];
  const isEmpty = name.startsWith("empty-");
  return (
    <figure
      className={
        isEmpty
          ? "rounded-xl border border-dashed border-line-strong bg-surface-2/40 px-4 py-8"
          : "rounded-xl border border-line bg-surface px-4 py-6 sm:px-6"
      }
    >
      <div role="img" aria-label={alt ?? def.alt}>
        {def.node}
      </div>
      {caption && <figcaption className="mt-4 text-center text-[13px] text-muted">{caption}</figcaption>}
    </figure>
  );
}
