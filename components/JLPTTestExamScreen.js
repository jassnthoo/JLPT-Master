import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function JLPTTestExamScreen({ navigation, route }) {
  const { level, testId } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(140 * 60); // 140 minutes in seconds
  const [currentSection, setCurrentSection] = useState('文字・語彙');

  // Sample questions data
  const questions = [
    {
      id: 1,
      type: 'audio',
      section: '聴解',
      question: '問題___の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
      audioFile: 'Câu 89',
      content: '若いころ学校で習った名前を覚えた。',
      options: ['ちいさい', 'すくない', 'わかい', 'おおきい'],
      correctAnswer: 2
    },
    {
      id: 2,
      type: 'image',
      section: '聴解',
      question: '問題___の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
      audioFile: 'Câu 90',
      images: ['1', '2', '3', '4'], // Image placeholders
      options: ['1', '2', '3', '4'],
      correctAnswer: 2
    },
    {
      id: 3,
      type: 'text',
      section: '文字・語彙',
      question: '問題___の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
      content: '若いころ学校で習った名前を覚えた。',
      options: ['ちいさい', 'すくない', 'わかい', 'おおきい'],
      correctAnswer: 2
    },
    {
      id: 4,
      type: 'text',
      section: '文字・語彙',
      question: '問題___の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
      content: '若いころ学校で習った名前を覚えた。',
      options: ['ちいさい', 'すくない', 'わかい', 'おおきい'],
      correctAnswer: 2
    },
    {
      id: 5,
      type: 'text',
      section: '文字・語彙',
      question: '問題___の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
      content: '若いころ学校で習った名前を覚えた。',
      options: ['ちいさい', 'すくない', 'わかい', 'おおきい'],
      correctAnswer: 2
    }
  ];

  const sections = ['文字・語彙', '文法・読解', '聴解'];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    Alert.alert(
      'Nộp bài thi',
      'Bạn có chắc chắn muốn nộp bài thi không?',
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Nộp bài', 
          onPress: () => {
            navigation.navigate('JLPTTestResult', { 
              level, 
              testId, 
              answers: selectedAnswers,
              questions: questions
            });
          }
        }
      ]
    );
  };

  const currentQuestion = questions[currentQuestionIndex];

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    return (
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        
        {currentQuestion.type === 'audio' && (
          <View style={styles.audioSection}>
            <Text style={styles.audioTitle}>{currentQuestion.audioFile}</Text>
            <View style={styles.audioPlayer}>
              <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play" size={16} color="#333" />
              </TouchableOpacity>
              <Text style={styles.audioTime}>0:00 / 1:23</Text>
              <View style={styles.audioProgress} />
              <TouchableOpacity style={styles.volumeButton}>
                <Ionicons name="volume-medium" size={16} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-vertical" size={16} color="#333" />
              </TouchableOpacity>
            </View>
            {currentQuestion.content && (
              <Text style={styles.questionContent}>{currentQuestion.content}</Text>
            )}
          </View>
        )}

        {currentQuestion.type === 'image' && (
          <View style={styles.imageSection}>
            <Text style={styles.audioTitle}>{currentQuestion.audioFile}</Text>
            <View style={styles.audioPlayer}>
              <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play" size={16} color="#333" />
              </TouchableOpacity>
              <Text style={styles.audioTime}>0:00 / 1:23</Text>
              <View style={styles.audioProgress} />
              <TouchableOpacity style={styles.volumeButton}>
                <Ionicons name="volume-medium" size={16} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-vertical" size={16} color="#333" />
              </TouchableOpacity>
            </View>
            <View style={styles.imageGrid}>
              {[1, 2, 3, 4].map((num) => (
                <View key={num} style={styles.imageBox}>
                  <Text style={styles.imageNumber}>{num}</Text>
                  <View style={styles.imagePlaceholder}>
                    <Ionicons name="person-circle" size={40} color="#ccc" />
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {currentQuestion.type === 'text' && currentQuestion.content && (
          <Text style={styles.questionContent}>{currentQuestion.content}</Text>
        )}

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionRow}
              onPress={() => handleAnswerSelect(currentQuestion.id, index)}
            >
              <View style={styles.optionNumber}>
                <Text style={styles.optionNumberText}>○ {index + 1}</Text>
              </View>
              <View style={[
                styles.radioButton,
                selectedAnswers[currentQuestion.id] === index && styles.radioButtonSelected
              ]}>
                {selectedAnswers[currentQuestion.id] === index && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test 1</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.timerContainer}>
        <Ionicons name="time" size={20} color="#333" />
        <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
      </View>

      <View style={styles.sectionTabs}>
        {sections.map((section) => (
          <TouchableOpacity
            key={section}
            style={[
              styles.sectionTab,
              currentSection === section && styles.activeSectionTab
            ]}
            onPress={() => setCurrentSection(section)}
          >
            <Text style={[
              styles.sectionTabText,
              currentSection === section && styles.activeSectionTabText
            ]}>
              {section}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderQuestion()}
      </ScrollView>

      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={[styles.navButton, styles.prevButton]}
          onPress={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <Text style={styles.navButtonText}>Trang trước</Text>
        </TouchableOpacity>
        
        {currentQuestionIndex === questions.length - 1 ? (
          <TouchableOpacity 
            style={[styles.navButton, styles.submitButton]}
            onPress={handleSubmitTest}
          >
            <Text style={styles.submitButtonText}>Nộp bài</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.navButton, styles.nextButton]}
            onPress={handleNextQuestion}
          >
            <Text style={styles.navButtonText}>Trang sau</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#C8E6C9',
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
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  sectionTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    marginHorizontal: 2,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeSectionTab: {
    backgroundColor: '#FF9FAD',
  },
  sectionTabText: {
    fontSize: 12,
    color: '#666',
  },
  activeSectionTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
    lineHeight: 20,
  },
  audioSection: {
    marginBottom: 20,
  },
  audioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  audioPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  playButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  audioTime: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
  audioProgress: {
    flex: 1,
    height: 2,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  volumeButton: {
    marginRight: 10,
  },
  moreButton: {},
  imageSection: {
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageBox: {
    width: '48%',
    marginBottom: 10,
  },
  imageNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  imagePlaceholder: {
    height: 80,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  questionContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
    lineHeight: 20,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  optionNumber: {
    marginRight: 10,
  },
  optionNumberText: {
    fontSize: 14,
    color: '#666',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#FF9FAD',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF9FAD',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  navigationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  prevButton: {
    backgroundColor: '#4ECDC4',
  },
  nextButton: {
    backgroundColor: '#4ECDC4',
  },
  submitButton: {
    backgroundColor: '#FF9FAD',
  },
  navButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
