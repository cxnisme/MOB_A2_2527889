import React from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Avatar from '../components/Avatar';
import Banner from '../components/Banner';
import Button from '../components/Button';
import Card from '../components/Card';
import ProjectCard from '../components/ProjectCard';
import Screen from '../components/Screen';
import SectionTitle from '../components/SectionTitle';
import { useProfile } from '../context/ProfileContext';
import { EDUCATION, OWNER, PROJECTS, SKILLS } from '../data/portfolio';
import { TabParamList } from '../types';
import { colors, font, mono, radius, spacing } from '../theme';

type Props = BottomTabScreenProps<TabParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { profile, status, reload } = useProfile();
  const featured = PROJECTS[PROJECTS.length - 1];

  const openGithub = async () => {
    try {
      await Linking.openURL(OWNER.github);
    } catch {
      Alert.alert('No connection', 'The GitHub link needs internet. The rest of the app works offline.');
    }
  };

  return (
    <Screen>
      <View style={styles.top}>
        <Text accessibilityRole="header" style={styles.hero}>
          My name is <Text style={styles.heroAccent}>NIWENIRINGIYE Christian</Text>.
        </Text>
        <View>
          <Avatar uri={profile.imageUri} />
          <Pressable
            style={styles.camBadge}
            onPress={() => navigation.navigate('Profile')}
            accessibilityRole="button"
            accessibilityLabel="Change photo"
            hitSlop={8}
          >
            <Ionicons name="camera" size={16} color="#fff" />
          </Pressable>
        </View>
      </View>

      {status === 'loading' && (
        <View style={styles.loading} accessibilityLiveRegion="polite">
          <ActivityIndicator color={colors.accent} />
          <Text style={styles.muted}>Loading saved profile…</Text>
        </View>
      )}
      {status === 'error' && (
        <>
          <Banner type="error" text="Saved profile could not be read. Showing the default profile." />
          <Button title="Try again" variant="secondary" onPress={reload} />
        </>
      )}

      <Card>
        <View style={styles.idRow}>
          <Text style={styles.idName}>{OWNER.name}</Text>
          <Text style={styles.code} selectable>
            {OWNER.verificationCode}
          </Text>
        </View>
        <Text style={styles.headline}>{profile.headline}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
        <Text style={styles.muted}>
          {profile.availability} · Primary skill: {profile.primarySkill}
        </Text>
      </Card>

      <View style={styles.facts}>
        {[
          [PROJECTS.length, 'Projects'],
          [SKILLS.length, 'Skills'],
          [EDUCATION.length, 'Education'],
        ].map(([n, l]) => (
          <View key={String(l)} style={styles.fact} accessible accessibilityLabel={`${n} ${l}`}>
            <Text style={styles.factN}>{String(n).padStart(2, '0')}</Text>
            <Text style={styles.factL}>{l}</Text>
          </View>
        ))}
      </View>

      <SectionTitle count={undefined}>Selected project</SectionTitle>
      <ProjectCard
        project={featured}
        onPress={() => navigation.navigate('ProjectsTab', { screen: 'ProjectDetail', params: { id: featured.id } })}
      />

      <Button
        title="Open GitHub profile (needs internet)"
        variant="secondary"
        onPress={openGithub}
        hint="Opens your browser. Requires an internet connection."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  hero: { flex: 1, color: colors.text, fontSize: font.hero, fontWeight: '700', letterSpacing: -0.6, lineHeight: 30 },
  heroAccent: { color: colors.accent },
  camBadge: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.text,
    borderWidth: 2.5,
    borderColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: { alignItems: 'center', gap: spacing.sm },
  idRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  idName: { color: colors.text, fontSize: font.small + 0.5, fontWeight: '700' },
  code: {
    color: colors.accent,
    backgroundColor: colors.accentSoft,
    fontFamily: mono,
    fontSize: font.tiny,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    overflow: 'hidden',
  },
  headline: { color: colors.text, fontSize: font.body - 1, fontWeight: '600', lineHeight: 22 },
  bio: { color: colors.text2, fontSize: font.small, lineHeight: 22 },
  muted: { color: colors.muted, fontSize: font.small },
  facts: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  fact: {
    flexGrow: 1,
    flexBasis: 90,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 12,
    gap: 5,
  },
  factN: { color: colors.text, fontSize: 19, fontWeight: '800' },
  factL: { color: colors.muted, fontSize: 11, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase' },
});
