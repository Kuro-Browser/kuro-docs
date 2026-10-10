import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocRenderer } from "@/components/doc/doc-renderer";
import { Pager } from "@/components/doc/pager";
import { Toc } from "@/components/doc/toc";
import { docHref, flatNav, getNavNeighbours } from "@/config/nav";
import { assertContentMatchesNav, getAllSlugs, getHeadings, getPage, resolveBlocks } from "@/content";
import { site } from "@/config/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  assertContentMatchesNav();
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: docHref(slug) },
    openGraph: { title: `${page.title} · ${site.docsName}`, description: page.description },
  };
}

/** Pages need a table of contents only when there is enough to navigate. */
const TOC_MIN_HEADINGS = 3;

export default async function DocPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  const nav = flatNav.find((n) => n.slug === slug);
  const resolved = resolveBlocks(page);
  const headings = getHeadings(resolved);
  const { prev, next } = getNavNeighbours(slug);
  const showToc = headings.length >= TOC_MIN_HEADINGS;

  return (
    <div className="mx-auto flex w-full max-w-[76rem] gap-12 px-5 pb-24 pt-10 sm:px-8 lg:pt-14 xl:px-12">
      <main id="main" className="min-w-0 max-w-[46rem] flex-1 rise-in">
        <header className="mb-10">
          {nav && (
            <p className="mb-3 text-[13px] font-medium text-accent">
              <span className="sr-only">Section: </span>
              {nav.group}
            </p>
          )}
          <h1 className="text-[2.1rem] font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[2.6rem]">
            {page.title}
          </h1>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted sm:text-lg">{page.description}</p>
        </header>

        <article>
          <DocRenderer blocks={resolved} />
        </article>

        <footer className="mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line pt-5 text-[13.5px] text-muted">
          <span>
            Something missing or wrong?{" "}
            <a
              href={site.links.issues}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2"
            >
              Open an issue
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </span>
          <Link href="#main" className="hover:text-fg">
            Back to top ↑
          </Link>
        </footer>

        <Pager prev={prev} next={next} />
      </main>

      {showToc && (
        <aside className="hidden w-56 shrink-0 xl:block" aria-label="Page outline">
          <div className="sticky top-8 max-h-[calc(100dvh-4rem)] overflow-y-auto pb-8">
            <Toc headings={headings} />
          </div>
        </aside>
      )}
    </div>
  );
}
