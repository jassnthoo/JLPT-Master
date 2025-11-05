import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation';

const { width } = Dimensions.get('window');

export default function VocabularyFlashcardScreen({ navigation, route }) {
  const { lesson } = route.params || {};
  const [activeTab, setActiveTab] = useState('study');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const vocabularyCards = [
    {
      id: 1,
      japanese: 'だんせい',
      kanji: '男性',
      reading: 'dansei',
      meaning: 'NAM TÍNH',
      vietnamese: 'nam giới, đàn ông',
      example: '理想の男性と結婚する。',
      exampleVietnamese: 'Kết hôn với người đàn ông lý tưởng.'
    },
    {
      id: 2,
      japanese: 'じょせい',
      kanji: '女性',
      reading: 'josei',
      meaning: 'NỮ TÍNH',
      vietnamese: 'nữ giới, phụ nữ',
      example: '彼女は美しい女性です。',
      exampleVietnamese: 'Cô ấy là một người phụ nữ xinh đẹp.'
    },
    {
      id: 3,
      japanese: 'がくせい',
      kanji: '学生',
      reading: 'gakusei',
      meaning: 'HỌC SINH',
      vietnamese: 'học sinh, sinh viên',
      example: '私は大学の学生です。',
      exampleVietnamese: 'Tôi là sinh viên đại học.'
    }
  ];

  const currentCard = vocabularyCards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / vocabularyCards.length) * 100;

  const handleNext = () => {
    if (currentCardIndex < vocabularyCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowMeaning(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowMeaning(false);
    }
  };

  const toggleMeaning = () => {
    setShowMeaning(!showMeaning);
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
        <Text style={styles.headerTitle}>
          {lesson?.title || 'Unit 01 - Bài 1'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.progressIcon}>
          <Ionicons name="school" size={20} color="#4ECDC4" />
        </View>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.flashcard}>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="volume-high" size={24} color="#FFB6C1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={24} color="#FFB6C1" />
            </TouchableOpacity>
          </View>

          {!showMeaning ? (
            <View style={styles.cardContent}>
              <Text style={styles.readingText}>{currentCard.japanese}</Text>
              <Text style={styles.kanjiText}>{currentCard.kanji}</Text>
            </View>
          ) : (
            <View style={styles.cardContent}>
              <Text style={styles.meaningTitle}>{currentCard.meaning}</Text>
              <Text style={styles.meaningSubtitle}>{currentCard.vietnamese}</Text>
              <View style={styles.exampleContainer}>
                <Text style={styles.exampleJapanese}>{currentCard.example}</Text>
                <Text style={styles.exampleVietnamese}>{currentCard.exampleVietnamese}</Text>
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.flipIcon} onPress={toggleMeaning}>
            <Ionicons name="refresh" size={20} color="#FFB6C1" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={[styles.navButton, currentCardIndex === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentCardIndex === 0}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={currentCardIndex === 0 ? '#CCC' : '#666'} 
          />
        </TouchableOpacity>

        <Text style={styles.cardCounter}>
          {currentCardIndex + 1} / {vocabularyCards.length}
        </Text>

        <TouchableOpacity 
          style={[styles.navButton, currentCardIndex === vocabularyCards.length - 1 && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={currentCardIndex === vocabularyCards.length - 1}
        >
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color={currentCardIndex === vocabularyCards.length - 1 ? '#CCC' : '#666'} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Tiếp tục</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Bỏ qua từ này</Text>
        </TouchableOpacity>
      </View>

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
  },
  placeholder: {
    width: 34,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
  },
  progressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  flashcard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    minHeight: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    position: 'relative',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  readingText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 10,
  },
  kanjiText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  meaningTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  meaningSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  exampleContainer: {
    alignItems: 'center',
  },
  exampleJapanese: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  exampleVietnamese: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  flipIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navButtonDisabled: {
    backgroundColor: '#F5F5F5',
  },
  cardCounter: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
  continueButton: {
    backgroundColor: '#FFB6C1',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 14,
  },
});
