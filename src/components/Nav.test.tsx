import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders a labelled navigation landmark', () => {
    render(<Nav />);
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
  });

  it('links to every section', () => {
    render(<Nav />);
    for (const label of ['About', 'Skills', 'Projects', 'Education', 'Contact']) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute(
        'href',
        `#${label.toLowerCase()}`,
      );
    }
  });

  it('offers the resume for download', () => {
    render(<Nav />);
    const resume = screen.getByRole('link', { name: /download cv/i });
    expect(resume).toHaveAttribute('href', '/resume.pdf');
  });

  it('opens and closes the mobile menu', async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const toggle = screen.getByRole('button', { name: /open menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    expect(
      screen.getByRole('button', { name: /close navigation/i }),
    ).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByRole('navigation', { name: 'Mobile' }),
    ).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(
      screen.queryByRole('navigation', { name: 'Mobile' }),
    ).not.toBeInTheDocument();
  });
});
