import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function JLPTTestSummaryScreen({ navigation, route }) {
  const { level, testId, results, overallPercentage } = route.params;

  const summaryData = [
    {
      title: 'Đọc hiểu',
      subtitle: 'Đúng 3/21',
      percentage: 14,
      color: '#FFB6C1',
      details: [
        { label: 'Cách đọc kanji', score: '3/7' },
        { label: 'Cách đọc Hiragana', score: '0/5' },
        { label: 'Biểu hiện từ', score: '0/6' },
        { label: 'Đồng nghĩa', score: '0/3' }
      ]
    },
    {
      title: 'Ngữ pháp',
      subtitle: 'Đúng 3/21',
      percentage: 14,
      color: '#E6E6FA',
      details: [
        { label: 'Cách đọc kanji', score: '3/7' },
        { label: 'Cách đọc Hiragana', score: '0/5' },
        { label: 'Biểu hiện từ', score: '0/6' },
        { label: 'Đồng nghĩa', score: '0/3' }
      ]
    }
  ];

  const renderSection = (section, index) => (
    <View key={index} style={[styles.sectionCard, { backgroundColor: section.color }]}>
      <View style={styles.sectionHeader}>
        <View style={styles.percentageCircle}>
          <Text style={styles.percentageText}>{section.percentage}%</Text>
        </View>
        <View style={styles.sectionInfo}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
        </View>
      </View>
      
      <View style={styles.sectionDetails}>
        {section.details.map((detail, detailIndex) => (
          <View key={detailIndex} style={styles.detailRow}>
            <Text style={styles.detailLabel}>{detail.label}</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${section.percentage}%`, backgroundColor: '#4ECDC4' }
                  ]} 
                />
              </View>
              <Text style={styles.detailScore}>{detail.score}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test 1</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {summaryData.map((section, index) => renderSection(section, index))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E6',
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
  content: {
    flex: 1,
    padding: 20,
  },
  sectionCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  percentageCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionInfo: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  sectionDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 15,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 3,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  detailScore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    minWidth: 30,
  },
});
