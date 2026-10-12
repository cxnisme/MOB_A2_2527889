import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

type Props = {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  onBlur?: () => void;
  error?: string;
  helper?: string;
  multiline?: boolean;
  maxLength?: number;
};

export default function Field({ label, value, onChangeText, onBlur, error, helper, multiline, maxLength }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        multiline={multiline}
        maxLength={maxLength}
        textAlignVertical={multiline ? 'top' : 'center'}
        accessibilityLabel={label}
        accessibilityHint={error ?? helper}
        style={[styles.input, multiline && styles.multiline, !!error && styles.inputError]}
      />
      <View style={styles.row}>
        <Text style={[styles.note, !!error && styles.error]} accessibilityLiveRegion={error ? 'polite' : 'none'}>
          {error ?? helper ?? ''}
        </Text>
        {maxLength ? <Text style={styles.note}>{value.length}/{maxLength}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.xs },
  label: { color: colors.muted, fontSize: font.tiny, fontWeight: '700', letterSpacing: 1.1, textTransform: 'uppercase' },
  input: {
    minHeight: 50,
    color: colors.text,
    fontSize: font.body,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  multiline: { minHeight: 110 },
  inputError: { borderColor: colors.danger },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  note: { color: colors.muted, fontSize: font.tiny, flexShrink: 1 },
  error: { color: colors.danger, fontWeight: '600' },
});
