import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

export type BannerType = 'info' | 'success' | 'error';
const tint: Record<BannerType, string> = { info: colors.warning, success: colors.success, error: colors.danger };

export default function Banner({ type, text }: { type: BannerType; text: string }) {
  return (
    <View accessibilityRole="alert" accessibilityLiveRegion="polite" style={[styles.box, { borderColor: tint[type] }]}>
      <Text style={[styles.text, { color: tint[type] }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderRadius: radius.sm, backgroundColor: colors.surface, padding: spacing.sm + 2 },
  text: { fontSize: font.small, lineHeight: 20, fontWeight: '600' },
});
