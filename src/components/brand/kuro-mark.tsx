import { KURO_MARK_PATHS, KURO_MARK_VIEWBOX } from "./kuro-mark-paths";

interface KuroMarkProps {
  size?: number;
  className?: string;
  /** Provide a label only when the mark is the sole content of a control. */
  title?: string;
}

/**
 * The supplied Kuro mark, rendered inline so it follows the active theme via
 * `currentColor` (cream in dark mode, near-black in light mode). Geometry is
 * identical to the supplied kuro-mark.svg.
 */
export function KuroMark({ size = 28, className, title }: KuroMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={KURO_MARK_VIEWBOX}
      fill="currentColor"
      fillRule="evenodd"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {KURO_MARK_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
