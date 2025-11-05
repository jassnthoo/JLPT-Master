import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation';

export default function GrammarPracticeScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('study');
  const [selectedTab, setSelectedTab] = useState('practice');
  const { lessonId = 1, lessonTitle = 'Ngữ pháp N5' } = route.params || {};

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    switch (tabId) {
      case 'vocabulary':
        navigation.navigate('VocabularyDictionary');
        break;
      case 'profile':
        navigation.navigate('Profile');
        break;
      default:
        break;
    }
  };

  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: '問題1～5 の文について、あとの1・2・3・4の中からいちばんいいものを一つ選びなさい。',
      subQuestions: [
        {
          id: '1-1',
          text: '問1 わたしは がくせい＿＿。',
          options: ['です', 'ではありません', 'でした', 'じゃありませんでした'],
          correctAnswer: 0
        },
        {
          id: '1-2',
          text: '問2 わたしは がくせい＿＿。',
          options: ['です', 'ではありません', 'でした', 'じゃありませんでした'],
          correctAnswer: 1
        },
        {
          id: '1-3',
          text: '問3 わたしは がくせい＿＿。',
          options: ['です', 'ではありません', 'でした', 'じゃありませんでした'],
          correctAnswer: 2
        },
        {
          id: '1-4',
          text: '問4 わたしは がくせい＿＿。',
          options: ['です', 'ではありません', 'でした', 'じゃありませんでした'],
          correctAnswer: 1
        }
      ]
    }
  ];

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex
    });
  };

  const renderSubQuestion = (subQuestion, index) => (
    <View key={subQuestion.id} style={styles.subQuestionContainer}>
      <Text style={styles.subQuestionText}>{subQuestion.text}</Text>
      <View style={styles.optionsContainer}>
        {subQuestion.options.map((option, optionIndex) => (
          <TouchableOpacity
            key={optionIndex}
            style={[
              styles.optionButton,
              answers[subQuestion.id] === optionIndex && styles.selectedOption
            ]}
            onPress={() => handleAnswerSelect(subQuestion.id, optionIndex)}
          >
            <View style={[
              styles.optionCircle,
              answers[subQuestion.id] === optionIndex && styles.selectedCircle
            ]}>
              <Text style={[
                styles.optionNumber,
                answers[subQuestion.id] === optionIndex && styles.selectedOptionNumber
              ]}>
                {optionIndex + 1}
              </Text>
            </View>
            <Text style={[
              styles.optionText,
              answers[subQuestion.id] === optionIndex && styles.selectedOptionText
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderQuestion = (question) => (
    <View key={question.id} style={styles.questionCard}>
      <Text style={styles.questionInstruction}>{question.question}</Text>
      {question.subQuestions.map(renderSubQuestion)}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{lessonTitle}</Text>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            selectedTab === 'grammar' && styles.activeTab
          ]}
          onPress={() => {
            setSelectedTab('grammar');
            navigation.goBack();
          }}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'grammar' && styles.activeTabText
          ]}>
            Ngữ pháp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab, 
            selectedTab === 'practice' && styles.activeTab
          ]}
          onPress={() => setSelectedTab('practice')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'practice' && styles.activeTabText
          ]}>
            Luyện tập
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.practiceContainer}>
          {questions.map(renderQuestion)}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#E8F5F5',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#FF9FAD',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  practiceContainer: {
    padding: 20,
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  questionInstruction: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 20,
  },
  subQuestionContainer: {
    marginBottom: 25,
  },
  subQuestionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 15,
  },
  optionsContainer: {
    
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  selectedOption: {
    backgroundColor: '#E3F2FD',
  },
  optionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: 'white',
  },
  selectedCircle: {
    borderColor: '#2196F3',
    backgroundColor: '#2196F3',
  },
  optionNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  selectedOptionNumber: {
    color: 'white',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedOptionText: {
    color: '#2196F3',
    fontWeight: '500',
  },
});
