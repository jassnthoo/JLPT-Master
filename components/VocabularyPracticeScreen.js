import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation';
import CustomHeader from './CustomHeader';

export default function VocabularyPracticeScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('study');
  const { unit, vocabularyList } = route.params;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentVocab = vocabularyList[currentIndex];

  const handleNext = () => {
    if (currentIndex < vocabularyList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      // Hoàn thành practice
      navigation.goBack();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} showBackButton={true} title="Luyện tập từ vựng" showLogo={false} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentIndex + 1} / {vocabularyList.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentIndex + 1) / vocabularyList.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.vocabularyCard}>
            <Text style={styles.japaneseText}>{currentVocab.japanese}</Text>
            <Text style={styles.hiraganaText}>{currentVocab.hiragana}</Text>
            
            {showAnswer && (
              <View style={styles.answerSection}>
                <Text style={styles.vietnameseText}>{currentVocab.vietnamese}</Text>
                <View style={styles.exampleContainer}>
                  <Text style={styles.exampleJapanese}>{currentVocab.example}</Text>
                  <Text style={styles.exampleVietnamese}>{currentVocab.exampleTranslation}</Text>
                </View>
              </View>
            )}
            
            <TouchableOpacity style={styles.showAnswerButton} onPress={toggleAnswer}>
              <Text style={styles.showAnswerButtonText}>
                {showAnswer ? 'Ẩn ví dụ' : 'Hiện ví dụ'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
            onPress={handlePrevious}
            disabled={currentIndex === 0}
          >
            <Ionicons name="chevron-back" size={20} color={currentIndex === 0 ? '#ccc' : 'white'} />
            <Text style={[styles.navButtonText, currentIndex === 0 && styles.disabledText]}>
              Trước
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <Text style={styles.navButtonText}>
              {currentIndex === vocabularyList.length - 1 ? 'Hoàn thành' : 'Tiếp'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavigation 
        activeTab={activeTab} 
        onTabPress={setActiveTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  vocabularyCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    width: '100%',
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  japaneseText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  hiraganaText: {
    fontSize: 24,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  answerSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  vietnameseText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4ECDC4',
    marginBottom: 20,
    textAlign: 'center',
  },
  exampleContainer: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  exampleJapanese: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  exampleVietnamese: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  showAnswerButton: {
    backgroundColor: '#FF9FAD',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  showAnswerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ECDC4',
    paddingVertical: 15,
    borderRadius: 25,
    gap: 8,
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    color: '#ccc',
  },
});
