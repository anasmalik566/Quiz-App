import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function AdminScreen() {
  const [newQuestion, setNewQuestion] = useState('');
  const [newChoices, setNewChoices] = useState(['', '', '']);
  const [newAnswer, setNewAnswer] = useState('');
  const [questions, setQuestions] = useState([]);

  // Fetch questions from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const storedQuestions = await AsyncStorage.getItem('questions');
        if (storedQuestions) {
          setQuestions(JSON.parse(storedQuestions));  // Parse the stored questions
        }
      } catch (error) {
        console.error('Error fetching questions from AsyncStorage', error);
      }
    };

    fetchQuestions();
  }, []);

  const addQuestion = async () => {

    if (newQuestion.trim() && newChoices.every(choice => choice.trim()) && newAnswer.trim()) {
      const newQuestionObj = {
        question: newQuestion,
        choices: newChoices,
        answer: newAnswer,
      };

      const updatedQuestions = [...questions, newQuestionObj];
      setQuestions(updatedQuestions);

      // Save the updated list of questions in AsyncStorage
      try {
        await AsyncStorage.setItem('questions', JSON.stringify(updatedQuestions));
        setNewQuestion('');
        setNewChoices(['', '', '']); 
        setNewAnswer('');
        Alert.alert('Success', 'Question added!');
      } catch (error) {
        console.error('Error saving questions to AsyncStorage', error);
        Alert.alert('Error', 'Failed to save question');
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter new question"
        value={newQuestion}
        onChangeText={setNewQuestion}
      />

      {newChoices.map((choice, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Choice ${index + 1}`}
          value={choice}
          onChangeText={text => {
            const updatedChoices = [...newChoices];
            updatedChoices[index] = text;
            setNewChoices(updatedChoices);
          }}
        />
      ))}

      <TextInput
        style={styles.input}
        placeholder="Enter correct answer"
        value={newAnswer}
        onChangeText={setNewAnswer}
      />

      <TouchableOpacity style={styles.button} onPress={addQuestion}>
        <Text style={styles.buttonText}>Add Question</Text>
      </TouchableOpacity>

      <Text style={styles.listTitle}>Questions:</Text>

      <View style={styles.scrollWrapper}>
        <ScrollView style={styles.scrollContainer}>
          {questions.map((q, index) => (
            <View key={index} style={styles.questionItem}>
              <Text style={styles.questionText}>{index + 1}. {q.question}</Text>
              {q.choices.map((choice, idx) => (
                <Text key={idx} style={styles.choiceText}>{idx + 1}. {choice}</Text>
              ))}
              <Text style={styles.answerText}>Answer: {q.answer}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const { height,width } = Dimensions.get('window'); 
// console.log("height", height, "width" ,width)

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#f4f6f9',
  },
  title: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center', 
    color: '#34495e'
  },
  input: {
    borderWidth: 1, 
    borderColor: '#b0bec5', 
    padding: 12, 
    marginBottom: 15, 
    borderRadius: 8, 
    fontSize: 16, 
    backgroundColor: '#fff', 
    width: '100%',
  },
  button: {
    backgroundColor: '#2980b9', 
    paddingVertical: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginVertical: 20, 
    elevation: 5,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold',
  },
  listTitle: {
    fontSize: 22, 
    marginBottom: 15, 
    fontWeight: '600', 
    color: '#2980b9',
  },
  scrollWrapper: {
    height: height * 0.5, // Set scrollable area to half the screen height
    marginBottom: 30,
  },
  scrollContainer: {
    paddingBottom: 10,
  },
  questionItem: {
    backgroundColor: '#fff', 
    borderRadius: 8, 
    padding: 15, 
    marginBottom: 10, 
    elevation: 3,
  },
  questionText: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2c3e50', 
    marginBottom: 8,
  },
  choiceText: {
    fontSize: 16, 
    marginLeft: 10, 
    color: '#7f8c8d', 
  },
  answerText: {
    fontSize: 16, 
    marginLeft: 10, 
    color: '#27ae60', 
    fontWeight: '600',
  },
});
