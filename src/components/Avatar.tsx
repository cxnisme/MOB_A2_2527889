import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, mono } from '../theme';

export default function Avatar({ uri, size = 96 }: { uri: string | null; size?: number }) {
  const box = { width: size, height: size, borderRadius: size * 0.29 };
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.base, box]}
        accessibilityRole="image"
        accessibilityLabel="Profile photo of NIWENIRINGIYE Christian"
      />
    );
  }
  return (
    <View style={[styles.base, styles.fallback, box]} accessible accessibilityRole="image" accessibilityLabel="Default avatar with initials NC">
      <Text style={[styles.initials, { fontSize: size * 0.31 }]}>NC</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { backgroundColor: colors.accent },
  fallback: { alignItems: 'center', justifyContent: 'center' },
  initials: { color: colors.onAccent, fontFamily: mono, fontWeight: '600' },
});
