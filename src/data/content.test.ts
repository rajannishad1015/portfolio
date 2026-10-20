import { describe, expect, it } from 'vitest';
import {
  certifications,
  education,
  links,
  navLinks,
  profile,
  projects,
  sectionIds,
  skillGroups,
  stats,
} from './content';

describe('content model', () => {
  it('describes the owner', () => {
    expect(profile.name).toBe('Rajan Nishad');
    expect(profile.roles).toHaveLength(4);
    for (const role of profile.roles) {
      expect(role.trim()).not.toBe('');
    }
    expect(profile.summary.length).toBeGreaterThan(80);
    expect(profile.about.length).toBeGreaterThan(80);
    expect(profile.availability.length).toBeGreaterThan(0);
  });

  it('exposes working contact links', () => {
    expect(links.email).toBe('rajannishad1015@gmail.com');
    expect(links.phoneHref).toBe('tel:+919619872801');
    expect(links.github).toMatch(/^https:\/\/github\.com\//);
    expect(links.linkedin).toMatch(/^https:\/\/linkedin\.com\//);
    expect(links.resumeHref).toBe('/resume.pdf');
  });

  it('has five skill groups with items', () => {
    expect(skillGroups).toHaveLength(5);
    for (const group of skillGroups) {
      expect(group.items.length).toBeGreaterThan(0);
      for (const item of group.items) {
        expect(item.trim()).not.toBe('');
      }
    }
    const flat = skillGroups.flatMap((group) => group.items);
    expect(flat).toContain('Power BI');
    expect(flat).toContain('Python');
    expect(flat).toContain('SQL Server');
  });

  it('has four projects, the first of which is featured', () => {
    expect(projects).toHaveLength(4);
    expect(projects.filter((project) => project.featured)).toHaveLength(1);
    expect(projects[0].featured).toBe(true);
    for (const project of projects) {
      expect(project.bullets.length).toBeGreaterThan(0);
      expect(project.metrics.length).toBeGreaterThan(0);
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.title.length).toBeGreaterThan(0);
    }
    expect(projects[0].title).toBe('Swara Digital');
  });

  it('has three education entries and eight certifications', () => {
    expect(education).toHaveLength(3);
    expect(certifications).toHaveLength(8);
    for (const cert of certifications) {
      expect(cert.initial.length).toBeGreaterThan(0);
      expect(cert.initial.length).toBeLessThanOrEqual(2);
    }
    // Distinct initials, so no two badge tiles render identically.
    const initials = certifications.map((cert) => cert.initial);
    expect(new Set(initials).size).toBe(initials.length);
  });

  it('has four stats and a nav link per section', () => {
    expect(stats).toHaveLength(4);
    expect(navLinks.map((link) => link.href)).toEqual([
      '#about',
      '#skills',
      '#projects',
      '#education',
      '#contact',
    ]);
    for (const link of navLinks) {
      expect(sectionIds).toContain(link.href.replace('#', ''));
    }
  });
});
