import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';


export default function HomeScreen({ navigation }) {
  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };
  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="grey" />
      
  
      <View style={styles.imageContainer}>
        <Image 
          source={require('../Images/logo3.png')} 
          style={styles.circleImage} 
        />
      </View>

      <Text style={styles.title}>Welcome to Quiz App</Text>
      
      <Text style={styles.subtitle}>
        Test your knowledge and compete with others!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigation('Quiz')}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => handleNavigation('Leaderboard')}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          View Leaderboard
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  imageContainer: {
    marginBottom: 30,
    alignItems: 'center', 
  },
  circleImage: {
    width: 200, 
    height: 200, 
    borderRadius: 100, 
    marginBottom: 15,
    borderWidth: 2, 
    borderColor: '#3498db',
    // resizeMode: 'repeat'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#black', 
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // elevation: 5, 
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3498db',
  },
  secondaryButtonText: {
    color: '#3498db',
  },
});
