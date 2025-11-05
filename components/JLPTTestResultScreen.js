import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function JLPTTestResultScreen({ navigation, route }) {
  const { level, testId, answers, questions } = route.params;

  // Calculate results based on answers
  const calculateResults = () => {
    const sections = {
      '文字・語彙': { correct: 0, total: 0, maxScore: 60 },
      '文法・読解': { correct: 0, total: 0, maxScore: 60 },
      '聴解': { correct: 0, total: 0, maxScore: 60 }
    };

    questions.forEach(question => {
      const section = question.section;
      if (sections[section]) {
        sections[section].total += 1;
        if (answers[question.id] === question.correctAnswer) {
          sections[section].correct += 1;
        }
      }
    });

    return sections;
  };

  const results = calculateResults();
  const totalCorrect = Object.values(results).reduce((sum, section) => sum + section.correct, 0);
  const totalQuestions = Object.values(results).reduce((sum, section) => sum + section.total, 0);
  const overallPercentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const getSectionData = () => [
    {
      title: 'Từ vựng',
      subtitle: 'Đúng 3/21',
      percentage: results['文字・語彙'].total > 0 ? Math.round((results['文字・語彙'].correct / results['文字・語彙'].total) * 100) : 0,
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
      percentage: results['文法・読解'].total > 0 ? Math.round((results['文法・読解'].correct / results['文法・読解'].total) * 100) : 0,
      color: '#E6E6FA',
      details: [
        { label: 'Cách đọc kanji', score: '3/7' },
        { label: 'Cách đọc Hiragana', score: '0/5' },
        { label: 'Biểu hiện từ', score: '0/6' },
        { label: 'Đồng nghĩa', score: '0/3' }
      ]
    },
    {
      title: 'Nghe hiểu',
      subtitle: 'Đúng 3/21',
      percentage: results['聴解'].total > 0 ? Math.round((results['聴解'].correct / results['聴解'].total) * 100) : 0,
      color: '#B0E0E6',
      details: [
        { label: 'Cách đọc kanji', score: '3/7' },
        { label: 'Cách đọc Hiragana', score: '0/5' },
        { label: 'Biểu hiện từ', score: '0/6' },
        { label: 'Đồng nghĩa', score: '0/3' }
      ]
    }
  ];

  const sectionData = getSectionData();

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
        <Text style={styles.headerTitle}>Kết quả Test 1</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {sectionData.map((section, index) => renderSection(section, index))}
        
        <TouchableOpacity 
          style={styles.viewDetailsButton}
          onPress={() => navigation.navigate('JLPTTestSummary', { 
            level, 
            testId, 
            results: sectionData,
            overallPercentage 
          })}
        >
          <Text style={styles.viewDetailsButtonText}>Xem chi tiết</Text>
        </TouchableOpacity>
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
  viewDetailsButton: {
    backgroundColor: '#FF9FAD',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewDetailsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
