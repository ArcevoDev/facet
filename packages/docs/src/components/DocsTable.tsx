import { InlineText } from "./Guide.js";

export interface DocsTableProps {
  headers: string[];
  rows: string[][];
}

/** Responsive docs table with inline markdown-ish cells (code/bold). */
export function DocsTable({ headers, rows }: DocsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30 text-muted-foreground">
            {headers.map((header) => (
              <th key={header} className="px-4 py-2.5 font-medium">
                <InlineText text={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-muted/20">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-foreground/90">
                  <InlineText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
