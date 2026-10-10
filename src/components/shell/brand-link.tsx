import Link from "next/link";
import { KuroMark } from "@/components/brand/kuro-mark";
import { site } from "@/config/site";

/** Logo + wordmark. Always links home. */
export function BrandLink({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${site.docsName} home`}
      className="inline-flex min-h-10 items-center gap-2.5 rounded-lg pr-2 text-fg"
    >
      <KuroMark size={26} />
      <span className="text-[15px] font-semibold tracking-tight">kuro</span>
      <span className="text-[15px] font-normal tracking-tight text-muted">docs</span>
    </Link>
  );
}
