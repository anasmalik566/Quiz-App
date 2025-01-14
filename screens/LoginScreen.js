import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Image, Platform } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const correctUsername = 'Admin'; 
    const correctPassword = 'admin123'; 

    if (username === correctUsername && password === correctPassword) {
      navigation.navigate('Admin');
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

       <View style={styles.imageContainer}>
              <Image 
                source={require('../Images/admin.png')} 
                style={styles.circleImage} 
              />
            </View>

      <Text style={styles.title}>Admin Login</Text>
 
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

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        autoCapitalize="none"
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

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
    backgroundColor: 'white',
    padding: 20,
    marginTop: -99
  },
  imageContainer: {
    marginBottom: 15,
    alignItems: 'center', 
  },
  circleImage: {
    width: 95, 
    height: 95, 
    borderRadius: 50, 
    marginBottom: 15,
    borderWidth: 2, 
    borderColor: '#3498db',
    // resizeMode: 'repeat'
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3498db',
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
