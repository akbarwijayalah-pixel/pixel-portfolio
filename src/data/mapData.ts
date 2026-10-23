// =============================================
// MAP DATA - Akbar's Pixel World RPG
// 34 x 28 Tile Map
// =============================================

export enum TileType {
  GRASS = 0,
  PATH = 1,
  TREE = 2,
  WATER = 3,
  BUILDING_WALL = 4,
  DOOR = 5,
  SIGN = 6,
  FENCE = 7,
  FLOWER = 8,
  TALL_GRASS = 9,
  ROOF = 10,
  BUILDING_FRONT = 11,
  ROOF_BLUE = 12,
  ROOF_CYAN = 13,
  ROOF_PURPLE = 14,
  ROOF_GOLD = 15,
  CONTACT_HUB_ROOF = 16,
}

// Collision matrix: true = solid/blocked
export const TILE_COLLISION: Record<TileType, boolean> = {
  [TileType.GRASS]: false,
  [TileType.PATH]: false,
  [TileType.TREE]: true,
  [TileType.WATER]: true,
  [TileType.BUILDING_WALL]: true,
  [TileType.DOOR]: false,
  [TileType.SIGN]: true,
  [TileType.FENCE]: true,
  [TileType.FLOWER]: false,
  [TileType.TALL_GRASS]: false,
  [TileType.ROOF]: true,
  [TileType.BUILDING_FRONT]: true,
  [TileType.ROOF_BLUE]: true,
  [TileType.ROOF_CYAN]: true,
  [TileType.ROOF_PURPLE]: true,
  [TileType.ROOF_GOLD]: true,
  [TileType.CONTACT_HUB_ROOF]: true,
};

export interface InteractionZone {
  x: number;
  y: number;
  type: 'npc' | 'door' | 'sign' | 'object';
  dialogueId: string;
  panelId?: string;
  label: string;
  npcSprite?: string;
  facingDirection?: 'up' | 'down' | 'left' | 'right';
}

export const TILE_SIZE = 32;
export const MAP_WIDTH = 34;
export const MAP_HEIGHT = 28;

// Shorthand aliases for building the 34x28 map
const G = TileType.GRASS;
const P = TileType.PATH;
const T = TileType.TREE;
const W = TileType.WATER;
const B = TileType.BUILDING_WALL;
const D = TileType.DOOR;
const S = TileType.SIGN;
const F = TileType.FENCE;
const FL = TileType.FLOWER;
const TG = TileType.TALL_GRASS;
const R = TileType.ROOF;
const BF = TileType.BUILDING_FRONT;
const RB = TileType.ROOF_BLUE;
const RC = TileType.ROOF_CYAN;
const RP = TileType.ROOF_PURPLE;
const RG = TileType.ROOF_GOLD;
const CH = TileType.CONTACT_HUB_ROOF;

export const TOWN_MAP: TileType[][] = [
  // 00: Top Tree Border
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  // 01: Top Tree Border
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  // 02: SMKN 71 (Cyan Roof) [left] | Akbar's House (Red) [mid] | Tech Lab (Cyan) [right]
  [T, T, G, RC, RC, RC, RC, G, G, G, G, G, G, G, R, R, R, R, G, G, G, G, G, RC, RC, RC, RC, G, G, G, G, T, T],
  // 03: Building Walls
  [T, T, G, B,  B,  B,  B,  G, G, G, G, G, G, G, B, B, B, B, G, G, G, G, G, B,  B,  B,  B,  G, G, G, G, T, T],
  // 04: Building Fronts + Doors
  [T, T, G, BF, BF, D,  BF, G, G, G, G, G, G, G, BF,BF,D, BF, G, G, G, G, G, BF, BF, D,  BF, G, G, G, G, T, T],
  // 05: Exit Paths & Signs
  [T, T, G, G,  G,  P,  G,  S, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, S,  G,  P,  G,  G, G, G, G, T, T],
  // 06: Walking Path Connection
  [T, T, G, FL, G,  P,  P,  G, P, G, G, G, G, G, G, G, P, G, G, G, G, G, G, G,  G,  P,  G,  FL,G, G, G, T, T],
  // 07: Education Trail (Col 8) & Plaza
  [T, T, G, G,  G,  G,  G,  G, P, G, G, TG,TG,G, G, G, P, G, G, G, TG,TG,G, G,  G,  P,  G,  G, G, G, G, T, T],
  // 08: Education Trail Continues
  [T, T, G, F,  F,  G,  G,  G, P, G, G, TG,TG,G, G, G, P, G, G, G, TG,TG,G, G,  G,  P,  G,  G, F, F, G, T, T],
  // 09: Education Trail & Middle Building Roofs: SMPN 144 (Blue) | Project Center (Gold)
  [T, T, G, RB, RB, RB, RB, G, P, G, G, G, G, G, G, G, P, G, G, G, G, G, G, RG, RG, RG, RG, G, G, G, G, T, T],
  // 10: Building Walls
  [T, T, G, B,  B,  B,  B,  G, P, G, G, G, G, G, G, G, P, G, G, G, G, G, G, B,  B,  B,  B,  G, G, G, G, T, T],
  // 11: Building Fronts + Doors
  [T, T, G, BF, BF, D,  BF, G, P, G, G, G, G, G, G, G, P, G, G, G, G, G, G, BF, BF, D,  BF, G, G, G, G, T, T],
  // 12: Exit Paths & Signs
  [T, T, G, G,  G,  P,  G,  S, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, S,  G,  P,  G,  G, G, G, G, T, T],
  // 13: Central Plaza Entrance
  [T, T, G, G,  G,  P,  P,  G, P, G, G, G, G, P, P, P, P, P, P, G, G, G, G, G,  G,  P,  G,  G, G, G, G, T, T],
  // 14: Central Plaza with Fountain
  [T, T, G, G,  G,  G,  G,  G, P, G, G, W, W, P, P, P, P, P, P, W, W, G, G, G,  G,  P,  G,  G, G, G, G, T, T],
  // 15: Central Plaza Pond
  [T, T, G, FL, G,  G,  G,  G, P, G, W, W, W, P, P, P, P, P, P, W, W, W, G, G,  G,  P,  G,  FL,G, G, G, T, T],
  // 16: Central Plaza South
  [T, T, G, G,  G,  G,  G,  G, P, G, G, W, W, P, P, P, P, P, P, W, W, G, G, G,  G,  P,  G,  G, G, G, G, T, T],
  // 17: Path South
  [T, T, G, F,  F,  G,  G,  G, P, G, G, G, G, P, P, P, P, P, P, G, G, G, G, G,  G,  P,  G,  G, F, F, G, T, T],
  // 18: SDN 02 Cakung (Red Roof) | Achievement Hall (Purple) | Contact Hub (Cyan/White)
  [T, T, G, R,  R,  R,  R,  G, P, G, G, G, G, G, G, P, P, G, G, G, RP, RP, RP, RP, G, CH, CH, CH, CH, G, T, T],
  // 19: Building Walls
  [T, T, G, B,  B,  B,  B,  G, P, G, G, G, G, G, G, P, P, G, G, G, B,  B,  B,  B,  G, B,  B,  B,  B,  G, T, T],
  // 20: Building Fronts + Doors
  [T, T, G, BF, BF, D,  BF, G, P, G, G, G, G, G, G, P, P, G, G, G, BF, BF, D,  BF, G, BF, BF, D,  BF, G, T, T],
  // 21: Exit Paths & Connecting Trail (fully connected path)
  [T, T, G, G,  G,  P,  G,  S, P, P, P, P, P, P, P, P, P, P, P, P, P, G,  P,  S,  P, S,  G,  P,  G,  G, T, T],
  // 22: Flowerbeds & Greenery
  [T, T, G, FL, FL, P,  G,  G, P, G, G, G, G, G, G, P, P, G, G, G, G, G,  G,  G,  G, G,  G,  P,  G,  G, T, T],
  // 23: Path ends & Nature
  [T, T, G, G,  G,  G,  G,  G, P, G, G, TG,TG,G, G, G, G, G, G, TG,TG,G, G,  G,  G, G,  G,  G,  G,  G, T, T],
  // 24: Lower Flowers
  [T, T, G, G,  G,  G,  G,  G, G, G, G, G, G, FL,FL,G, G, FL,FL,G, G, G, G,  G,  G, G,  G,  G,  G,  G, T, T],
  // 25: Bottom Border Trees
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  // 26: Bottom Border Trees
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  // 27: Bottom Border Trees
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
];

export const INTERACTION_ZONES: InteractionZone[] = [
  // -------------------------------------------------------------------------
  // DEVELOPER JOURNEY: 3 CONNECTED SCHOOL LOCATIONS
  // -------------------------------------------------------------------------

  // 1. SDN 02 Cakung (Elementary School)
  {
    x: 5,
    y: 20,
    type: 'door',
    dialogueId: 'school-sdn02-door',
    panelId: 'journey:sdn-02-cakung',
    label: 'SDN 02 Cakung (Elementary)',
  },
  {
    x: 7,
    y: 21,
    type: 'sign',
    dialogueId: 'school-sdn02-sign',
    label: 'Sign: SDN 02 Cakung',
  },
  {
    x: 8,
    y: 22,
    type: 'npc',
    dialogueId: 'school-sdn02-npc',
    label: 'Elementary Pupil',
    facingDirection: 'up',
  },

  // 2. SMPN 144 Jakarta (Junior High School)
  {
    x: 5,
    y: 11,
    type: 'door',
    dialogueId: 'school-smpn144-door',
    panelId: 'journey:smpn-144-jakarta',
    label: 'SMPN 144 Jakarta (Junior High)',
  },
  {
    x: 7,
    y: 12,
    type: 'sign',
    dialogueId: 'school-smpn144-sign',
    label: 'Sign: SMPN 144 Jakarta',
  },
  {
    x: 8,
    y: 13,
    type: 'npc',
    dialogueId: 'school-smpn144-npc',
    label: 'Junior High Student',
    facingDirection: 'up',
  },

  // 3. SMKN 71 Jakarta (Vocational High School - Current Stage!)
  {
    x: 5,
    y: 4,
    type: 'door',
    dialogueId: 'school-smkn71-door',
    panelId: 'journey:smkn-71-jakarta',
    label: 'SMKN 71 Jakarta [CURRENT STAGE]',
  },
  {
    x: 7,
    y: 5,
    type: 'sign',
    dialogueId: 'school-smkn71-sign',
    label: 'Sign: SMKN 71 Jakarta',
  },
  {
    x: 8,
    y: 6,
    type: 'npc',
    dialogueId: 'school-smkn71-npc',
    label: 'RPL Tech Student',
    facingDirection: 'up',
  },

  // -------------------------------------------------------------------------
  // ABOUT ME: AKBAR'S HOUSE (Door & Sign)
  // -------------------------------------------------------------------------
  {
    x: 16,
    y: 4,
    type: 'door',
    dialogueId: 'about-door',
    panelId: 'about',
    label: "Akbar's House",
  },
  {
    x: 13,
    y: 5,
    type: 'sign',
    dialogueId: 'about-sign',
    label: "Sign: Akbar's House",
  },

  // -------------------------------------------------------------------------
  // TECHNOLOGY LAB (SKILLS)
  // -------------------------------------------------------------------------
  {
    x: 25,
    y: 4,
    type: 'door',
    dialogueId: 'skills-door',
    panelId: 'skills',
    label: 'Technology Lab',
  },
  {
    x: 23,
    y: 5,
    type: 'sign',
    dialogueId: 'skills-sign',
    label: 'Sign: Technology Lab',
  },

  // -------------------------------------------------------------------------
  // PROJECT CENTER
  // -------------------------------------------------------------------------
  {
    x: 25,
    y: 11,
    type: 'door',
    dialogueId: 'projects-door',
    panelId: 'projects',
    label: 'Project Center',
  },
  {
    x: 23,
    y: 12,
    type: 'sign',
    dialogueId: 'projects-sign',
    label: 'Sign: Project Center',
  },

  // -------------------------------------------------------------------------
  // ACHIEVEMENT HALL
  // -------------------------------------------------------------------------
  {
    x: 22,
    y: 20,
    type: 'door',
    dialogueId: 'achievements-door',
    panelId: 'achievements',
    label: 'Achievement Hall',
  },
  {
    x: 23,
    y: 21,
    type: 'sign',
    dialogueId: 'achievements-sign',
    label: 'Sign: Achievement Hall',
  },

  // -------------------------------------------------------------------------
  // CONTACT HUB
  // -------------------------------------------------------------------------
  {
    x: 27,
    y: 20,
    type: 'door',
    dialogueId: 'contact-door',
    panelId: 'contact',
    label: 'Contact Hub',
  },
  {
    x: 25,
    y: 21,
    type: 'sign',
    dialogueId: 'contact-sign',
    label: 'Sign: Contact Hub',
  },

  // -------------------------------------------------------------------------
  // TOWN GUIDE NPC
  // -------------------------------------------------------------------------
  {
    x: 15,
    y: 13,
    type: 'npc',
    dialogueId: 'welcome-npc',
    label: 'Town Guide',
    facingDirection: 'down',
  },
];

export interface DialogueLine {
  speaker: string;
  text: string;
  choices?: { label: string; action: string }[];
}

export const DIALOGUES: Record<string, DialogueLine[]> = {
  'about-door': [
    {
      speaker: "Akbar's House",
      text: "Welcome to Akbar's House! Home of Akbar Wijaya, a Software Engineering (RPL) student at SMKN 71 Jakarta.\nFocusing on web development and preparing for PKL (Praktik Kerja Lapangan) internship opportunities.",
      choices: [
        { label: 'Open Full Profile & Bio', action: 'open:about' },
        { label: 'My Interests & Tech', action: 'dialogue:about-interests' },
        { label: 'My Goals & PKL Prep', action: 'dialogue:about-goals' },
        { label: 'Leave House', action: 'close' },
      ],
    },
  ],
  'about-interests': [
    {
      speaker: "Akbar's House",
      text: "Passions include Programming, Web Development, UI/UX Design, and Game Development! Passionate about turning complex ideas into clean, functional code and engaging experiences.",
      choices: [
        { label: 'My Goals & PKL Prep', action: 'dialogue:about-goals' },
        { label: 'Open Full Profile', action: 'open:about' },
        { label: 'Back to Door Menu', action: 'dialogue:about-door' },
        { label: 'Leave House', action: 'close' },
      ],
    },
  ],
  'about-goals': [
    {
      speaker: "Akbar's House",
      text: "Primary goal right now is preparing for PKL (Praktik Kerja Lapangan) internship opportunity! Actively seeking an internship placement to contribute to real-world software and learn with senior engineers.",
      choices: [
        { label: 'My Interests & Tech', action: 'dialogue:about-interests' },
        { label: 'Get in Touch (Contact)', action: 'open:contact' },
        { label: 'Back to Door Menu', action: 'dialogue:about-door' },
        { label: 'Leave House', action: 'close' },
      ],
    },
  ],

  // -------------------------------------------------------------------------
  // SCHOOL 1: SDN 02 CAKUNG
  // -------------------------------------------------------------------------
  'school-sdn02-door': [
    {
      speaker: 'SDN 02 Cakung',
      text: "This is SDN 02 Cakung — the first milestone of Akbar's educational journey, establishing his primary school learning foundation.",
      choices: [
        { label: 'View Journey Timeline', action: 'open:journey:sdn-02-cakung' },
        { label: 'Stay outside', action: 'close' },
      ],
    },
  ],
  'school-sdn02-sign': [
    {
      speaker: 'Sign',
      text: 'STAGE 1: SDN 02 CAKUNG\nLevel: Elementary School (Sekolah Dasar)\nLocation: Cakung, Jakarta Timur\nThe starting point of the learning path.',
    },
  ],
  'school-sdn02-npc': [
    {
      speaker: 'Elementary Pupil',
      text: 'Welcome to SDN 02 Cakung! Akbar studied here during his elementary school years. Follow the path north to see his next school!',
    },
  ],

  // -------------------------------------------------------------------------
  // SCHOOL 2: SMPN 144 JAKARTA
  // -------------------------------------------------------------------------
  'school-smpn144-door': [
    {
      speaker: 'SMPN 144 Jakarta',
      text: "This is SMPN 144 Jakarta — the second milestone of Akbar's educational journey, developing core academic discipline and problem-solving skills.",
      choices: [
        { label: 'View Journey Timeline', action: 'open:journey:smpn-144-jakarta' },
        { label: 'Stay outside', action: 'close' },
      ],
    },
  ],
  'school-smpn144-sign': [
    {
      speaker: 'Sign',
      text: 'STAGE 2: SMPN 144 JAKARTA\nLevel: Junior High School (SMP)\nLocation: Jakarta\nDeveloping foundational analytical and academic skills.',
    },
  ],
  'school-smpn144-npc': [
    {
      speaker: 'Junior Student',
      text: 'Hey! This is SMPN 144 Jakarta. Akbar developed his curiosity for computers and logic here. Keep heading north to SMKN 71 Jakarta!',
    },
  ],

  // -------------------------------------------------------------------------
  // SCHOOL 3: SMKN 71 JAKARTA (CURRENT STAGE)
  // -------------------------------------------------------------------------
  'school-smkn71-door': [
    {
      speaker: 'SMKN 71 Jakarta',
      text: "Welcome to SMKN 71 Jakarta — Akbar's CURRENT educational stage! Majoring in Rekayasa Perangkat Lunak (Software Engineering) and actively preparing for PKL internship.",
      choices: [
        { label: 'Open Journey Timeline', action: 'open:journey:smkn-71-jakarta' },
        { label: 'Stay outside', action: 'close' },
      ],
    },
  ],
  'school-smkn71-sign': [
    {
      speaker: 'Sign',
      text: 'STAGE 3: SMKN 71 JAKARTA [CURRENT STAGE]\nMajor: Rekayasa Perangkat Lunak (RPL)\nSpecialization: Web Application & Software Development.',
    },
  ],
  'school-smkn71-npc': [
    {
      speaker: 'RPL Tech Student',
      text: "Welcome to SMKN 71 Jakarta! Akbar is currently here studying Software Engineering (RPL). We code web apps, learn modern frameworks, and prepare for our PKL internships!",
    },
  ],

  // (about-door now handled above with full Akbar details)
  'about-sign': [
    {
      speaker: 'Sign',
      text: "AKBAR'S RESIDENCE\nHome of Akbar Wijaya\nSoftware Engineering Student @ SMKN 71 Jakarta",
    },
  ],
  'skills-door': [
    {
      speaker: 'System',
      text: 'Welcome to the Technology Lab! Access research terminals cataloging languages, frameworks, and developer tools.',
      choices: [
        { label: 'Enter Technology Lab', action: 'open:skills' },
        { label: 'Not now', action: 'close' },
      ],
    },
  ],
  'skills-sign': [
    {
      speaker: 'Sign',
      text: 'POKÉ-TECH LAB\nResearch & development terminals for\nFrontend, Backend, Database, and Dev Tools.',
    },
  ],
  'projects-door': [
    {
      speaker: 'System',
      text: 'Welcome to the Project Center! Browse interactive software applications and web projects developed by Akbar.',
      choices: [
        { label: 'Browse Projects', action: 'open:projects' },
        { label: 'Later', action: 'close' },
      ],
    },
  ],
  'projects-sign': [
    {
      speaker: 'Sign',
      text: 'PROJECT CENTER\nInteractive showcase of web applications,\nfrontend systems, and coding practice.',
    },
  ],
  'achievements-door': [
    {
      speaker: 'System',
      text: 'The Achievement Hall displays verified awards, milestone badges, and learning progression.',
      choices: [
        { label: 'View Milestones', action: 'open:achievements' },
        { label: 'Maybe later', action: 'close' },
      ],
    },
  ],
  'achievements-sign': [
    {
      speaker: 'Sign',
      text: 'ACHIEVEMENT HALL\nVerified milestones and learning badges.\n"The journey is still going."',
    },
  ],
  'contact-door': [
    {
      speaker: 'System',
      text: 'Welcome to the Contact Hub! Ready to connect with Akbar for internships, collaborations, and opportunities.',
      choices: [
        { label: 'Open Contact Hub', action: 'open:contact' },
        { label: 'Not yet', action: 'close' },
      ],
    },
  ],
  'contact-sign': [
    {
      speaker: 'Sign',
      text: 'CONTACT HUB\nGet in touch via Instagram, Email, GitHub, or LinkedIn.',
    },
  ],
  'welcome-npc': [
    {
      speaker: 'Guide',
      text: "Welcome to AKBAR TOWN! This interactive RPG represents the portfolio and journey of Akbar Wijaya.",
    },
    {
      speaker: 'Guide',
      text: 'Follow the western stone path to walk along the DEVELOPER JOURNEY connecting his 3 schools: SDN 02 Cakung → SMPN 144 Jakarta → SMKN 71 Jakarta!',
    },
    {
      speaker: 'Guide',
      text: "Explore Akbar's House, the Tech Lab, the Project Center, and visit the Contact Hub at the bottom-right!",
    },
  ],
};

// Building label positions
export interface BuildingLabel {
  x: number;
  y: number;
  width: number;
  label: string;
  color: string;
}

export const BUILDING_LABELS: BuildingLabel[] = [
  // Developer Journey Schools (West)
  { x: 3, y: 2, width: 4, label: 'SMKN 71 (CURRENT)', color: '#00d4ff' },
  { x: 3, y: 9, width: 4, label: 'SMPN 144 Jakarta', color: '#0984e3' },
  { x: 3, y: 18, width: 4, label: 'SDN 02 Cakung', color: '#ff7675' },

  // Central & Eastern Facilities
  { x: 14, y: 2, width: 4, label: "Akbar's House", color: '#4ade80' },
  { x: 23, y: 2, width: 4, label: 'Tech Lab', color: '#48dbfb' },
  { x: 23, y: 9, width: 4, label: 'Project Center', color: '#ffd700' },
  { x: 20, y: 18, width: 4, label: 'Achievement Hall', color: '#a55eea' },
  { x: 25, y: 18, width: 4, label: 'Contact Hub', color: '#00d4ff' },
];

// Player spawn position (in Central Plaza)
export const PLAYER_SPAWN = { x: 16, y: 14 };
