import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Education } from './Education';

describe('Education', () => {
  it('has the education section id', () => {
    render(<Education />);
    expect(document.getElementById('education')).not.toBeNull();
  });

  it('lists all three qualifications', () => {
    render(<Education />);
    expect(
      screen.getByText('Kes Shroff College, Mumbai'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Higher Secondary Certificate'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Secondary School Certificate'),
    ).toBeInTheDocument();
  });

  it('shows the expected graduation year', () => {
    render(<Education />);
    expect(screen.getByText('Expected 2027')).toBeInTheDocument();
  });

  it('uses an ordered list for the timeline', () => {
    render(<Education />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
