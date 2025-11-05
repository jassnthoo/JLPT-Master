import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation';

const { width } = Dimensions.get('window');

export default function ListeningLessonDetailScreen({ navigation, route }) {
  const { lesson } = route.params || {};
  const [activeTab, setActiveTab] = useState('practice');
  const [currentSection, setCurrentSection] = useState('audio');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(150);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const scriptText = `Mỗi khi tông cảm thấy bồn bề và mệt mỏi, tôi thường tìm về với vòng tay dịu dàng của thiên nhiên. Không gian xanh mướt của cánh đồng lúa, tiếng suối chảy róc rách trong veo, hay sự hùng vĩ lặng lẽ của những rặng núi xa xa luôn có một sức mạnh chữa lành phi thường. Ở đó, không có sự ồn ào của cuộc sống hiện đại, chỉ có nhịp điệu chậm rãi, thanh bình của gió, của cây cỏ.`;

  const vocabulary = [
    {
      id: 1,
      japanese: 'はじめまして',
      reading: 'hajimemashite',
      meaning: 'Xin chào (lần đầu gặp)'
    },
    {
      id: 2,
      japanese: '申します',
      reading: 'moushimasu',
      meaning: 'Tôi là (kính ngữ)'
    },
    {
      id: 3,
      japanese: 'よろしくお願いします',
      reading: 'yoroshiku onegaishimasu',
      meaning: 'Rất hân hạnh'
    },
    {
      id: 4,
      japanese: '〜から来ました',
      reading: 'kara kimashita',
      meaning: 'Ngại pháp'
    }
  ];

  const questions = [
    {
      id: 1,
      question: '若いとき学中で星座の名前を覚えた。',
      options: ['ちいさい', 'すくない', 'わかい', 'おさない'],
      correctAnswer: 2
    },
    {
      id: 2,
      question: '若いとき学中で星座の名前を覚えた。',
      options: ['ちいさい', 'すくない', 'わかい', 'おさない'],
      correctAnswer: 2
    },
    {
      id: 3,
      question: '若いとき学中で星座の名前を覚えた。',
      options: ['ちいさい', 'すくない', 'わかい', 'おさない'],
      correctAnswer: 2
    },
    {
      id: 4,
      question: '若いとき学中で星座の名前を覚えた。',
      options: ['ちいさい', 'すくない', 'わかい', 'おさない'],
      correctAnswer: 2
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const renderAudioSection = () => (
    <View style={styles.sectionContent}>
      <View style={styles.audioPlayerContainer}>
        <View style={styles.audioHeader}>
          <Ionicons name="headset" size={24} color="#4ECDC4" />
          <Text style={styles.audioTitle}>Nghe đoạn hội thoại</Text>
        </View>
        
        <View style={styles.audioControls}>
          <View style={styles.timeDisplay}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>/</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(currentTime / duration) * 100}%` }
                ]} 
              />
            </View>
          </View>
          
          <View style={styles.controlButtons}>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="play-skip-back" size={24} color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.playButton}
              onPress={handlePlayPause}
            >
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={32} 
                color="white" 
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="play-skip-forward" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.volumeButton}>
            <Ionicons name="volume-high" size={24} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderScriptSection = () => (
    <View style={styles.sectionContent}>
      <View style={styles.scriptContainer}>
        <View style={styles.scriptHeader}>
          <Ionicons name="document-text" size={24} color="#4ECDC4" />
          <Text style={styles.sectionTitle}>Script</Text>
          <TouchableOpacity style={styles.eyeButton}>
            <Ionicons name="eye" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scriptScrollView}>
          <Text style={styles.scriptText}>{scriptText}</Text>
        </ScrollView>
      </View>
    </View>
  );

  const renderVocabularySection = () => (
    <View style={styles.sectionContent}>
      <View style={styles.vocabularyContainer}>
        <View style={styles.vocabularyHeader}>
          <Ionicons name="book" size={24} color="#4ECDC4" />
          <Text style={styles.sectionTitle}>Từ vựng</Text>
          <TouchableOpacity style={styles.eyeButton}>
            <Ionicons name="eye" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.vocabularyScrollView}>
          {vocabulary.map((item) => (
            <View key={item.id} style={styles.vocabularyItem}>
              <Text style={styles.vocabularyNumber}>{item.id}.</Text>
              <View style={styles.vocabularyContent}>
                <Text style={styles.vocabularyJapanese}>{item.japanese}</Text>
                <Text style={styles.vocabularyReading}>{item.reading}</Text>
                <Text style={styles.vocabularyMeaning}>{item.meaning}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  const renderQuizSection = () => (
    <View style={styles.sectionContent}>
      <View style={styles.quizContainer}>
        <View style={styles.quizHeader}>
          <Ionicons name="help-circle" size={24} color="#4ECDC4" />
          <Text style={styles.sectionTitle}>Câu hỏi</Text>
        </View>
        <ScrollView style={styles.quizScrollView}>
          {questions.map((question) => (
            <View key={question.id} style={styles.questionContainer}>
              <Text style={styles.questionText}>
                Câu {question.id}: {question.question}
              </Text>
              
              <View style={styles.optionsContainer}>
                {question.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedAnswers[question.id] === index && styles.selectedOption
                    ]}
                    onPress={() => handleAnswerSelect(question.id, index)}
                  >
                    <View style={[
                      styles.optionCircle,
                      selectedAnswers[question.id] === index && styles.selectedCircle
                    ]}>
                      {selectedAnswers[question.id] === index && (
                        <View style={styles.selectedDot} />
                      )}
                    </View>
                    <Text style={[
                      styles.optionText,
                      selectedAnswers[question.id] === index && styles.selectedOptionText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <View style={styles.answerNumbers}>
                {[1, 2, 3, 4].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.answerNumber,
                      selectedAnswers[question.id] === num - 1 && styles.selectedAnswerNumber
                    ]}
                    onPress={() => handleAnswerSelect(question.id, num - 1)}
                  >
                    <Text style={[
                      styles.answerNumberText,
                      selectedAnswers[question.id] === num - 1 && styles.selectedAnswerNumberText
                    ]}>
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (currentSection) {
      case 'audio':
        return renderAudioSection();
      case 'script':
        return renderScriptSection();
      case 'vocabulary':
        return renderVocabularySection();
      case 'quiz':
        return renderQuizSection();
      default:
        return renderAudioSection();
    }
  };

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
        <Text style={styles.headerTitle}>
          {lesson?.title || 'Bài 1: Giới thiệu bản thân'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Section Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, currentSection === 'audio' && styles.activeTab]}
          onPress={() => setCurrentSection('audio')}
        >
          <Ionicons 
            name="headset" 
            size={20} 
            color={currentSection === 'audio' ? '#4ECDC4' : '#666'} 
          />
          <Text style={[
            styles.tabText, 
            currentSection === 'audio' && styles.activeTabText
          ]}>
            Nghe đoạn hội thoại
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, currentSection === 'script' && styles.activeTab]}
          onPress={() => setCurrentSection('script')}
        >
          <Ionicons 
            name="document-text" 
            size={20} 
            color={currentSection === 'script' ? '#4ECDC4' : '#666'} 
          />
          <Text style={[
            styles.tabText, 
            currentSection === 'script' && styles.activeTabText
          ]}>
            Script
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, currentSection === 'vocabulary' && styles.activeTab]}
          onPress={() => setCurrentSection('vocabulary')}
        >
          <Ionicons 
            name="book" 
            size={20} 
            color={currentSection === 'vocabulary' ? '#4ECDC4' : '#666'} 
          />
          <Text style={[
            styles.tabText, 
            currentSection === 'vocabulary' && styles.activeTabText
          ]}>
            Từ vựng
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, currentSection === 'quiz' && styles.activeTab]}
          onPress={() => setCurrentSection('quiz')}
        >
          <Ionicons 
            name="help-circle" 
            size={20} 
            color={currentSection === 'quiz' ? '#4ECDC4' : '#666'} 
          />
          <Text style={[
            styles.tabText, 
            currentSection === 'quiz' && styles.activeTabText
          ]}>
            Câu hỏi
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* Bottom Navigation */}
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
    backgroundColor: '#C8E6C9',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  placeholder: {
    width: 34,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#F0F9FF',
  },
  tabText: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  activeTabText: {
    color: '#4ECDC4',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  sectionContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  // Audio Player Styles
  audioPlayerContainer: {
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
  audioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  audioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  audioControls: {
    alignItems: 'center',
  },
  timeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  timeText: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 5,
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 2,
  },
  controlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlButton: {
    padding: 10,
    marginHorizontal: 20,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeButton: {
    position: 'absolute',
    right: 40,
    top: 15,
  },
  moreButton: {
    position: 'absolute',
    right: 0,
    top: 15,
  },

  // Script Styles
  scriptContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scriptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  eyeButton: {
    padding: 5,
  },
  scriptScrollView: {
    flex: 1,
  },
  scriptText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },

  // Vocabulary Styles
  vocabularyContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  vocabularyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  vocabularyScrollView: {
    flex: 1,
  },
  vocabularyItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  vocabularyNumber: {
    fontSize: 16,
    color: '#666',
    marginRight: 15,
    width: 20,
  },
  vocabularyContent: {
    flex: 1,
  },
  vocabularyJapanese: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  vocabularyReading: {
    fontSize: 14,
    color: '#4ECDC4',
    marginBottom: 2,
  },
  vocabularyMeaning: {
    fontSize: 14,
    color: '#666',
  },

  // Quiz Styles
  quizContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  quizScrollView: {
    flex: 1,
  },
  questionContainer: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  questionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    lineHeight: 22,
  },
  optionsContainer: {
    marginBottom: 15,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: '#F8F9FA',
  },
  selectedOption: {
    backgroundColor: '#E8F5E8',
  },
  optionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    borderColor: '#4ECDC4',
  },
  selectedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4ECDC4',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedOptionText: {
    color: '#4ECDC4',
    fontWeight: 'bold',
  },
  answerNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  answerNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedAnswerNumber: {
    backgroundColor: '#4ECDC4',
  },
  answerNumberText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  selectedAnswerNumberText: {
    color: 'white',
  },
});
