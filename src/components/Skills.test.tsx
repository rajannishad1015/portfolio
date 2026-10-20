import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skills } from './Skills';

describe('Skills', () => {
  it('has the skills section id', () => {
    render(<Skills />);
    expect(document.getElementById('skills')).not.toBeNull();
  });

  it('renders one card per skill group', () => {
    render(<Skills />);
    expect(
      screen.getByRole('heading', { name: 'Data Analysis & Visualization' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Database Management' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Programming & Scripting' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Cloud & DevOps' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Soft Skills' }),
    ).toBeInTheDocument();
  });

  it('lists the tools inside the groups', () => {
    render(<Skills />);
    expect(screen.getByText('Power BI')).toBeInTheDocument();
    expect(screen.getByText('SQL Server')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
  });
});
