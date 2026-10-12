import { EducationEntry, Profile, Project, Skill } from '../types';

export const OWNER = {
  name: 'NIWENIRINGIYE Christian',
  registration: '25/27889',
  verificationCode: 'MOB-A2-7889',
  appName: 'CNPortfolio',
  github: 'https://github.com/cxnisme',
  androidPackage: 'rw.ac.ines.ug2527889.cnportfolio',
};

export const DEFAULT_PROFILE: Profile = {
  headline: 'Mobile developer · building offline-first Android apps',
  bio:
    'Computer science student passionate about clean interfaces and thoughtful mobile products. ' +
    'Currently learning React Native and Expo to ship real apps to real users.',
  primarySkill: 'React Native',
  availability: 'Open to internships',
  imageUri: null,
};

export const SKILLS: Skill[] = [
  { name: 'React Native · Expo', note: 'PRIMARY', level: 78, tags: ['TypeScript', 'Expo Router', 'Hooks', 'Flexbox'] },
  { name: 'TypeScript', note: 'WORKING', level: 72, tags: ['Generics', 'Types', 'ES modules'] },
  { name: 'UI Engineering', note: 'WORKING', level: 70, tags: ['Flexbox', 'Design systems', 'Accessibility'] },
  { name: 'Local Persistence', note: 'LEARNING', level: 58, tags: ['AsyncStorage', 'Offline-first', 'State'] },
  { name: 'Native Build', note: 'LEARNING', level: 52, tags: ['EAS Build', 'APK', 'Android'] },
];

export const EDUCATION: EducationEntry[] = [
  { year: '2024 —', title: 'BSc Computer Science', org: 'INES Ruhengeri', note: 'Current · mobile computing focus' },
  { year: '2024', title: 'Mobile Development Track', org: 'Self-directed · Expo & React Native', note: 'Projects + documentation' },
  { year: '2022 — 24', title: 'Advanced Secondary · MPC', org: 'Mathematics, Physics, Computer Science', note: 'Completed' },
];

export const PROJECTS: Project[] = [
  {
    id: 'cn-mkt',
    title: 'Musanze Market Inspector',
    tagline: 'Field inspection app for market zones',
    tag: 'MOBILE APP',
    status: 'build',
    problem:
      'Field officers needed a way to record vendor visits and capture evidence photos without a backend, using a phone they already had.',
    contribution: [
      'Designed and built the complete UI in React Native with TypeScript',
      'Implemented tab + stack navigation with preserved session state',
      'Wired Expo ImagePicker camera and gallery flows with permission and cancellation handling',
      'Validated all form input with field-level error messages',
    ],
    tech: ['React Native', 'Expo', 'TypeScript', 'React Navigation', 'AsyncStorage'],
  },
  {
    id: 'cn-notes',
    title: 'Lecture Notes',
    tagline: 'Offline markdown notes for coursework',
    tag: 'UTILITY',
    status: 'ship',
    problem:
      'Notes apps either require an account or lose formatting when offline. Needed a simple, local, offline-first notes tool.',
    contribution: [
      'Built a lightweight markdown renderer in TypeScript',
      'Persisted notebooks to device storage with no network dependency',
      'Designed a reading-first interface with adjustable type scale',
    ],
    tech: ['React Native', 'TypeScript', 'AsyncStorage'],
  },
  {
    id: 'cn-tasks',
    title: 'Study Planner',
    tagline: 'Weekly study schedule with focus blocks',
    tag: 'UTILITY',
    status: 'build',
    problem:
      'Balancing coursework and personal projects needed a planner that respected deep work rather than fragmenting it.',
    contribution: [
      'Prototyped the scheduling model and block-based layout',
      'Built controlled inputs with validation for time ranges',
      'Currently testing notification flow for focus reminders',
    ],
    tech: ['React Native', 'Expo', 'TypeScript'],
  },
  {
    id: 'cn-port',
    title: 'CNPortfolio',
    tagline: 'This app, a personal portfolio in your pocket',
    tag: 'PORTFOLIO',
    status: 'ship',
    problem:
      'Recruiters need to see evidence of what a student can build, offline, on the device in front of them.',
    contribution: [
      'Designed the full visual system and identity',
      'Built tab + stack navigation with persistent local state',
      'Implemented the profile editor with validation and media handling',
      'Configured EAS Build for a standalone Android APK',
    ],
    tech: ['React Native', 'Expo', 'TypeScript', 'EAS Build', 'AsyncStorage'],
  },
];

export const DATA_USE_STATEMENT =
  'This app stores only what you enter in the Profile Editor: headline, biography, primary skill, ' +
  'availability and a profile photo. It stays on this device. There are no accounts, no analytics, ' +
  'no passwords and no tokens. Everything works offline, in Airplane Mode. Only the GitHub link needs internet.';
