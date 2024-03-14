import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function HomeScreen() {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const handleConfirmStartDate = (date) => {
    setStartDate(date);
    setStartDatePickerVisibility(false);
  };

  const handleConfirmEndDate = (date) => {
    setEndDate(date);
    setEndDatePickerVisibility(false);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const handleSearch = () => {
    console.log(`City: ${city}, Start Date: ${formatDate(startDate)}, End Date: ${formatDate(endDate)}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter City"
          onChangeText={setCity}
          value={city}
        />
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.dateRow}>
        <TouchableOpacity onPress={() => setStartDatePickerVisibility(true)} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>Select Start Date</Text>
        </TouchableOpacity>
            <Text style={styles.dateText}>{formatDate(startDate)}</Text>
        </View>

        <View style={styles.dateRow}>
        <TouchableOpacity onPress={() => setEndDatePickerVisibility(true)} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>Select End Date</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{formatDate(endDate)}</Text>
        </View>

        {/* Search Button */}
      <TouchableOpacity onPress={handleSearch} style={[styles.dateButton, styles.searchButton]}>
        <Text style={styles.dateButtonText}>Search</Text>
      </TouchableOpacity>


      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmStartDate}
        onCancel={() => setStartDatePickerVisibility(false)}
        minimumDate={new Date()}
      />

      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmEndDate}
        onCancel={() => setEndDatePickerVisibility(false)}
        minimumDate={startDate}
      />

      {/* filter model window */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={toggleFilterModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Your Filters</Text>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={toggleFilterModal}>
              <Text style={styles.textStyle}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  filterButton: {
    padding: 10,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: 'blue', // Красный фон, как у вашей кнопки 'Search'
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    width: '45%', // Задаем ширину кнопки
    alignSelf: 'center', // Центрируем кнопку
  },
  dateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dateText: {
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: 'blue', // Красный фон, как у вашей кнопки 'Search'
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    width: '45%', // Задаем ширину кнопки
    alignSelf: 'center', // Центрируем кнопку
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});

export default HomeScreen;
