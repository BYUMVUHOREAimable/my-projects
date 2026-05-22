import React from 'react';
import { AuthProvider } from './state/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import { LogBox } from 'react-native';

// Optional: Ignore specific warnings if they are known and not critical
LogBox.ignoreLogs(['Setting a timer']); // Example

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}