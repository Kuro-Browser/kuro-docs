import { docHref, flatNav } from "@/config/nav";
import { plain, slugify } from "@/lib/text";
import { about } from "./pages/about";
import { aiFeatures } from "./pages/ai-features";
import { contributing } from "./pages/contributing";
import { faq } from "./pages/faq";
import { features } from "./pages/features";
import { gettingStarted } from "./pages/getting-started";
import { installation } from "./pages/installation";
import { privacySecurity } from "./pages/privacy-security";
import { settings } from "./pages/settings";
import { troubleshooting } from "./pages/troubleshooting";
import type { Block, DocPage, Heading, ResolvedBlock, SearchEntry } from "./types";

const pages: DocPage[] = [
  about,
  gettingStarted,
  installation,
  features,
  settings,
  aiFeatures,
  privacySecurity,
  faq,
  troubleshooting,
  contributing,
];

const bySlug = new Map(pages.map((p) => [p.slug, p]));

export function getPage(slug: string): DocPage | undefined {
  return bySlug.get(slug);
}

export function getAllSlugs(): string[] {
  return pages.map((p) => p.slug);
}

/** Build-time guard: every nav entry must have content, and vice versa. */
export function assertContentMatchesNav() {
  const navSlugs = new Set(flatNav.map((n) => n.slug));
  for (const slug of bySlug.keys()) {
    if (!navSlugs.has(slug)) throw new Error(`Content page "${slug}" is missing from config/nav.ts`);
  }
  for (const slug of navSlugs) {
    if (!bySlug.has(slug)) throw new Error(`Nav entry "${slug}" has no content page`);
  }
}

function uniqueId(base: string, used: Set<string>): string {
  let id = base;
  let n = 2;
  while (used.has(id)) id = `${base}-${n++}`;
  used.add(id);
  return id;
}

/** Assigns stable, unique anchor ids to headings and FAQ questions. */
export function resolveBlocks(page: DocPage): ResolvedBlock[] {
  const used = new Set<string>();
  return page.blocks.map((block): ResolvedBlock => {
    if (block.type === "h2" || block.type === "h3") {
      return { ...block, id: uniqueId(slugify(plain(block.text)), used) };
    }
    if (block.type === "faq") {
      return {
        type: "faq",
        items: block.items.map((item) => ({ ...item, id: uniqueId(slugify(item.q), used) })),
      };
    }
    return block as Exclude<Block, { type: "h2" | "h3" | "faq" }>;
  });
}

/** Headings for the on-page table of contents. FAQ questions count as headings. */
export function getHeadings(resolved: ResolvedBlock[]): Heading[] {
  const out: Heading[] = [];
  for (const block of resolved) {
    if (block.type === "h2" || block.type === "h3") {
      out.push({ id: block.id, text: plain(block.text), level: block.type === "h2" ? 2 : 3 });
    } else if (block.type === "faq") {
      for (const item of block.items) out.push({ id: item.id, text: item.q, level: 2 });
    }
  }
  return out;
}

function blockText(block: ResolvedBlock): string {
  switch (block.type) {
    case "p":
      return plain(block.text);
    case "ul":
    case "ol":
      return block.items.map(plain).join(" ");
    case "code":
      return block.code;
    case "callout":
      return [block.title ?? "", ...(Array.isArray(block.text) ? block.text : [block.text])].map(plain).join(" ");
    case "table":
      return [...block.head, ...block.rows.flat()].map(plain).join(" ");
    case "features":
      return block.items.map((i) => `${i.name}: ${plain(i.text)}`).join(" · ");
    case "flow":
      return `${block.label} ${block.steps.map((s) => `${s.title} ${s.text}`).join(" ")}`;
    case "steps":
      return block.items.map((i) => `${i.title}: ${plain(i.text)}`).join(" · ");
    case "figure":
      return block.caption ? plain(block.caption) : "";
    default:
      return "";
  }
}

/** One entry per page intro, per heading section, and per FAQ question. */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const nav of flatNav) {
    const page = getPage(nav.slug);
    if (!page) continue;
    const href = docHref(page.slug);
    const resolved = resolveBlocks(page);

    let current: { id: string; heading: string | null; parts: string[] } = {
      id: page.slug,
      heading: null,
      parts: [page.description],
    };
    const flush = () => {
      const text = current.parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
      if (!text && !current.heading) return;
      entries.push({
        id: current.id,
        page: page.title,
        group: nav.group,
        heading: current.heading,
        href: current.heading ? `${href}#${current.id.split("#")[1] ?? ""}` : href,
        text,
      });
    };

    for (const block of resolved) {
      if (block.type === "h2" || block.type === "h3") {
        flush();
        current = {
          id: `${page.slug}#${block.id}`,
          heading: plain(block.text),
          parts: [],
        };
      } else if (block.type === "faq") {
        flush();
        for (const item of block.items) {
          entries.push({
            id: `${page.slug}#${item.id}`,
            page: page.title,
            group: nav.group,
            heading: item.q,
            href: `${href}#${item.id}`,
            text: item.a.map(plain).join(" "),
          });
        }
        current = { id: `${page.slug}#__after_faq`, heading: null, parts: [] };
      } else {
        current.parts.push(blockText(block));
      }
    }
    flush();
  }
  return entries.filter((e) => e.text || e.heading);
}
