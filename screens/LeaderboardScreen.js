import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function LeaderboardScreen({ route }) {
  const [leaderboard, setLeaderboard] = useState([
    { name: 'Alice', score: 10 },
    { name: 'Bob', score: 8 },
    { name: 'Charlie', score: 6 },
  ]);
  
  // Update leaderboard with current score
  useEffect(() => {
    if (route.params && route.params.score) {
      const newLeaderboard = [...leaderboard, { name: 'You', score: route.params.score }];
      newLeaderboard.sort((a, b) => b.score - a.score); // Sort by score
      setLeaderboard(newLeaderboard);
    }
  }, [route.params]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      {leaderboard.map((entry, index) => (
        <View key={index} style={[styles.entry, entry.name === 'You' && styles.currentUserEntry]}>
          <Text style={[styles.entryText, entry.name === 'You' && styles.currentUserText]}>
            {index + 1}. {entry.name}
          </Text>
          <Text style={[styles.entryText, entry.name === 'You' && styles.currentUserText]}>
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
    // shadowOpacity: 0.1, 
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
