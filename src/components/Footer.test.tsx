import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('shows the copyright line', () => {
    render(<Footer />);
    expect(screen.getByText(/©/)).toBeInTheDocument();
  });

  it('offers a back to top link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /back to top/i })).toHaveAttribute(
      'href',
      '#home',
    );
  });

  it('credits the build stack', () => {
    render(<Footer />);
    expect(screen.getByText(/react/i)).toBeInTheDocument();
  });
});
