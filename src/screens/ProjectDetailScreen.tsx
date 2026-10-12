import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Banner from '../components/Banner';
import Card from '../components/Card';
import Chip from '../components/Chip';
import { PROJECTS } from '../data/portfolio';
import { ProjectsStackParamList } from '../types';
import { colors, font, mono, spacing } from '../theme';

type Props = NativeStackScreenProps<ProjectsStackParamList, 'ProjectDetail'>;

function Heading({ children }: { children: string }) {
  return (
    <Text accessibilityRole="header" style={styles.h}>
      {children}
    </Text>
  );
}

export default function ProjectDetailScreen({ route }: Props) {
  const p = PROJECTS.find((x) => x.id === route.params.id);
  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      {!p ? (
        <Banner type="error" text="This project could not be found. Go back and choose another one." />
      ) : (
        <>
          <Text style={styles.eyebrow}>{p.tag}</Text>
          <Text accessibilityRole="header" style={styles.title}>{p.title}</Text>
          <Text style={styles.tagline}>{p.tagline}</Text>
          <Card>
            <Heading>The problem</Heading>
            <Text style={styles.body}>{p.problem}</Text>
          </Card>
          <Card>
            <Heading>My contribution</Heading>
            {p.contribution.map((c) => (
              <View key={c} style={styles.li}>
                <View style={styles.dot} />
                <Text style={[styles.body, styles.flex]}>{c}</Text>
              </View>
            ))}
          </Card>
          <Card>
            <Heading>Technology used</Heading>
            <View style={styles.chips}>
              {p.tech.map((t) => (
                <Chip key={t} label={t} />
              ))}
            </View>
          </Card>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl },
  eyebrow: { color: colors.muted, fontSize: font.tiny, fontFamily: mono, fontWeight: '600', letterSpacing: 1 },
  title: { color: colors.text, fontSize: 26, fontWeight: '800', letterSpacing: -0.8 },
  tagline: { color: colors.muted, fontSize: font.small + 0.5 },
  h: { color: colors.muted, fontSize: font.tiny, fontWeight: '700', letterSpacing: 1.1, textTransform: 'uppercase' },
  body: { color: colors.text2, fontSize: font.small + 0.5, lineHeight: 23 },
  li: { flexDirection: 'row', gap: 10 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.accent, marginTop: 9 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
});
