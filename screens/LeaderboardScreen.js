import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LeaderboardScreen({ route }) {
  const [leaderboard, setLeaderboard] = useState([]);

  const defaultLeaderboard = [
    { name: 'Shahid Khan', score: 10 },
    { name: 'Ahmad Raza', score: 8 },
    { name: 'Waqar Ali', score: 6 },
    { name: 'Atif Khan', score: 9 },
    { name: 'Sahil Shah', score: 3 },
    { name: 'Hassan Qureshi', score: 11 },
  ];

  // Fetch leaderboard from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const storedLeaderboard = await AsyncStorage.getItem('leaderboard');
        if (storedLeaderboard) {
          setLeaderboard(JSON.parse(storedLeaderboard));
        } else {
          // If no data is found, initialize with default values
          setLeaderboard(defaultLeaderboard);
          await AsyncStorage.setItem('leaderboard', JSON.stringify(defaultLeaderboard));
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  // Update leaderboard with the new score and save it to AsyncStorage
  useEffect(() => {
    const updateLeaderboard = async () => {
      if (route.params && route.params.score) {
        // Merge default leaderboard with new entry to ensure defaults are preserved
        const newLeaderboard = [...defaultLeaderboard, ...leaderboard, { name: 'You', score: route.params.score }];
        const uniqueLeaderboard = Array.from(
          new Map(newLeaderboard.map((entry) => [entry.name, entry])).values()
        ); // Remove duplicates based on name
        uniqueLeaderboard.sort((a, b) => b.score - a.score); // Sort by score

        setLeaderboard(uniqueLeaderboard);

        try {
          await AsyncStorage.setItem('leaderboard', JSON.stringify(uniqueLeaderboard));
        } catch (error) {
          console.error('Error saving leaderboard:', error);
        }
      }
    };

    updateLeaderboard();
  }, [route.params]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      {leaderboard.map((entry, index) => (
        <View
          key={index}
          style={[
            styles.entry,
            entry.name === 'You' && styles.currentUserEntry,
          ]}
        >
          <Text
            style={[
              styles.entryText,
              entry.name === 'You' && styles.currentUserText,
            ]}
          >
            {index + 1}. {entry.name}
          </Text>
          <Text
            style={[
              styles.entryText,
              entry.name === 'You' && styles.currentUserText,
            ]}
          >
            {entry.score}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#ECF0F1', 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#3498db', 
  },
  entry: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15, 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 50, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 5, 
    elevation: 5, 
  },
  currentUserEntry: {
    backgroundColor: '#FFEB3B', 
    borderWidth: 2,
    borderColor: '#F39C12', 
  },
  entryText: { 
    fontSize: 18, 
    color: '#2C3E50', 
  },
  currentUserText: {
    fontWeight: 'bold',
    color: '#E74C3C', 
  },
});
