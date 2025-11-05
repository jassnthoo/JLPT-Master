import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PastelColors } from '../constants/colors';

export default function CustomHeader({ navigation, showBackButton = true, title = null, showLogo = false }) {
  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      
      <View style={styles.centerContainer}>
        {showLogo ? (
          <Image 
            source={require('../logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        ) : title ? (
          <Text style={styles.title}>{title}</Text>
        ) : null}
      </View>
      
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50, // Thêm padding top thay cho SafeArea
    backgroundColor: PastelColors.headerPrimary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: PastelColors.shadowLight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PastelColors.textPrimary,
  },
  backButton: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  placeholder: {
    width: 34,
  },
});
