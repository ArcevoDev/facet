import "@testing-library/jest-dom";

// jsdom doesn't implement ResizeObserver / scrollIntoView / matchMedia: // Radix primitives (ScrollArea, Dialog, DropdownMenu) rely on them.
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = ResizeObserverMock;
}

if (!globalThis.matchMedia) {
  globalThis.matchMedia = () =>
    ({
      matches: false,
      media: "",
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => undefined;
}

// jsdom doesn't implement IntersectionObserver -- embla-carousel requires it.
if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = class {
    disconnect() {}
    observe() {}
    unobserve() {}
    takeRecords() {
      return [];
    }
  } as typeof IntersectionObserver;
}
