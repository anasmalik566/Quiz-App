import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const questions = [
  { id: 1, question: 'What is React?', choices: ['Library', 'Framework', 'Language'], answer: 'Library' },
  { id: 2, question: 'What is useState?', choices: ['Hook', 'Component', 'Function'], answer: 'Hook' },
  { id: 3, question: 'What is JSX?', choices: ['JavaScript Extension', 'JavaScript XML', 'JavaScript Object'], answer: 'JavaScript XML' },
  { id: 4, question: 'What is the use of useEffect?', choices: ['To manage state', 'To trigger side effects', 'To render components'], answer: 'To trigger side effects' },
  { id: 5, question: 'What is the default port for React development server?', choices: ['3000', '8080', '5000'], answer: '3000' },
  { id: 6, question: 'Which of the following is a React lifecycle method?', choices: ['componentDidMount', 'setState', 'render'], answer: 'componentDidMount' },
  { id: 7, question: 'What is Redux used for?', choices: ['State management', 'Routing', 'Animation'], answer: 'State management' },
];

export default function QuizScreen({ navigation }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [buttonAnim] = useState(new Animated.Value(1));
  const [timer, setTimer] = useState(10); // Timer countdown starting at 10 seconds

  useEffect(() => {
    if (timer === 0) {
      handleAnswer(null); // Handle time-out when timer reaches 0
    } else {
      const timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1); // Decrease timer by 1 every second
      }, 1000);
      return () => clearInterval(timerInterval); // Clean up the interval
    }
  }, [timer]);

  const handleAnswer = (choice) => {
    if (choice !== null) {
      const isCorrect = choice === questions[current].answer;
      if (isCorrect) {
        setScore(score + 1);
        setAnswerStatus('correct');
      } else {
        setAnswerStatus('wrong');
      }
    } else {
      setAnswerStatus('time-out'); // Handle time-out condition
    }

    // Button feedback animation
    Animated.timing(buttonAnim, {
      toValue: 1.2,
      duration: 200,
      useNativeDriver: true,
    }).start();

    // Add a delay before moving to the next question
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(current + 1);
        setAnswerStatus(null); // Reset answer status for the next question
        setTimer(10); // Reset timer for the next question
      } else {
        navigation.navigate('Timer', { score });
      }

      // Reset the button animation
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[current].question}</Text>
      
      {answerStatus && (
        <Text style={styles.answerStatus}>
          {answerStatus === 'correct' ? 'Correct!' : answerStatus === 'wrong' ? 'Wrong!' : 'Time\'s Up!'}
        </Text>
      )}
      
      <Text style={styles.timerText}>Time Left: {timer}s</Text>

      {questions[current].choices.map((choice, index) => (
        <Animated.View key={index} style={[styles.choiceWrapper, { transform: [{ scale: buttonAnim }] }]}>
          <TouchableOpacity
            style={[
              styles.choiceButton,
              answerStatus === 'correct' && styles.correctChoice,
              answerStatus === 'wrong' && styles.wrongChoice,
              answerStatus === 'time-out' && styles.timeOutChoice, // Add style for time-out
            ]}
            onPress={() => handleAnswer(choice)}
            disabled={answerStatus !== null} // Disable button after answering or time-out
          >
            <Text style={styles.choiceText}>{choice}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E74C3C', // Red color to highlight the urgency of the timer
  },
  choiceWrapper: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  choiceButton: {
    backgroundColor: '#3498db',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  choiceText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  correctChoice: {
    backgroundColor: '#27ae60',
  },
  wrongChoice: {
    backgroundColor: '#e74c3c',
  },
  timeOutChoice: {
    backgroundColor: '#f39c12', // Yellow for time-out option
  },
  answerStatus: {
    fontSize: 20,
    color: '#27ae60',
    marginBottom: 20,
    fontWeight: 'bold',
  },
});
