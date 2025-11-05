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

export default function StudyDetailScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('study');
  const { category } = route.params || { category: 'Từ vựng' };

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

  const levelData = [
    {
      level: 'N5',
      status: 'completed',
      totalWords: 2525,
      completedWords: 250,
      progress: 100,
      color: '#4ECDC4'
    },
    {
      level: 'N4',
      status: 'in_progress',
      totalWords: 1525,
      completedWords: 50,
      progress: 60,
      color: '#FF9FAD'
    },
    {
      level: 'N3',
      status: 'in_progress',
      totalWords: 1525,
      completedWords: 50,
      progress: 60,
      color: '#FF9FAD'
    },
    {
      level: 'N2',
      status: 'locked',
      totalWords: 0,
      completedWords: 0,
      progress: 0,
      color: '#E0E0E0'
    },
    {
      level: 'N1',
      status: 'locked',
      totalWords: 0,
      completedWords: 0,
      progress: 0,
      color: '#E0E0E0'
    }
  ];

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'in_progress':
        return 'Đang học';
      case 'locked':
        return 'Chưa học';
      default:
        return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'checkmark-circle';
      case 'in_progress':
        return 'time';
      case 'locked':
        return 'lock-closed';
      default:
        return 'time';
    }
  };

  const renderLevelItem = (item, index) => (
    <View key={index} style={styles.levelItem}>
      <View style={styles.levelHeader}>
        <View style={styles.levelLeft}>
          <View style={[styles.levelIcon, { backgroundColor: item.color }]}>
            <Ionicons 
              name={getStatusIcon(item.status)} 
              size={16} 
              color="white" 
            />
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>{item.level}</Text>
            <Text style={styles.levelStatus}>{getStatusText(item.status)}</Text>
          </View>
        </View>
        <View style={styles.levelStats}>
          <Text style={styles.statsText}>Bài đã học</Text>
          <Text style={styles.statsNumber}>{item.totalWords}</Text>
          <Text style={styles.statsText}>Thành thạo</Text>
          <Text style={styles.statsNumber}>{item.completedWords} từ</Text>
        </View>
      </View>
      
      {item.status !== 'locked' && (
        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>Hoàn thành</Text>
            <Text style={styles.progressPercent}>{item.progress}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${item.progress}%`,
                  backgroundColor: item.color 
                }
              ]} 
            />
          </View>
          <View style={styles.progressStats}>
            <Text style={styles.progressText}>Từ đã ôn tập</Text>
            <Text style={styles.progressNumbers}>{item.completedWords}/{item.totalWords}</Text>
          </View>
        </View>
      )}

      {item.status === 'locked' && (
        <View style={styles.lockedContainer}>
          <Text style={styles.lockedText}>
            Hoàn thành cấp độ trước để mở khóa cấp độ này
          </Text>
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
        <Text style={styles.headerTitle}>Sổ tay học tập</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryHeader}>
            <Ionicons name="bar-chart" size={24} color="#4ECDC4" />
            <Text style={styles.summaryTitle}>
              Theo dõi chi tiết tiến độ sử dụng kỹ năng và mức độ
            </Text>
          </View>
        </View>

        {/* Category Title */}
        <View style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <View style={[styles.categoryIcon, { backgroundColor: '#FF9FAD' }]}>
              <Ionicons name="book" size={20} color="white" />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <Text style={styles.categorySubtitle}>
                1 cấp độ hoàn thành • 2 đang học
              </Text>
            </View>
          </View>
        </View>

        {/* Level Details */}
        <Text style={styles.sectionTitle}>Chi tiết các cấp độ</Text>
        <View style={styles.levelsContainer}>
          {levelData.map((item, index) => renderLevelItem(item, index))}
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
  categorySection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  levelsContainer: {
    backgroundColor: 'white',
  },
  levelItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  levelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  levelInfo: {
    
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  levelStatus: {
    fontSize: 14,
    color: '#666',
  },
  levelStats: {
    alignItems: 'flex-end',
  },
  statsText: {
    fontSize: 12,
    color: '#666',
  },
  statsNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  progressContainer: {
    
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  progressNumbers: {
    fontSize: 12,
    color: '#666',
  },
  lockedContainer: {
    paddingVertical: 10,
  },
  lockedText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});