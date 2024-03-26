import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePicker = ({ label, date, onConfirm, minimumDate }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showDatePicker = () => {
    setIsVisible(true);
  };

  const handleConfirm = (date) => {
    onConfirm(date);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>{label}</Text>
      </TouchableOpacity>
      <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
      <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setIsVisible(false)}
        minimumDate={minimumDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center', // Выравниваем по центру
    flexDirection: 'row', // Элементы в строку
    justifyContent: 'space-between', // Разнести элементы по краям
    alignItems: 'center', // Выровнять элементы по центру по вертикали
    marginTop: 10,
    width: '70%', // Задаем полную ширину для контейнера
  },
  dateButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    // Убираем ширину и alignSelf, чтобы кнопка адаптировалась к тексту
  },
  dateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dateText: {
    // Стиль для текста с датой, если требуется
    color: 'black', // Пример цвета текста
  },
});

export default DatePicker;
