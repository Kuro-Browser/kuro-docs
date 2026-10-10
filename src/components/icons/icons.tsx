import type { ReactNode, SVGProps } from "react";

/**
 * Kuro Docs icon set. Simple 24px stroke icons drawn for this project
 * (consistent 1.6 stroke, round caps/joins). The GitHub mark is the one
 * filled glyph and follows the widely used 24px mark geometry.
 */
const paths = {
  book: (
    <>
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v14H7.5A2.5 2.5 0 0 0 5 19.5v-14Z" />
      <path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-4" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.6 8.4-1.9 4.9-4.9 1.9 1.9-4.9 4.9-1.9Z" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v11" />
      <path d="m7.5 10.8 4.5 4.5 4.5-4.5" />
      <path d="M5 19.5h14" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="2" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="2" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="2" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 7h8" />
      <path d="M16 7h4" />
      <circle cx="14" cy="7" r="2" />
      <path d="M4 17h3" />
      <path d="M11 17h9" />
      <circle cx="9" cy="17" r="2" />
    </>
  ),
  sparkle: (
    <>
      <path d="M11 3.5c.5 4.4 2.6 6.5 7 7-4.4.5-6.5 2.6-7 7-.5-4.4-2.6-6.5-7-7 4.4-.5 6.5-2.6 7-7Z" />
      <path d="M18.5 15.5v4" />
      <path d="M16.5 17.5h4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6.2v5.3c0 4.3 2.9 7.3 7 9 4.1-1.7 7-4.7 7-9V6.2l-7-2.7Z" />
      <path d="m9 11.8 2.2 2.2 3.8-4" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.6a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1.1.9-1.1 1.6" />
      <path d="M12 16.8h.01" />
    </>
  ),
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="m5.7 5.7 3.8 3.8" />
      <path d="m14.5 14.5 3.8 3.8" />
      <path d="m18.3 5.7-3.8 3.8" />
      <path d="m9.5 14.5-3.8 3.8" />
    </>
  ),
  branch: (
    <>
      <circle cx="6" cy="5.5" r="2" />
      <circle cx="6" cy="18.5" r="2" />
      <circle cx="18" cy="8.5" r="2" />
      <path d="M6 7.5v9" />
      <path d="M18 10.5v.5a4 4 0 0 1-4 4H9.5A3.5 3.5 0 0 0 6 16.5" />
    </>
  ),
  chevronRight: <path d="m9.5 6 6 6-6 6" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="3.8" />
      <path d="M12 2.8V5" />
      <path d="M12 19v2.2" />
      <path d="M2.8 12H5" />
      <path d="M19 12h2.2" />
      <path d="m5.5 5.5 1.6 1.6" />
      <path d="m16.9 16.9 1.6 1.6" />
      <path d="m5.5 18.5 1.6-1.6" />
      <path d="m16.9 7.1 1.6-1.6" />
    </>
  ),
  moon: <path d="M20 14.2A8 8 0 0 1 9.8 4a8 8 0 1 0 10.2 10.2Z" />,
  monitor: (
    <>
      <rect x="3" y="4.5" width="18" height="12" rx="2" />
      <path d="M9 20h6" />
      <path d="M12 16.5V20" />
    </>
  ),
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
      <path d="M15.5 8.5v-2a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 7.8h.01" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.8 21 19.5H3L12 3.8Z" />
      <path d="M12 10v4.2" />
      <path d="M12 16.9h.01" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </>
  ),
  arrowLeft: (
    <>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  panel: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="3" />
      <path d="M9.5 4.5v15" />
    </>
  ),
  chat: <path d="M20 12a8 8 0 0 1-11.7 7.1L4 20l.9-4.1A8 8 0 1 1 20 12Z" />,
  code: (
    <>
      <path d="m8.5 8-4 4 4 4" />
      <path d="m15.5 8 4 4-4 4" />
      <path d="m13 5.5-2 13" />
    </>
  ),
  layout: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="3" />
      <path d="M3.5 9.5h17" />
      <path d="M9 9.5v10" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </>
  ),
  hash: (
    <>
      <path d="M9.5 4 8 20" />
      <path d="m16 4-1.5 16" />
      <path d="M5 9h15" />
      <path d="M4 15h15" />
    </>
  ),
  file: (
    <>
      <path d="M7 3.5h6.5L19 9v10.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 6 19.5v-14A2 2 0 0 1 7 3.5Z" />
      <path d="M13 3.5V9h6" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths | "github";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

/** Decorative by default (aria-hidden). Pair with a text label or aria-label on the parent control. */
export function Icon({ name, size = 18, strokeWidth = 1.6, className, ...rest }: IconProps) {
  if (name === "github") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        className={className}
        {...rest}
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
