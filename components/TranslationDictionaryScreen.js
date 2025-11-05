import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation';

export default function TranslationDictionaryScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('vocabulary');
  const [selectedCategory, setSelectedCategory] = useState('Dịch câu');
  const [translationResult, setTranslationResult] = useState('');
  const [isTranslated, setIsTranslated] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('vi'); // 'vi' for Vietnamese, 'jp' for Japanese
  
  const categories = ['Từ vựng', 'Ngữ pháp', 'Hán tự', 'Dịch câu'];

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
      case 'Hán tự':
        navigation.navigate('KanjiDictionary');
        break;
      default:
        break;
    }
  };

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'vi' ? 'jp' : 'vi');
  };

  const handleTranslate = () => {
    if (searchText.trim()) {
      if (searchText.includes('私はベトナム人です')) {
        setTranslationResult('Tôi là người Việt Nam');
      } else if (searchText.includes('わたし')) {
        setTranslationResult('Tôi là người Việt Nam');
      } else {
        setTranslationResult('Bản dịch sẽ xuất hiện ở đây');
      }
      setIsTranslated(true);
    }
  };

  const swapLanguages = () => {
    const temp = searchText;
    setSearchText(translationResult);
    setTranslationResult(temp);
  };

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
        
        <Text style={styles.headerTitle}>Tra từ điển dịch câu</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="日本語は面白いです。"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleTranslate}>
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
        {/* Language Selector */}
        <View style={styles.languageContainer}>
          <View style={styles.languageSelector}>
            <View style={styles.languageItem}>
              <Ionicons name="flag" size={16} color="#4ECDC4" />
              <Text style={styles.languageText}>Tiếng Nhật</Text>
            </View>
            
            <TouchableOpacity style={styles.swapButton} onPress={swapLanguages}>
              <Ionicons name="swap-horizontal" size={24} color="#4ECDC4" />
            </TouchableOpacity>
            
            <View style={styles.languageItem}>
              <Ionicons name="flag" size={16} color="#FF6B6B" />
              <Text style={styles.languageText}>Tiếng Việt</Text>
            </View>
          </View>
        </View>

        {/* Translation Result */}
        {isTranslated && (
          <View style={styles.translationContainer}>
            <View style={styles.translationHeader}>
              <Ionicons name="checkmark-circle" size={20} color="#4ECDC4" />
              <Text style={styles.translationTitle}>Phát hiện ngôn ngữ</Text>
            </View>
            
            <View style={styles.translationContent}>
              <Text style={styles.originalText}>{searchText}</Text>
              <View style={styles.divider} />
              <Text style={styles.translatedText}>{translationResult}</Text>
            </View>
            
            <View style={styles.translationActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="volume-high" size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="copy" size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="share" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Translation Details */}
        {isTranslated && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>わたし は ベトナム人 です。</Text>
            <Text style={styles.detailsSubtitle}>Tôi là người Việt Nam</Text>
            
            <View style={styles.wordBreakdown}>
              <View style={styles.wordItem}>
                <Text style={styles.wordJapanese}>わたし</Text>
                <Text style={styles.wordVietnamese}>Tôi</Text>
              </View>
              <View style={styles.wordItem}>
                <Text style={styles.wordJapanese}>は</Text>
                <Text style={styles.wordVietnamese}>là</Text>
              </View>
              <View style={styles.wordItem}>
                <Text style={styles.wordJapanese}>ベトナム人</Text>
                <Text style={styles.wordVietnamese}>người Việt Nam</Text>
              </View>
              <View style={styles.wordItem}>
                <Text style={styles.wordJapanese}>です</Text>
                <Text style={styles.wordVietnamese}>danh từ</Text>
              </View>
            </View>
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
    marginTop: 5,
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
  languageContainer: {
    padding: 20,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    padding: 15,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languageText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  swapButton: {
    padding: 10,
  },
  translationContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  translationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  translationTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  translationContent: {
    padding: 15,
  },
  originalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  translatedText: {
    fontSize: 16,
    color: '#4ECDC4',
    fontWeight: 'bold',
  },
  translationActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    padding: 10,
  },
  detailsContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  detailsSubtitle: {
    fontSize: 16,
    color: '#4ECDC4',
    marginBottom: 20,
  },
  wordBreakdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wordItem: {
    alignItems: 'center',
    marginBottom: 15,
    minWidth: '20%',
  },
  wordJapanese: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  wordVietnamese: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
