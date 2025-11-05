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

export default function GrammarLessonListScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('study');
  const { level = 'N5' } = route.params || {};

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

  const overallProgress = {
    completed: 2,
    inProgress: 2,
    notStarted: 4,
    percentage: 36
  };

  const lessons = [
    {
      id: 1,
      title: 'Bài 1: Giới thiệu bản thân',
      japanese: 'は、です、か、は、です、か',
      grammarCount: 4,
      exerciseCount: 4,
      status: 'completed',
      progress: 100
    },
    {
      id: 2,
      title: 'Bài 2: Giới thiệu bản thân',
      japanese: 'は、です、か、は、です、か',
      grammarCount: 4,
      exerciseCount: 4,
      status: 'completed',
      progress: 100
    },
    {
      id: 3,
      title: 'Bài 3: Giới thiệu bản thân',
      japanese: 'は、です、か、は、です、か',
      grammarCount: 4,
      exerciseCount: 4,
      status: 'in_progress',
      progress: 60
    },
    {
      id: 4,
      title: 'Bài 4: Giới thiệu bản thân',
      japanese: 'は、です、か、は、です、か',
      grammarCount: 4,
      exerciseCount: 4,
      status: 'in_progress',
      progress: 60
    },
    {
      id: 5,
      title: 'Bài 5: Giới thiệu bản thân',
      japanese: 'は、です、か、は、です、か',
      grammarCount: 4,
      exerciseCount: 4,
      status: 'not_started',
      progress: 0
    },
    {
      id: 6,
      title: 'Bài 6: Giới thiệu bản thân',
      japanese: 'は、です、か、は、です、か',
      grammarCount: 4,
      exerciseCount: 4,
      status: 'not_started',
      progress: 0
    },
    {
      id: 7,
      title: 'Bài 7: Giới thiệu bản thân',
      japanese: 'は、です、か、は、です、か',
      grammarCount: 4,
      exerciseCount: 4,
      status: 'not_started',
      progress: 0
    },
    {
      id: 8,
      title: 'Bài 8: Giới thiệu bản thân',
      japanese: 'は、です、か、は、です、か',
      grammarCount: 4,
      exerciseCount: 4,
      status: 'not_started',
      progress: 0
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#4ECDC4';
      case 'in_progress':
        return '#3498DB';
      case 'not_started':
        return '#FF9FAD';
      default:
        return '#E0E0E0';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Học lại';
      case 'in_progress':
        return 'Học tiếp';
      case 'not_started':
        return 'Bắt đầu';
      default:
        return 'Bắt đầu';
    }
  };

  const renderLesson = (lesson) => (
    <View key={lesson.id} style={styles.lessonCard}>
      <View style={styles.lessonHeader}>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: getStatusColor(lesson.status) }]}
          onPress={() => navigation.navigate('GrammarLessonDetail', { 
            lessonId: lesson.id,
            lessonTitle: lesson.title 
          })}
        >
          <Ionicons name="play" size={12} color="white" />
          <Text style={styles.actionButtonText}>{getStatusText(lesson.status)}</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.japaneseText}>{lesson.japanese}</Text>
      
      <View style={styles.lessonStats}>
        <View style={styles.statItem}>
          <Ionicons name="library" size={16} color="#9B59B6" />
          <Text style={styles.statText}>Ngữ pháp ({lesson.grammarCount})</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="document-text" size={16} color="#F39C12" />
          <Text style={styles.statText}>Bài tập ({lesson.exerciseCount})</Text>
        </View>
      </View>

      {lesson.status === 'completed' && (
        <View style={styles.completedBadge}>
          <Ionicons name="checkmark-circle" size={16} color="#4ECDC4" />
          <Text style={styles.completedText}>Đã hoàn thành bài học và bài tập</Text>
        </View>
      )}

      {lesson.status === 'in_progress' && (
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Tiến độ</Text>
            <Text style={styles.progressPercent}>{lesson.progress}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${lesson.progress}%`,
                  backgroundColor: getStatusColor(lesson.status)
                }
              ]} 
            />
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
        <Text style={styles.headerTitle}>Ngữ pháp {level}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Overall Progress */}
        <View style={styles.overallProgressCard}>
          <Text style={styles.progressTitle}>Tiến độ tổng thể</Text>
          <Text style={styles.progressPercentage}>{overallProgress.percentage}%</Text>
          
          <View style={styles.overallProgressBar}>
            <View 
              style={[
                styles.overallProgressFill, 
                { width: `${overallProgress.percentage}%` }
              ]} 
            />
          </View>

          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <View style={[styles.statusDot, { backgroundColor: '#4ECDC4' }]} />
              <Text style={styles.statusText}>{overallProgress.completed} hoàn thành</Text>
            </View>
            <View style={styles.progressStat}>
              <View style={[styles.statusDot, { backgroundColor: '#3498DB' }]} />
              <Text style={styles.statusText}>{overallProgress.inProgress} đang học</Text>
            </View>
            <View style={styles.progressStat}>
              <View style={[styles.statusDot, { backgroundColor: '#E0E0E0' }]} />
              <Text style={styles.statusText}>{overallProgress.notStarted} chưa học</Text>
            </View>
          </View>

          <View style={styles.statusLabels}>
            <Text style={styles.statusLabel}>Tất cả</Text>
            <Text style={styles.statusLabel}>Hoàn thành</Text>
            <Text style={styles.statusLabel}>Đang học</Text>
            <Text style={styles.statusLabel}>Chưa học</Text>
          </View>
        </View>

        {/* Lessons List */}
        <View style={styles.lessonsContainer}>
          {lessons.map(renderLesson)}
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
  overallProgressCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9FAD',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  overallProgressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 15,
  },
  overallProgressFill: {
    height: '100%',
    backgroundColor: '#FF9FAD',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  statusLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusLabel: {
    fontSize: 12,
    color: '#999',
  },
  lessonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  lessonCard: {
    backgroundColor: 'white',
    padding: 20,
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
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  japaneseText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  lessonStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5F5',
    padding: 10,
    borderRadius: 8,
  },
  completedText: {
    fontSize: 14,
    color: '#4ECDC4',
    marginLeft: 8,
  },
  progressSection: {
    
  },
  progressHeader: {
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
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});
