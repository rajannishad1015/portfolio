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

  it('greets the visitor', () => {
    render(<Hero />);
    expect(screen.getByText("Hello, I'm")).toBeInTheDocument();
  });

  it('states the professional roles', () => {
    render(<Hero />);
    expect(
      screen.getByText(
        'Data Science Student | ML & Analytics | Full-Stack Builder',
      ),
    ).toBeInTheDocument();
  });

  it('highlights the career goal in the introduction', () => {
    render(<Hero />);
    const highlight = screen.getByText('Data Scientist');
    expect(highlight).toBeInTheDocument();
    expect(highlight.tagName).toBe('STRONG');
  });

  it('links to the work and to the resume', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /view my work/i })).toHaveAttribute(
      'href',
      '#projects',
    );
    expect(
      screen.getByRole('link', { name: /download resume/i }),
    ).toHaveAttribute('href', '/resume.pdf');
  });

  it('shows the headline stats', () => {
    render(<Hero />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Certifications')).toBeInTheDocument();
    expect(screen.getByText('Open to Work')).toBeInTheDocument();
  });

  it('offers the social links with accessible names', () => {
    render(<Hero />);
    for (const label of ['Email', 'GitHub', 'LinkedIn', 'Website']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
  });

  it('shows the portrait with meaningful alt text', () => {
    render(<Hero />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/images/rajan-portrait.webp');
    expect(image.getAttribute('alt') ?? '').toMatch(/rajAN/i);
  });

  it('does not show the development placeholder once a portrait is set', () => {
    render(<Hero />);
    expect(screen.queryByText(/portrait png goes here/i)).toBeNull();
  });

  it('floats three skill cards', () => {
    render(<Hero />);
    expect(screen.getByText('Data & Analytics')).toBeInTheDocument();
    expect(screen.getByText('B.Sc. Data Science')).toBeInTheDocument();
    expect(screen.getByText('Data Science Aspirant')).toBeInTheDocument();
  });

  it('shows the handwritten notes', () => {
    render(<Hero />);
    expect(screen.getByText('Keep Learning')).toBeInTheDocument();
    expect(screen.getByText('Keep Growing')).toBeInTheDocument();
    expect(screen.getByText('Better Strategies')).toBeInTheDocument();
    expect(screen.getByText('Brighter Results')).toBeInTheDocument();
  });
});
