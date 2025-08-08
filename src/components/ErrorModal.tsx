import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

import type { ApiError } from '@/api/client';

interface ErrorModalProps {
  error: ApiError | null;
  onClose: () => void;
}

export function ErrorModal({ error, onClose }: ErrorModalProps) {
  return (
    <Modal transparent visible={!!error} animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.content}>
          <Text>{error?.message}</Text>
          <Button title="OK" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 8,
    minWidth: 200,
  },
});
