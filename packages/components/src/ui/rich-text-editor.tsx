/**
 * @arcevo/facet-components: RichTextEditor
 *
 * A lightweight rich text editor: bold / italic / underline / lists /
 * links / headings. Built on a `contenteditable` div + the standard
 * `document.execCommand` API (which is still supported in every
 * evergreen browser for form input use cases). For most product-
 * surface needs (descriptions, notes, comments) this is enough.
 *
 * Why: pulling in tiptap / slate / lexical is overkill for a 90% case.
 * Hand-rolling formatting toolbar takes an afternoon; this is one
 * component, one onChange handler.
 */

import * as React from "react";
import { cn } from "../utils.js";
import { Icon, type IconName } from "../icon/index.js";
import { Button } from "./button.js";

/* ── Types ─────────────────────────────────────────────────── */

export interface RichTextEditorProps {
  /** HTML value. */
  value: string;
  /** Called with the new HTML on every change. */
  onChange: (next: string) => void;
  /** Placeholder when the editor is empty. */
  placeholder?: string;
  /** Disable the editor. */
  disabled?: boolean;
  /** Optional className for the wrapper. */
  className?: string;
  /** Optional className for the editor surface (the editable area). */
  contentClassName?: string;
  /** ARIA label. */
  ariaLabel?: string;
  /** Min content height in px. Default: 160. */
  minHeight?: number;
}

/* ── Helpers ───────────────────────────────────────────────── */

interface ToolDef {
  id: string;
  label: string;
  icon: IconName;
  command: string;
  value?: string;
}

const TOOLS: ToolDef[] = [
  { id: "bold", label: "Bold", icon: "bold", command: "bold" },
  { id: "italic", label: "Italic", icon: "italic", command: "italic" },
  { id: "underline", label: "Underline", icon: "underline", command: "underline" },
  { id: "h2", label: "Heading", icon: "heading-2", command: "formatBlock", value: "h2" },
  { id: "h3", label: "Subheading", icon: "heading-3", command: "formatBlock", value: "h3" },
  { id: "p", label: "Paragraph", icon: "pilcrow", command: "formatBlock", value: "p" },
  { id: "ul", label: "Bulleted list", icon: "list", command: "insertUnorderedList" },
  { id: "ol", label: "Numbered list", icon: "list-ordered", command: "insertOrderedList" },
  { id: "quote", label: "Quote", icon: "quote", command: "formatBlock", value: "blockquote" },
  { id: "code", label: "Inline code", icon: "code", command: "formatBlock", value: "pre" },
  { id: "link", label: "Link", icon: "link", command: "createLink" },
];

/* ── Component ─────────────────────────────────────────────── */

/**
 * A drop-in lightweight rich text editor.
 */
export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something…",
  disabled,
  className,
  contentClassName,
  ariaLabel = "Rich text editor",
  minHeight = 160,
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [linkPromptOpen, setLinkPromptOpen] = React.useState(false);
  const [linkUrl, setLinkUrl] = React.useState("");

  // Sync external `value` into the contenteditable only when it diverges
  // from the current DOM (controlled -> uncontrolled boundary).
  React.useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (el.innerHTML !== value) el.innerHTML = value;
  }, [value]);

  const runCommand = (tool: ToolDef) => {
    if (disabled) return;
    if (tool.command === "createLink") {
      setLinkPromptOpen(true);
      return;
    }
    editorRef.current?.focus();
    document.execCommand(tool.command, false, tool.value);
    // Sync DOM back into React state.
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const submitLink = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    if (linkUrl) {
      document.execCommand("createLink", false, linkUrl);
      onChange(editorRef.current.innerHTML);
    }
    setLinkUrl("");
    setLinkPromptOpen(false);
  };

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-md border border-border bg-background transition focus-within:ring-2 focus-within:ring-ring/30",
        disabled && "opacity-60",
        className,
      )}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-secondary/30 p-1.5">
        {TOOLS.map((tool) => (
          <Button
            key={tool.id}
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            aria-label={tool.label}
            title={tool.label}
            onClick={() => runCommand(tool)}
          >
            <Icon name={tool.icon} className="size-4" />
          </Button>
        ))}
      </div>

      {/* Editor surface */}
      <div
        ref={editorRef}
        role="textbox"
        aria-multiline="true"
        aria-label={ariaLabel}
        contentEditable={!disabled}
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        className={cn(
          "prose prose-sm max-w-none px-4 py-3 outline-none",
          "[&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-muted-foreground/60",
          contentClassName,
        )}
        style={{ minHeight }}
      />

      {/* Link dialog */}
      {linkPromptOpen && (
        <div className="flex items-center gap-2 border-t border-border bg-secondary/20 p-2 text-sm">
          <input
            type="url"
            placeholder="https://"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="flex-1 rounded-md border border-border bg-background px-2 py-1 outline-none focus:border-primary"
            autoFocus
          />
          <Button size="sm" onClick={submitLink}>
            Insert
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setLinkUrl("");
              setLinkPromptOpen(false);
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

RichTextEditor.displayName = "RichTextEditor";