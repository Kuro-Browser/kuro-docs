import { Inline } from "@/lib/inline";

/** Scrolls horizontally inside its own box on narrow screens instead of overflowing the page. */
export function DocTable({ head, rows, caption }: { head: string[]; rows: string[][]; caption?: string }) {
  return (
    <div
      className="overflow-x-auto rounded-xl border border-line bg-surface"
      tabIndex={0}
      role="region"
      aria-label={caption ?? "Table"}
    >
      <table className="doc-table min-w-[34rem]">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="!bg-transparent !text-[14.5px] !font-medium !text-fg">
                    <Inline text={cell} />
                  </th>
                ) : (
                  <td key={j}>
                    <Inline text={cell} />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
