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
    alignSelf: 'center', // Center align
    flexDirection: 'row', // Arrange elements in a row
    justifyContent: 'space-between', // Space out elements at the edges
    alignItems: 'center', // Vertically align elements in the middle
    marginTop: 10,
    width: '70%', // Set the container's full width
  },
  dateButton: {
    backgroundColor: '#808080', // Adjusted to skyblue for consistency
    padding: 10,
    borderRadius: 20, // Rounded corners for a modern look
    // Removed width and alignSelf for the button to adjust according to the text
  },
  dateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dateText: {
    // Style for the date text, if needed
    color: 'black', // Example text color
  },
});

export default DatePicker;
