import {
  BarChart3,
  Brain,
  Cloud,
  Code2,
  Database,
  Github,
  Globe,
  GraduationCap,
  Lightbulb,
  Linkedin,
  Mail,
  Rocket,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';

export const ICONS = {
  barChart3: BarChart3,
  brain: Brain,
  cloud: Cloud,
  code2: Code2,
  database: Database,
  github: Github,
  globe: Globe,
  graduationCap: GraduationCap,
  lightbulb: Lightbulb,
  linkedin: Linkedin,
  mail: Mail,
  rocket: Rocket,
  sparkles: Sparkles,
  users: Users,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;
