export interface Profile {
  name: string;
  nickname: string;
  school: string;
  major: string;
  majorFull: string;
  currentFocus: string;
  goal: string;
  bio: string;
  interests: string[];
  portrait: string; // path to portrait image, replaceable
  education: EducationEntry[];
}

export interface EducationEntry {
  institution: string;
  program: string;
  period: string;
  description: string;
  status: 'current' | 'completed' | 'upcoming';
}

export const profile: Profile = {
  name: 'Akbar Wijaya',
  nickname: 'Akbar',
  school: 'SMKN 71 Jakarta',
  major: 'RPL',
  majorFull: 'Rekayasa Perangkat Lunak (Software Engineering)',
  currentFocus: 'Web Development',
  goal: 'Preparing for PKL (Internship)',
  bio: `Hi! I'm Akbar Wijaya, a Software Engineering (RPL) student at SMKN 71 Jakarta. I'm passionate about building web applications and exploring the world of software development. Currently, I'm focusing on web development and preparing for my PKL (Praktik Kerja Lapangan) internship opportunity. I love turning ideas into working applications and I'm always eager to learn new technologies.`,
  interests: [
    'Programming',
    'Web Development',
    'UI/UX Design',
    'Game Development',
  ],
  portrait: '/assets/player/portrait.png', // Replace with your actual photo
  education: [
    {
      institution: 'SMKN 71 Jakarta',
      program: 'Rekayasa Perangkat Lunak (RPL)',
      period: 'Current Student',
      description:
        'Studying software engineering fundamentals including web development, database management, and programming.',
      status: 'current',
    },
  ],
};
