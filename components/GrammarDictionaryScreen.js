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

export default function GrammarDictionaryScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('vocabulary');
  const [selectedCategory, setSelectedCategory] = useState('Ngữ pháp');
  
  const categories = ['Từ vựng', 'Ngữ pháp', 'Hán tự', 'Dịch câu'];
  
  const searchSuggestions = [
    'youni',
    'ように',
    'よう',
    'ようになる',
    'ようにする',
  ];

  const searchResults = [
    {
      pattern: 'ように',
      reading: 'N3',
      meaning: 'Hãy làm... /Đừng làm...',
      example: 'よう に',
      translation: 'Như/Theo như...'
    },
    {
      pattern: 'ように',
      reading: 'N3', 
      meaning: 'Như/Theo như...',
      example: 'よう に',
      translation: 'Như/Theo như...'
    },
    {
      pattern: 'ように',
      reading: 'N4',
      meaning: 'Để/để tránh',
      example: 'よう に',
      translation: 'Để/để tránh'
    },
    {
      pattern: 'ようになる・ようにしている',
      reading: 'N4',
      meaning: 'Chức năng làm... có gắng làm...',
      example: 'よう に なる・よう に して いる',
      translation: 'Chức năng làm... có gắng làm...'
    },
    {
      pattern: 'ようになている',
      reading: 'N4',
      meaning: 'Được đề',
      example: 'よう に なて いる',
      translation: 'Được đề'
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
      case 'Hán tự':
        navigation.navigate('KanjiDictionary');
        break;
      case 'Dịch câu':
        navigation.navigate('TranslationDictionary');
        break;
      default:
        break;
    }
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
          <Text style={styles.pattern}>{item.pattern}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{item.reading}</Text>
          </View>
        </View>
        <View style={styles.resultRight}>
          <Text style={styles.meaning}>{item.meaning}</Text>
          <Text style={styles.example}>{item.example}</Text>
          <Text style={styles.translation}>{item.translation}</Text>
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
        
        <Text style={styles.headerTitle}>Tra từ điển ngữ pháp</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="ように"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Category Tabs */}
        <View style={styles.categoryContainer}>
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
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Gợi ý:</Text>
          <Text style={styles.instructionsText}>
            • Bạn chỉ cần gõ ngữ pháp để thực hiện tìm kiếm nhanh.
          </Text>
          <Text style={styles.instructionsText}>
            • Ngữ pháp sẽ được tìm kiếm tức thì, phần nội dung tìm thấy sẽ được bôi vàng.
          </Text>
          <Text style={styles.instructionsText}>
            • Nhấn vào ngữ pháp để xem thông tin chi tiết.
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
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 4,
  },
  categoryTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeCategoryTab: {
    backgroundColor: '#4ECDC4',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
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
    alignItems: 'flex-start',
    minWidth: 100,
  },
  pattern: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  levelBadge: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  levelText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  resultRight: {
    flex: 1,
    justifyContent: 'center',
  },
  meaning: {
    fontSize: 16,
    color: '#333',
    marginBottom: 3,
  },
  example: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  translation: {
    fontSize: 14,
    color: '#888',
  },
});
