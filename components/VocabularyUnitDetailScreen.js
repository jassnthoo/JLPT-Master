import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation';
import CustomHeader from './CustomHeader';

export default function VocabularyUnitDetailScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('study');
  const { unit } = route.params;

  // Sample vocabulary data for the unit
  const vocabularyList = [
    {
      id: 1,
      japanese: 'たべもの',
      hiragana: 'たべもの',
      vietnamese: 'thức ăn',
      example: 'たべものを買います。',
      exampleTranslation: 'Tôi mua thức ăn.',
      learned: true
    },
    {
      id: 2,
      japanese: 'のみもの',
      hiragana: 'のみもの',
      vietnamese: 'đồ uống',
      example: 'のみものはいかがですか。',
      exampleTranslation: 'Đồ uống thì sao?',
      learned: true
    },
    {
      id: 3,
      japanese: 'みず',
      hiragana: 'みず',
      vietnamese: 'nước',
      example: 'みずを飲みます。',
      exampleTranslation: 'Tôi uống nước.',
      learned: false
    },
    {
      id: 4,
      japanese: 'おちゃ',
      hiragana: 'おちゃ',
      vietnamese: 'trà',
      example: 'おちゃが好きです。',
      exampleTranslation: 'Tôi thích trà.',
      learned: false
    },
    {
      id: 5,
      japanese: 'コーヒー',
      hiragana: 'コーヒー',
      vietnamese: 'cà phê',
      example: 'コーヒーを飲みます。',
      exampleTranslation: 'Tôi uống cà phê.',
      learned: false
    }
  ];

  const learnedCount = vocabularyList.filter(item => item.learned).length;
  const totalCount = vocabularyList.length;
  const progressPercentage = Math.round((learnedCount / totalCount) * 100);

  const renderVocabularyItem = ({ item }) => (
    <View style={styles.vocabularyCard}>
      <View style={styles.vocabularyHeader}>
        <View style={styles.vocabularyMain}>
          <Text style={styles.japaneseText}>{item.japanese}</Text>
          <Text style={styles.hiraganaText}>{item.hiragana}</Text>
        </View>
        <View style={[
          styles.statusIndicator,
          { backgroundColor: item.learned ? '#4ECDC4' : '#E0E0E0' }
        ]}>
          {item.learned && <Ionicons name="checkmark" size={16} color="white" />}
        </View>
      </View>
      
      <Text style={styles.vietnameseText}>{item.vietnamese}</Text>
      
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleJapanese}>{item.example}</Text>
        <Text style={styles.exampleVietnamese}>{item.exampleTranslation}</Text>
      </View>
    </View>
  );

  const handleStartLearning = () => {
    // Navigate to learning/practice screen
    navigation.navigate('VocabularyPractice', { unit, vocabularyList });
  };

  const handleReview = () => {
    // Navigate to review screen
    navigation.navigate('VocabularyReview', { unit, vocabularyList });
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} showBackButton={true} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Unit Info Card */}
        <View style={styles.unitInfoCard}>
          <Text style={styles.unitTitle}>{unit.title}</Text>
          <Text style={styles.unitDescription}>{unit.description}</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>
                Đã học: {learnedCount}/{totalCount} từ vựng
              </Text>
              <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progressPercentage}%` }
                ]} 
              />
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleStartLearning}
            >
              <Text style={styles.primaryButtonText}>
                {progressPercentage > 0 ? 'Tiếp tục học' : 'Bắt đầu học'}
              </Text>
            </TouchableOpacity>
            
            {progressPercentage > 0 && (
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={handleReview}
              >
                <Text style={styles.secondaryButtonText}>Ôn tập</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Vocabulary List */}
        <View style={styles.vocabularySection}>
          <Text style={styles.sectionTitle}>Danh sách từ vựng</Text>
          <FlatList
            data={vocabularyList}
            renderItem={renderVocabularyItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
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
  unitInfoCard: {
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
  unitTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  unitDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#333',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4ECDC4',
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
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#4ECDC4',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4ECDC4',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4ECDC4',
    fontSize: 16,
    fontWeight: '600',
  },
  vocabularySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  vocabularyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  vocabularyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  vocabularyMain: {
    flex: 1,
  },
  japaneseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  hiraganaText: {
    fontSize: 14,
    color: '#666',
  },
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vietnameseText: {
    fontSize: 16,
    color: '#4ECDC4',
    fontWeight: '600',
    marginBottom: 12,
  },
  exampleContainer: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
  },
  exampleJapanese: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  exampleVietnamese: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});
