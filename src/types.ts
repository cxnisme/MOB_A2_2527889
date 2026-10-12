import { NavigatorScreenParams } from '@react-navigation/native';

export const AVAILABILITY_OPTIONS = [
  'Open to internships',
  'Open to freelance',
  'Not available',
  'Learning only',
] as const;
export type Availability = (typeof AVAILABILITY_OPTIONS)[number];

export const SKILL_CHOICES = [
  'React Native',
  'TypeScript',
  'UI Engineering',
  'Local Persistence',
  'Native Build',
] as const;

export type Profile = {
  headline: string;
  bio: string;
  primarySkill: string;
  availability: Availability;
  imageUri: string | null;
};

export type ProjectStatus = 'ship' | 'build';

export type Project = {
  id: string;
  title: string;
  tagline: string;
  tag: string;
  status: ProjectStatus;
  problem: string;
  contribution: string[];
  tech: string[];
};

export type Skill = { name: string; note: string; level: number; tags: string[] };
export type EducationEntry = { year: string; title: string; org: string; note: string };

export type ProjectsStackParamList = {
  ProjectList: undefined;
  ProjectDetail: { id: string };
};

export type TabParamList = {
  Home: undefined;
  Skills: undefined;
  ProjectsTab: NavigatorScreenParams<ProjectsStackParamList> | undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  About: undefined;
};
