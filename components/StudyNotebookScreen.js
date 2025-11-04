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
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    switch (tabId) {
      case 'vocabulary':
        navigation.navigate('VocabularyDictionary');
        break;
      case 'study':
        navigation.navigate('Study');
        break;
      default:
        break;
    }
  };

  const studyData = [
    {
      category: 'Từ vựng',
      icon: 'book',
      color: '#FF9FAD',
      completed: 1,
      total: 2,
      details: 'Chi tiết các cấp độ',
      levels: [
        { level: 'N5', status: 'completed', lessons: 25, words: 250, progress: 100 },
        { level: 'N4', status: 'in-progress', lessons: 15, words: 50, progress: 60 },
        { level: 'N3', status: 'in-progress', lessons: 15, words: 50, progress: 60 },
        { level: 'N2', status: 'locked', lessons: 0, words: 0, progress: 0 },
      ]
    },
    {
      category: 'Kanji',
      icon: 'language',
      color: '#4ECDC4',
      completed: 1,
      total: 2,
      details: 'Chi tiết các cấp độ'
    },
    {
      category: 'Ngữ pháp',
      icon: 'library',
      color: '#9B59B6',
      completed: 1,
      total: 2,
      details: 'Chi tiết các cấp độ'
    },
    {
      category: 'Đọc hiểu',
      icon: 'document-text',
      color: '#F39C12',
      completed: 1,
      total: 2,
      details: 'Chi tiết các cấp độ'
    },
    {
      category: 'Nghe hiểu',
      icon: 'headset',
      color: '#3498DB',
      completed: 1,
      total: 2,
      details: 'Chi tiết các cấp độ'
    },
    {
      category: 'Thi JLPT',
      icon: 'trophy',
      color: '#E67E22',
      completed: 1,
      total: 2,
      details: 'Chi tiết các cấp độ'
    }
  ];

  const renderProgressBar = (progress) => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );

  const renderLevelDetail = (level) => (
    <View key={level.level} style={styles.levelDetailCard}>
      <View style={styles.levelHeader}>
        <View style={styles.levelInfo}>
          <Text style={styles.levelTitle}>{level.level}</Text>
          <Text style={styles.levelStatus}>
            {level.status === 'completed' ? 'Hoàn thành' : 
             level.status === 'in-progress' ? 'Đang học' : 'Chưa mở khóa'}
          </Text>
        </View>
        <View style={styles.levelStats}>
          <Text style={styles.statText}>Bài đã học</Text>
          <Text style={styles.statNumber}>{level.lessons}/25</Text>
          <Text style={styles.statText}>Thành thạo</Text>
          <Text style={styles.statNumber}>{level.words} từ</Text>
        </View>
      </View>
      
      <View style={styles.progressSection}>
        <Text style={styles.progressLabel}>
          {level.status === 'completed' ? 'Hoàn thành' : 'Từ đã ôn tập'}
        </Text>
        <Text style={styles.progressPercent}>{level.progress}%</Text>
      </View>
      {renderProgressBar(level.progress)}
      
      {level.status !== 'locked' && (
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>
            {level.status === 'completed' ? 'Ôn tập' : 'Tiếp tục học'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sổ tay học tập</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Progress Overview */}
        <View style={styles.overviewSection}>
          <View style={styles.overviewHeader}>
            <Ionicons name="analytics" size={20} color="#4ECDC4" />
            <Text style={styles.overviewTitle}>Theo dõi chi tiết tiến độ từng kỹ năng và cấp độ</Text>
          </View>
        </View>

        {/* Detailed Progress for Từ vựng */}
        <View style={styles.detailSection}>
          <View style={styles.categoryHeaderExpanded}>
            <View style={[styles.categoryIcon, { backgroundColor: studyData[0].color }]}>
              <Ionicons name={studyData[0].icon} size={20} color="white" />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryTitle}>{studyData[0].category}</Text>
              <Text style={styles.categorySubtitle}>
                {studyData[0].completed} cấp độ hoàn thành • 2 đang học
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Chi tiết các cấp độ</Text>
          
          {studyData[0].levels.map(level => renderLevelDetail(level))}
        </View>

        {/* Other Categories Summary */}
        {studyData.slice(1).map((item, index) => (
          <TouchableOpacity key={index} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={20} color="white" />
              </View>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryTitle}>{item.category}</Text>
                <Text style={styles.categorySubtitle}>
                  {item.completed} cấp độ hoàn thành • {item.total} đang học
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          </TouchableOpacity>
        ))}

        {/* Study Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Tiếp tục học tập</Text>
          <Text style={styles.tipsText}>
            Hãy duy trì thói quen học mỗi ngày để đạt hiệu quả tốt nhất trong việc học tiếng Nhật.
          </Text>
          <TouchableOpacity style={styles.tipsButton}>
            <Text style={styles.tipsButtonText}>Học ngay</Text>
          </TouchableOpacity>
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
    backgroundColor: '#E8F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#E8F5F5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  overviewSection: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overviewTitle: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  detailSection: {
    backgroundColor: 'white',
    padding: 20,
  },
  categoryHeaderExpanded: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  levelDetailCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  levelStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  levelStats: {
    alignItems: 'flex-end',
  },
  statText: {
    fontSize: 12,
    color: '#666',
  },
  statNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  progressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 15,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF9FAD',
    borderRadius: 4,
  },
  continueButton: {
    backgroundColor: '#FF9FAD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoryCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipsSection: {
    backgroundColor: '#FFF5F5',
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  tipsButton: {
    backgroundColor: '#FF9FAD',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  tipsButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
