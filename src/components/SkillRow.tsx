import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Skill } from '../types';
import { colors, font, mono, spacing } from '../theme';
import Card from './Card';
import Chip from './Chip';

export default function SkillRow({ skill }: { skill: Skill }) {
  return (
    <Card>
      <View style={styles.head}>
        <Text style={styles.name}>{skill.name}</Text>
        <Text style={styles.note}>{skill.note}</Text>
      </View>
      <View
        style={styles.track}
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={`${skill.name} level`}
        accessibilityValue={{ min: 0, max: 100, now: skill.level }}
      >
        <View style={[styles.fill, { width: `${skill.level}%` }]} />
      </View>
      <View style={styles.tags}>
        {skill.tags.map((t) => (
          <Chip key={t} label={t} />
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  name: { flexShrink: 1, color: colors.text, fontSize: font.body - 1, fontWeight: '700' },
  note: { color: colors.muted, fontSize: font.tiny, fontFamily: mono, fontWeight: '600' },
  track: { height: 5, borderRadius: 3, backgroundColor: colors.surfaceAlt, overflow: 'hidden' },
  fill: { height: 5, borderRadius: 3, backgroundColor: colors.accent },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
});
