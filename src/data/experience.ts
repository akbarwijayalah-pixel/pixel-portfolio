export type ExperienceStatus = 'current' | 'completed' | 'ongoing' | 'upcoming';

export interface ExperienceEntry {
  id: string;
  title: string;
  period: string;
  description: string;
  status: ExperienceStatus;
  relatedProject?: string; // project id
  type: 'education' | 'learning' | 'practice';
}

export const experiences: ExperienceEntry[] = [
  {
    id: 'smkn71',
    title: 'SMKN 71 Jakarta - RPL Student',
    period: 'Current',
    description:
      'Studying Rekayasa Perangkat Lunak (Software Engineering) at SMKN 71 Jakarta. Learning programming fundamentals, web development, database management, and software engineering practices.',
    status: 'current',
    type: 'education',
  },
  {
    id: 'web-dev-practice',
    title: 'Web Development Practice',
    period: 'Ongoing',
    description:
      'Practicing frontend and backend web development through personal projects and school assignments. Building websites with HTML, CSS, JavaScript, and PHP.',
    status: 'ongoing',
    type: 'practice',
  },
  {
    id: 'crud-development',
    title: 'CRUD Application Development',
    period: 'Ongoing',
    description:
      'Learning to build complete CRUD (Create, Read, Update, Delete) applications with PHP and MySQL for data management.',
    status: 'completed',
    relatedProject: 'student-data-management',
    type: 'learning',
  },
  {
    id: 'laravel-mysql',
    title: 'Laravel & MySQL Learning',
    period: 'Ongoing',
    description:
      'Currently learning the Laravel PHP framework and deepening MySQL database skills for building more robust web applications.',
    status: 'ongoing',
    type: 'learning',
  },
  {
    id: 'pkl-preparation',
    title: 'PKL (Internship) Preparation',
    period: 'Upcoming',
    description:
      'Preparing portfolio, skills, and projects for Praktik Kerja Lapangan (PKL) internship placement. Building this portfolio website as part of the preparation.',
    status: 'upcoming',
    relatedProject: 'pokemon-rpg-portfolio',
    type: 'practice',
  },
];
