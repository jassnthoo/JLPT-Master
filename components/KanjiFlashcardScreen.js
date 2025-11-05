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

export default function KanjiFlashcardScreen({ navigation, route }) {
  const { lesson } = route.params || {};
  const [activeTab, setActiveTab] = useState('study');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const kanjiCards = [
    {
      id: 1,
      kanji: '駐',
      strokeCount: 15,
      meaning: 'TRÚ',
      kunyomi: 'Kunyomi',
      onyomi: 'Onyomi',
      reading: 'シャ',
      description: 'Đỗng. Lưu lại chỗ nào cũng gọi là trú.',
      examples: ['駐車場', '駐在', '駐留']
    },
    {
      id: 2,
      kanji: '車',
      strokeCount: 7,
      meaning: 'XE',
      kunyomi: 'くるま',
      onyomi: 'シャ',
      reading: 'くるま',
      description: 'Xe cộ, phương tiện giao thông.',
      examples: ['自動車', '電車', '車両']
    },
    {
      id: 3,
      kanji: '場',
      strokeCount: 12,
      meaning: 'TRƯỜNG',
      kunyomi: 'ば',
      onyomi: 'ジョウ',
      reading: 'ば',
      description: 'Nơi chốn, địa điểm.',
      examples: ['場所', '会場', '工場']
    }
  ];

  const currentCard = kanjiCards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / kanjiCards.length) * 100;

  const handleNext = () => {
    if (currentCardIndex < kanjiCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
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
          {lesson?.title || '第1週 (1) - 駐車場'}
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
          <View style={styles.cardHeader}>
            <Text style={styles.strokeCount}>Số nét: {currentCard.strokeCount}</Text>
          </View>

          <View style={styles.kanjiContainer}>
            <Text style={styles.kanjiText}>{currentCard.kanji}</Text>
          </View>

          <View style={styles.meaningContainer}>
            <Text style={styles.meaningText}>{currentCard.meaning}</Text>
          </View>

          <View style={styles.readingContainer}>
            <View style={styles.readingTabs}>
              <TouchableOpacity style={[styles.readingTab, styles.activeReadingTab]}>
                <Text style={[styles.readingTabText, styles.activeReadingTabText]}>
                  {currentCard.kunyomi}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.readingTab}>
                <Text style={styles.readingTabText}>{currentCard.onyomi}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.readingTab}>
                <Text style={styles.readingTabText}>シャ</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.meaningSection}>
              <Text style={styles.meaningLabel}>Nghĩa</Text>
              <Text style={styles.meaningDescription}>{currentCard.description}</Text>
            </View>
          </View>

          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="volume-high" size={24} color="#FFB6C1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={24} color="#FFB6C1" />
            </TouchableOpacity>
          </View>
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
          {currentCardIndex + 1} / {kanjiCards.length}
        </Text>

        <TouchableOpacity 
          style={[styles.navButton, currentCardIndex === kanjiCards.length - 1 && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={currentCardIndex === kanjiCards.length - 1}
        >
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color={currentCardIndex === kanjiCards.length - 1 ? '#CCC' : '#666'} 
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
    padding: 20,
    minHeight: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  cardHeader: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  strokeCount: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  kanjiContainer: {
    backgroundColor: '#C8E6C9',
    borderRadius: 15,
    paddingVertical: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  kanjiText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#333',
  },
  meaningContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  meaningText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  readingContainer: {
    marginBottom: 20,
  },
  readingTabs: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 4,
    marginBottom: 15,
  },
  readingTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  activeReadingTab: {
    backgroundColor: '#4ECDC4',
  },
  readingTabText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeReadingTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  meaningSection: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 10,
  },
  meaningLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  meaningDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
