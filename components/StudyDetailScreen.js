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
  const { category = 'Từ vựng', level = 'N5' } = route.params || {};

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

  const studyProgress = {
    'N5': {
      status: 'completed',
      lessons: 25,
      totalLessons: 25,
      words: 250,
      totalWords: 250,
      progress: 100,
      color: '#4CAF50'
    },
    'N4': {
      status: 'in-progress',
      lessons: 15,
      totalLessons: 25,
      words: 50,
      totalWords: 300,
      progress: 60,
      color: '#FF9800'
    },
    'N3': {
      status: 'in-progress',
      lessons: 15,
      totalLessons: 25,
      words: 50,
      totalWords: 300,
      progress: 60,
      color: '#FF9800'
    },
    'N2': {
      status: 'locked',
      lessons: 0,
      totalLessons: 30,
      words: 0,
      totalWords: 400,
      progress: 0,
      color: '#E0E0E0'
    }
  };

  const currentProgress = studyProgress[level];

  const renderProgressBar = (progress, color) => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress}%`, backgroundColor: color }]} />
    </View>
  );

  const renderLevelCard = (levelKey, data) => {
    const isCurrentLevel = levelKey === level;
    return (
      <TouchableOpacity 
        key={levelKey}
        style={[
          styles.levelCard,
          isCurrentLevel && styles.currentLevelCard,
          data.status === 'locked' && styles.lockedLevelCard
        ]}
        disabled={data.status === 'locked'}
        onPress={() => navigation.setParams({ level: levelKey })}
      >
        <View style={styles.levelHeader}>
          <Text style={[
            styles.levelTitle,
            isCurrentLevel && styles.currentLevelTitle,
            data.status === 'locked' && styles.lockedLevelTitle
          ]}>
            {levelKey}
          </Text>
          <Text style={[
            styles.levelStatus,
            data.status === 'completed' && styles.completedStatus,
            data.status === 'locked' && styles.lockedStatus
          ]}>
            {data.status === 'completed' ? 'Hoàn thành' : 
             data.status === 'in-progress' ? 'Đang học' : 'Chưa mở khóa'}
          </Text>
        </View>
        
        {data.status !== 'locked' && (
          <>
            <View style={styles.statsRow}>
              <Text style={styles.statLabel}>Bài đã học</Text>
              <Text style={styles.statValue}>{data.lessons}/{data.totalLessons}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statLabel}>Thành thạo</Text>
              <Text style={styles.statValue}>{data.words} từ</Text>
            </View>
            
            <View style={styles.progressSection}>
              <Text style={styles.progressLabel}>
                {data.status === 'completed' ? 'Hoàn thành' : 'Từ đã ôn tập'}
              </Text>
              <Text style={styles.progressPercent}>{data.progress}%</Text>
            </View>
            {renderProgressBar(data.progress, data.color)}
            
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: data.color }]}>
              <Text style={styles.actionButtonText}>
                {data.status === 'completed' ? 'Ôn tập' : 'Tiếp tục học'}
              </Text>
            </TouchableOpacity>
          </>
        )}
        
        {data.status === 'locked' && (
          <View style={styles.lockedContent}>
            <Ionicons name="lock-closed" size={24} color="#999" />
            <Text style={styles.lockedText}>
              Quay lại học tập Từ vựng cấp độ {levelKey === 'N2' ? 'N3' : 'N4'} trước để mở khóa
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

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

        {/* Category Header */}
        <View style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <View style={[styles.categoryIcon, { backgroundColor: '#FF9FAD' }]}>
              <Ionicons name="book" size={20} color="white" />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <Text style={styles.categorySubtitle}>1 cấp độ hoàn thành • 2 đang học</Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>Chi tiết các cấp độ</Text>
        </View>

        {/* Level Cards */}
        <View style={styles.levelsContainer}>
          {Object.entries(studyProgress).map(([levelKey, data]) => 
            renderLevelCard(levelKey, data)
          )}
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
  categorySection: {
    backgroundColor: 'white',
    padding: 20,
  },
  categoryHeader: {
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
  },
  levelsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  levelCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  currentLevelCard: {
    borderColor: '#4ECDC4',
    backgroundColor: '#F0FFFE',
  },
  lockedLevelCard: {
    backgroundColor: '#F5F5F5',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  currentLevelTitle: {
    color: '#4ECDC4',
  },
  lockedLevelTitle: {
    color: '#999',
  },
  levelStatus: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '500',
  },
  completedStatus: {
    color: '#4CAF50',
  },
  lockedStatus: {
    color: '#999',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  progressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
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
    borderRadius: 4,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  lockedContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  lockedText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
});
