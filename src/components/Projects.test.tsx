import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Projects } from './Projects';

describe('Projects', () => {
  it('has the projects section id', () => {
    render(<Projects />);
    expect(document.getElementById('projects')).not.toBeNull();
  });

  it('renders all five projects', () => {
    render(<Projects />);
    expect(
      screen.getByRole('heading', { name: 'Swara Digital' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'RetentionIQ' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'DocuCat AI' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'E-Commerce Recommendation Engine' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'MARG: Adaptive Route Generation' }),
    ).toBeInTheDocument();
  });

  it('marks exactly one card as featured', () => {
    render(<Projects />);
    const featured = document.querySelectorAll('[data-featured="true"]');
    expect(featured).toHaveLength(1);
  });

  it('shows the headline metrics', () => {
    render(<Projects />);
    expect(screen.getByText('150+')).toBeInTheDocument();
    expect(screen.getByText('17')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('shows a stack of technology tags', () => {
    render(<Projects />);
    expect(screen.getByText('Razorpay')).toBeInTheDocument();
    expect(screen.getAllByText('FastAPI').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Scikit-learn').length).toBeGreaterThan(0);
  });

  it('replaces unfilled links with an honest placeholder chip', () => {
    render(<Projects />);
    expect(screen.getAllByText('Link coming soon').length).toBeGreaterThan(0);
  });

  it('links Swara Digital to its live URL and omits the github source link', () => {
    render(<Projects />);
    const liveLink = screen.getByRole('link', { name: /live/i });
    expect(liveLink).toHaveAttribute('href', 'https://www.swaradigital.in/');

    // Ensure no GitHub/source link exists for Swara Digital
    const sourceLinks = screen.getAllByRole('link', { name: /source/i });
    for (const link of sourceLinks) {
      expect(link.getAttribute('href')).not.toContain('swara-digital');
    }
  });
});
