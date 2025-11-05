import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import BottomNavigation from './BottomNavigation';
import CustomHeader from './CustomHeader';

export default function ListeningLearningScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('study');

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} showBackButton={true} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.comingSoon}>
          <Text style={styles.title}>Học Nghe hiểu</Text>
          <Text style={styles.subtitle}>Tính năng đang được phát triển...</Text>
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
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  comingSoon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
