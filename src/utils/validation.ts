import { AVAILABILITY_OPTIONS, SKILL_CHOICES } from '../types';

export type ProfileDraft = {
  headline: string;
  bio: string;
  primarySkill: string;
  availability: string;
};
export type ProfileErrors = Partial<Record<keyof ProfileDraft, string>>;

export const LIMITS = { headline: { min: 8, max: 80 }, bio: { min: 20, max: 240 } };

export function validateProfile(d: ProfileDraft): ProfileErrors {
  const e: ProfileErrors = {};
  const h = d.headline.trim();
  if (!h) e.headline = 'Headline is required.';
  else if (h.length < LIMITS.headline.min) e.headline = `Headline must be at least ${LIMITS.headline.min} characters.`;
  else if (h.length > LIMITS.headline.max) e.headline = `Headline can have at most ${LIMITS.headline.max} characters.`;

  const b = d.bio.trim();
  if (!b) e.bio = 'Biography is required.';
  else if (b.length < LIMITS.bio.min || b.length > LIMITS.bio.max)
    e.bio = `Biography must be between ${LIMITS.bio.min} and ${LIMITS.bio.max} characters.`;

  if (!(SKILL_CHOICES as readonly string[]).includes(d.primarySkill)) e.primarySkill = 'Pick one primary skill.';
  if (!(AVAILABILITY_OPTIONS as readonly string[]).includes(d.availability)) e.availability = 'Select your availability.';
  return e;
}
