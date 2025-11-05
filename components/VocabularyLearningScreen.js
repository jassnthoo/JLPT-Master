import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation';
import CustomHeader from './CustomHeader';
import { PastelColors } from '../constants/colors';

export default function VocabularyLearningScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('study');

  // Sample data for vocabulary learning units
  const learningData = {
    overallProgress: 45,
    completed: 2,
    inProgress: 2,
    notStarted: 2,
    units: [
      {
        id: 'unit04',
        title: 'Unit 04 - Bài 4',
        description: 'Từ vựng về đồ ăn và thức uống',
        vocabularyCount: 25,
        progress: 30,
        status: 'in_progress' // 'completed', 'in_progress', 'not_started'
      },
      {
        id: 'unit05',
        title: 'Unit 05 - Bài 5',
        description: 'Từ vựng về mua sắm và giá cả',
        vocabularyCount: 22,
        progress: 0,
        status: 'not_started'
      },
      {
        id: 'unit03',
        title: 'Unit 03 - Bài 3',
        description: 'Từ vựng về gia đình và người thân',
        vocabularyCount: 28,
        progress: 100,
        status: 'completed'
      },
      {
        id: 'unit02',
        title: 'Unit 02 - Bài 2',
        description: 'Từ vựng về thời gian và lịch trình',
        vocabularyCount: 20,
        progress: 100,
        status: 'completed'
      },
      {
        id: 'unit01',
        title: 'Unit 01 - Bài 1',
        description: 'Từ vựng cơ bản về chào hỏi',
        vocabularyCount: 15,
        progress: 60,
        status: 'in_progress'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return PastelColors.success;
      case 'in_progress':
        return PastelColors.info;
      case 'not_started':
        return PastelColors.buttonSecondary;
      default:
        return PastelColors.borderMedium;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'in_progress':
        return 'Học tiếp';
      case 'not_started':
        return 'Bắt đầu';
      default:
        return 'Bắt đầu';
    }
  };

  const handleUnitPress = (unit) => {
    // Navigate to unit detail or learning screen
    navigation.navigate('VocabularyUnitDetail', { unit });
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} showBackButton={true} title="Học từ vựng" showLogo={false} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overall Progress Card */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Tiến độ tổng thể</Text>
          <Text style={styles.progressPercentage}>{learningData.overallProgress}%</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#4ECDC4' }]}>
                <Ionicons name="checkmark" size={16} color="white" />
              </View>
              <Text style={styles.statNumber}>{learningData.completed}</Text>
              <Text style={styles.statLabel}>hoàn thành</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#4A90E2' }]}>
                <Ionicons name="play" size={16} color="white" />
              </View>
              <Text style={styles.statNumber}>{learningData.inProgress}</Text>
              <Text style={styles.statLabel}>đang học</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#FFB6C1' }]}>
                <Ionicons name="pause" size={16} color="white" />
              </View>
              <Text style={styles.statNumber}>{learningData.notStarted}</Text>
              <Text style={styles.statLabel}>chưa học</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Tất cả</Text>
              <Text style={styles.progressLabel}>Hoàn thành</Text>
              <Text style={styles.progressLabel}>Đang học</Text>
              <Text style={styles.progressLabel}>Chưa học</Text>
            </View>
          </View>

          <View style={styles.overallProgressBar}>
            <Text style={styles.progressText}>Tiến độ</Text>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${learningData.overallProgress}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressValue}>60%</Text>
            </View>
          </View>
        </View>

        {/* Units List */}
        <View style={styles.unitsContainer}>
          {learningData.units.map((unit, index) => (
            <View key={unit.id} style={styles.unitCard}>
              <View style={styles.unitHeader}>
                <Text style={styles.unitTitle}>{unit.title}</Text>
                <TouchableOpacity 
                  style={[
                    styles.statusButton, 
                    { backgroundColor: getStatusColor(unit.status) }
                  ]}
                  onPress={() => handleUnitPress(unit)}
                >
                  <Text style={styles.statusButtonText}>
                    {getStatusText(unit.status)}
                  </Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.unitDescription}>{unit.description}</Text>
              
              <View style={styles.unitStats}>
                <View style={styles.vocabularyCount}>
                  <Ionicons name="book" size={16} color="#666" />
                  <Text style={styles.vocabularyText}>{unit.vocabularyCount} từ vựng</Text>
                </View>
              </View>

              {unit.status !== 'not_started' && (
                <View style={styles.unitProgressContainer}>
                  <Text style={styles.unitProgressLabel}>Tiến độ</Text>
                  <View style={styles.unitProgressBar}>
                    <View style={styles.unitProgressTrack}>
                      <View 
                        style={[
                          styles.unitProgressFill, 
                          { width: `${unit.progress}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.unitProgressText}>{unit.progress}%</Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNavigation 
        activeTab={activeTab} 
        onTabPress={setActiveTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PastelColors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  progressPercentage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  progressSection: {
    marginBottom: 15,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
  },
  overallProgressBar: {
    marginTop: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    minWidth: 35,
  },
  unitsContainer: {
    gap: 15,
  },
  unitCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  unitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  unitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  unitDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  unitStats: {
    marginBottom: 15,
  },
  vocabularyCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vocabularyText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  unitProgressContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 15,
  },
  unitProgressLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  unitProgressBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitProgressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginRight: 10,
  },
  unitProgressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 3,
  },
  unitProgressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    minWidth: 35,
  },
});
