import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import VocabularyDictionaryScreen from './VocabularyDictionaryScreen';
import GrammarDictionaryScreen from './GrammarDictionaryScreen';
import KanjiDictionaryScreen from './KanjiDictionaryScreen';
import TranslationDictionaryScreen from './TranslationDictionaryScreen';

export default function DictionaryMainScreen({ navigation }) {
  const [activeScreen, setActiveScreen] = useState('vocabulary');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'vocabulary':
        return <VocabularyDictionaryScreen navigation={navigation} onScreenChange={setActiveScreen} />;
      case 'grammar':
        return <GrammarDictionaryScreen navigation={navigation} onScreenChange={setActiveScreen} />;
      case 'kanji':
        return <KanjiDictionaryScreen navigation={navigation} onScreenChange={setActiveScreen} />;
      case 'translation':
        return <TranslationDictionaryScreen navigation={navigation} onScreenChange={setActiveScreen} />;
      default:
        return <VocabularyDictionaryScreen navigation={navigation} onScreenChange={setActiveScreen} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
