export type AchievementCategory = 'Awards' | 'Certifications' | 'Learning Milestones';
export type AchievementStatus = 'verified' | 'in-progress' | 'planned';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
  issuer?: string;
  category: AchievementCategory;
  image?: string; // path to certificate/badge image
  status: AchievementStatus;
}

// NOTE: Do not invent awards or certificates. 
// Add real achievements here as they are earned.
export const achievements: Achievement[] = [
  {
    id: 'crud-milestone',
    title: 'First CRUD Application',
    description:
      'Successfully built a complete CRUD application with PHP and MySQL, handling student data management.',
    category: 'Learning Milestones',
    status: 'verified',
  },
  {
    id: 'frontend-milestone',
    title: 'Frontend Project Completion',
    description:
      'Completed the Oxford Gift Shop frontend project, demonstrating HTML, CSS, and JavaScript skills.',
    category: 'Learning Milestones',
    status: 'verified',
  },
  {
    id: 'rpg-portfolio-milestone',
    title: 'Game Development Portfolio',
    description:
      'Built an interactive RPG-style portfolio using Next.js, TypeScript, and Phaser 3.',
    category: 'Learning Milestones',
    status: 'in-progress',
  },
];

export const achievementCategories: AchievementCategory[] = [
  'Awards',
  'Certifications',
  'Learning Milestones',
];
