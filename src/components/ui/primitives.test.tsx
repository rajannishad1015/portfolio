import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CandyButton, CandyLink } from './CandyButton';
import { DotGrid } from './DotGrid';
import { Pill } from './Pill';
import { SectionTitle } from './SectionTitle';
import { Squiggle } from './Squiggle';
import { StickerCard } from './StickerCard';

describe('CandyButton', () => {
  it('renders a primary button with the pop shadow', () => {
    render(<CandyButton>Get in touch</CandyButton>);
    const button = screen.getByRole('button', { name: 'Get in touch' });
    expect(button.className).toContain('bg-accent');
    expect(button.className).toMatch(/(\s|^)shadow-pop(\s|$)/);
    expect(button.className).toContain('rounded-full');
  });

  it('renders a secondary button with a transparent background', () => {
    render(<CandyButton variant="secondary">Download CV</CandyButton>);
    const button = screen.getByRole('button', { name: 'Download CV' });
    expect(button.className).toContain('bg-transparent');
  });
});

describe('CandyLink', () => {
  it('renders an anchor with the given href', () => {
    render(
      <CandyLink href="mailto:rajannishad1015@gmail.com">Email</CandyLink>,
    );
    const link = screen.getByRole('link', { name: 'Email' });
    expect(link).toHaveAttribute('href', 'mailto:rajannishad1015@gmail.com');
  });

  it('wraps the icon in a white circle', () => {
    render(
      <CandyLink href="#projects" icon={<span data-testid="icon" />}>
        View Projects
      </CandyLink>,
    );
    const icon = screen.getByTestId('icon');
    expect(icon.parentElement?.className).toContain('bg-white');
  });

  it('lets a consumer override the display class', () => {
    render(
      <CandyLink href="#projects" className="hidden sm:inline-flex">
        View Projects
      </CandyLink>,
    );
    const link = screen.getByRole('link', { name: 'View Projects' });
    expect(link.className).toContain('hidden');
    expect(link.className).not.toMatch(/(\s|^)inline-flex(\s|$)/);
  });
});

describe('StickerCard', () => {
  it('renders a titled card with a hard border', () => {
    render(<StickerCard title="Data Analysis">Body</StickerCard>);
    expect(screen.getByRole('heading', { name: 'Data Analysis' })).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('forwards arbitrary props such as data-reveal', () => {
    render(<StickerCard data-reveal>Body</StickerCard>);
    expect(screen.getByText('Body').closest('article')).toHaveAttribute(
      'data-reveal',
    );
  });

  it('applies the pink shadow to the featured variant', () => {
    render(
      <StickerCard shadow="pink" data-testid="card">
        Body
      </StickerCard>,
    );
    expect(screen.getByTestId('card').className).toContain('shadow-pop-pink');
  });
});

describe('Pill', () => {
  it('renders its children', () => {
    render(<Pill>Next.js</Pill>);
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });
});

describe('Squiggle', () => {
  it('is hidden from assistive technology', () => {
    const { container } = render(<Squiggle />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('SectionTitle', () => {
  it('renders the eyebrow, the heading and the lead', () => {
    render(
      <SectionTitle eyebrow="Toolkit" title="Skills & Stack" lead="The tools." />,
    );
    expect(screen.getByText('Toolkit')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Skills & Stack' }),
    ).toBeInTheDocument();
    expect(screen.getByText('The tools.')).toBeInTheDocument();
  });

  it('omits the lead paragraph when no lead is given', () => {
    const { queryByText } = render(
      <SectionTitle eyebrow="Toolkit" title="Skills & Stack" />,
    );
    expect(queryByText('The tools.')).toBeNull();
  });
});


describe('DotGrid', () => {
  it('renders a decorative panel', () => {
    const { container } = render(<DotGrid />);
    expect(container.querySelector('.dot-grid')).not.toBeNull();
  });

  it('is hidden from assistive technology', () => {
    const { container } = render(<DotGrid />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });
});
