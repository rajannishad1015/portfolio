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
  firstName: 'Rajan',
  lastName: 'Nishad',
  greeting: "Hello, I'm",
  roleLine:
    'Data Science Student | ML & Analytics | Full-Stack Builder',
  introBefore:
    "I'm a final-year Data Science student at Kes Shroff College, Mumbai, focusing on practical machine learning, exploratory data analysis, and building full-stack applications. I am working towards a career as a ",
  introHighlight: 'Data Scientist',
  introAfter: '.',
  /**
   * The hero portrait. `rajan.png` (the source in the project root) has its
   * baked-in checkerboard background removed by
   * `tools/strip-checkerboard.py`, which writes a transparent PNG and a
   * WebP. The WebP is what the site loads; the PNG is the fallback source.
   */
  portraitPath: '/images/rajan-portrait.png',
  portraitSrc: '/images/rajan-portrait.webp',
  portraitAlt:
    'Illustrated portrait of Rajan Nishad in a suit giving a thumbs up',
  about:
    'I am a final-year B.Sc. Data Science student at Kes Shroff College, Mumbai. My background is in statistics, data analytics, and applied machine learning, combined with hands-on full-stack development skills. I build end-to-end projects using Python (Scikit-learn, Pandas, NumPy), SQL databases, and web frameworks like FastAPI and Next.js. I focus on writing clean, modular code and solving real practical problems with data. I am actively seeking internship and entry-level Data Analyst or Junior Data Scientist opportunities in Mumbai.',
  softSkills: SOFT_SKILLS,
} as const;

export const heroStats = [
  { value: '30+', label: 'Projects', icon: 'barChart3', tone: 'pop' },
  { value: '8', label: 'Certifications', icon: 'lightbulb', tone: 'sun' },
  { value: 'Mumbai', label: 'Open to Work', icon: 'globe', tone: 'mint' },
] as const satisfies ReadonlyArray<{
  value: string;
  label: string;
  icon: IconName;
  tone: 'pop' | 'sun' | 'mint';
}>;

export const floatingSkills = [
  {
    title: 'Data & Analytics',
    line1: 'Data &',
    line2: 'Analytics',
    icon: 'trendingUp',
    tone: 'pop',
  },
  {
    title: 'B.Sc. Data Science',
    line1: 'B.Sc.',
    line2: 'Data Science',
    icon: 'graduationCap',
    tone: 'sun',
  },
  {
    title: 'Data Science Aspirant',
    line1: 'Data Science',
    line2: 'Aspirant',
    icon: 'database',
    tone: 'accent',
  },
] as const satisfies ReadonlyArray<{
  title: string;
  line1?: string;
  line2?: string;
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
    lines: ['Better Strategies', 'Brighter Results'],
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
  { value: '30+', label: 'Projects Built' },
  { value: '8', label: 'Certifications' },
  { value: 'B.Sc.', label: 'Data Science' },
  { value: '2027', label: 'Graduation Year' },
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
      'PyTorch',
      'FastAPI',
      'TypeScript',
      'JavaScript',
      'Next.js',
      'Java',
      'C++',
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
      'A freelance build for RR Creation — an end-to-end web platform letting independent artists distribute music to 150+ global stores with zero commission.',
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
    links: {
      live: 'https://www.swaradigital.in/',
      source: '',
    },
  },
  {
    id: 'retention-iq',
    title: 'RetentionIQ',
    subtitle: 'Survival Analysis & Uplift ML',
    featured: false,
    blurb:
      'A production capstone replacing binary churn classifiers with multi-horizon survival analysis (S(t)), causal uplift modeling (X-Learner), and net ROI treatment ranking.',
    bullets: [
      'Modelled customer survival curves across dynamic time horizons using Cox Proportional Hazards and XGBoost.',
      'Implemented causal uplift modeling with X-Learner to rank retention treatments by net economic ROI.',
      'Deployed an interactive decision dashboard in Streamlit backed by a high-throughput FastAPI prediction service.',
    ],
    metrics: [
      { value: '17', label: 'unit tests passed' },
      { value: 'Net ROI', label: 'treatment ranking' },
    ],
    tags: ['Python', 'FastAPI', 'Streamlit', 'XGBoost', 'Survival Analysis', 'Scikit-learn'],
    links: {
      live: '#',
      source:
        'https://github.com/rajannishad1015/Survival-Based-Churn-Modeling-with-Personalized-Retention-Treatment-Ranking',
    },
  },
  {
    id: 'docucat-ai',
    title: 'DocuCat AI',
    subtitle: 'Multi-Model Document Intelligence',
    featured: false,
    blurb:
      'An intelligent multi-model document categorization, extraction & benchmarking platform covering 12 distinct document categories.',
    bullets: [
      'Engineered a multi-model pipeline leveraging PyTorch and Hugging Face Transformers for fine-grained document classification.',
      'Designed an automated metadata and entity extraction pipeline for invoices, legal agreements, and reports.',
      'Built an interactive web dashboard with FastAPI backend and client-side telemetry for real-time model benchmarking.',
    ],
    metrics: [
      { value: '12', label: 'document classes' },
      { value: 'PyTorch', label: 'deep learning pipeline' },
    ],
    tags: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'NLP', 'Scikit-learn'],
    links: {
      live: '#',
      source: 'https://github.com/rajannishad1015/intelligent-document-categorization',
    },
  },
  {
    id: 'ecommerce-recommender',
    title: 'E-Commerce Recommendation Engine',
    subtitle: 'Machine Learning & Hybrid Filtering',
    featured: false,
    blurb:
      'An end-to-end intelligent recommendation and semantic discovery platform processing catalog data, user behavior, and natural language search queries in real time.',
    bullets: [
      'Built an NLP query engine parsing natural language intent, category, brand, and numerical price constraints.',
      'Engineered hybrid recommendations combining TF-IDF cosine similarity with collaborative filtering algorithms.',
      'Integrated a production FastAPI backend with PostgreSQL and Dockerized services, verified with 18 automated unit tests.',
    ],
    metrics: [
      { value: '18', label: 'tests passed (100%)' },
      { value: 'Hybrid', label: 'filtering architecture' },
    ],
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Scikit-learn', 'NLP', 'Docker'],
    links: {
      live: '#',
      source: 'https://github.com/rajannishad1015/ECommerce-Recommendation-Systen',
    },
  },
  {
    id: 'marg-autonomous-routing',
    title: 'MARG: Adaptive Route Generation',
    subtitle: 'Autonomous Perception & Telemetry',
    featured: false,
    blurb:
      'Autonomous perception, quantitative risk telemetry, and adaptive route planning system engineered for complex and unstructured traffic environments.',
    bullets: [
      'Integrated real-time computer vision perception using TensorFlow.js COCO-SSD for multi-obstacle detection.',
      'Architected telemetry risk scoring and route optimization simulated in MATLAB & Simulink Stateflow.',
      'Engineered around ISO 26262 / ASIL-D functional safety specifications for autonomous vehicle path navigation.',
    ],
    metrics: [
      { value: 'ASIL-D', label: 'safety architecture' },
      { value: 'Real-Time', label: 'vision perception' },
    ],
    tags: ['Python', 'TensorFlow.js', 'MATLAB', 'Simulink', 'Computer Vision'],
    links: {
      live: '#',
      source: 'https://github.com/rajannishad1015/Multi-Modal-Adaptive-Route-Generation',
    },
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
  links: { live: string; source?: string };
}>;

export const education = [
  {
    id: 'kes-shroff',
    institution: 'Kes Shroff College, Mumbai',
    qualification: 'B.Sc. Data Science',
    period: '2024 — 2027',
    year: '2027',
    detail: 'Specializing in Applied Machine Learning, Statistical Analysis & Data Systems',
    current: true,
    coursework: [
      'Machine Learning',
      'Statistical Methods & Probability',
      'Python & R Programming',
      'Database Management (SQL)',
      'Data Structures & Algorithms',
      'Data Visualization',
    ],
  },
  {
    id: 'hsc',
    institution: 'HSC, Maharashtra Board, Mumbai',
    qualification: 'Higher Secondary Certificate',
    period: '2024',
    year: '2024',
    detail: 'Science Stream with Mathematics & Computer Science',
    current: false,
    coursework: ['Mathematics', 'Computer Science', 'Physics', 'Chemistry'],
  },
  {
    id: 'ssc',
    institution: 'SSC, Maharashtra Board, Mumbai',
    qualification: 'Secondary School Certificate',
    period: '2022',
    year: '2022',
    detail: 'Foundational Science & Mathematics',
    current: false,
    coursework: ['Mathematics', 'Science', 'Information Technology'],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  institution: string;
  qualification: string;
  period: string;
  year: string;
  detail: string;
  current: boolean;
  coursework?: readonly string[];
}>;

export const certifications = [
  {
    id: 'google-data-analytics',
    issuer: 'Google',
    name: 'Data Analytics Professional Certificate',
    initial: 'G',
    color: 'sun',
    category: 'Analytics & SQL',
    skills: ['SQL', 'R', 'Tableau', 'Spreadsheets'],
  },
  {
    id: 'ibm-ml-python',
    issuer: 'IBM',
    name: 'Machine Learning With Python',
    initial: 'ML',
    color: 'accent',
    category: 'Machine Learning',
    skills: ['Scikit-learn', 'Regression', 'Classification'],
  },
  {
    id: 'ibm-python-ds',
    issuer: 'IBM',
    name: 'Python for Data Science',
    initial: 'PY',
    color: 'accent',
    category: 'Data Science',
    skills: ['Python', 'Pandas', 'NumPy'],
  },
  {
    id: 'ibm-ai-dev',
    issuer: 'IBM',
    name: 'AI & Development',
    initial: 'AI',
    color: 'accent',
    category: 'AI Engineering',
    skills: ['Artificial Intelligence', 'APIs', 'Generative AI'],
  },
  {
    id: 'harvard-cs50-ai',
    issuer: 'Harvard University',
    name: "CS50's Introduction to AI",
    initial: 'H',
    color: 'pop',
    category: 'Computer Science & AI',
    skills: ['Neural Networks', 'NLP', 'Search Algorithms'],
  },
  {
    id: 'columbia-prompt',
    issuer: 'Columbia University',
    name: 'Prompt Engineering',
    initial: 'C',
    color: 'mint',
    category: 'GenAI & LLMs',
    skills: ['LLM Architecture', 'Context Framing', 'Few-Shot'],
  },
  {
    id: 'oracle-ai-foundations',
    issuer: 'Oracle Cloud Infrastructure',
    name: 'AI Foundations Associate',
    initial: 'OA',
    color: 'ink',
    category: 'Cloud AI',
    skills: ['OCI AI Services', 'Machine Learning', 'Cloud Infra'],
  },
  {
    id: 'oracle-data-science',
    issuer: 'Oracle Cloud Infrastructure',
    name: 'Data Science',
    initial: 'OD',
    color: 'ink',
    category: 'Cloud Data Science',
    skills: ['Model Pipelines', 'OCI Data Science', 'Deployment'],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  issuer: string;
  name: string;
  initial: string;
  color: AccentColor;
  category?: string;
  skills?: readonly string[];
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
