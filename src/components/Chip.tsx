import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

type Props = { label: string; selected?: boolean; onPress?: () => void };

export default function Chip({ label, selected, onPress }: Props) {
  if (!onPress) return <Text style={[styles.chip, styles.static]}>{label}</Text>;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected: !!selected }}
      accessibilityLabel={label}
      style={[styles.chip, styles.pressable, selected && styles.on]}
    >
      <Text style={[styles.text, selected && styles.textOn]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md - 3,
    paddingVertical: spacing.sm,
    overflow: 'hidden',
  },
  static: { color: colors.text2, fontSize: font.tiny + 1, fontWeight: '600' },
  pressable: { minHeight: 44, justifyContent: 'center' },
  on: { backgroundColor: colors.accent, borderColor: colors.accent },
  text: { color: colors.muted, fontSize: font.tiny + 1, fontWeight: '600' },
  textOn: { color: colors.onAccent },
});
