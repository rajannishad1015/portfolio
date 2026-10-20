import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Certifications } from './Certifications';

describe('Certifications', () => {
  it('has the certifications section id', () => {
    render(<Certifications />);
    expect(document.getElementById('certifications')).not.toBeNull();
  });

  it('renders eight badges', () => {
    render(<Certifications />);
    expect(document.querySelectorAll('[data-certification]')).toHaveLength(8);
  });

  it('names the headline certificates', () => {
    render(<Certifications />);
    expect(
      screen.getByText('Data Analytics Professional Certificate'),
    ).toBeInTheDocument();
    expect(
      screen.getByText("CS50's Introduction to AI"),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Prompt Engineering'),
    ).toBeInTheDocument();
  });
});
