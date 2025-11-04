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

export default function StudyScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('study');

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

  const studyCategories = [
    {
      title: 'Từ vựng',
      icon: 'book',
      color: '#FF9FAD',
      levels: ['N5', 'N4', 'N3', 'N2', 'N1']
    },
    {
      title: 'Kanji',
      icon: 'language',
      color: '#4ECDC4',
      levels: ['N5', 'N4', 'N3', 'N2', 'N1']
    },
    {
      title: 'Ngữ pháp',
      icon: 'library',
      color: '#9B59B6',
      levels: ['N5', 'N4', 'N3', 'N2', 'N1']
    },
    {
      title: 'Đọc hiểu',
      icon: 'document-text',
      color: '#F39C12',
      levels: ['N5', 'N4', 'N3', 'N2', 'N1']
    },
    {
      title: 'Nghe hiểu',
      icon: 'headset',
      color: '#3498DB',
      levels: ['N5', 'N4', 'N3', 'N2', 'N1']
    }
  ];

  const renderCategory = (category, index) => (
    <View key={index} style={styles.categorySection}>
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
          <Ionicons name={category.icon} size={20} color="white" />
        </View>
        <Text style={styles.categoryTitle}>{category.title}</Text>
      </View>
      
      <View style={styles.levelsContainer}>
        {category.levels.map((level, levelIndex) => (
          <TouchableOpacity 
            key={levelIndex} 
            style={[styles.levelButton, { backgroundColor: category.color }]}
            onPress={() => navigation.navigate('StudyDetail', { 
              category: category.title, 
              level: level 
            })}
          >
            <Text style={styles.levelButtonText}>{category.title} {level}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>JLPT Master</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="logo-youtube" size={24} color="#FF0000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person-circle-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.titleContainer}>
          <Ionicons name="school" size={24} color="#4ECDC4" />
          <Text style={styles.mainTitle}>Học tập</Text>
        </View>

        {studyCategories.map((category, index) => renderCategory(category, index))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#E8F5F5',
  },
  logoContainer: {
    flex: 1,
  },
  logoPlaceholder: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4ECDC4',
    borderRadius: 8,
  },
  logoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  categorySection: {
    backgroundColor: 'white',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  levelsContainer: {
    marginBottom: 10,
  },
  levelButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  levelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
