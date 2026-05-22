// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../state/AuthContext';
import { loginUser } from '../services/api'; // Import your API service

const LoginScreen = () => {
  const [username, setUsername] = useState(''); // MockAPI users use email as username
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const userData = await loginUser(username); // API call
      if (userData && userData.password === password) {
        login(userData); // Set user in AuthContext
        // Navigation will happen automatically due to state change in AppNavigator
      } else if (userData) {
        setError('Invalid password.');
        Alert.alert('Login Failed', 'Invalid password.');
      } else {
        setError('User not found.');
        Alert.alert('Login Failed', 'User not found.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login. Please try again.');
      Alert.alert('Login Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Finance Tracker</Text>
      <TextInput
        style={styles.input}
        placeholder="Username (e.g., Rosalyn59@hotmail.com)"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
      <View style={styles.sampleCredentials}>
        <Text style={styles.sampleHeader}>Sample Credentials (from MockAPI):</Text>
        <Text>User: Rosalyn59@hotmail.com, Pass: GjFIrSgyliG8tW5</Text>
        <Text>User: Maci94@hotmail.com, Pass: R0ChVUODGqjwaAF</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  sampleCredentials: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  sampleHeader: {
    fontWeight: 'bold',
    marginBottom: 5,
  }
});

export default LoginScreen;