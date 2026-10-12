import AsyncStorage from '@react-native-async-storage/async-storage';
import { AVAILABILITY_OPTIONS, Profile } from '../types';

const KEY = 'cnportfolio:profile:v1';

function isProfile(value: unknown): value is Profile {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.headline === 'string' &&
    typeof v.bio === 'string' &&
    typeof v.primarySkill === 'string' &&
    (AVAILABILITY_OPTIONS as readonly string[]).includes(v.availability as string) &&
    (v.imageUri === null || typeof v.imageUri === 'string')
  );
}

export async function loadProfile(): Promise<Profile | null> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return null;
  const parsed: unknown = JSON.parse(raw);
  return isProfile(parsed) ? parsed : null;
}

export async function saveProfile(profile: Profile): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(profile));
}
