import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useKanban, type KanbanColumnDef } from "./kanban-board.js";

const initialColumns: KanbanColumnDef[] = [
  {
    id: "todo",
    title: "Todo",
    cards: [
      { id: "a", title: "A" },
      { id: "b", title: "B" },
    ],
  },
  {
    id: "doing",
    title: "Doing",
    cards: [{ id: "c", title: "C" }],
  },
];

describe("Kanban", () => {
  it("starts with the supplied columns", () => {
    const { result } = renderHook(() => useKanban({ columns: initialColumns }));
    expect(result.current.columns).toHaveLength(2);
    expect(result.current.columns[0]?.cards).toHaveLength(2);
  });

  it("moves a card between columns", () => {
    const onCardMove = vi.fn();
    const { result } = renderHook(() =>
      useKanban({ columns: initialColumns, onCardMove }),
    );
    act(() => {
      result.current.moveCard("a", "doing");
    });
    const todo = result.current.columns.find((c) => c.id === "todo")!;
    const doing = result.current.columns.find((c) => c.id === "doing")!;
    expect(todo.cards.map((c) => c.id)).toEqual(["b"]);
    expect(doing.cards.map((c) => c.id)).toEqual(["c", "a"]);
    expect(onCardMove).toHaveBeenCalledWith({
      cardId: "a",
      fromColumnId: "todo",
      toColumnId: "doing",
      toIndex: 1,
    });
  });

  it("reorders cards within a column", () => {
    const { result } = renderHook(() => useKanban({ columns: initialColumns }));
    act(() => {
      result.current.moveCard("b", "todo", 0);
    });
    const todo = result.current.columns.find((c) => c.id === "todo")!;
    expect(todo.cards.map((c) => c.id)).toEqual(["b", "a"]);
  });

  it("addCard assigns a generated id when not provided", () => {
    const { result } = renderHook(() => useKanban({ columns: initialColumns }));
    let id: string | undefined;
    act(() => {
      id = result.current.addCard("todo", { title: "D" });
    });
    expect(id).toBeTruthy();
    const todo = result.current.columns.find((c) => c.id === "todo")!;
    expect(todo.cards.map((c) => c.id)).toContain(id!);
  });

  it("removeCard returns true when the card existed", () => {
    const { result } = renderHook(() => useKanban({ columns: initialColumns }));
    let removed: boolean | undefined;
    act(() => {
      removed = result.current.removeCard("a");
    });
    expect(removed).toBe(true);
    const todo = result.current.columns.find((c) => c.id === "todo")!;
    expect(todo.cards.map((c) => c.id)).toEqual(["b"]);
  });

  it("removeColumn refuses to drop a non-empty column", () => {
    const { result } = renderHook(() => useKanban({ columns: initialColumns }));
    let removed: boolean | undefined;
    act(() => {
      removed = result.current.removeColumn("todo");
    });
    expect(removed).toBe(false);
    expect(result.current.columns).toHaveLength(2);
  });

  it("updateCard merges the patch", () => {
    const { result } = renderHook(() => useKanban({ columns: initialColumns }));
    act(() => {
      result.current.updateCard("a", { title: "Updated", tags: ["x"] });
    });
    const found = result.current.findCard("a");
    expect(found?.card.title).toBe("Updated");
    expect(found?.card.tags).toEqual(["x"]);
  });
});