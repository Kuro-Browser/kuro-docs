/**
 * Documentation content is plain typed data, kept separate from layout code.
 * Text fields accept a tiny inline syntax: `code`, **bold**, [label](href).
 * Internal links start with "/", everything else is treated as external.
 */

/** How far along a feature is, as far as the project's own documents say. */
export type FeatureStatus = "listed" | "experimental" | "planned";

export type CalloutTone = "note" | "warning" | "placeholder";

export type FigureName = "layers" | "empty-settings" | "empty-issues";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; code: string; title?: string }
  | { type: "callout"; tone: CalloutTone; title?: string; text: string | string[] }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "features"; items: { name: string; status: FeatureStatus; text: string; href?: string }[] }
  | { type: "legend" }
  | { type: "faq"; items: FaqItem[] }
  | { type: "figure"; name: FigureName; alt?: string; caption?: string }
  | { type: "flow"; label: string; steps: { title: string; text: string }[] }
  | { type: "steps"; items: { title: string; text: string }[] };

export interface DocPage {
  slug: string;
  title: string;
  /** Short intro shown under the title, and used as the search/description text. */
  description: string;
  blocks: Block[];
}

export interface FaqItem {
  q: string;
  a: string[];
}

/** A block after anchor ids have been assigned to headings and FAQ questions. */
export type ResolvedBlock =
  | (Extract<Block, { type: "h2" | "h3" }> & { id: string })
  | { type: "faq"; items: (FaqItem & { id: string })[] }
  | Exclude<Block, { type: "h2" | "h3" | "faq" }>;

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface SearchEntry {
  /** Unique within the index. */
  id: string;
  page: string;
  group: string;
  heading: string | null;
  href: string;
  text: string;
}
