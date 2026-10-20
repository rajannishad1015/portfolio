import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hero } from './Hero';

describe('Hero', () => {
  it('leads with the name in the only h1', () => {
    render(<Hero />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Rajan Nishad');
  });

  it('shows every rotating role in the markup', () => {
    render(<Hero />);
    for (const role of [
      'Data Analyst',
      'Data Scientist',
      'ML Engineer',
      'Full-Stack Builder',
    ]) {
      expect(screen.getByText(role)).toBeInTheDocument();
    }
  });

  it('links to the projects and to the resume', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /view projects/i })).toHaveAttribute(
      'href',
      '#projects',
    );
    expect(screen.getByRole('link', { name: /download cv/i })).toHaveAttribute(
      'href',
      '/resume.pdf',
    );
  });

  it('announces that he is available for work', () => {
    render(<Hero />);
    expect(
      screen.getByText(/available for data analyst/i),
    ).toBeInTheDocument();
  });
});
