import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MockIntersectionObserver } from '../test/mockIntersectionObserver';
import { useActiveSection } from './useActiveSection';
import { useReveal } from './useReveal';

const ACTIVE_IDS = ['alpha', 'beta'];

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
  it('marks the document as reveal-ready', () => {
    render(<Probe />);
    expect(document.documentElement).toHaveClass('reveal-ready');
  });

  it('reveals only the targets that intersect', () => {
    render(<Probe />);
    const observer = MockIntersectionObserver.last;
    const targets = document.querySelectorAll('[data-reveal]');
    observer.emit([{ isIntersecting: true, target: targets[1] }]);
    expect(targets[1]).toHaveAttribute('data-revealed', 'true');
    expect(targets[0]).not.toHaveAttribute('data-revealed');
  });

  it('staggers sibling targets with an increasing delay', () => {
    render(<Probe />);
    const targets = document.querySelectorAll('[data-reveal]');
    const delay = (index: number) =>
      (targets[index] as HTMLElement).style.getPropertyValue('--reveal-delay');
    expect(delay(0)).toBe('0ms');
    expect(delay(1)).toBe('90ms');
    expect(delay(2)).toBe('180ms');
  });

  it('reveals everything when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
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
    // The hook updates React state, so the emission has to be wrapped in
    // `act` for React 19 to flush the re-render before the assertion.
    act(() => {
      observer.emit([{ isIntersecting: true, target: beta }]);
    });
    expect(screen.getByTestId('active')).toHaveTextContent('beta');
  });
});
