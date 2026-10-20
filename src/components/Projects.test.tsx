import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Projects } from './Projects';

describe('Projects', () => {
  it('has the projects section id', () => {
    render(<Projects />);
    expect(document.getElementById('projects')).not.toBeNull();
  });

  it('renders all four projects', () => {
    render(<Projects />);
    expect(
      screen.getByRole('heading', { name: 'Swara Digital' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Sales Analysis & Forecasting Dashboard' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Mumbai House Price Predictor' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Churn Prediction Model' }),
    ).toBeInTheDocument();
  });

  it('marks exactly one card as featured', () => {
    render(<Projects />);
    const featured = document.querySelectorAll('[data-featured="true"]');
    expect(featured).toHaveLength(1);
  });

  it('shows the headline metrics', () => {
    render(<Projects />);
    expect(screen.getByText('150+')).toBeInTheDocument();
    expect(screen.getByText('90%')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('shows a stack of technology tags', () => {
    render(<Projects />);
    expect(screen.getByText('Razorpay')).toBeInTheDocument();
    expect(screen.getAllByText('Scikit-learn').length).toBeGreaterThan(0);
  });

  it('replaces unfilled links with an honest placeholder chip', () => {
    render(<Projects />);
    expect(screen.getAllByText('Link coming soon').length).toBeGreaterThan(0);
  });
});
