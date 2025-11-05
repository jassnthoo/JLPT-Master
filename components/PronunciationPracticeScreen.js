import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation';

const { width } = Dimensions.get('window');

export default function PronunciationPracticeScreen({ navigation, route }) {
  const { mode = 'text' } = route.params || {};
  const [activeTab, setActiveTab] = useState('practice');
  const [selectedVoice, setSelectedVoice] = useState('あらい');
  const [selectedSpeed, setSelectedSpeed] = useState('1.0');
  const [selectedHeight, setSelectedHeight] = useState('0');
  const [inputText, setInputText] = useState('');

  const voiceOptions = ['あらい', 'Option 2', 'Option 3'];
  const speedOptions = ['0.5', '1.0', '1.5', '2.0'];
  const heightOptions = ['0', '1', '2', '3'];

  const handleCreateVoice = () => {
    navigation.navigate('PronunciationResult', {
      text: inputText || 'Dẫn văn bản bạn cần luyện phát âm vào đây.',
      voice: selectedVoice,
      speed: selectedSpeed,
      height: selectedHeight
    });
  };

  const renderTextMode = () => (
    <View style={styles.contentContainer}>
      <View style={styles.modeToggle}>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'text' && styles.activeModeButton]}
          onPress={() => navigation.setParams({ mode: 'text' })}
        >
          <Text style={[styles.modeButtonText, mode === 'text' && styles.activeModeButtonText]}>
            Văn bản
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'image' && styles.activeModeButton]}
          onPress={() => navigation.setParams({ mode: 'image' })}
        >
          <Text style={[styles.modeButtonText, mode === 'image' && styles.activeModeButtonText]}>
            Hình ảnh
          </Text>
        </TouchableOpacity>
      </View>

      {/* Text Input Area */}
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Dẫn văn bản bạn cần luyện phát âm vào đây."
          placeholderTextColor="#999"
          multiline
          value={inputText}
          onChangeText={setInputText}
          textAlignVertical="top"
        />
        <Text style={styles.characterCount}>Số ký tự 40</Text>
      </View>

      {/* Settings */}
      <View style={styles.settingsContainer}>
        {/* Voice Selection */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Giọng đọc</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{selectedVoice}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Speed Selection */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Tốc độ</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{selectedSpeed}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Height Selection */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Cao thấp</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{selectedHeight}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Create Voice Button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateVoice}>
        <Text style={styles.createButtonText}>Tạo giọng nói</Text>
      </TouchableOpacity>
    </View>
  );

  const renderImageMode = () => (
    <View style={styles.contentContainer}>
      <View style={styles.modeToggle}>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'text' && styles.activeModeButton]}
          onPress={() => navigation.setParams({ mode: 'text' })}
        >
          <Text style={[styles.modeButtonText, mode === 'text' && styles.activeModeButtonText]}>
            Văn bản
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'image' && styles.activeModeButton]}
          onPress={() => navigation.setParams({ mode: 'image' })}
        >
          <Text style={[styles.modeButtonText, mode === 'image' && styles.activeModeButtonText]}>
            Hình ảnh
          </Text>
        </TouchableOpacity>
      </View>

      {/* Image Upload Area */}
      <View style={styles.imageUploadContainer}>
        <View style={styles.imageUploadArea}>
          <View style={styles.imageIcon}>
            <Ionicons name="image" size={60} color="#CCC" />
          </View>
          <Text style={styles.imageUploadText}>
            Kéo thả hình ảnh hoặc chọn{' '}
            <Text style={styles.linkText}>tải lên từ tập</Text>
          </Text>
        </View>
      </View>

      {/* Settings */}
      <View style={styles.settingsContainer}>
        {/* Voice Selection */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Giọng đọc</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{selectedVoice}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Speed Selection */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Tốc độ</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{selectedSpeed}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Height Selection */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Cao thấp</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{selectedHeight}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Create Voice Button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateVoice}>
        <Text style={styles.createButtonText}>Tạo giọng nói</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Luyện phát âm</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      {mode === 'text' ? renderTextMode() : renderImageMode()}

      {/* Bottom Navigation */}
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
    backgroundColor: '#F8F9FA',
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
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 4,
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
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeModeButton: {
    backgroundColor: '#FFB6C1',
  },
  modeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeModeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textInputContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
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
  textInput: {
    fontSize: 16,
    color: '#333',
    minHeight: 200,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 10,
  },
  imageUploadContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
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
  imageUploadArea: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  imageIcon: {
    marginBottom: 15,
  },
  imageUploadText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  linkText: {
    color: '#4ECDC4',
    textDecorationLine: 'underline',
  },
  settingsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
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
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  createButton: {
    backgroundColor: '#FFB6C1',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#FFB6C1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
