import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EducationEntry } from '../types';
import { colors, font, mono, spacing } from '../theme';

export default function EduItem({ entry, last }: { entry: EducationEntry; last?: boolean }) {
  return (
    <View
      style={[styles.row, !last && styles.divider]}
      accessible
      accessibilityLabel={`${entry.year}. ${entry.title}. ${entry.org}. ${entry.note}`}
    >
      <Text style={styles.year}>{entry.year}</Text>
      <View style={styles.body}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.meta}>{entry.org}</Text>
        <Text style={styles.meta}>{entry.note}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md, paddingVertical: 14 },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  year: { width: 72, color: colors.accent, fontSize: font.tiny, fontFamily: mono, fontWeight: '600', paddingTop: 2 },
  body: { flex: 1, gap: 3 },
  title: { color: colors.text, fontSize: font.small, fontWeight: '700', lineHeight: 20 },
  meta: { color: colors.muted, fontSize: font.tiny + 1 },
});
