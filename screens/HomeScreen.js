import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';

// Component for the Home Screen
export default function HomeScreen({ navigation }) {
  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };
  

  return (
    <View style={styles.container}>
      {/* Attractive Status Bar with theme matching color */}
      <StatusBar barStyle="light-content" backgroundColor="grey" />
      
      {/* Circular Image with Border */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../Images/logo3.png')} // Replace with your image URL or local path
          style={styles.circleImage} 
        />
      </View>

      <Text style={styles.title}>Welcome to Quiz App</Text>
      
      <Text style={styles.subtitle}>
        Test your knowledge and compete with others!
      </Text>

      {/* Start Quiz Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigation('Quiz')}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>

      {/* View Leaderboard Button */}
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

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white', // Dark background for modern look
  },
  imageContainer: {
    marginBottom: 30,
    alignItems: 'center', // Ensure the image is centered
  },
  circleImage: {
    width: 200, // Adjust the size of the circular image
    height: 200, 
    borderRadius: 100, // Make the image circular
    marginBottom: 15, // Space between the image and the title
    borderWidth: 2, // Border width for the circular image
    borderColor: '#3498db', // Matching the border color to the button
    // resizeMode: 'repeat'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3498db', // White for contrast on dark background
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#black', // Subdued color for secondary text
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db', // Vibrant primary color
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
    // elevation: 5, // Shadow for Android
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3498db', // Matching the border color to the button
  },
  secondaryButtonText: {
    color: '#3498db',
  },
});
