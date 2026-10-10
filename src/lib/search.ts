import type { SearchEntry } from "@/content/types";

export interface Segment {
  text: string;
  hit: boolean;
}

export interface SearchResult {
  entry: SearchEntry;
  score: number;
  snippet: Segment[];
}

const fold = (s: string) =>
  s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export function tokenize(query: string): string[] {
  return fold(query)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function wordStart(haystack: string, term: string): boolean {
  return new RegExp(`(^|[^a-z0-9])${escapeRegExp(term)}`).test(haystack);
}

function buildSnippet(text: string, terms: string[]): Segment[] {
  if (!text) return [];
  const folded = fold(text);
  let first = -1;
  for (const t of terms) {
    const i = folded.indexOf(t);
    if (i !== -1 && (first === -1 || i < first)) first = i;
  }
  const WINDOW = 150;
  const start = first <= 40 ? 0 : first - 40;
  let slice = text.slice(start, start + WINDOW);
  if (start > 0) slice = `…${slice}`;
  if (start + WINDOW < text.length) slice = `${slice}…`;

  if (terms.length === 0) return [{ text: slice, hit: false }];
  const re = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  return slice
    .split(re)
    .filter((part) => part !== "")
    .map((part) => ({ text: part, hit: terms.includes(fold(part)) }));
}

/**
 * Lightweight ranked search over the build-time index.
 * Every query term must appear somewhere in the entry (page title, heading or text).
 * Headings and page titles outrank body text; word-start matches outrank substrings.
 */
export function searchEntries(entries: SearchEntry[], query: string, limit = 8): SearchResult[] {
  const terms = tokenize(query);
  if (terms.length === 0) return [];

  const results: SearchResult[] = [];
  for (const entry of entries) {
    const title = fold(entry.page);
    const heading = fold(entry.heading ?? "");
    const body = fold(entry.text);

    let score = 0;
    let matchedAll = true;
    for (const term of terms) {
      let termScore = 0;
      if (heading.includes(term)) termScore += wordStart(heading, term) ? 10 : 6;
      if (title.includes(term)) termScore += wordStart(title, term) ? 6 : 3;
      if (body.includes(term)) {
        termScore += wordStart(body, term) ? 3 : 1;
        const occurrences = body.split(term).length - 1;
        termScore += Math.min(occurrences - 1, 3) * 0.5;
      }
      if (termScore === 0) {
        matchedAll = false;
        break;
      }
      score += termScore;
    }
    if (!matchedAll) continue;
    if (entry.heading === null) score += 1; // a page's own intro is a good landing spot
    results.push({ entry, score, snippet: buildSnippet(entry.text, terms) });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
