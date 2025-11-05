import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { PastelColors } from '../constants/colors';

export default function BottomNavigation({ activeTab, onTabPress }) {
  const navigation = useNavigation();
  
  const tabs = [
    { id: 'vocabulary', label: 'Từ điển', icon: 'book-outline', screen: 'Dictionary' },
    { id: 'study', label: 'Học tập', icon: 'school-outline', screen: 'StudyMain' },
    { id: 'support', label: 'Hỗ trợ', icon: 'help-circle-outline', screen: 'SupportMenu' },
    { id: 'practice', label: 'Luyện thi', icon: 'trophy-outline', screen: 'JLPTTest' },
    { id: 'profile', label: 'Cá nhân', icon: 'person-outline', screen: 'Profile' },
  ];

  const handleTabPress = (tab) => {
    if (onTabPress) {
      onTabPress(tab.id);
    }
    if (tab.screen) {
      navigation.navigate(tab.screen);
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab
          ]}
          onPress={() => handleTabPress(tab)}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={activeTab === tab.id ? PastelColors.buttonPrimary : PastelColors.textLight}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === tab.id && styles.activeTabLabel
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: PastelColors.cardBackground,
    paddingVertical: 8,
    paddingHorizontal: 10,
    paddingBottom: 25, // Thêm padding bottom thay cho SafeArea
    borderTopWidth: 1,
    borderTopColor: PastelColors.borderLight,
    elevation: 8,
    shadowColor: PastelColors.shadowMedium,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: PastelColors.primary,
  },
  tabLabel: {
    fontSize: 12,
    color: PastelColors.textLight,
    marginTop: 4,
  },
  activeTabLabel: {
    color: PastelColors.textPrimary,
    fontWeight: 'bold',
  },
});
