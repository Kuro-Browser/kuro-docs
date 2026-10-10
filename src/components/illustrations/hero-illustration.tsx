/**
 * Original hero illustration for Kuro Docs: nested rounded squares (echoing the supplied mark's
 * concentric geometry without copying it) framing a stylised documentation page.
 * Decorative only — hidden from assistive technology. Colours come from the theme tokens.
 */
export function HeroIllustration({ className }: { className?: string }) {
  const stroke = "var(--line-strong)";
  return (
    <svg
      viewBox="0 0 480 380"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* nested frames */}
      <rect x="60" y="30" width="360" height="320" rx="64" stroke={stroke} strokeOpacity="0.35" strokeWidth="1.5" />
      <rect x="92" y="62" width="296" height="256" rx="48" stroke={stroke} strokeOpacity="0.55" strokeWidth="1.5" />
      <rect x="124" y="94" width="232" height="192" rx="34" stroke={stroke} strokeOpacity="0.8" strokeWidth="1.5" />

      {/* accent ring */}
      <circle cx="240" cy="190" r="118" stroke="var(--accent)" strokeWidth="2" strokeOpacity="0.85" strokeDasharray="2 9" strokeLinecap="round" />

      {/* docs page */}
      <g>
        <rect x="150" y="116" width="180" height="148" rx="16" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.5" />
        <rect x="150" y="116" width="46" height="148" rx="16" fill="var(--surface-2)" />
        <rect x="190" y="116" width="6" height="148" fill="var(--surface-2)" />
        <path d="M196 116v148" stroke="var(--line)" strokeWidth="1.5" />

        {/* sidebar rows */}
        <rect x="160" y="132" width="26" height="5" rx="2.5" fill="var(--accent)" />
        <rect x="160" y="148" width="22" height="4" rx="2" fill="var(--line-strong)" />
        <rect x="160" y="162" width="26" height="4" rx="2" fill="var(--line-strong)" />
        <rect x="160" y="176" width="18" height="4" rx="2" fill="var(--line-strong)" />

        {/* content */}
        <rect x="208" y="132" width="70" height="8" rx="4" fill="var(--fg)" fillOpacity="0.85" />
        <rect x="208" y="150" width="108" height="4" rx="2" fill="var(--line-strong)" />
        <rect x="208" y="162" width="96" height="4" rx="2" fill="var(--line-strong)" />
        <rect x="208" y="174" width="104" height="4" rx="2" fill="var(--line-strong)" />

        {/* code block */}
        <rect x="208" y="192" width="108" height="50" rx="8" fill="var(--surface-2)" stroke="var(--line)" />
        <path d="m216 205 5 4-5 4" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="227" y="207" width="44" height="4" rx="2" fill="var(--fg)" fillOpacity="0.55" />
        <rect x="216" y="222" width="68" height="4" rx="2" fill="var(--line-strong)" />
      </g>

      {/* search chip */}
      <g>
        <rect x="278" y="66" width="104" height="34" rx="17" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.5" />
        <circle cx="299" cy="83" r="5.5" stroke="var(--muted)" strokeWidth="1.6" />
        <path d="m303 87 4 4" stroke="var(--muted)" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="316" y="78" width="30" height="4" rx="2" fill="var(--line-strong)" />
        <rect x="316" y="86" width="20" height="4" rx="2" fill="var(--line-strong)" />
        <rect x="352" y="76" width="22" height="14" rx="5" fill="var(--surface-2)" stroke="var(--line)" />
      </g>

      {/* sparkle */}
      <path
        d="M104 282c.6 5.2 3 7.6 8.2 8.2-5.2.6-7.6 3-8.2 8.2-.6-5.2-3-7.6-8.2-8.2 5.2-.6 7.6-3 8.2-8.2Z"
        fill="var(--accent)"
        fillOpacity="0.9"
      />
      <circle cx="388" cy="300" r="4" fill="var(--line-strong)" />
      <circle cx="82" cy="120" r="3" fill="var(--line-strong)" />
    </svg>
  );
}
