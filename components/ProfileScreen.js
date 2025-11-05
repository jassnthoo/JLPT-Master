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

export default function ProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [currentLanguage, setCurrentLanguage] = useState('vi');

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    // Navigation is now handled by BottomNavigation component
  };

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'vi' ? 'jp' : 'vi');
  };

  const studyProgress = [
    { name: 'Từ vựng N3', color: '#FF9FAD' },
    { name: 'Kanji N4', color: '#4ECDC4' },
    { name: 'Ngữ pháp N3', color: '#9B59B6' },
    { name: 'Đọc hiểu N4', color: '#F39C12' },
    { name: 'Nghe hiểu N5', color: '#3498DB' },
    { name: 'Thi JLPT N5', color: '#E67E22' }
  ];

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} showBackButton={false} title="Cá nhân" showLogo={false} />

      <ScrollView style={styles.content}>
        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#999" />
            </View>
          </View>
          <Text style={styles.userName}>Nguyễn Văn A</Text>
          <Text style={styles.userStatus}>Thông tin tài khoản</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="heart-outline" size={24} color="#4ECDC4" />
              <Text style={styles.menuItemText}>Lưu trữ yêu thích</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="settings-outline" size={24} color="#4ECDC4" />
              <Text style={styles.menuItemText}>Cài đặt chung</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('StudyNotebook')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="book-outline" size={24} color="#4ECDC4" />
              <Text style={styles.menuItemText}>Sổ tay học tập</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Study Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Tiến độ học tập</Text>
          <View style={styles.progressGrid}>
            {studyProgress.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.progressItem, { backgroundColor: item.color }]}
              >
                <Text style={styles.progressItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
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
  userSection: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userStatus: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  progressSection: {
    backgroundColor: 'white',
    padding: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  progressItem: {
    width: '48%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  progressItemText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});