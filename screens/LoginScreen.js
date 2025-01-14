import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const correctUsername = 'Admin';  // Hardcoded for simplicity
    const correctPassword = 'admin123';  // Hardcoded for simplicity

    if (username === correctUsername && password === correctPassword) {
      navigation.navigate('Admin');  // Navigate to Admin Screen on successful login
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Admin Login</Text>

      {/* Username Field */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        // autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        placeholderTextColor="#aaa"
      />

      {/* Password Field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        autoCapitalize="none"
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password Text */}
      <TouchableOpacity onPress={() => Alert.alert('Reset password feature coming soon!')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 30,
    color: 'white',
  },
  input: {
    width: '85%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 18,
    backgroundColor: '#FFF',
  },
  button: {
    width: '85%',
    padding: 15,
    backgroundColor: '#3498db',
    borderRadius: 8,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    fontSize: 16,
    color: '#3498db',
    marginTop: 15,
  },
});
