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
import { PastelColors } from '../constants/colors';

export default function StudyMainScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('study');

  const studyCategories = [
    {
      id: 'vocabulary',
      title: 'Từ vựng',
      subtitle: 'Học từ vựng theo cấp độ JLPT',
      icon: 'book',
      color: PastelColors.vocabulary,
      levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
      screen: 'VocabularyLearning'
    },
    {
      id: 'kanji',
      title: 'Kanji',
      subtitle: 'Học chữ Kanji và cách đọc',
      icon: 'language',
      color: PastelColors.kanji,
      levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
      screen: 'KanjiLearning'
    },
    {
      id: 'grammar',
      title: 'Ngữ pháp',
      subtitle: 'Học ngữ pháp tiếng Nhật',
      icon: 'library',
      color: PastelColors.grammar,
      levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
      screen: 'GrammarLearning'
    },
    {
      id: 'reading',
      title: 'Đọc hiểu',
      subtitle: 'Luyện tập đọc hiểu văn bản',
      icon: 'document-text',
      color: PastelColors.reading,
      levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
      screen: 'ReadingLearning'
    },
    {
      id: 'listening',
      title: 'Nghe hiểu',
      subtitle: 'Luyện tập nghe hiểu',
      icon: 'headset',
      color: PastelColors.listening,
      levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
      screen: 'ListeningLearning'
    }
  ];

  const handleCategoryPress = (category) => {
    if (category.screen) {
      navigation.navigate(category.screen);
    }
  };

  const renderCategory = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[styles.categoryCard, { backgroundColor: category.color }]}
      onPress={() => handleCategoryPress(category)}
    >
      <View style={styles.categoryHeader}>
        <View style={styles.categoryIcon}>
          <Ionicons name={category.icon} size={24} color="white" />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
      
      <View style={styles.levelsContainer}>
        {category.levels.map((level, index) => (
          <View key={level} style={styles.levelTag}>
            <Text style={styles.levelText}>{level}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} showBackButton={false} title="Học tập" showLogo={false} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Học tập</Text>
          <Text style={styles.subtitle}>Chọn phần bạn muốn học</Text>
        </View>

        <View style={styles.categoriesContainer}>
          {studyCategories.map(renderCategory)}
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
    backgroundColor: PastelColors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  titleSection: {
    marginBottom: 25,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: PastelColors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: PastelColors.textSecondary,
  },
  categoriesContainer: {
    gap: 15,
  },
  categoryCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: PastelColors.shadowMedium,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 6,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PastelColors.textPrimary,
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
    color: PastelColors.textSecondary,
  },
  levelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  levelTag: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: PastelColors.borderLight,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: PastelColors.textPrimary,
  },
});
