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

export default function StudyNotebookScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('study');

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    // Navigation is now handled by BottomNavigation component
  };

  const studyCategories = [
    {
      title: 'Từ vựng',
      icon: 'book',
      color: '#FF9FAD',
      progress: '1 cấp độ hoàn thành • 2 đang học'
    },
    {
      title: 'Kanji',
      icon: 'language',
      color: '#4ECDC4',
      progress: '1 cấp độ hoàn thành • 2 đang học'
    },
    {
      title: 'Ngữ pháp',
      icon: 'library',
      color: '#9B59B6',
      progress: '1 cấp độ hoàn thành • 2 đang học'
    },
    {
      title: 'Đọc hiểu',
      icon: 'document-text',
      color: '#F39C12',
      progress: '1 cấp độ hoàn thành • 2 đang học'
    },
    {
      title: 'Nghe hiểu',
      icon: 'headset',
      color: '#3498DB',
      progress: '1 cấp độ hoàn thành • 2 đang học'
    },
    {
      title: 'Thi JLPT',
      icon: 'trophy',
      color: '#E67E22',
      progress: '1 cấp độ hoàn thành • 2 đang học'
    }
  ];

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
        <Text style={styles.headerTitle}>Sổ tay học tập</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Progress Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryHeader}>
            <Ionicons name="bar-chart" size={24} color="#4ECDC4" />
            <Text style={styles.summaryTitle}>Theo dõi chi tiết tiến độ sử dụng kỹ năng và mức độ</Text>
          </View>
        </View>

        {/* Study Categories */}
        <View style={styles.categoriesSection}>
          {studyCategories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.categoryItem}
              onPress={() => navigation.navigate('StudyDetail', { 
                category: category.title 
              })}
            >
              <View style={styles.categoryLeft}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Ionicons name={category.icon} size={20} color="white" />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryProgress}>{category.progress}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Study Tips */}
        <View style={styles.tipsSection}>
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Tiếp tục học tập</Text>
            <Text style={styles.tipsSubtitle}>Hãy duy trì thói quen học mỗi ngày để tăng hiệu quả!</Text>
            <TouchableOpacity style={styles.studyButton}>
              <Text style={styles.studyButtonText}>Học tập</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  content: {
    flex: 1,
  },
  summarySection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  categoriesSection: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoryProgress: {
    fontSize: 14,
    color: '#666',
  },
  tipsSection: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
  },
  tipsContainer: {
    backgroundColor: '#FFE4E6',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tipsSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  studyButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  studyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});