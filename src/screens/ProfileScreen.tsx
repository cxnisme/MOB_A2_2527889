import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import Avatar from '../components/Avatar';
import Banner, { BannerType } from '../components/Banner';
import Button from '../components/Button';
import Card from '../components/Card';
import Chip from '../components/Chip';
import Field from '../components/Field';
import Screen from '../components/Screen';
import { ScreenHeader } from '../components/SectionTitle';
import { useProfile } from '../context/ProfileContext';
import { DEFAULT_PROFILE } from '../data/portfolio';
import { AVAILABILITY_OPTIONS, Availability, RootStackParamList, SKILL_CHOICES } from '../types';
import { colors, font, radius, spacing } from '../theme';
import { deleteImage, persistImage } from '../utils/media';
import { LIMITS, ProfileDraft, validateProfile } from '../utils/validation';

type Msg = { type: BannerType; text: string } | null;

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { profile, status, save, setImage, resetToDefaults } = useProfile();

  const fromProfile = (): ProfileDraft => ({
    headline: profile.headline,
    bio: profile.bio,
    primarySkill: profile.primarySkill,
    availability: profile.availability,
  });
  const [draft, setDraft] = useState<ProfileDraft>(fromProfile);
  const [touched, setTouched] = useState<Partial<Record<keyof ProfileDraft, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [banner, setBanner] = useState<Msg>(null);
  const [mediaMsg, setMediaMsg] = useState<Msg>(null);
  const [busy, setBusy] = useState(false);

  // Fill the form once the saved profile has been restored from AsyncStorage.
  useEffect(() => {
    if (status === 'ready') setDraft(fromProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const live = useMemo(() => validateProfile(draft), [draft]);
  const shown = (k: keyof ProfileDraft) => (touched[k] || submitted ? live[k] : undefined);
  const dirty =
    draft.headline !== profile.headline ||
    draft.bio !== profile.bio ||
    draft.primarySkill !== profile.primarySkill ||
    draft.availability !== profile.availability;

  const setField = (k: keyof ProfileDraft) => (v: string) => {
    setDraft((d) => ({ ...d, [k]: v }));
    setBanner(null);
  };
  const blur = (k: keyof ProfileDraft) => () => setTouched((t) => ({ ...t, [k]: true }));

  const handleSave = async () => {
    setSubmitted(true);
    const count = Object.keys(live).length;
    if (count > 0) {
      setBanner({ type: 'error', text: `Fix ${count} field${count > 1 ? 's' : ''} below before saving.` });
      return;
    }
    try {
      setBusy(true);
      await save({
        ...profile,
        headline: draft.headline.trim(),
        bio: draft.bio.trim(),
        primarySkill: draft.primarySkill,
        availability: draft.availability as Availability,
      });
      setBanner({ type: 'success', text: 'Saved on this phone. It will still be here after you restart the app.' });
    } catch {
      setBanner({ type: 'error', text: 'Could not save. Please try again.' });
    } finally {
      setBusy(false);
    }
  };

  const handleReset = () => {
    Alert.alert('Reset profile?', 'This restores the default text and removes your photo.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          try {
            await resetToDefaults();
            setDraft({
              headline: DEFAULT_PROFILE.headline,
              bio: DEFAULT_PROFILE.bio,
              primarySkill: DEFAULT_PROFILE.primarySkill,
              availability: DEFAULT_PROFILE.availability,
            });
            setSubmitted(false);
            setTouched({});
            setBanner(null);
            setBanner({ type: 'info', text: 'Profile reset to defaults.' });
          } catch {
            setBanner({ type: 'error', text: 'Could not reset. Please try again.' });
          }
        },
      },
    ]);
  };

  // ---- Profile image -------------------------------------------------------
  const storePicked = async (uri: string) => {
    const old = profile.imageUri;
    const stored = await persistImage(uri);
    await setImage(stored);
    if (old && old !== stored) await deleteImage(old);
    setMediaMsg({ type: 'success', text: 'Profile photo saved on this phone.' });
  };

  const takePhoto = async () => {
    try {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        setMediaMsg({
          type: 'error',
          text: 'Camera permission was denied, so no photo was taken. You can still choose a photo from the gallery.',
        });
        if (!perm.canAskAgain) {
          Alert.alert('Camera blocked', 'Allow camera access in Settings to take a photo.', [
            { text: 'Not now', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]);
        }
        return;
      }
      const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 });
      if (result.canceled || !result.assets?.[0]) {
        setMediaMsg({ type: 'info', text: 'Camera closed. Your current photo was not changed.' });
        return;
      }
      await storePicked(result.assets[0].uri);
    } catch {
      setMediaMsg({ type: 'error', text: 'Could not take or save the photo. Your current photo was not changed.' });
    }
  };

  const pickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (result.canceled || !result.assets?.[0]) {
        setMediaMsg({ type: 'info', text: 'No photo chosen. Your current photo was not changed.' });
        return;
      }
      await storePicked(result.assets[0].uri);
    } catch {
      setMediaMsg({ type: 'error', text: 'Could not choose or save the photo. Your current photo was not changed.' });
    }
  };

  const removePhoto = () => {
    Alert.alert('Remove photo?', 'The avatar with your initials will be shown instead.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          try {
            const old = profile.imageUri;
            await setImage(null);
            await deleteImage(old);
            setMediaMsg({ type: 'info', text: 'Photo removed.' });
          } catch {
            setMediaMsg({ type: 'error', text: 'Could not remove the photo. Please try again.' });
          }
        },
      },
    ]);
  };

  const hasPhoto = !!profile.imageUri;

  return (
    <Screen keyboard>
      <ScreenHeader tag="PROFILE" aside="Editor" title="Profile Editor" sub="Saved on this phone. Works offline." />

      <Text style={styles.label}>Profile image</Text>
      <Card>
        <View style={styles.center}>
          <Avatar uri={profile.imageUri} size={120} />
          <Text style={styles.muted}>{hasPhoto ? 'Preview of your saved photo' : 'No photo yet. The avatar is shown.'}</Text>
        </View>
        <Button title={hasPhoto ? 'Replace: take a new photo' : 'Take a photo'} onPress={takePhoto} hint="Asks for camera permission if needed" />
        <Button title={hasPhoto ? 'Replace: choose from gallery' : 'Choose from gallery'} variant="secondary" onPress={pickFromGallery} />
        {hasPhoto && <Button title="Remove photo" variant="danger" onPress={removePhoto} />}
        {mediaMsg && <Banner type={mediaMsg.type} text={mediaMsg.text} />}
      </Card>

      {dirty && <Text style={styles.unsaved}>Unsaved changes</Text>}

      <Field
        label="Headline *"
        value={draft.headline}
        onChangeText={setField('headline')}
        onBlur={blur('headline')}
        error={shown('headline')}
        helper={`Shown on your Home screen. ${LIMITS.headline.min} to ${LIMITS.headline.max} characters.`}
        maxLength={LIMITS.headline.max + 20}
      />
      <Field
        label="Short biography *"
        value={draft.bio}
        onChangeText={setField('bio')}
        onBlur={blur('bio')}
        error={shown('bio')}
        helper={`${LIMITS.bio.min} to ${LIMITS.bio.max} characters`}
        multiline
        maxLength={LIMITS.bio.max + 30}
      />

      <View style={styles.group} accessibilityRole="radiogroup">
        <Text style={styles.label}>Primary skill *</Text>
        <View style={styles.chips}>
          {SKILL_CHOICES.map((s) => (
            <Chip
              key={s}
              label={s}
              selected={draft.primarySkill === s}
              onPress={() => {
                setDraft((d) => ({ ...d, primarySkill: s }));
                setBanner(null);
              }}
            />
          ))}
        </View>
        {shown('primarySkill') && <Text style={styles.error}>{shown('primarySkill')}</Text>}
      </View>

      <View style={styles.group} accessibilityRole="radiogroup">
        <Text style={styles.label}>Availability *</Text>
        <View style={styles.chips}>
          {AVAILABILITY_OPTIONS.map((o) => (
            <Chip
              key={o}
              label={o}
              selected={draft.availability === o}
              onPress={() => {
                setDraft((d) => ({ ...d, availability: o }));
                setBanner(null);
              }}
            />
          ))}
        </View>
        {shown('availability') && <Text style={styles.error}>{shown('availability')}</Text>}
      </View>

      {banner && <Banner type={banner.type} text={banner.text} />}
      <Button title={busy ? 'Saving…' : 'Save profile'} onPress={handleSave} disabled={busy} />

      <Pressable
        onPress={() => navigation.navigate('About')}
        accessibilityRole="button"
        accessibilityLabel="About CNPortfolio"
        style={styles.link}
      >
        <View style={styles.linkLeft}>
          <View style={styles.linkIcon}>
            <Ionicons name="information-circle-outline" size={20} color={colors.accent} />
          </View>
          <Text style={styles.linkText}>About CNPortfolio</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.muted} />
      </Pressable>

      <Button title="Reset to defaults" variant="danger" onPress={handleReset} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', gap: spacing.sm },
  muted: { color: colors.muted, fontSize: font.small, textAlign: 'center' },
  unsaved: { color: colors.warning, fontSize: font.small, fontWeight: '700' },
  group: { gap: spacing.sm },
  label: { color: colors.muted, fontSize: font.tiny, fontWeight: '700', letterSpacing: 1.1, textTransform: 'uppercase' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm - 1 },
  error: { color: colors.danger, fontSize: font.tiny, fontWeight: '600' },
  link: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md - 1,
  },
  linkLeft: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  linkIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: colors.accentSoft, alignItems: 'center', justifyContent: 'center' },
  linkText: { color: colors.text, fontSize: font.body - 1.5, fontWeight: '700' },
});
