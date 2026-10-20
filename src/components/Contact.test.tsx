import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Contact } from './Contact';

describe('Contact', () => {
  it('has the contact section id', () => {
    render(<Contact />);
    expect(document.getElementById('contact')).not.toBeNull();
  });

  it('offers a mailto link', () => {
    render(<Contact />);
    expect(
      screen.getByRole('link', { name: /email/i }),
    ).toHaveAttribute('href', 'mailto:rajannishad1015@gmail.com');
  });

  it('offers a tel link', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /call/i })).toHaveAttribute(
      'href',
      'tel:+919619872801',
    );
  });

  it('links to GitHub and LinkedIn', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/Rajannishad1015',
    );
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/rajanishad',
    );
  });

  it('has no contact form', () => {
    render(<Contact />);
    expect(document.querySelector('form')).toBeNull();
  });
});
