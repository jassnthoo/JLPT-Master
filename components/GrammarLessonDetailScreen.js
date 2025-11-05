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

export default function GrammarLessonDetailScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('study');
  const [selectedTab, setSelectedTab] = useState('grammar'); // 'grammar' or 'practice'
  const { lessonId = 1, lessonTitle = 'Ngữ pháp N5' } = route.params || {};

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

  const grammarPoints = [
    {
      id: 1,
      title: 'Khẳng định và phủ định của một danh từ',
      structure: {
        positive: 'N です',
        negative: 'N ではありません'
      },
      meaning: {
        positive: 'Khẳng định: là~',
        negative: 'Phủ định: không phải là~'
      },
      explanation: '※です Danh từ đi cùng です để cấu thành vị ngữ. です vừa biểu thị phán đoán, khẳng định vừa biểu thị thái độ lịch sự đối với người nghe.',
      additionalInfo: '※しゃ ありません thường được dùng trong hội thoại hàng ngày. Còn ではありません thường được dùng trong các bài phát biểu hay văn viết.',
      examples: [
        {
          japanese: 'がくせいです。',
          vietnamese: 'Tôi là học sinh.'
        },
        {
          japanese: 'がくせいじゃありません。',
          vietnamese: 'Tôi không phải là học sinh.'
        },
        {
          japanese: 'やまだです。',
          vietnamese: 'Tôi là Yamada.'
        },
        {
          japanese: 'やまだじゃありません。',
          vietnamese: 'Tôi không phải là Yamada.'
        }
      ]
    },
    {
      id: 2,
      title: 'Khẳng định và phủ định của một danh từ',
      collapsed: true
    },
    {
      id: 3,
      title: 'Khẳng định và phủ định của một danh từ',
      collapsed: true
    },
    {
      id: 4,
      title: 'Khẳng định và phủ định của một danh từ',
      collapsed: true
    }
  ];

  const renderGrammarPoint = (point) => (
    <View key={point.id} style={styles.grammarCard}>
      <View style={styles.grammarHeader}>
        <Text style={styles.grammarNumber}>{point.id}.</Text>
        <Text style={styles.grammarTitle}>{point.title}</Text>
      </View>

      {!point.collapsed && (
        <View style={styles.grammarContent}>
          {/* Structure */}
          <View style={styles.structureSection}>
            <Text style={styles.sectionTitle}>Cấu trúc</Text>
            <View style={styles.structureBox}>
              <View style={styles.structureRow}>
                <Text style={styles.structureLabel}>Khẳng định</Text>
                <Text style={styles.structureLabel}>Phủ định</Text>
              </View>
              <View style={styles.structureRow}>
                <Text style={styles.structureText}>{point.structure?.positive}</Text>
                <Text style={styles.structureText}>{point.structure?.negative}</Text>
              </View>
            </View>
          </View>

          {/* Meaning */}
          <View style={styles.meaningSection}>
            <Text style={styles.sectionTitle}>Ý nghĩa</Text>
            <Text style={styles.meaningText}>{point.meaning?.positive}</Text>
            <Text style={styles.meaningText}>{point.meaning?.negative}</Text>
            <Text style={styles.explanationText}>{point.explanation}</Text>
            <Text style={styles.additionalText}>{point.additionalInfo}</Text>
          </View>

          {/* Examples */}
          <View style={styles.examplesSection}>
            <Text style={styles.sectionTitle}>Ví dụ</Text>
            {point.examples?.map((example, index) => (
              <View key={index} style={styles.exampleItem}>
                <Text style={styles.exampleNumber}>{index + 1}.</Text>
                <View style={styles.exampleContent}>
                  <Text style={styles.japaneseExample}>{example.japanese}</Text>
                  <Text style={styles.vietnameseExample}>{example.vietnamese}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{lessonTitle}</Text>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            selectedTab === 'grammar' && styles.activeTab
          ]}
          onPress={() => setSelectedTab('grammar')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'grammar' && styles.activeTabText
          ]}>
            Ngữ pháp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab, 
            selectedTab === 'practice' && styles.activeTab
          ]}
          onPress={() => {
            setSelectedTab('practice');
            navigation.navigate('GrammarPractice', { lessonId, lessonTitle });
          }}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'practice' && styles.activeTabText
          ]}>
            Luyện tập
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {selectedTab === 'grammar' && (
          <View style={styles.grammarContainer}>
            {grammarPoints.map(renderGrammarPoint)}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#E8F5F5',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#FF9FAD',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  grammarContainer: {
    padding: 20,
  },
  grammarCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  grammarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F4FF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  grammarNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginRight: 8,
  },
  grammarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  grammarContent: {
    padding: 20,
  },
  structureSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  structureBox: {
    backgroundColor: '#FFF5E6',
    padding: 15,
    borderRadius: 8,
  },
  structureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  structureLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  structureText: {
    fontSize: 16,
    color: '#F39C12',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  meaningSection: {
    marginBottom: 20,
  },
  meaningText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  explanationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 10,
  },
  additionalText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 8,
  },
  examplesSection: {
    
  },
  exampleItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  exampleNumber: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginRight: 10,
    marginTop: 2,
  },
  exampleContent: {
    flex: 1,
  },
  japaneseExample: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  vietnameseExample: {
    fontSize: 14,
    color: '#666',
  },
});
