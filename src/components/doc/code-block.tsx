import { highlight } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

const LANG_LABEL: Record<string, string> = {
  bash: "Shell",
  sh: "Shell",
  shell: "Shell",
  json: "JSON",
  typescript: "TypeScript",
  ts: "TypeScript",
  css: "CSS",
  html: "HTML",
};

/** Server component: highlighting happens at build time. Falls back to plain text for unknown languages. */
export async function CodeBlock({ code, lang, title }: { code: string; lang: string; title?: string }) {
  const html = await highlight(code, lang);
  const label = title ?? LANG_LABEL[lang] ?? lang;

  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-surface">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line bg-surface-2/60 py-1 pl-4 pr-1.5">
        <span className="truncate text-xs font-medium text-muted">{label}</span>
        <CopyButton text={code} />
      </figcaption>
      <div className="code-scroll" tabIndex={0} role="region" aria-label={`${label} code`}>
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre>
            <code>{code}</code>
          </pre>
        )}
      </div>
    </figure>
  );
}
