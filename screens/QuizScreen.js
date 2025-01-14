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
  { id: 8, question: 'Which command is used to create a new React Native project?', choices: ['react-native init', 'npx create-react-app', 'npm start'], answer: 'react-native init' },
  { id: 9, question: 'What is the role of Metro in React Native?', choices: ['Bundler', 'State Manager', 'UI Framework'], answer: 'Bundler' },
  { id: 10, question: 'Which file is used to configure dependencies in a React Native project?', choices: ['package.json', 'index.js', 'App.js'], answer: 'package.json' },
  { id: 11, question: 'What is the use of the FlatList component?', choices: ['List rendering', 'Routing', 'Styling'], answer: 'List rendering' },
  { id: 12, question: 'How do you apply styles in React Native?', choices: ['CSS', 'Stylesheet.create', 'HTML'], answer: 'Stylesheet.create' },
  { id: 13, question: 'Which of the following components is used for navigation in React Native?', choices: ['Navigator', 'StackNavigator', 'NavigationContainer'], answer: 'NavigationContainer' },
  { id: 14, question: 'What is the use of the SafeAreaView component?', choices: ['To prevent overlapping with system UI', 'To create a modal', 'To apply global styles'], answer: 'To prevent overlapping with system UI' },
  { id: 15, question: 'Which command is used to run a React Native app on an Android emulator?', choices: ['npx react-native run-android', 'npm start', 'npx expo start'], answer: 'npx react-native run-android' },
];

export default function QuizScreen({ navigation }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [buttonAnim] = useState(new Animated.Value(1));
  const [timer, setTimer] = useState(10);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (timer <= 0) {
      handleAnswer(null); // Trigger time-out handling
    } else {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleAnswer = (choice) => {
    if (isAnswered) return; // Prevent multiple answers for the same question
    setIsAnswered(true);

    const isCorrect = choice === questions[current].answer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1); // Increment score for correct answers
      setAnswerStatus('correct');
    } else if (choice !== null) {
      setAnswerStatus('wrong');
    } else {
      setAnswerStatus('time-out');
    }

    // Animate button feedback
    Animated.timing(buttonAnim, {
      toValue: 1.2,
      duration: 200,
      useNativeDriver: true,
    }).start();

    // Delay before moving to the next question or ending quiz
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent((prev) => prev + 1);
        setAnswerStatus(null);
        setTimer(10);
        setIsAnswered(false); // Reset for the next question
      } else {
        // Navigate to result screen with final score
        navigation.replace('Timer', { score: score + (isCorrect ? 1 : 0), total: questions.length });
      }

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
          {answerStatus === 'correct' ? 'Correct!' : answerStatus === 'wrong' ? 'Wrong!' : "Time's Up!"}
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
              answerStatus === 'time-out' && styles.timeOutChoice,
            ]}
            onPress={() => handleAnswer(choice)}
            disabled={isAnswered} // Disable selection after answering
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
    color: '#E74C3C',
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
    backgroundColor: '#f39c12',
  },
  answerStatus: {
    fontSize: 20,
    color: '#27ae60',
    marginBottom: 20,
    fontWeight: 'bold',
  },
});
