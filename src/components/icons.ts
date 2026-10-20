import {
  BarChart3,
  Cloud,
  Code2,
  Database,
  Users,
  type LucideIcon,
} from 'lucide-react';

export const ICONS = {
  barChart3: BarChart3,
  cloud: Cloud,
  code2: Code2,
  database: Database,
  users: Users,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;
