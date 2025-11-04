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

export default function ProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    switch (tabId) {
      case 'vocabulary':
        navigation.navigate('VocabularyDictionary');
        break;
      case 'study':
        navigation.navigate('Study');
        break;
      default:
        break;
    }
  };

  const studyLevels = [
    { level: 'N3', color: '#FF9FAD', icon: 'book' },
    { level: 'N4', color: '#FFB347', icon: 'book' },
    { level: 'N5', color: '#98FB98', icon: 'book' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tài khoản người học</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#666" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Nguyễn Văn A</Text>
            <Text style={styles.userStatus}>Thành viên tài khoản</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="bookmark" size={20} color="#4ECDC4" />
            <Text style={styles.menuText}>Lưu trữ yêu thích</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings" size={20} color="#4ECDC4" />
            <Text style={styles.menuText}>Cài đặt chung</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('StudyNotebook')}
          >
            <Ionicons name="library" size={20} color="#4ECDC4" />
            <Text style={styles.menuText}>Sổ tay học tập</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Study Levels */}
        <View style={styles.levelsSection}>
          <Text style={styles.sectionTitle}>Cấp độ học tập</Text>
          <View style={styles.levelsGrid}>
            {studyLevels.map((item, index) => (
              <TouchableOpacity key={index} style={[styles.levelCard, { backgroundColor: item.color }]}>
                <Text style={styles.levelText}>{item.level}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.levelCard, styles.levelCardDisabled]}>
              <Text style={styles.levelTextDisabled}>Kanji N4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.levelCard, styles.levelCardDisabled]}>
              <Text style={styles.levelTextDisabled}>Nghe Hiểu N5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.levelCard, styles.levelCardDisabled]}>
              <Text style={styles.levelTextDisabled}>Thi JLPT N5</Text>
            </TouchableOpacity>
          </View>
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
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  levelsSection: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  levelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  levelCard: {
    width: '30%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  levelCardDisabled: {
    backgroundColor: '#F0F0F0',
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  levelTextDisabled: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    textAlign: 'center',
  },
});
