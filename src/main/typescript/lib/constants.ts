// English constants for ES International Department website

export const ENGLISH_CONTENT = {
  home: {
    welcomeMessage: 'Welcome to the ES International Department homepage!',
    newsletterNote: 'Please be sure to check our monthly newsletter for important updates and information.',
  },
  pacingGuides: {
    description: 'Below are the pacing guides for each grade and English level:',
    note: 'Please note that pacing guides may be adjusted as needed.',
  },
  idSquads: {
    description: 'Our students are divided into the following squads to encourage teamwork and positive behavior:',
    conclusion: 'Each squad promotes leadership, cooperation, and school spirit.',
  },
  contact: {
    message: 'If you have any questions, please contact us at ext. 8130.',
    extension: 'ext. 8130',
  },
} as const

// English Squad Names (14 squads)
export const ENGLISH_SQUADS = [
  'Achievers',
  'Adventurers', 
  'Discoverers',
  'Explorers',
  'Guardians',
  'Innovators',
  'Inventors',
  'Navigators',
  'Pathfinders',
  'Pioneers',
  'Seekers',
  'Trailblazers',
  'Visionaries',
  'Voyagers',
] as const

// Pacing Guide Templates (Grade 1-3, E1-E3 each = 27 total)
export const PACING_GUIDE_TEMPLATES = [
  // Grade 1
  { grade: 1, level: 'E1', title: 'Grade 1 E1 Pacing Guide' },
  { grade: 1, level: 'E2', title: 'Grade 1 E2 Pacing Guide' },
  { grade: 1, level: 'E3', title: 'Grade 1 E3 Pacing Guide' },
  // Grade 2
  { grade: 2, level: 'E1', title: 'Grade 2 E1 Pacing Guide' },
  { grade: 2, level: 'E2', title: 'Grade 2 E2 Pacing Guide' },
  { grade: 2, level: 'E3', title: 'Grade 2 E3 Pacing Guide' },
  // Grade 3
  { grade: 3, level: 'E1', title: 'Grade 3 E1 Pacing Guide' },
  { grade: 3, level: 'E2', title: 'Grade 3 E2 Pacing Guide' },
  { grade: 3, level: 'E3', title: 'Grade 3 E3 Pacing Guide' },
] as const

// Navigation structure
export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { 
    name: 'Resources', 
    href: '/resources',
    children: [
      { name: 'Summer 2025', href: '/resources/summer2025' }
    ]
  },
  { name: 'Pacing Guides', href: '/pacing-guides' },
  { name: 'ID Squads', href: '/id-squads' },
  { name: 'Contact', href: '/contact' },
] as const

// External Resource Links
export const EXTERNAL_RESOURCES = {
  readingBuddies: {
    name: 'Reading Buddies',
    url: 'https://readingbuddies.com', // 실제 URL로 교체 필요
    description: 'Reading support program for students',
  },
  readWorks: {
    name: 'ReadWorks',
    url: 'https://readworks.org',
    description: 'Reading comprehension resources',
  },
} as const

// Squad colors for UI
export const SQUAD_COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#10b981', // emerald
  '#f59e0b', // amber
  '#8b5cf6', // purple
  '#6366f1', // indigo
  '#14b8a6', // teal
  '#f43f5e', // rose
] as const