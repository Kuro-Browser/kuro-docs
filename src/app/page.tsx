import Link from "next/link";
import { StatusPill } from "@/components/doc/status";
import { Icon, type IconName } from "@/components/icons/icons";
import { HeroIllustration } from "@/components/illustrations/hero-illustration";
import { SearchTrigger } from "@/components/shell/search-trigger";
import { Topbar } from "@/components/shell/topbar";
import { site } from "@/config/site";
import type { FeatureStatus } from "@/content/types";

interface FeatureCard {
  title: string;
  text: string;
  href: string;
  icon: IconName;
  status?: FeatureStatus;
}

// Each card makes only claims that appear in the project's own README / vision documents.
const CARDS: FeatureCard[] = [
  {
    title: "A thoughtfully designed browser",
    text: "Vertical tabs, workspaces and split views are part of Kuro's feature list, aimed at a calm, organized browsing experience.",
    href: "/docs/features",
    icon: "layout",
  },
  {
    title: "Customization and settings",
    text: "Kuro is meant to give you real control over how it looks and behaves, with sensible defaults for everyone else.",
    href: "/docs/settings",
    icon: "sliders",
  },
  {
    title: "Privacy-focused development",
    text: "No ads, no selling your data, no collecting more than is needed. Read the commitments and what is still being verified.",
    href: "/docs/privacy-security",
    icon: "shield",
  },
  {
    title: "Optional local AI",
    text: "Kuro AI is optional and designed to be local-first, through Ollama. It is still under development.",
    href: "/docs/ai-features",
    icon: "sparkle",
    status: "experimental",
  },
  {
    title: "Open source",
    text: "Built on Firefox and released under the Mozilla Public License 2.0. Report bugs, suggest ideas, or send code.",
    href: "/docs/contributing",
    icon: "branch",
  },
];

const QUICK_START: { title: string; text: string; href: string }[] = [
  { title: "Learn about Kuro", text: "What it is and how it relates to Firefox and Zen.", href: "/docs/about" },
  { title: "Install Kuro", text: "Platforms, downloads and getting the source.", href: "/docs/installation" },
  { title: "Explore its features", text: "What is listed, experimental and planned.", href: "/docs/features" },
  { title: "Configure settings", text: "How customization is meant to work.", href: "/docs/settings" },
  { title: "Fix a problem", text: "Where to start, and how to report a bug.", href: "/docs/troubleshooting" },
];

export default function HomePage() {
  return (
    <>
      <Topbar homeLayout />
      <main id="main">
        {/* ───────── Hero ───────── */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:pb-24 lg:pt-24">
          <div className="rise-in">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-muted">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              Kuro Browser documentation · Beta
            </p>
            <h1 className="text-balance text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
              A better way to <span className="font-serif font-normal italic text-accent">browse.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              Kuro is a free, open-source desktop browser built on Firefox. Find out how it works, how to install
              it, and how to help build it.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/docs/getting-started"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-[15px] font-medium text-canvas transition-opacity hover:opacity-85"
              >
                Get started
                <Icon name="arrowRight" size={17} />
              </Link>
              <Link
                href="/docs/installation"
                className="inline-flex h-12 items-center rounded-full border border-line-strong bg-surface px-6 text-[15px] font-medium text-fg transition-colors hover:bg-surface-2"
              >
                Installation
              </Link>
            </div>

            <div className="mt-8 max-w-sm">
              <SearchTrigger variant="field" />
            </div>
          </div>

          <HeroIllustration className="mx-auto h-auto w-full max-w-md lg:max-w-none" />
        </section>

        {/* ───────── Feature cards ───────── */}
        <section aria-labelledby="explore" className="border-t border-line bg-surface/50">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-20">
            <h2 id="explore" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What you&apos;ll find here
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Each topic links to its documentation. Where something isn&apos;t available yet, we say so.
            </p>

            <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CARDS.map((card) => (
                <li key={card.title}>
                  <Link
                    href={card.href}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong hover:bg-surface-2/60"
                  >
                    <span className="mb-4 flex items-center justify-between">
                      <span className="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-surface-2 text-fg">
                        <Icon name={card.icon} size={20} />
                      </span>
                      {card.status && <StatusPill status={card.status} />}
                    </span>
                    <span className="text-[17px] font-semibold tracking-tight text-fg">{card.title}</span>
                    <span className="mt-1.5 flex-1 text-[14.5px] leading-relaxed text-muted">{card.text}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      Read more
                      <Icon
                        name="arrowRight"
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── Quick start ───────── */}
        <section aria-labelledby="quick-start" className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
            <div>
              <h2 id="quick-start" className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Quick start
              </h2>
              <p className="mt-3 max-w-sm text-muted">
                Five short steps from curious to up and running.
              </p>
            </div>
            <ol className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
              {QUICK_START.map((step, i) => (
                <li key={step.title}>
                  <Link
                    href={step.href}
                    className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-surface-2/60 sm:px-5"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-[13px] font-semibold text-fg"
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15.5px] font-medium text-fg">{step.title}</span>
                      <span className="block text-[14px] text-muted">{step.text}</span>
                    </span>
                    <Icon
                      name="chevronRight"
                      size={18}
                      className="shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── Community ───────── */}
        <section aria-labelledby="community" className="border-t border-line bg-surface/50">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
            <h2 id="community" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Get involved
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              <ExternalCard
                href={site.links.github}
                icon="github"
                title="GitHub"
                text="Source code, issues and contributions."
              />
              <ExternalCard
                href={site.links.discord}
                icon="chat"
                title="Discord"
                text="Ask questions and share feedback."
              />
              <ExternalCard
                href={site.links.releases}
                icon="file"
                title="Release notes"
                text="What changed in each version."
              />
            </ul>
          </div>
        </section>
      </main>

      {/* ───────── Footer ───────── */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-[13.5px] text-muted sm:px-6 md:flex-row md:items-start md:justify-between">
          <p className="max-w-md leading-relaxed">
            Kuro is an independent project and is not affiliated with or endorsed by Mozilla or Zen Browser.
            Released under the{" "}
            <a
              href={site.links.license}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg underline underline-offset-2"
            >
              Mozilla Public License 2.0<span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={site.links.website} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              Kuro website<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={site.links.privacyPolicy} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              Privacy Policy<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/docs/contributing" className="hover:text-fg">
              Contributing
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}

function ExternalCard({ href, icon, title, text }: { href: string; icon: IconName; title: string; text: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong hover:bg-surface-2/60"
      >
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 text-fg">
          <Icon name={icon} size={20} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 text-[16px] font-semibold tracking-tight text-fg">
            {title}
            <Icon name="external" size={13} className="text-subtle" />
            <span className="sr-only">(opens in a new tab)</span>
          </span>
          <span className="mt-0.5 block text-[14px] leading-relaxed text-muted">{text}</span>
        </span>
      </a>
    </li>
  );
}
