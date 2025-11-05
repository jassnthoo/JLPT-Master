import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation';

export default function ListeningMainScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('practice');

  const lessons = [
    {
      id: 1,
      title: 'Bài 1: Giới thiệu bản thân',
      description: 'Nghe và hiểu các đoạn giới thiệu cơ bản về bản thân',
      duration: '2 phút 30 giây',
      progress: 100,
      status: 'completed',
      isCompleted: true
    },
    {
      id: 2,
      title: 'Bài 2: Giới thiệu bản thân',
      description: 'Nghe và hiểu các đoạn giới thiệu cơ bản về bản thân',
      duration: '2 phút 30 giây',
      progress: 100,
      status: 'completed',
      isCompleted: true
    },
    {
      id: 3,
      title: 'Bài 3: Giới thiệu bản thân',
      description: 'Hỏi thông tin mua bán tại cửa hàng tiện lợi',
      duration: '2 phút 30 giây',
      progress: 60,
      status: 'in-progress',
      isCompleted: false
    },
    {
      id: 4,
      title: 'Bài 4: Giới thiệu bản thân',
      description: 'Hỏi thông tin mua bán tại cửa hàng tiện lợi',
      duration: '2 phút 30 giây',
      progress: 60,
      status: 'in-progress',
      isCompleted: false
    },
    {
      id: 5,
      title: 'Bài 5: Giới thiệu bản thân',
      description: 'Hỏi thông tin mua bán tại cửa hàng tiện lợi',
      duration: '2 phút 30 giây',
      progress: 0,
      status: 'not-started',
      isCompleted: false
    },
    {
      id: 6,
      title: 'Bài 6: Giới thiệu bản thân',
      description: 'Hỏi thông tin mua bán tại cửa hàng tiện lợi',
      duration: '2 phút 30 giây',
      progress: 0,
      status: 'not-started',
      isCompleted: false
    },
    {
      id: 7,
      title: 'Bài 7: Giới thiệu bản thân',
      description: 'Hỏi thông tin mua bán tại cửa hàng tiện lợi',
      duration: '2 phút 30 giây',
      progress: 0,
      status: 'not-started',
      isCompleted: false
    },
    {
      id: 8,
      title: 'Bài 8: Giới thiệu bản thân',
      description: 'Hỏi thông tin mua bán tại cửa hàng tiện lợi',
      duration: '2 phút 30 giây',
      progress: 0,
      status: 'not-started',
      isCompleted: false
    }
  ];

  const getStatusButton = (lesson) => {
    if (lesson.isCompleted) {
      return (
        <TouchableOpacity style={styles.statusButtonCompleted}>
          <Text style={styles.statusButtonTextCompleted}>Học lại</Text>
        </TouchableOpacity>
      );
    } else if (lesson.status === 'in-progress') {
      return (
        <TouchableOpacity style={styles.statusButtonInProgress}>
          <Text style={styles.statusButtonTextInProgress}>Học tiếp</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.statusButtonNotStarted}>
          <Text style={styles.statusButtonTextNotStarted}>Bắt đầu</Text>
        </TouchableOpacity>
      );
    }
  };

  const getProgressBarColor = (progress) => {
    if (progress === 100) return '#4ECDC4';
    if (progress > 0) return '#87CEEB';
    return '#E0E0E0';
  };

  const completedLessons = lessons.filter(lesson => lesson.isCompleted).length;
  const inProgressLessons = lessons.filter(lesson => lesson.status === 'in-progress').length;
  const notStartedLessons = lessons.filter(lesson => lesson.status === 'not-started').length;

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
        <Text style={styles.headerTitle}>Nghe hiểu N5</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Summary */}
      <View style={styles.progressSummary}>
        <Text style={styles.progressTitle}>Tiến độ tổng thể</Text>
        <Text style={styles.progressPercentage}>36%</Text>
        
        <View style={styles.progressStats}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#4ECDC4' }]}>
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
            <Text style={styles.statText}>{completedLessons} hoàn thành</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#87CEEB' }]}>
              <Ionicons name="time" size={16} color="white" />
            </View>
            <Text style={styles.statText}>{inProgressLessons} đang học</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#FFB6C1' }]}>
              <Ionicons name="book" size={16} color="white" />
            </View>
            <Text style={styles.statText}>{notStartedLessons} chưa học</Text>
          </View>
        </View>

        <View style={styles.filterTabs}>
          <TouchableOpacity style={[styles.filterTab, styles.activeFilterTab]}>
            <Text style={[styles.filterTabText, styles.activeFilterTabText]}>Tất cả</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>Hoàn thành</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>Đang học</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>Chưa học</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lessons List */}
      <ScrollView style={styles.lessonsList} showsVerticalScrollIndicator={false}>
        {lessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            style={styles.lessonCard}
            onPress={() => navigation.navigate('ListeningLessonDetail', { lesson })}
          >
            <View style={styles.lessonHeader}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              {getStatusButton(lesson)}
            </View>
            
            <Text style={styles.lessonDescription}>{lesson.description}</Text>
            
            <View style={styles.lessonFooter}>
              <View style={styles.durationContainer}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.durationText}>{lesson.duration}</Text>
              </View>
              
              {lesson.progress > 0 && (
                <View style={styles.progressContainer}>
                  <Text style={styles.progressText}>Tiến độ</Text>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${lesson.progress}%`,
                          backgroundColor: getProgressBarColor(lesson.progress)
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressPercentageText}>{lesson.progress}%</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabPress={setActiveTab}
      />
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#C8E6C9',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  progressSummary: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
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
    marginBottom: 5,
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginBottom: 15,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeFilterTab: {
    backgroundColor: '#4ECDC4',
  },
  filterTabText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  lessonsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
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
    marginRight: 10,
  },
  statusButtonCompleted: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusButtonInProgress: {
    backgroundColor: '#87CEEB',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusButtonNotStarted: {
    backgroundColor: '#FFB6C1',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusButtonTextCompleted: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusButtonTextInProgress: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusButtonTextNotStarted: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  lessonFooter: {
    flexDirection: 'column',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  durationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
    width: 40,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressPercentageText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
    width: 30,
    textAlign: 'right',
  },
});
