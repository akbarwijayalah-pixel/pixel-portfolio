export type ProjectCategory =
  | 'All'
  | 'Frontend'
  | 'Backend'
  | 'Full Stack'
  | 'UI/UX'
  | 'Game Development';

export type ProjectStatus =
  | 'Completed'
  | 'In Progress'
  | 'Planned'
  | 'On Hold';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  status: ProjectStatus;
  screenshot?: string; // only if real user screenshot provided
  demoUrl?: string; // only if real URL provided
  repoUrl?: string; // only if real repo provided
  features: string[];
  problemOrGoal: string;
  developmentNotes: string;
  pixelBadge: {
    icon: string; // e.g. 🎁, 🗄️, 📦, 🎮
    bgColor: string;
    borderColor: string;
  };
}

export const projects: Project[] = [
  {
    id: 'sweetbake',
    title: 'SweetBake — Bakery & Cakeshop',
    description:
      'A modern artisanal bakery and pastry web application featuring a categorized sweet treats menu, daily specials showcase, and promotional discount campaigns.',
    category: 'Frontend',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    status: 'Completed',
    screenshot: '/assets/projects/sweetbake.jpg',
    features: [
      'Curated dessert categories: Cakes, Cupcakes, Cookies, and Donuts',
      'Featured bakery cards with pricing (Strawberry Shortcake, Chocolate Bliss, Vanilla Cloud)',
      'Promotional campaign banner with discount coupon code (SWEET10)',
      'Fully responsive layout with accessible semantic HTML5 structure',
      'Warm pastel aesthetic and clean typography tailored for food & beverage retail',
    ],
    problemOrGoal:
      'Create an inviting, mouthwatering storefront interface for a local Jakarta bakery with intuitive product discovery and clear price presentation.',
    developmentNotes:
      'Built with semantic HTML5 and vanilla CSS3 to master responsive card grids, navigation layouts, and delightful micro-interactions without heavy external frameworks.',
    pixelBadge: {
      icon: '🥐',
      bgColor: '#7a2214',
      borderColor: '#e17055',
    },
  },
  {
    id: 'kasir-frontend',
    title: 'Kasir Frontend — Pokémon Revolution POS',
    description:
      'A retro Pokémon Revolution Online styled Point of Sale (POS) cashier checkout application built with Nuxt, Vue 3, and Tailwind CSS, integrated with a backend inventory REST API.',
    category: 'Frontend',
    technologies: ['Nuxt 4', 'Vue 3', 'Tailwind CSS', 'REST API', 'JavaScript'],
    status: 'Completed',
    screenshot: '/assets/projects/kasir-frontend.jpg',
    features: [
      'Authentic retro Pokémon Revolution Online (PRO) gaming UI & dark metallic theme',
      'Real-time Point of Sale cashier checkout register with live item catalog',
      'Interactive shopping cart with stock deduction alerts and quantity controls',
      'Automated cash change calculation (kembalian) and transaction completion',
      'Printable digital transaction receipt (Struk Pembayaran) with invoice number (no_nota)',
      'Multi-page navigation (Kasir, Manajemen Barang, Riwayat Transaksi) and server-select login',
    ],
    problemOrGoal:
      'Develop a high-performance, real-time cashier checkout application combining full POS business logic with a playful, nostalgic 16-bit gaming aesthetic.',
    developmentNotes:
      'Built using Nuxt 4, Vue 3 Composition API, and Tailwind CSS; communicates with a Laravel REST API backend for inventory tracking, JWT authentication tokens, and transaction history.',
    pixelBadge: {
      icon: '🧾',
      bgColor: '#0f2438',
      borderColor: '#ffde00',
    },
  },
  {
    id: 'oxford-gift-shop',
    title: 'Oxford Gift Shop',
    description:
      'A web-based gift shop application featuring product catalog browsing, interactive shopping cart functionality, and responsive UI layout.',
    category: 'Frontend',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'Completed',
    screenshot: '/assets/projects/oxford-gift-shop.png',
    features: [
      'Product catalog display',
      'Shopping cart functionality',
      'Responsive multi-device layout',
      'Product detail views',
    ],
    problemOrGoal:
      'Build a functional e-commerce frontend to practice HTML semantic structure, CSS styling, and JavaScript DOM manipulation.',
    developmentNotes:
      'Early web development project focused on strengthening core frontend programming fundamentals.',
    pixelBadge: {
      icon: '🎁',
      bgColor: '#1e3799',
      borderColor: '#4a69bd',
    },
  },
  {
    id: 'student-data-management',
    title: 'Student Data Management System',
    description:
      'A server-side CRUD application for managing school student records, including data entry, searching, editing, and record deletion.',
    category: 'Full Stack',
    technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'Bootstrap'],
    status: 'Completed',
    screenshot: '/assets/projects/student-data.png',
    features: [
      'Create and register student records',
      'Read and display student lists in structured table',
      'Update existing student details',
      'Delete student records with confirmation',
      'Basic search and filtering',
    ],
    problemOrGoal:
      'Develop a complete relational database CRUD application to master server-side programming and database administration.',
    developmentNotes:
      'Built with PHP and MySQL to understand database schema design, SQL queries, and backend data handling.',
    pixelBadge: {
      icon: '🗄️',
      bgColor: '#0c2461',
      borderColor: '#1e3799',
    },
  },
  {
    id: 'sicepat-clone',
    title: 'SiCepat Clone',
    description:
      'A frontend replica of the SiCepat logistics website, recreating the core UI components and service information layout for learning purposes.',
    category: 'Frontend',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'In Progress',
    screenshot: '/assets/projects/sicepat-clone.png',
    features: [
      'Logistics landing page recreation',
      'Responsive navigation bar and hero section',
      'Package tracking mockup interface',
      'Service rate and shipping tier sections',
    ],
    problemOrGoal:
      'Practice real-world web cloning to improve CSS positioning, responsive typography, and mobile-first layout techniques.',
    developmentNotes:
      'Focused on analyzing real-world production UI patterns and accurately coding them from scratch.',
    pixelBadge: {
      icon: '📦',
      bgColor: '#b71540',
      borderColor: '#e55039',
    },
  },
  {
    id: 'pokemon-rpg-portfolio',
    title: "Akbar's Pixel World — RPG Portfolio",
    description:
      'An interactive 2D RPG-style portfolio inspired by classic Pokémon GBA games, built with Next.js, TypeScript, and Canvas rendering.',
    category: 'Game Development',
    technologies: ['Next.js', 'TypeScript', 'Canvas API', 'Tailwind CSS', 'React'],
    status: 'In Progress',
    repoUrl: 'https://github.com/akbarwijayalah-pixel',
    screenshot: '/assets/projects/rpg-portfolio.png',
    features: [
      'Explorable 2D pixel-art map with collision physics',
      'Interactive NPCs with RPG branching dialogue boxes',
      'Developer Journey with 3 connected school locations',
      'Pokédex-style Technology Lab',
      'Native Web Audio API 8-bit chiptune sound effects',
      'Mobile touch controls (D-Pad + Action buttons) and keyboard support',
      'Town Map quick navigation menu for instant access',
    ],
    problemOrGoal:
      'Create a unique, memorable portfolio that demonstrates frontend engineering skills and gamified user experiences.',
    developmentNotes:
      'Designed and programmed to combine classic retro gaming nostalgia with clean, modern web development standards.',
    pixelBadge: {
      icon: '🎮',
      bgColor: '#0a3d62',
      borderColor: '#00d4ff',
    },
  },
];

export const projectCategories: ProjectCategory[] = [
  'All',
  'Frontend',
  'Backend',
  'Full Stack',
  'UI/UX',
  'Game Development',
];
