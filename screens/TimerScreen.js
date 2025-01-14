import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Animated } from 'react-native';

export default function TimerScreen({ route, navigation }) {
  const { score } = route.params;
  const [timeLeft, setTimeLeft] = useState(4);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (timeLeft === 0) {
      // Fading out the text to make the transition smooth
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        Alert.alert(
          'Time is up!',
          `Your score: ${score}`,
          [
            { text: 'OK', onPress: () => navigation.navigate('Leaderboard', { score }) }, // Pass score to leaderboard
          ]
        );
      });
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.timer, { opacity: fadeAnim }]}>
        Time Left: {timeLeft}s
      </Animated.Text>
      <Text style={styles.score}>Your Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  timer: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 20,
  },
  score: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
  },
});
