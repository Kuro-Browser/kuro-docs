import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons/icons";
import { isExternal } from "@/lib/text";

const TOKEN = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))/g;

/**
 * Renders the inline mini-syntax used in content files.
 * Output is built from React elements only — no raw HTML is ever injected.
 */
export function Inline({ text }: { text: string }): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) out.push(text.slice(last, index));
    const [token] = match;

    if (token.startsWith("`")) {
      out.push(
        <code key={key++} className="inline-code">
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("**")) {
      out.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      const parts = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      const label = parts?.[1] ?? token;
      const href = parts?.[2] ?? "#";
      if (isExternal(href)) {
        out.push(
          <a
            key={key++}
            href={href}
            {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          >
            {label}
            {!href.startsWith("mailto:") && (
              <>
                <Icon name="external" size={12} className="mb-0.5 ml-1 inline-block align-baseline opacity-70" />
                <span className="sr-only"> (opens in a new tab)</span>
              </>
            )}
          </a>,
        );
      } else {
        out.push(
          <Link key={key++} href={href}>
            {label}
          </Link>,
        );
      }
    }
    last = index + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
