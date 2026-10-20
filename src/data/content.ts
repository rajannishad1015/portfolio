import type { AccentColor } from '../lib/theme';
import type { IconName } from '../components/icons';

const SOFT_SKILLS = [
  'Problem-Solving',
  'Critical Thinking',
  'Communication',
  'Attention to Detail',
] as const;

export const profile = {
  name: 'Rajan Nishad',
  initials: 'RN',
  firstName: 'Rajan',
  lastName: 'Nishad',
  roles: ['Data Analyst', 'Data Scientist', 'ML Engineer', 'Full-Stack Builder'],
  availability: 'Available for Data Analyst / Data Science roles',
  greeting: "Hello, I'm",
  roleLine:
    'Data Science Student | ML & Analytics | Full-Stack Builder',
  introBefore:
    "I'm a final-year Data Science student in Mumbai with a passion for turning messy data into decisions people can act on — predictive models, analytics dashboards and full-stack data platforms. I love strategies that drive real results, and I'm on my way to becoming a ",
  introHighlight: 'Data Scientist',
  introAfter: '.',
  /**
   * The hero portrait is a placeholder until a real photo is supplied.
   * Drop the PNG at this path and set `portraitSrc` to it — the frame renders
   * the image with `object-fit: contain` so nothing is cropped or stretched.
   */
  portraitPath: '/images/rajan-portrait.png',
  portraitSrc: null as string | null,
  portraitAlt: 'Rajan Nishad, Data Science student at Kes Shroff College, Mumbai',
  summary:
    'Final-year Data Science student at Kes Shroff College, Mumbai, building end-to-end analytics dashboards, predictive models and full-stack data platforms from raw data to actionable insight.',
  about:
    'I turn messy data into decisions people can act on. My work spans logistic regression and Scikit-learn models, Power BI dashboards, and full-stack platforms on Next.js and Supabase — and I care about the numbers on the other side: 90% forecast accuracy, 10% churn reduction, 25% faster reporting. Currently completing a B.Sc. in Data Science and open to Data Analyst and Data Science roles in Mumbai or remote.',
  softSkills: SOFT_SKILLS,
} as const;

export const heroStats = [
  { value: '4', label: 'Shipped Projects', icon: 'barChart3', tone: 'pop' },
  { value: '8', label: 'Certifications', icon: 'lightbulb', tone: 'sun' },
  { value: '90%', label: 'Forecast Accuracy', icon: 'rocket', tone: 'mint' },
] as const satisfies ReadonlyArray<{
  value: string;
  label: string;
  icon: IconName;
  tone: 'pop' | 'sun' | 'mint';
}>;

export const floatingSkills = [
  { title: 'Data & Analytics', icon: 'barChart3', tone: 'pop' },
  { title: 'B.Sc. Data Science', icon: 'graduationCap', tone: 'sun' },
  { title: 'SQL & Pipelines', icon: 'database', tone: 'accent' },
] as const satisfies ReadonlyArray<{
  title: string;
  icon: IconName;
  tone: 'pop' | 'sun' | 'accent';
}>;

export const socials = [
  {
    label: 'Email',
    href: 'mailto:rajannishad1015@gmail.com',
    icon: 'mail',
    external: false,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Rajannishad1015',
    icon: 'github',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/rajanishad',
    icon: 'linkedin',
    external: true,
  },
  {
    label: 'Website',
    href: 'https://rajann.me',
    icon: 'globe',
    external: true,
  },
] as const satisfies ReadonlyArray<{
  label: string;
  href: string;
  icon: IconName;
  external: boolean;
}>;

export const heroNotes = {
  top: {
    lines: ['Keep Learning', 'Keep Growing'],
    caption: 'A note to self',
  },
  bottom: {
    lines: ['Better Data', 'Better Decisions'],
    caption: 'The north star',
  },
} as const;

export const links = {
  email: 'rajannishad1015@gmail.com',
  phone: '+91 96198 72801',
  phoneHref: 'tel:+919619872801',
  github: 'https://github.com/Rajannishad1015',
  linkedin: 'https://linkedin.com/in/rajanishad',
  site: 'https://rajann.me',
  resumeHref: '/resume.pdf',
} as const;

export const stats = [
  { value: '4', label: 'Shipped projects' },
  { value: '8', label: 'Certifications earned' },
  { value: '150+', label: 'Global stores served' },
  { value: '20+', label: 'Mumbai localities modelled' },
] as const satisfies ReadonlyArray<{ value: string; label: string }>;

export const skillGroups = [
  {
    id: 'data-viz',
    title: 'Data Analysis & Visualization',
    color: 'accent',
    icon: 'barChart3',
    items: ['Excel', 'Power BI', 'Tableau', 'Matplotlib', 'Seaborn', 'Plotly'],
  },
  {
    id: 'databases',
    title: 'Database Management',
    color: 'pop',
    icon: 'database',
    items: ['MySQL', 'PostgreSQL', 'Oracle', 'SQL Server'],
  },
  {
    id: 'programming',
    title: 'Programming & Scripting',
    color: 'sun',
    icon: 'code2',
    items: [
      'Python',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'FastAPI',
      'Java',
      'C++',
      'JavaScript',
      'Next.js',
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    color: 'mint',
    icon: 'cloud',
    items: [
      'AWS (SageMaker, EC2, S3, Lambda)',
      'Google Cloud',
      'Git / GitHub',
      'Vercel',
      'Docker',
    ],
  },
  {
    id: 'soft',
    title: 'Soft Skills',
    color: 'ink',
    icon: 'users',
    items: SOFT_SKILLS,
  },
] as const satisfies ReadonlyArray<{
  id: string;
  title: string;
  color: AccentColor;
  icon: IconName;
  items: readonly string[];
}>;

export const projects = [
  {
    id: 'swara-digital',
    title: 'Swara Digital',
    subtitle: 'Music Distribution Platform',
    featured: true,
    blurb:
      'End-to-end web platform letting independent artists distribute music to 150+ global stores with zero commission.',
    bullets: [
      'Engineered a secure backend on Supabase Auth with a custom Admin Dashboard for release moderation.',
      'Integrated Razorpay with idempotent webhooks for seamless subscriptions and real-time royalty payouts.',
      'Built an interactive analytics dashboard for artists to track streams, revenue and geographic performance.',
    ],
    metrics: [
      { value: '150+', label: 'global stores' },
      { value: '0%', label: 'commission' },
    ],
    tags: ['Next.js', 'Node.js', 'Supabase', 'Razorpay'],
    // TODO: replace with the real live and source URLs
    links: { live: '#', source: '#' },
  },
  {
    id: 'sales-forecasting',
    title: 'Sales Analysis & Forecasting Dashboard',
    subtitle: 'Power BI',
    featured: false,
    blurb:
      'A predictive Power BI dashboard built on three years of historical sales data, used to automate monthly trend analysis.',
    bullets: [
      'Modelled over three years of historical sales data into an interactive Power BI report.',
      'Improved decision-making for the marketing team with a forecast reaching 90% accuracy.',
      'Automated monthly sales trend analysis, lifting reporting efficiency by 25%.',
    ],
    metrics: [
      { value: '90%', label: 'forecast accuracy' },
      { value: '25%', label: 'more efficient reporting' },
    ],
    tags: ['Power BI', 'Excel', 'Data Modelling'],
    // TODO: replace with the real live and source URLs
    links: { live: '#', source: '#' },
  },
  {
    id: 'house-price-predictor',
    title: 'Mumbai House Price Predictor',
    subtitle: 'Java Swing + Python',
    featured: false,
    blurb:
      'A hybrid desktop app with a Java Swing GUI talking to a Python ML backend to predict Mumbai house prices.',
    bullets: [
      'Trained a Scikit-learn regression model on a cleaned Mumbai housing dataset.',
      'Applied OOP principles across modular Java panels — Prediction, Data and Chart — extending a shared BasePanel.',
      'Rendered charts and locality-wise price distributions from the Python backend across 20+ localities.',
    ],
    metrics: [
      { value: '20+', label: 'localities covered' },
      { value: '3', label: 'Java panels' },
    ],
    tags: ['Java', 'Swing', 'Python', 'Scikit-learn', 'Pandas'],
    // TODO: replace with the real live and source URLs
    links: { live: '#', source: '#' },
  },
  {
    id: 'churn-model',
    title: 'Churn Prediction Model',
    subtitle: 'Python + Power BI',
    featured: false,
    blurb:
      'A logistic regression model that predicts subscription churn and feeds a Power BI dashboard for retention decisions.',
    bullets: [
      'Designed and implemented a logistic regression model in Python to predict customer churn.',
      'Reached 85% prediction accuracy, enabling proactive retention strategies.',
      'Reduced churn by 10% over six months and presented findings through a Power BI dashboard.',
    ],
    metrics: [
      { value: '85%', label: 'prediction accuracy' },
      { value: '10%', label: 'churn reduction' },
    ],
    tags: ['Python', 'Scikit-learn', 'Power BI'],
    // TODO: replace with the real live and source URLs
    links: { live: '#', source: '#' },
  },
] as const satisfies ReadonlyArray<{
  id: string;
  title: string;
  subtitle: string;
  featured: boolean;
  blurb: string;
  bullets: readonly string[];
  metrics: ReadonlyArray<{ value: string; label: string }>;
  tags: readonly string[];
  links: { live: string; source: string };
}>;

export const education = [
  {
    id: 'kes-shroff',
    institution: 'Kes Shroff College, Mumbai',
    qualification: 'B.Sc. Data Science',
    period: '2024 — 2027',
    year: '2027',
    detail: 'Expected 2027',
    current: true,
  },
  {
    id: 'hsc',
    institution: 'HSC, Maharashtra Board, Mumbai',
    qualification: 'Higher Secondary Certificate',
    period: '2024',
    year: '2024',
    detail: '',
    current: false,
  },
  {
    id: 'ssc',
    institution: 'SSC, Maharashtra Board, Mumbai',
    qualification: 'Secondary School Certificate',
    period: '2022',
    year: '2022',
    detail: '',
    current: false,
  },
] as const satisfies ReadonlyArray<{
  id: string;
  institution: string;
  qualification: string;
  period: string;
  year: string;
  detail: string;
  current: boolean;
}>;

export const certifications = [
  {
    id: 'google-data-analytics',
    issuer: 'Google',
    name: 'Data Analytics Professional Certificate',
    initial: 'G',
    color: 'sun',
  },
  {
    id: 'ibm-ml-python',
    issuer: 'IBM',
    name: 'Machine Learning With Python',
    initial: 'ML',
    color: 'accent',
  },
  {
    id: 'ibm-python-ds',
    issuer: 'IBM',
    name: 'Python for Data Science',
    initial: 'PY',
    color: 'accent',
  },
  {
    id: 'ibm-ai-dev',
    issuer: 'IBM',
    name: 'AI & Development',
    initial: 'AI',
    color: 'accent',
  },
  {
    id: 'harvard-cs50-ai',
    issuer: 'Harvard University',
    name: "CS50's Introduction to AI",
    initial: 'H',
    color: 'pop',
  },
  {
    id: 'columbia-prompt',
    issuer: 'Columbia University',
    name: 'Prompt Engineering',
    initial: 'C',
    color: 'mint',
  },
  {
    id: 'oracle-ai-foundations',
    issuer: 'Oracle Cloud Infrastructure',
    name: 'AI Foundations Associate',
    initial: 'OA',
    color: 'ink',
  },
  {
    id: 'oracle-data-science',
    issuer: 'Oracle Cloud Infrastructure',
    name: 'Data Science',
    initial: 'OD',
    color: 'ink',
  },
] as const satisfies ReadonlyArray<{
  id: string;
  issuer: string;
  name: string;
  initial: string;
  color: AccentColor;
}>;

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
] as const satisfies ReadonlyArray<{ href: string; label: string }>;

export const sectionIds = [
  'home',
  'about',
  'skills',
  'projects',
  'education',
  'certifications',
  'contact',
] as const;

export const marqueeItems = [
  'Python',
  'SQL',
  'Power BI',
  'Next.js',
  'Scikit-learn',
  'FastAPI',
  'AWS',
  'Docker',
  'Supabase',
  'PostgreSQL',
  'Pandas',
  'Java',
] as const;
