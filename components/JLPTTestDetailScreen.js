import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation';

export default function JLPTTestDetailScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('practice');
  const { level } = route.params;

  // Sample test data - you can replace this with real data from your backend
  const testData = {
    N5: [
      { id: 1, name: 'Test 1', duration: 140, score: 95, maxScore: 180, completed: true },
      { id: 2, name: 'Test 2', duration: 140, score: null, maxScore: 180, completed: false },
      { id: 3, name: 'Test 3', duration: 140, score: null, maxScore: 180, completed: false },
    ],
    N4: [
      { id: 1, name: 'Test 1', duration: 155, score: 88, maxScore: 180, completed: true },
      { id: 2, name: 'Test 2', duration: 155, score: null, maxScore: 180, completed: false },
      { id: 3, name: 'Test 3', duration: 155, score: null, maxScore: 180, completed: false },
    ],
    N3: [
      { id: 1, name: 'Test 1', duration: 170, score: 92, maxScore: 180, completed: true },
      { id: 2, name: 'Test 2', duration: 170, score: null, maxScore: 180, completed: false },
      { id: 3, name: 'Test 3', duration: 170, score: null, maxScore: 180, completed: false },
    ],
    N2: [
      { id: 1, name: 'Test 1', duration: 185, score: 78, maxScore: 180, completed: true },
      { id: 2, name: 'Test 2', duration: 185, score: null, maxScore: 180, completed: false },
      { id: 3, name: 'Test 3', duration: 185, score: null, maxScore: 180, completed: false },
    ],
    N1: [
      { id: 1, name: 'Test 1', duration: 200, score: 85, maxScore: 180, completed: true },
      { id: 2, name: 'Test 2', duration: 200, score: null, maxScore: 180, completed: false },
      { id: 3, name: 'Test 3', duration: 200, score: null, maxScore: 180, completed: false },
    ],
  };

  const tests = testData[level] || [];

  const getLevelColor = (level) => {
    const colors = {
      N5: { bg: '#FFE4E6', text: '#FF6B6B' },
      N4: { bg: '#FFF4E6', text: '#FF8C42' },
      N3: { bg: '#E8F5E8', text: '#4ECDC4' },
      N2: { bg: '#E6F3FF', text: '#4A90E2' },
      N1: { bg: '#F0E6FF', text: '#9B59B6' },
    };
    return colors[level] || colors.N5;
  };

  const levelColors = getLevelColor(level);

  const handleStartTest = (test) => {
    navigation.navigate('JLPTTestExam', { level, testId: test.id });
  };

  const handleViewResult = (test) => {
    // Sample data for viewing results
    const sampleAnswers = { 1: 2, 2: 1, 3: 2, 4: 2, 5: 2 };
    const sampleQuestions = [
      { id: 1, section: '聴解', correctAnswer: 2 },
      { id: 2, section: '聴解', correctAnswer: 2 },
      { id: 3, section: '文字・語彙', correctAnswer: 2 },
      { id: 4, section: '文字・語彙', correctAnswer: 2 },
      { id: 5, section: '文字・語彙', correctAnswer: 2 }
    ];
    navigation.navigate('JLPTTestResult', { 
      level, 
      testId: test.id, 
      answers: sampleAnswers,
      questions: sampleQuestions
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: levelColors.bg }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thi thử JLPT</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.levelHeader}>
          <Text style={styles.levelTitle}>Thi thử JLPT / JLPT {level}</Text>
        </View>

        <View style={styles.testsContainer}>
          {tests.map((test) => (
            <View key={test.id} style={styles.testCard}>
              <View style={styles.testHeader}>
                <Text style={styles.testName}>{test.name}</Text>
              </View>
              
              <View style={styles.testInfo}>
                <View style={styles.infoRow}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.infoText}>Thời gian:</Text>
                  <Text style={styles.infoValue}>{test.duration} phút</Text>
                </View>
                
                {test.completed && test.score !== null && (
                  <View style={styles.infoRow}>
                    <Ionicons name="trophy-outline" size={16} color="#666" />
                    <Text style={styles.infoText}>Điểm:</Text>
                    <Text style={styles.infoValue}>{test.score}/{test.maxScore}</Text>
                  </View>
                )}
              </View>

              <View style={styles.buttonContainer}>
                {test.completed ? (
                  <>
                    <TouchableOpacity 
                      style={[styles.button, styles.retakeButton]}
                      onPress={() => handleStartTest(test)}
                    >
                      <Text style={styles.retakeButtonText}>Làm lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.button, styles.resultButton]}
                      onPress={() => handleViewResult(test)}
                    >
                      <Text style={styles.resultButtonText}>Xem kết quả</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity 
                    style={[styles.button, styles.startButton]}
                    onPress={() => handleStartTest(test)}
                  >
                    <Text style={styles.startButtonText}>Bắt đầu làm</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNavigation 
        activeTab={activeTab} 
        onTabPress={setActiveTab}
      />
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  levelHeader: {
    marginBottom: 20,
  },
  levelTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  testsContainer: {
    gap: 15,
  },
  testCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  testHeader: {
    marginBottom: 15,
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  testInfo: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#FF9FAD',
  },
  startButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  retakeButton: {
    backgroundColor: '#FF9FAD',
  },
  retakeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  resultButton: {
    backgroundColor: '#4ECDC4',
  },
  resultButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
