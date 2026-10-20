import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the site name as the only h1', () => {
    render(<App />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Rajan Nishad');
  });

  it('renders every section in order', () => {
    const { container } = render(<App />);
    const ids = Array.from(container.querySelectorAll('section')).map(
      (section) => section.id,
    );
    expect(ids).toEqual([
      'home',
      'about',
      'skills',
      'projects',
      'education',
      'certifications',
      'contact',
    ]);
  });

  it('offers a skip link to the main content', () => {
    render(<App />);
    expect(
      screen.getByRole('link', { name: /skip to content/i }),
    ).toHaveAttribute('href', '#main');
  });

  it('renders the footer', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
