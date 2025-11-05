import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
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
    <TouchableOpacity style={styles.resultItem}>
      <View style={styles.resultContent}>
        <View style={styles.resultLeft}>
          <Text style={styles.kanji}>{item.kanji}</Text>
        </View>
        <View style={styles.resultRight}>
          <Text style={styles.reading}>{item.reading}</Text>
          <Text style={styles.meaning}>{item.meaning}</Text>
          <Text style={styles.details}>{item.details}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Gợi ý:</Text>
          <Text style={styles.instructionsText}>
            • Nhận vào âm On, Kun để nghĩa phát âm.
          </Text>
          <Text style={styles.instructionsText}>
            • Nhận vào dấu gì trong mục phần tích để xem thành phần của Kanji.
          </Text>
          <Text style={styles.instructionsText}>
            • Nhận vào (Bộ thủ) trong mục phần tích để xem thông tin về bộ thủ.
          </Text>
        </View>

        {/* Search Suggestions */}
        {searchText && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={searchSuggestions.filter(item => 
                item.toLowerCase().includes(searchText.toLowerCase())
              )}
              renderItem={renderSearchSuggestion}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}

        {/* Search Results */}
        {searchText && (
          <View style={styles.resultsContainer}>
            <FlatList
              data={searchResults}
              renderItem={renderSearchResult}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </View>
        )}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    padding: 5,
  },
  categoryScrollContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    marginBottom: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
  },
  categoryTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
    marginRight: 4,
  },
  activeCategoryTab: {
    backgroundColor: '#4ECDC4',
  },
  categoryText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  activeCategoryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    borderRadius: 15,
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
  resultContent: {
    flexDirection: 'row',
    padding: 15,
  },
  resultLeft: {
    marginRight: 15,
    alignItems: 'center',
    minWidth: 60,
  },
  kanji: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  resultRight: {
    flex: 1,
    justifyContent: 'center',
  },
  reading: {
    fontSize: 16,
    color: '#4ECDC4',
    marginBottom: 3,
    fontWeight: 'bold',
  },
  meaning: {
    fontSize: 16,
    color: '#333',
    marginBottom: 3,
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
});
