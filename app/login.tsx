import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { router } from 'expo-router';

import { apiClient, ApiError } from '@/api/client';
import { showToast } from '@/utils/toast';
import { useError } from '@/context/ErrorContext';
import { styles } from './login.style';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setError } = useError();

  const handleLogin = async () => {
    try {
      const data = await apiClient.post<{ token: string }, { email: string; password: string }>(
        '/login',
        { email, password },
      );
      if (data.token) {
        router.replace('/(tabs)');
      } else {
        showToast('Brak połączenia z serwerem');
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'message' in err && !(err instanceof Error)) {
        setError(err as ApiError);
      } else {
        showToast('Brak połączenia z serwerem');
      }
    }
  };

  const handleBiometric = async () => {
    try {
      // eslint-disable-next-line import/no-unresolved
      const LocalAuthentication = await import('expo-local-authentication');
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        router.replace('/(tabs)');
      }
    } catch {
      showToast('Brak połączenia z serwerem');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Zaloguj" onPress={handleLogin} />
      <View style={styles.spacer} />
      <Button title="Zaloguj biometrią" onPress={handleBiometric} />
    </View>
  );
}
