import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  hint?: string;
};

export default function Button({ title, onPress, variant = 'primary', disabled, hint }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={hint}
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'danger' && styles.danger,
        (pressed || disabled) && styles.dim,
      ]}
    >
      <Text style={[styles.text, variant === 'primary' && styles.onAccent, variant === 'danger' && styles.dangerText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 50,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  primary: { backgroundColor: colors.accent, borderColor: colors.accent },
  secondary: { backgroundColor: colors.surface, borderColor: colors.accent },
  danger: { backgroundColor: colors.surface, borderColor: colors.danger },
  dim: { opacity: 0.6 },
  text: { color: colors.accent, fontSize: font.body, fontWeight: '700', textAlign: 'center' },
  onAccent: { color: colors.onAccent },
  dangerText: { color: colors.danger },
});
