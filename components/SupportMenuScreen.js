import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from './BottomNavigation';
import Header from './Header';

export default function SupportMenuScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('support');

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Hỗ trợ" navigation={navigation} />

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.menuItemChatbot}
          onPress={() => navigation.navigate('Chatbot')}
        >
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Chatbot AI</Text>
            <Text style={styles.menuSubtitle}>Hỏi đáp với chatbot bằng văn bản hoặc hình ảnh</Text>
          </View>
          <View style={styles.menuIcon}>
            <Image source={require('../assets/chatbotlogo.png')} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItemPronunciationPractice}
          onPress={() => navigation.navigate('PronunciationPractice', { mode: 'text' })}
        >
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Luyện phát âm</Text>
            <Text style={styles.menuSubtitle}>
              Hỗ trợ luyện phát âm đoạn văn bằng cách chuyển văn bản hoặc hình ảnh sang âm thanh
            </Text>
          </View>
          <View style={styles.menuIcon}>
            <Image source={require('../assets/shadowingpracticelogo.png')} />
          </View>
        </TouchableOpacity>
      </View>

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
    backgroundColor: '#FFF9F5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  menuItemChatbot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C5B9E8',
    padding: 20,
    borderRadius: 15,
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
  menuItemPronunciationPractice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4A3',
    padding: 20,
    borderRadius: 15,
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
  menuIcon: {
    width: 96,
    height: 96,
    borderRadius: 60,
    backgroundColor: '#F5ECFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343232',
    marginBottom: 5,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#7A7A7A',
    lineHeight: 20,
    textAlign: "justify",
    marginRight: 10,
  },
});
