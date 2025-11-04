import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';

import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import OTPVerificationScreen from './components/OTPVerificationScreen';
import CreateNewPasswordScreen from './components/CreateNewPasswordScreen';
import DictionaryMainScreen from './components/DictionaryMainScreen';
import VocabularyDictionaryScreen from './components/VocabularyDictionaryScreen';
import GrammarDictionaryScreen from './components/GrammarDictionaryScreen';
import KanjiDictionaryScreen from './components/KanjiDictionaryScreen';
import TranslationDictionaryScreen from './components/TranslationDictionaryScreen';
import ProfileScreen from './components/ProfileScreen';
import StudyScreen from './components/StudyScreen';
import StudyNotebookScreen from './components/StudyNotebookScreen';
import StudyDetailScreen from './components/StudyDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      try {
        setFontLoaded(true);
      } catch (error) {
        console.log('Font loading error:', error);
        setFontLoaded(true);
      }
    }
    loadFont();
  }, []);

  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF9FAD" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dictionary"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
          <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} />
          <Stack.Screen name="Dictionary" component={DictionaryMainScreen} />
          <Stack.Screen name="VocabularyDictionary" component={VocabularyDictionaryScreen} />
          <Stack.Screen name="GrammarDictionary" component={GrammarDictionaryScreen} />
          <Stack.Screen name="KanjiDictionary" component={KanjiDictionaryScreen} />
          <Stack.Screen name="TranslationDictionary" component={TranslationDictionaryScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Study" component={StudyScreen} />
          <Stack.Screen name="StudyNotebook" component={StudyNotebookScreen} />
          <Stack.Screen name="StudyDetail" component={StudyDetailScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
