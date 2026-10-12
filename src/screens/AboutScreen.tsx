import React from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Button from '../components/Button';
import Card from '../components/Card';
import { DATA_USE_STATEMENT, OWNER } from '../data/portfolio';
import { colors, font, mono, spacing } from '../theme';

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <View style={styles.row} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.k}>{label}</Text>
      <Text style={[styles.v, accent && styles.accent]}>{value}</Text>
    </View>
  );
}

export default function AboutScreen() {
  const version = Constants.expoConfig?.version ?? '1.0.0';
  const openGithub = async () => {
    try {
      await Linking.openURL(OWNER.github);
    } catch {
      Alert.alert('No connection', 'The GitHub link needs internet. The rest of the app works offline.');
    }
  };
  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.mark}><Text style={styles.markText}>CN</Text></View>
        <Text style={styles.name}>{OWNER.name}</Text>
        <Text style={styles.sub}>{OWNER.verificationCode}</Text>
      </View>
      <Card>
        <Text style={styles.h}>Application</Text>
        <Row label="App name" value={OWNER.appName} />
        <Row label="Version" value={version} />
        <Row label="Package" value={OWNER.androidPackage} />
      </Card>
      <Card>
        <Text style={styles.h}>Identity</Text>
        <Row label="Name" value={OWNER.name} />
        <Row label="Registration number" value={OWNER.registration} />
        <Row label="Verification code" value={OWNER.verificationCode} accent />
      </Card>
      <Card>
        <Text style={styles.h}>Data use</Text>
        <Text style={styles.note}>{DATA_USE_STATEMENT}</Text>
      </Card>
      <Button title="Open GitHub profile (needs internet)" variant="secondary" onPress={openGithub} hint="Opens your browser. Requires internet." />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl },
  hero: { alignItems: 'center', gap: 4, paddingBottom: spacing.sm },
  mark: { width: 72, height: 72, borderRadius: 22, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  markText: { color: colors.onAccent, fontFamily: mono, fontSize: 22, fontWeight: '600' },
  name: { color: colors.text, fontSize: 19, fontWeight: '800', textAlign: 'center' },
  sub: { color: colors.muted, fontFamily: mono, fontSize: font.tiny },
  h: { color: colors.muted, fontSize: font.tiny, fontWeight: '700', letterSpacing: 1.1, textTransform: 'uppercase' },
  row: { gap: 2, paddingVertical: 6 },
  k: { color: colors.muted, fontSize: font.tiny + 1, fontWeight: '600' },
  v: { color: colors.text, fontSize: font.small, fontFamily: mono, fontWeight: '600' },
  accent: { color: colors.accent },
  note: { color: colors.text2, fontSize: font.small, lineHeight: 22 },
});
