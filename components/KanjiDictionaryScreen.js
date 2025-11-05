import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation';

export default function KanjiDictionaryScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('vocabulary');
  const [selectedCategory, setSelectedCategory] = useState('Hán tự');
  const [currentLanguage, setCurrentLanguage] = useState('vi'); // 'vi' for Vietnamese, 'jp' for Japanese
  
  const categories = ['Từ vựng', 'Ngữ pháp', 'Hán tự', 'Dịch câu'];
  
  const searchSuggestions = [
    'nhật',
    '日本',
    'にっぽん',
    '日本化',
    '日本語',
    '日本学',
  ];

  const searchResults = [
    {
      kanji: '日本',
      reading: 'にほん',
      meaning: 'nhật bản',
      details: 'Nhận vào âm On, Kun để nghĩa phát âm.'
    },
    {
      kanji: '日本',
      reading: 'にっぽん',
      meaning: 'nhật bản',
      details: 'Nhận vào âm On, Kun để nghĩa phát âm.'
    },
    {
      kanji: '日本化',
      reading: 'にほんか',
      meaning: 'nhật bản hóa',
      details: 'Nhận vào âm On, Kun để nghĩa phát âm.'
    },
    {
      kanji: '日本語',
      reading: 'にほんご',
      meaning: 'tiếng nhật',
      details: 'Nhận vào âm On, Kun để nghĩa phát âm.'
    },
    {
      kanji: '日本学',
      reading: 'にほんがく',
      meaning: 'nhật bản học',
      details: 'Nhận vào âm On, Kun để nghĩa phát âm.'
    },
  ];

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'study') {
      navigation.navigate('Login');
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    switch (category) {
      case 'Từ vựng':
        navigation.navigate('VocabularyDictionary');
        break;
      case 'Ngữ pháp':
        navigation.navigate('GrammarDictionary');
        break;
      case 'Dịch câu':
        navigation.navigate('TranslationDictionary');
        break;
      default:
        break;
    }
  };

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'vi' ? 'jp' : 'vi');
  };

  const renderSearchSuggestion = ({ item }) => (
    <TouchableOpacity 
      style={styles.suggestionItem}
      onPress={() => setSearchText(item)}
    >
      <Text style={styles.suggestionText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderSearchResult = ({ item }) => (
    <View style={styles.resultItem}>
      <View style={styles.resultLeft}>
        <Text style={styles.kanji}>{item.kanji}</Text>
        <Text style={styles.reading}>{item.reading}</Text>
      </View>
      <View style={styles.resultRight}>
        <Text style={styles.meaning}>{item.meaning}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
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
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Ionicons name="person-circle-outline" size={28} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.headerTitle}>Tra từ điển kanji</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="日, NHẬT"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Category Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScrollContainer}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                selectedCategory === category && styles.activeCategoryTab
              ]}
              onPress={() => handleCategoryChange(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#D4F4E7',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  logoContainer: {
    alignItems: 'flex-start',
  },
  logoImage: {
    width: 80,
    height: 60,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  vietnamFlag: {
    width: 28,
    height: 20,
    backgroundColor: '#DA020E',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagRed: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DA020E',
    borderRadius: 2,
  },
  flagStar: {
    position: 'absolute',
    color: '#FFFF00',
    fontSize: 12,
  },
  japanFlag: {
    width: 28,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  flagWhite: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  flagRedCircle: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#BC002D',
    borderRadius: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    padding: 5,
  },
  categoryScrollContainer: {
    marginBottom: 10,
  },
  categoryContainer: {
    paddingHorizontal: 0,
  },
  categoryTab: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  activeCategoryTab: {
    backgroundColor: 'white',
    borderColor: '#4ECDC4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#4ECDC4',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  instructionsContainer: {
    padding: 20,
    backgroundColor: '#F8F9FA',
    margin: 20,
    borderRadius: 15,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
  suggestionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  suggestionItem: {
    backgroundColor: '#E8F5F5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 10,
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
  resultsContainer: {
    paddingHorizontal: 20,
  },
  resultItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultLeft: {
    marginRight: 15,
    alignItems: 'center',
  },
  kanji: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  reading: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: 'bold',
  },
  resultRight: {
    flex: 1,
  },
  meaning: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});
