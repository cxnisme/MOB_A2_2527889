import * as FileSystem from 'expo-file-system/legacy';

/** Copy a picked/captured image into app-private storage so it survives cache cleanup. */
export async function persistImage(uri: string): Promise<string> {
  const dir = FileSystem.documentDirectory;
  if (!dir) throw new Error('App-private storage is unavailable.');
  const dest = `${dir}profile-${Date.now()}.jpg`;
  await FileSystem.copyAsync({ from: uri, to: dest });
  return dest;
}

export async function deleteImage(uri: string | null): Promise<void> {
  const dir = FileSystem.documentDirectory;
  if (!uri || !dir || !uri.startsWith(dir)) return;
  try {
    await FileSystem.deleteAsync(uri, { idempotent: true });
  } catch (error) {
    console.warn('Could not remove the old profile image file.', error);
  }
}

export async function imageStillExists(uri: string): Promise<boolean> {
  const info = await FileSystem.getInfoAsync(uri);
  return info.exists;
}
