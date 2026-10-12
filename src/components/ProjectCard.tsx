import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Project } from '../types';
import { colors, font, mono, radius, spacing } from '../theme';
import Chip from './Chip';

const STATUS = {
  ship: { icon: 'checkmark-circle' as const, color: colors.success, label: 'Shipped' },
  build: { icon: 'time' as const, color: colors.warning, label: 'In progress' },
};

export default function ProjectCard({ project, onPress }: { project: Project; onPress: () => void }) {
  const s = STATUS[project.status];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${project.title}. ${project.tagline}. ${s.label}.`}
      accessibilityHint="Opens project details"
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.head}>
        <View style={styles.flex}>
          <Text style={styles.title}>{project.title}</Text>
          <Text style={styles.tag}>{project.tag}</Text>
        </View>
        <Ionicons name={s.icon} size={24} color={s.color} accessibilityLabel={s.label} />
      </View>
      <Text style={styles.tagline}>{project.tagline}</Text>
      <View style={styles.foot}>
        <View style={styles.stack}>
          {project.tech.slice(0, 3).map((t) => (
            <Chip key={t} label={t} />
          ))}
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.muted} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm + 2,
  },
  pressed: { backgroundColor: colors.surfaceAlt },
  head: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  flex: { flex: 1 },
  title: { color: colors.text, fontSize: font.body + 1, fontWeight: '700' },
  tag: { color: colors.muted, fontSize: font.tiny - 1, fontFamily: mono, fontWeight: '600', letterSpacing: 1, marginTop: 4 },
  tagline: { color: colors.text2, fontSize: font.small },
  foot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  stack: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
});
