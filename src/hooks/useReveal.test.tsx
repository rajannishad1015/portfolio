import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MockIntersectionObserver } from '../test/mockIntersectionObserver';
import { useActiveSection } from './useActiveSection';
import { useReveal } from './useReveal';

const ACTIVE_IDS = ['alpha', 'beta'];

/**
 * jsdom has no layout, so every element reports a zero-height rect at the
 * top of the document. Stub the rects so the "already in the viewport on
 * mount" safety net can be controlled precisely.
 */
function stubRects(top: number) {
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
    top,
    bottom: top + 100,
    left: 0,
    right: 100,
    width: 100,
    height: 100,
    x: 0,
    y: top,
    toJSON: () => ({}),
  } as DOMRect);
}

beforeEach(() => {
  stubRects(10000);
});

afterEach(() => {
  vi.restoreAllMocks();
});

function Probe() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <span data-reveal>one</span>
      <span data-reveal>two</span>
      <span data-reveal>three</span>
    </div>
  );
}

function ActiveProbe() {
  const active = useActiveSection(ACTIVE_IDS);
  return <span data-testid="active">{active}</span>;
}

describe('useReveal', () => {
  it('scopes the container so only its own targets are hidden', () => {
    const { container } = render(<Probe />);
    expect(container.firstElementChild).toHaveAttribute('data-reveal-scope');
  });

  it('reveals the targets that intersect', () => {
    render(<Probe />);
    const observer = MockIntersectionObserver.last;
    const targets = document.querySelectorAll('[data-reveal]');
    observer.emit([{ isIntersecting: true, target: targets[1] }]);
    expect(targets[1]).toHaveAttribute('data-revealed', 'true');
    expect(targets[2]).not.toHaveAttribute('data-revealed');
  });

  it('staggers sibling targets with an increasing delay', () => {
    render(<Probe />);
    const targets = document.querySelectorAll('[data-reveal]');
    const delay = (index: number) =>
      (targets[index] as HTMLElement).style.getPropertyValue('--reveal-delay');
    expect(delay(0)).toBe('0ms');
    expect(delay(1)).toBe('60ms');
    expect(delay(2)).toBe('120ms');
  });

  it('uses the configured observer options', () => {
    render(<Probe />);
    expect(MockIntersectionObserver.last.rootMargin).toBe('0px 0px -5% 0px');
    expect(MockIntersectionObserver.last.thresholds).toEqual([0]);
  });

  it('stops observing a target once it has been revealed', () => {
    render(<Probe />);
    const observer = MockIntersectionObserver.last;
    const targets = document.querySelectorAll('[data-reveal]');
    observer.emit([{ isIntersecting: true, target: targets[0] }]);
    expect(targets[0]).toHaveAttribute('data-revealed', 'true');

    targets[0].removeAttribute('data-revealed');
    observer.emit([{ isIntersecting: true, target: targets[0] }]);
    expect(targets[0]).not.toHaveAttribute('data-revealed');
  });

  it('reveals everything when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<Probe />);
    const targets = document.querySelectorAll('[data-reveal]');
    for (const target of targets) {
      expect(target).toHaveAttribute('data-revealed', 'true');
    }
  });

  it('reveals targets that are already in the viewport on mount', () => {
    stubRects(100);
    render(<Probe />);
    const targets = document.querySelectorAll('[data-reveal]');
    for (const target of targets) {
      expect(target).toHaveAttribute('data-revealed', 'true');
    }
  });
});

describe('useActiveSection', () => {
  it('reports the id of the section in view', () => {
    // The sections must exist in the document BEFORE render, because the hook
    // looks them up with document.getElementById inside its mount effect.
    const alpha = document.createElement('section');
    alpha.id = 'alpha';
    const beta = document.createElement('section');
    beta.id = 'beta';
    document.body.append(alpha, beta);

    render(<ActiveProbe />);
    const observer = MockIntersectionObserver.last;
    // `act()` is required: React 19 sets IS_REACT_ACT_ENVIRONMENT, so a
    // setState triggered outside act() is queued and never flushed before the
    // assertion runs.
    act(() => {
      observer.emit([{ isIntersecting: true, target: beta }]);
    });
    expect(screen.getByTestId('active')).toHaveTextContent('beta');
  });

  it('uses the configured observer options', () => {
    const alpha = document.createElement('section');
    alpha.id = 'alpha';
    document.body.append(alpha);
    render(<ActiveProbe />);
    expect(MockIntersectionObserver.last.rootMargin).toBe('-45% 0px -45% 0px');
    expect(MockIntersectionObserver.last.thresholds).toEqual([0, 0.25, 0.5]);
  });
});
