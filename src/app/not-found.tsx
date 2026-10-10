import Link from "next/link";
import { BrandLink } from "@/components/shell/brand-link";
import { docHref, flatNav } from "@/config/nav";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6 py-16">
      <BrandLink />
      <p className="mt-10 text-[13px] font-medium text-accent">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">This page doesn&apos;t exist</h1>
      <p className="mt-3 text-muted">
        The link may be out of date, or the page may have moved. Try one of these instead:
      </p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {flatNav.map((n) => (
          <li key={n.slug}>
            <Link
              href={docHref(n.slug)}
              className="block rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[15px] text-fg transition-colors hover:border-line-strong hover:bg-surface-2"
            >
              {n.title}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-muted">
        Or press <kbd className="kbd">Ctrl</kbd> <kbd className="kbd">K</kbd> to search.
      </p>
    </main>
  );
}
