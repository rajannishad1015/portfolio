import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { About } from './About';

describe('About', () => {
  it('has the about section id', () => {
    render(<About />);
    expect(document.getElementById('about')).not.toBeNull();
  });

  it('shows the four stat tiles', () => {
    render(<About />);
    expect(screen.getByText('Shipped projects')).toBeInTheDocument();
    expect(screen.getByText('Certifications earned')).toBeInTheDocument();
    expect(screen.getByText('150+')).toBeInTheDocument();
    expect(screen.getByText('20+')).toBeInTheDocument();
  });

  it('lists the soft skills', () => {
    render(<About />);
    expect(screen.getByText('Problem-Solving')).toBeInTheDocument();
    expect(screen.getByText('Critical Thinking')).toBeInTheDocument();
  });
});
