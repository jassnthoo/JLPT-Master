import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation';

export default function ReadingComprehensionScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('practice');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showTranslation, setShowTranslation] = useState(false);

  const passage = {
    japanese: `愛びめりて直角ピクリマ高所本読済ホクア解法日中つづく人だ大阪県ぶ入院機ぶりは、暴り書示サミニ小大英語コナコヌ外発ちよしく南作新せモキナ上記発分勢ひよりた原始レヤエ工原96段り首画下あ真実そク怪獣無ア青森ねわ材料エムフコ横須オランプ自在たツ学無比雄の。`,
    vietnamese: `Mỗi khi tôi cảm thấy bồn bề và mệt mỏi, tôi thường tìm về với vòng tay dịu dàng của thiên nhiên. Không gian xanh mướt của cánh đồng lúa, tiếng suối chảy róc rách trong veo, hay sự hùng vĩ lặng lẽ của những rặng núi xa xa luôn có một sức mạnh chữa lành phi thường. Ở đó, không có sự ồn ào của cuộc sống hiện đại, chỉ có nhịp điệu chậm rãi, thanh bình của gió, của cây cỏ.`
  };

  const question = {
    id: 1,
    text: 'この文章の内容をあっているものはどれか。',
    options: [
      '日本語では、書き言葉と話し言葉の文体がよく似ている。',
      '日本語では、書き言葉と話し言葉の文体がよく似ている。',
      '日本語では、書き言葉と話し言葉の文体がよく似ている。',
      '日本語では、書き言葉と話し言葉の文体がよく似ている。'
    ],
    correctAnswer: 0
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [question.id]: answerIndex
    });
  };

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>第1部 - 文体</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.passageContainer}>
          <Text style={styles.passageText}>
            {showTranslation ? passage.vietnamese : passage.japanese}
          </Text>
          
          <TouchableOpacity 
            style={styles.translationButton}
            onPress={toggleTranslation}
          >
            <Text style={styles.translationButtonText}>
              {showTranslation ? 'Xem bản gốc' : 'Xem bản dịch'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            問1：{question.text}
          </Text>

          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswers[question.id] === index && styles.selectedOption
                ]}
                onPress={() => handleAnswerSelect(index)}
              >
                <View style={[
                  styles.optionCircle,
                  selectedAnswers[question.id] === index && styles.selectedCircle
                ]}>
                  {selectedAnswers[question.id] === index && (
                    <View style={styles.selectedDot} />
                  )}
                </View>
                <Text style={[
                  styles.optionText,
                  selectedAnswers[question.id] === index && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedAnswers[question.id] !== undefined && (
            <View style={styles.feedbackContainer}>
              <Text style={styles.feedbackText}>Xem câu trả lời đúng</Text>
            </View>
          )}
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>
              {selectedAnswers[question.id] !== undefined ? 'Hoàn thành' : 'Xem kết quả'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
  content: {
    flex: 1,
    padding: 20,
  },
  passageContainer: {
    backgroundColor: '#C8E6C9',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  passageText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
  translationButton: {
    alignSelf: 'flex-end',
  },
  translationButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  questionContainer: {
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
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#F8F9FA',
  },
  selectedOption: {
    backgroundColor: '#E8F5E8',
  },
  optionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    borderColor: '#4ECDC4',
  },
  selectedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4ECDC4',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },
  selectedOptionText: {
    color: '#4ECDC4',
    fontWeight: '500',
  },
  feedbackContainer: {
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  feedbackText: {
    color: '#FF6B6B',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  actionButtonsContainer: {
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#FFB6C1',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
