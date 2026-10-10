import { Icon } from "@/components/icons/icons";
import { Figure } from "@/components/illustrations/figures";
import type { ResolvedBlock } from "@/content/types";
import { Inline } from "@/lib/inline";
import { Callout } from "./callout";
import { CodeBlock } from "./code-block";
import { DocTable } from "./doc-table";
import { FaqList } from "./faq-list";
import { Flow } from "./flow";
import { Steps } from "./steps";
import { FeatureList, StatusLegend } from "./status";

function Anchor({ id, text }: { id: string; text: string }) {
  return (
    <a href={`#${id}`} className="heading-anchor" aria-label={`Link to section: ${text}`}>
      <Icon name="hash" size={16} />
    </a>
  );
}

/** Turns typed content blocks into the reading layout. Pure rendering — no content lives here. */
export function DocRenderer({ blocks }: { blocks: ResolvedBlock[] }) {
  return (
    <div className="prose-doc">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2": {
            const text = block.text;
            return (
              <h2 key={i} id={block.id}>
                {text}
                <Anchor id={block.id} text={text} />
              </h2>
            );
          }
          case "h3":
            return (
              <h3 key={i} id={block.id}>
                {block.text}
                <Anchor id={block.id} text={block.text} />
              </h3>
            );
          case "p":
            return (
              <p key={i}>
                <Inline text={block.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item} />
                  </li>
                ))}
              </ol>
            );
          case "code":
            return <CodeBlock key={i} code={block.code} lang={block.lang} title={block.title} />;
          case "callout":
            return <Callout key={i} tone={block.tone} title={block.title} text={block.text} />;
          case "table":
            return <DocTable key={i} head={block.head} rows={block.rows} caption={block.caption} />;
          case "features":
            return <FeatureList key={i} items={block.items} />;
          case "legend":
            return <StatusLegend key={i} />;
          case "faq":
            return <FaqList key={i} items={block.items} />;
          case "figure":
            return <Figure key={i} name={block.name} alt={block.alt} caption={block.caption} />;
          case "flow":
            return <Flow key={i} label={block.label} steps={block.steps} />;
          case "steps":
            return <Steps key={i} items={block.items} />;
        }
      })}
    </div>
  );
}
