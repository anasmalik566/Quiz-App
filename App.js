import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import {useFonts} from 'expo-font'; 
import LoginScreen from './screens/LoginScreen'; 
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import TimerScreen from './screens/TimerScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import AdminScreen from './screens/AdminScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {

  const [fontsLoaded] = useFonts({
    Black: require('./fonts/PlayfairDisplay-Black.ttf'),
    BItalic: require('./fonts/PlayfairDisplay-BlackItalic.ttf'),
    Bold: require('./fonts/PlayfairDisplay-Bold.ttf')
  });

  if(!fontsLoaded){
    return null;
  }

  return (
    <Tab.Navigator screenOptions ={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon:({color, size}) => <MaterialCommunityIcons name = "home" color = {color} size = {size}/>
      }} />
      {/* <Tab.Screen name="Quiz" component={QuizScreen} /> */}
      {/* <Tab.Screen name="Leaderboard" component={LeaderboardScreen} /> */}
      <Tab.Screen name="Admin Login" component={LoginScreen}
      options={{
          tabBarLabel: 'Admin',
          tabBarIcon:({color, size}) => <MaterialCommunityIcons name = "account" color = {color} size = {size}/>
          }} />
      {/* <Tab.Screen name="Admin" component={AdminScreen} 
      //  options={{
      //   tabBarLabel: 'Admin',
      //   tabBarIcon:({color, size}) => <MaterialCommunityIcons name = "account-cog" color = {color} size = {size}/>
      //   }}/> */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        
        <Stack.Screen name="Timer" component={TimerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}