import { createHighlighter, type Highlighter } from "shiki";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

/**
 * Build-time syntax highlighting (server only — nothing from shiki ships to the browser).
 * Both themes are emitted as CSS variables and switched by the active site theme.
 */
const LANGS = ["bash", "json", "typescript", "css", "html"] as const;

let highlighter: Promise<Highlighter> | undefined;

function getHighlighter() {
  highlighter ??= createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: [...LANGS],
    engine: createJavaScriptRegexEngine(),
  });
  return highlighter;
}

const ALIASES: Record<string, string> = {
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  ts: "typescript",
};

export async function highlight(code: string, lang: string): Promise<string | null> {
  const resolved = ALIASES[lang] ?? lang;
  if (!(LANGS as readonly string[]).includes(resolved)) return null;
  const hl = await getHighlighter();
  return hl.codeToHtml(code, {
    lang: resolved,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
