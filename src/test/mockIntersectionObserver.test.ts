import { describe, expect, it, vi } from 'vitest';
import { MockIntersectionObserver } from './mockIntersectionObserver';

describe('MockIntersectionObserver', () => {
  it('reads root, rootMargin and thresholds from its options', () => {
    const root = document.createElement('div');
    const observer = new MockIntersectionObserver(() => {}, {
      root,
      rootMargin: '10px',
      threshold: 0.5,
    });
    expect(observer.root).toBe(root);
    expect(observer.rootMargin).toBe('10px');
    expect(observer.thresholds).toEqual([0.5]);
  });

  it('accepts an array of thresholds and defaults to [0]', () => {
    expect(
      new MockIntersectionObserver(() => {}, { threshold: [0, 0.5] }).thresholds,
    ).toEqual([0, 0.5]);
    expect(new MockIntersectionObserver(() => {}).thresholds).toEqual([0]);
  });

  it('delivers entries with every field populated', () => {
    const callback = vi.fn();
    const observer = new MockIntersectionObserver(callback);
    const target = document.createElement('div');
    observer.observe(target);
    observer.emit([{ isIntersecting: true, target }]);

    expect(callback).toHaveBeenCalledTimes(1);
    const entry = callback.mock.calls[0][0][0] as IntersectionObserverEntry;
    expect(entry.isIntersecting).toBe(true);
    expect(entry.intersectionRatio).toBe(1);
    expect(entry.target).toBe(target);
    expect(entry.time).toBeTypeOf('number');
    expect(entry.boundingClientRect).toBeInstanceOf(DOMRect);
  });

  it('only delivers entries for observed targets', () => {
    const callback = vi.fn();
    const observer = new MockIntersectionObserver(callback);
    observer.emit([{ isIntersecting: true, target: document.createElement('div') }]);
    expect(callback).not.toHaveBeenCalled();
  });

  it('stops delivering entries after unobserve and disconnect', () => {
    const callback = vi.fn();
    const observer = new MockIntersectionObserver(callback);
    const target = document.createElement('div');

    observer.observe(target);
    observer.unobserve(target);
    observer.emit([{ isIntersecting: true, target }]);
    expect(callback).not.toHaveBeenCalled();

    observer.observe(target);
    observer.disconnect();
    observer.emit([{ isIntersecting: true, target }]);
    expect(callback).not.toHaveBeenCalled();
  });

  it('tracks instances and throws from last when there are none', () => {
    MockIntersectionObserver.reset();
    expect(() => MockIntersectionObserver.last).toThrow();
    new MockIntersectionObserver(() => {});
    expect(MockIntersectionObserver.instances).toHaveLength(1);
    expect(MockIntersectionObserver.last).toBeInstanceOf(MockIntersectionObserver);
  });
});
