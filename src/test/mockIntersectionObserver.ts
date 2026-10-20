type ObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void;

export class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;

  private readonly callback: ObserverCallback;
  private readonly observed = new Set<Element>();
  private disconnected = false;

  constructor(callback: ObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.root = options?.root ?? null;
    this.rootMargin = options?.rootMargin ?? '0px 0px 0px 0px';
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold ?? 0];
    MockIntersectionObserver.instances.push(this);
  }

  observe(target: Element): void {
    if (!this.disconnected) {
      this.observed.add(target);
    }
  }

  unobserve(target: Element): void {
    this.observed.delete(target);
  }

  disconnect(): void {
    this.observed.clear();
    this.disconnected = true;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  emit(entries: Partial<IntersectionObserverEntry>[]): void {
    if (this.disconnected) {
      return;
    }

    const time = performance.now();
    const relevant = entries.filter(
      (entry) => entry.target && this.observed.has(entry.target),
    );
    if (relevant.length === 0) {
      return;
    }

    const full = relevant.map((entry) => ({
      time,
      rootBounds: null,
      boundingClientRect: entry.boundingClientRect ?? new DOMRect(),
      intersectionRect: entry.intersectionRect ?? new DOMRect(),
      isIntersecting: entry.isIntersecting ?? false,
      intersectionRatio:
        entry.intersectionRatio ?? (entry.isIntersecting ? 1 : 0),
      target: entry.target,
    })) as IntersectionObserverEntry[];

    this.callback(full, this);
  }

  static reset(): void {
    MockIntersectionObserver.instances = [];
  }

  static get last(): MockIntersectionObserver {
    const instance = MockIntersectionObserver.instances.at(-1);
    if (!instance) {
      throw new Error('No IntersectionObserver instance has been created');
    }
    return instance;
  }
}
