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
  const [currentLanguage, setCurrentLanguage] = useState('vi'); // 'vi' for Vietnamese, 'jp' for Japanese

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

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'vi' ? 'jp' : 'vi');
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
            onPress={() => {
              if (category.title === 'Ngữ pháp') {
                navigation.navigate('GrammarLessonList', { level: level });
              } else {
                navigation.navigate('StudyDetail', { 
                  category: category.title, 
                  level: level 
                });
              }
            }}
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
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              {/* Torii Gate */}
              <View style={styles.toriiContainer}>
                <View style={styles.toriiTop} />
                <View style={styles.toriiMiddle} />
                <View style={styles.toriiPillars}>
                  <View style={styles.toriiPillar} />
                  <View style={styles.toriiPillar} />
                </View>
              </View>
              {/* Cherry Blossom */}
              <View style={styles.sakuraContainer}>
                <Text style={styles.sakura}>🌸</Text>
              </View>
              {/* App Name */}
              <Text style={styles.logoText}>JLPT Master</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={toggleLanguage}>
              {currentLanguage === 'vi' ? (
                <View style={styles.vietnamFlag}>
                  <View style={styles.flagRed} />
                  <Text style={styles.flagStar}>⭐</Text>
                </View>
              ) : (
                <View style={styles.japanFlag}>
                  <View style={styles.flagWhite} />
                  <View style={styles.flagRedCircle} />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person-circle-outline" size={28} color="#333" />
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#E8F5F5',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  toriiContainer: {
    position: 'absolute',
    top: -5,
    width: 60,
    height: 25,
  },
  toriiTop: {
    width: 60,
    height: 4,
    backgroundColor: '#FF6B9D',
    borderRadius: 2,
    marginBottom: 2,
  },
  toriiMiddle: {
    width: 50,
    height: 3,
    backgroundColor: '#FF6B9D',
    borderRadius: 1.5,
    alignSelf: 'center',
    marginBottom: 2,
  },
  toriiPillars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  toriiPillar: {
    width: 3,
    height: 15,
    backgroundColor: '#FF6B9D',
    borderRadius: 1.5,
  },
  sakuraContainer: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  sakura: {
    fontSize: 12,
  },
  logoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginTop: 18,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  vietnamFlag: {
    width: 28,
    height: 20,
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagRed: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#DA020E',
  },
  flagStar: {
    fontSize: 12,
    color: '#FFFF00',
    textAlign: 'center',
  },
  japanFlag: {
    width: 28,
    height: 20,
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagWhite: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  flagRedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#BC002D',
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
