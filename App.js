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
import StudyMainScreen from './components/StudyMainScreen';
import StudyNotebookScreen from './components/StudyNotebookScreen';
import StudyDetailScreen from './components/StudyDetailScreen';
import ListeningMainScreen from './components/ListeningMainScreen';
import ListeningLessonDetailScreen from './components/ListeningLessonDetailScreen';
import PronunciationPracticeScreen from './components/PronunciationPracticeScreen';
import PronunciationResultScreen from './components/PronunciationResultScreen';
import ChatbotScreen from './components/ChatbotScreen';
import SupportMenuScreen from './components/SupportMenuScreen';
import JLPTTestScreen from './components/JLPTTestScreen';
import JLPTTestDetailScreen from './components/JLPTTestDetailScreen';
import JLPTTestExamScreen from './components/JLPTTestExamScreen';
import JLPTTestResultScreen from './components/JLPTTestResultScreen';
import JLPTTestSummaryScreen from './components/JLPTTestSummaryScreen';
import VocabularyMainScreen from './components/VocabularyMainScreen';
import VocabularyLearningScreen from './components/VocabularyLearningScreen';
import VocabularyUnitDetailScreen from './components/VocabularyUnitDetailScreen';
import VocabularyPracticeScreen from './components/VocabularyPracticeScreen';
import KanjiLearningScreen from './components/KanjiLearningScreen';
import GrammarLearningScreen from './components/GrammarLearningScreen';
import ReadingLearningScreen from './components/ReadingLearningScreen';
import ListeningLearningScreen from './components/ListeningLearningScreen';
import KanjiMainScreen from './components/KanjiMainScreen';
import VocabularyFlashcardScreen from './components/VocabularyFlashcardScreen';
import KanjiFlashcardScreen from './components/KanjiFlashcardScreen';
import ReadingComprehensionScreen from './components/ReadingComprehensionScreen';

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
          initialRouteName="StudyMain"
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
          <Stack.Screen name="StudyMain" component={StudyMainScreen} />
          <Stack.Screen name="StudyNotebook" component={StudyNotebookScreen} />
          <Stack.Screen name="StudyDetail" component={StudyDetailScreen} />
          <Stack.Screen name="ListeningMain" component={ListeningMainScreen} />
          <Stack.Screen name="ListeningLessonDetail" component={ListeningLessonDetailScreen} />
          <Stack.Screen name="PronunciationPractice" component={PronunciationPracticeScreen} />
          <Stack.Screen name="PronunciationResult" component={PronunciationResultScreen} />
          <Stack.Screen name="Chatbot" component={ChatbotScreen} />
          <Stack.Screen name="SupportMenu" component={SupportMenuScreen} />
          <Stack.Screen name="JLPTTest" component={JLPTTestScreen} />
          <Stack.Screen name="JLPTTestDetail" component={JLPTTestDetailScreen} />
          <Stack.Screen name="JLPTTestExam" component={JLPTTestExamScreen} />
          <Stack.Screen name="JLPTTestResult" component={JLPTTestResultScreen} />
          <Stack.Screen name="JLPTTestSummary" component={JLPTTestSummaryScreen} />
          <Stack.Screen name="VocabularyMain" component={VocabularyMainScreen} />
          <Stack.Screen name="VocabularyLearning" component={VocabularyLearningScreen} />
          <Stack.Screen name="VocabularyUnitDetail" component={VocabularyUnitDetailScreen} />
          <Stack.Screen name="VocabularyPractice" component={VocabularyPracticeScreen} />
          <Stack.Screen name="KanjiLearning" component={KanjiLearningScreen} />
          <Stack.Screen name="GrammarLearning" component={GrammarLearningScreen} />
          <Stack.Screen name="ReadingLearning" component={ReadingLearningScreen} />
          <Stack.Screen name="ListeningLearning" component={ListeningLearningScreen} />
          <Stack.Screen name="KanjiMain" component={KanjiMainScreen} />
          <Stack.Screen name="VocabularyFlashcard" component={VocabularyFlashcardScreen} />
          <Stack.Screen name="KanjiFlashcard" component={KanjiFlashcardScreen} />
          <Stack.Screen name="ReadingComprehension" component={ReadingComprehensionScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
