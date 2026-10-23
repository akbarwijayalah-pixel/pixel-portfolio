export interface EducationStage {
  id: string;
  name: string;
  level: string; // e.g. Elementary School, Junior High School, Vocational High School
  stageNumber: number; // 1, 2, 3
  location: string;
  isCurrent?: boolean;
  yearsAttended?: string; // Optional: omit if not provided, DO NOT invent!
  memoriesOrActivities?: string[]; // Optional: omit if not provided, DO NOT invent!
  description: string;
  landmarkType: string;
  themeColor: string;
  dialogueId: string;
  signText: string;
}

export const educationJourney: EducationStage[] = [
  {
    id: 'sdn-02-cakung',
    name: 'SDN 02 Cakung',
    level: 'Elementary School (Sekolah Dasar)',
    stageNumber: 1,
    location: 'Cakung, Jakarta Timur',
    description: 'The foundation of the learning path, beginning the formal educational journey.',
    landmarkType: 'Elementary Academy (Red Brick)',
    themeColor: '#ff7675',
    dialogueId: 'school-sdn02',
    signText: 'STAGE 1: SDN 02 CAKUNG\nElementary Education Stage\nWhere the learning foundation began.',
  },
  {
    id: 'smpn-144-jakarta',
    name: 'SMPN 144 Jakarta',
    level: 'Junior High School (Sekolah Menengah Pertama)',
    stageNumber: 2,
    location: 'Jakarta',
    description: 'The intermediate educational milestone fostering curiosity, discipline, and logical thinking.',
    landmarkType: 'Junior High Institute (Blue Slate)',
    themeColor: '#0984e3',
    dialogueId: 'school-smpn144',
    signText: 'STAGE 2: SMPN 144 JAKARTA\nJunior High Education Stage\nDeveloping core academic skills and interests.',
  },
  {
    id: 'smkn-71-jakarta',
    name: 'SMKN 71 Jakarta',
    level: 'Vocational High School (Sekolah Menengah Kejuruan)',
    stageNumber: 3,
    location: 'Jakarta',
    isCurrent: true,
    description:
      'Major: Rekayasa Perangkat Lunak (Software Engineering). Current educational stage focusing on programming, web application development, and preparing for PKL internship opportunities.',
    landmarkType: 'Software Engineering Tech Academy (Cyan & Emerald)',
    themeColor: '#00cec9',
    dialogueId: 'school-smkn71',
    signText: 'STAGE 3: SMKN 71 JAKARTA [CURRENT STAGE]\nMajor: Rekayasa Perangkat Lunak (RPL)\nSpecialized in software engineering and web development.',
  },
];
