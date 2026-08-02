import { Github, BookOpen } from "lucide-react";
import { Separator } from "@arcevo/facet-components";
import { getDocsUrl } from "../lib/docs-url.js";

export function Footer() {
  return (
    <div className="mx-auto max-w-7xl px-8 py-12">
      <Separator className="mb-8" />
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} facet. MIT License.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/arcevodev/facet"
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href={getDocsUrl()}
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <BookOpen size={14} />
            Documentation
          </a>
        </div>
      </div>
    </div>
  );
}
