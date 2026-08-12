import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { InfiniteScroll } from "./infinite-scroll.js";

function mockIntersectionObserver() {
  const observe = vi.fn();
  const disconnect = vi.fn();
  let callback: IntersectionObserverCallback = () => {};
  class MockIO {
    constructor(cb: IntersectionObserverCallback) {
      callback = cb;
    }
    observe = observe;
    disconnect = disconnect;
    unobserve = vi.fn();
    root = null;
    rootMargin = "";
    thresholds = [];
    takeRecords = () => [];
  }
  vi.stubGlobal("IntersectionObserver", MockIO);
  return {
    fire(intersects: boolean) {
      callback(
        [{ isIntersecting: intersects } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    },
    observe,
    disconnect,
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("InfiniteScroll", () => {
  it("renders children and an end message when exhausted", () => {
    render(
      <InfiniteScroll hasMore={false} onLoadMore={vi.fn()} endMessage="No more">
        <div>Item</div>
      </InfiniteScroll>,
    );
    expect(screen.getByText("Item")).toBeInTheDocument();
    expect(screen.getByText("No more")).toBeInTheDocument();
  });

  it("calls onLoadMore when the sentinel is visible", () => {
    const io = mockIntersectionObserver();
    const onLoadMore = vi.fn();
    render(
      <InfiniteScroll hasMore onLoadMore={onLoadMore}>
        <div>Item</div>
      </InfiniteScroll>,
    );
    expect(onLoadMore).not.toHaveBeenCalled();
    io.fire(true);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it("does not call onLoadMore when hasMore is false", () => {
    const io = mockIntersectionObserver();
    const onLoadMore = vi.fn();
    render(
      <InfiniteScroll hasMore={false} onLoadMore={onLoadMore}>
        <div>Item</div>
      </InfiniteScroll>,
    );
    io.fire(true);
    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it("does not re-fire while loading", () => {
    const io = mockIntersectionObserver();
    const onLoadMore = vi.fn();
    const { rerender } = render(
      <InfiniteScroll hasMore onLoadMore={onLoadMore}>
        <div>Item</div>
      </InfiniteScroll>,
    );
    io.fire(true);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
    // Keep it in view + loading: no new fire.
    rerender(
      <InfiniteScroll hasMore onLoadMore={onLoadMore} loading>
        <div>Item</div>
      </InfiniteScroll>,
    );
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it("supports horizontal direction", () => {
    render(
      <InfiniteScroll hasMore onLoadMore={vi.fn()} direction="horizontal">
        <div>Card</div>
      </InfiniteScroll>,
    );
    expect(screen.getByText("Card")).toBeInTheDocument();
  });
});
