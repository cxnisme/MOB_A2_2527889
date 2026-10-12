import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DEFAULT_PROFILE } from '../data/portfolio';
import { loadProfile, saveProfile } from '../storage/profileStorage';
import { Profile } from '../types';
import { deleteImage, imageStillExists } from '../utils/media';

type Status = 'loading' | 'ready' | 'error';

type ProfileContextValue = {
  profile: Profile;
  status: Status;
  save: (next: Profile) => Promise<void>;
  setImage: (uri: string | null) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  reload: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [status, setStatus] = useState<Status>('loading');
  const latest = useRef(profile);
  latest.current = profile;

  const reload = useCallback(async () => {
    setStatus('loading');
    try {
      const stored = await loadProfile();
      let next = stored ?? DEFAULT_PROFILE;
      if (next.imageUri && !(await imageStillExists(next.imageUri))) {
        next = { ...next, imageUri: null };
      }
      setProfile(next);
      setStatus('ready');
    } catch {
      setProfile(DEFAULT_PROFILE);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const save = useCallback(async (next: Profile) => {
    await saveProfile(next);
    setProfile(next);
  }, []);

  const setImage = useCallback(
    async (uri: string | null) => {
      await save({ ...latest.current, imageUri: uri });
    },
    [save],
  );

  const resetToDefaults = useCallback(async () => {
    const oldImage = latest.current.imageUri;
    await save(DEFAULT_PROFILE);
    await deleteImage(oldImage);
  }, [save]);

  const value = useMemo(
    () => ({ profile, status, save, setImage, resetToDefaults, reload }),
    [profile, status, save, setImage, resetToDefaults, reload],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside ProfileProvider');
  return ctx;
}
