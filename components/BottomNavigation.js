import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNavigation({ activeTab, onTabPress }) {
  const tabs = [
    { id: 'vocabulary', label: 'Từ điển', icon: 'book-outline' },
    { id: 'study', label: 'Học tập', icon: 'school-outline' },
    { id: 'support', label: 'Hỗ trợ', icon: 'help-circle-outline' },
    { id: 'practice', label: 'Luyện thi', icon: 'trophy-outline' },
    { id: 'profile', label: 'Cá nhân', icon: 'person-outline' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab
          ]}
          onPress={() => onTabPress(tab.id)}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={activeTab === tab.id ? '#4ECDC4' : '#999'}
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
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
  },
  tabLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activeTabLabel: {
    color: '#4ECDC4',
    fontWeight: 'bold',
  },
});
