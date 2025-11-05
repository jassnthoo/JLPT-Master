import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation';
import CustomHeader from './CustomHeader';
import { PastelColors } from '../constants/colors';

export default function JLPTTestScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('practice');

  const jlptLevels = [
    { level: 'N5', color: PastelColors.jlptN5, textColor: PastelColors.textPrimary },
    { level: 'N4', color: PastelColors.jlptN4, textColor: PastelColors.textPrimary },
    { level: 'N3', color: PastelColors.jlptN3, textColor: PastelColors.textPrimary },
    { level: 'N2', color: PastelColors.jlptN2, textColor: PastelColors.textPrimary },
    { level: 'N1', color: PastelColors.jlptN1, textColor: PastelColors.textPrimary },
  ];

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} showBackButton={false} title="Luyện thi JLPT" showLogo={false} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Ionicons name="book" size={24} color="#4ECDC4" />
          <Text style={styles.sectionTitle}>Thi thử JLPT</Text>
        </View>

        <View style={styles.levelsContainer}>
          {jlptLevels.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.levelButton, { backgroundColor: item.color }]}
              onPress={() => navigation.navigate('JLPTTestDetail', { level: item.level })}
            >
              <Text style={[styles.levelText, { color: item.textColor }]}>
                JLPT {item.level}
              </Text>
            </TouchableOpacity>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  levelsContainer: {
    gap: 15,
  },
  levelButton: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  levelText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
