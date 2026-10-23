export type SkillCategory =
  | 'Frontend Development'
  | 'Backend Development'
  | 'Database'
  | 'Tools and Development Environment'
  | 'Design';

export type FamiliarityLevel = 'Familiar' | 'Beginner' | 'Learning';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  familiarity: FamiliarityLevel;
  description: string;
  evidence: string; // evidence or context of practical usage
  relatedProjects?: string[]; // project ids
  terminalIcon: string;
}

export const skills: Skill[] = [
  // Frontend Development
  {
    id: 'html',
    name: 'HTML5',
    category: 'Frontend Development',
    familiarity: 'Familiar',
    description:
      'Semantic structure, forms, tables, and standard markup for accessible web interfaces.',
    evidence:
      'Implemented across school assignments and projects including Oxford Gift Shop, Student Data System, and SiCepat clone.',
    relatedProjects: ['sweetbake', 'oxford-gift-shop', 'student-data-management', 'sicepat-clone'],
    terminalIcon: '🌐',
  },
  {
    id: 'css',
    name: 'CSS3',
    category: 'Frontend Development',
    familiarity: 'Familiar',
    description:
      'Responsive design, Flexbox, Grid, CSS animations, and custom styling systems.',
    evidence:
      'Applied for custom styling in SweetBake, Oxford Gift Shop, and layout recreation in SiCepat Clone.',
    relatedProjects: ['sweetbake', 'oxford-gift-shop', 'sicepat-clone'],
    terminalIcon: '🎨',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend Development',
    familiarity: 'Familiar',
    description:
      'Core ES6+ syntax, DOM manipulation, asynchronous fetching, and interactive UI logic.',
    evidence:
      'Wrote client-side logic for SweetBake, Kasir Frontend, Oxford Gift Shop, and interactive web projects.',
    relatedProjects: ['kasir-frontend', 'sweetbake', 'oxford-gift-shop', 'pokemon-rpg-portfolio'],
    terminalIcon: '⚡',
  },
  {
    id: 'vue',
    name: 'Vue.js / Nuxt',
    category: 'Frontend Development',
    familiarity: 'Familiar',
    description:
      'Component reactivity, Vue 3 Composition API, routing, and full-stack Nuxt framework.',
    evidence:
      'Built the Kasir Frontend (Point of Sale) cashier checkout system using Nuxt and Vue 3.',
    relatedProjects: ['kasir-frontend'],
    terminalIcon: '💚',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend Development',
    familiarity: 'Familiar',
    description:
      'Utility-first CSS framework for rapid and responsive retro and modern user interfaces.',
    evidence:
      'Utilized in Kasir Frontend POS system and this Pokémon RPG portfolio application.',
    relatedProjects: ['kasir-frontend', 'pokemon-rpg-portfolio'],
    terminalIcon: '🌊',
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend Development',
    familiarity: 'Learning',
    description:
      'Component-based architecture, hooks (useState, useEffect, useCallback), and declarative UI.',
    evidence:
      'Currently learning and applying to build dynamic portfolio components and state management.',
    relatedProjects: ['pokemon-rpg-portfolio'],
    terminalIcon: '⚛️',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend Development',
    familiarity: 'Learning',
    description:
      'Modern React framework with App Router, static generation, and optimized web performance.',
    evidence:
      'Utilized as the foundation framework for this interactive 2D RPG portfolio web application.',
    relatedProjects: ['pokemon-rpg-portfolio'],
    terminalIcon: '▲',
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    category: 'Frontend Development',
    familiarity: 'Beginner',
    description:
      'Grid system, utility classes, and pre-styled responsive interface components.',
    evidence:
      'Used for fast, organized layout in the Student Data Management CRUD system.',
    relatedProjects: ['student-data-management'],
    terminalIcon: '🅱️',
  },

  // Backend Development
  {
    id: 'php',
    name: 'PHP',
    category: 'Backend Development',
    familiarity: 'Beginner',
    description:
      'Server-side scripting, request handling, sessions, and connecting backend logic to databases.',
    evidence:
      'Developed server scripts and SQL query handlers for the Student Data Management system.',
    relatedProjects: ['student-data-management'],
    terminalIcon: '🐘',
  },
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'Backend Development',
    familiarity: 'Beginner',
    description:
      'PHP web application framework featuring MVC architecture, Blade templating, Eloquent ORM, and REST APIs.',
    evidence:
      'Developed backend REST APIs for the Kasir POS application and student management systems.',
    relatedProjects: ['kasir-frontend'],
    terminalIcon: '🏗️',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Backend Development',
    familiarity: 'Learning',
    description:
      'Static typing, interface definitions, and type safety for scalable JavaScript codebases.',
    evidence:
      'Used throughout the codebase of this Pokémon RPG portfolio project.',
    relatedProjects: ['pokemon-rpg-portfolio'],
    terminalIcon: '💎',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Backend Development',
    familiarity: 'Learning',
    description:
      'Object-oriented programming concepts (OOP), classes, inheritance, and algorithmic logic.',
    evidence:
      'Studied in SMKN 71 Jakarta Software Engineering coursework for core OOP foundations.',
    terminalIcon: '☕',
  },

  // Database
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Database',
    familiarity: 'Beginner',
    description:
      'Relational database management, table schema design, and SQL CRUD queries (SELECT, INSERT, UPDATE, DELETE).',
    evidence:
      'Designed student record database tables and executed queries for the Student Data Management project.',
    relatedProjects: ['student-data-management'],
    terminalIcon: '🗄️',
  },

  // Tools and Development Environment
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Tools and Development Environment',
    familiarity: 'Familiar',
    description:
      'Primary code editor with extensions, integrated terminal, debugging tools, and Git integration.',
    evidence:
      'Daily development environment used for all school tasks and portfolio programming.',
    terminalIcon: '💻',
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Tools and Development Environment',
    familiarity: 'Beginner',
    description:
      'Version control fundamentals: git init, add, commit, branch, and status tracking.',
    evidence:
      'Used for tracking changes and version history in local development projects.',
    terminalIcon: '🔀',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Tools and Development Environment',
    familiarity: 'Beginner',
    description:
      'Remote repository hosting, code management, and open-source profile maintenance.',
    evidence:
      'Maintains projects and portfolio codebase at github.com/akbarwijayalah-pixel.',
    terminalIcon: '🐙',
  },

  // Design
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    familiarity: 'Beginner',
    description:
      'UI wireframing, layout prototyping, and examining design dimensions for frontend coding.',
    evidence:
      'Used for planning web layouts and referencing UI mockups before frontend implementation.',
    terminalIcon: '🎨',
  },
];

export const skillCategories: SkillCategory[] = [
  'Frontend Development',
  'Backend Development',
  'Database',
  'Tools and Development Environment',
  'Design',
];
