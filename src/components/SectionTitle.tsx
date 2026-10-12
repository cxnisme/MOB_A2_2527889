import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, font, mono, spacing } from '../theme';

export default function SectionTitle({ children, count }: { children: string; count?: string | number }) {
  return (
    <View style={styles.row}>
      <Text accessibilityRole="header" style={styles.label}>
        {children}
      </Text>
      {count !== undefined && <Text style={styles.count}>{String(count).padStart(2, '0')}</Text>}
    </View>
  );
}

export function ScreenHeader({ tag, aside, title, sub }: { tag: string; aside: string; title: string; sub: string }) {
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <Text style={styles.tag}>{tag}</Text>
        <Text style={styles.count}>{aside}</Text>
      </View>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.sub}>{sub}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: spacing.sm },
  label: { color: colors.muted, fontSize: font.tiny, fontWeight: '700', letterSpacing: 1.1, textTransform: 'uppercase' },
  count: { color: colors.muted, fontSize: font.tiny, fontFamily: mono, fontWeight: '600' },
  header: { gap: spacing.sm },
  tag: { color: colors.muted, fontSize: font.tiny, fontFamily: mono, fontWeight: '600', letterSpacing: 1 },
  title: { color: colors.text, fontSize: font.title, fontWeight: '800', letterSpacing: -1 },
  sub: { color: colors.muted, fontSize: font.small },
});
