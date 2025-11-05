import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'flex-start',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 80,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
  },
  searchButton: {
    padding: 5,
    marginTop: 5,
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
