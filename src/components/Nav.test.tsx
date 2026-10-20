import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders a labelled navigation landmark', () => {
    render(<Nav />);
    expect(
      screen.getByRole('navigation', { name: 'Primary' }),
    ).toBeInTheDocument();
  });

  it('shows the brand as a home link', () => {
    render(<Nav />);
    const brand = screen.getByRole('link', { name: /back to top/i });
    expect(brand).toHaveAttribute('href', '#home');
  });

  it('links to every real section', () => {
    render(<Nav />);
    for (const label of [
      'Home',
      'About',
      'Skills',
      'Projects',
      'Education',
      'Contact',
    ]) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute(
        'href',
        `#${label.toLowerCase()}`,
      );
    }
  });

  it('offers a connect call to action', () => {
    render(<Nav />);
    expect(
      screen.getByRole('link', { name: /let.s connect/i }),
    ).toHaveAttribute('href', '#contact');
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
