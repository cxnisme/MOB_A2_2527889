import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

export default function Screen({ children, keyboard }: { children: ReactNode; keyboard?: boolean }) {
  const content = (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {keyboard ? (
        <KeyboardAvoidingView style={styles.flex} behavior="padding">
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
  // extra bottom space so content clears the floating tab bar
  content: { padding: spacing.lg, paddingBottom: 130, gap: spacing.md },
});
