import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '../components/Slider';
import DatePicker from '../components/DatePicker'; // Импорт нового компонента для выбора даты

function HomeScreen() {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(60);

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const handleSearch = () => {
    console.log(`City: ${city}, Start Date: ${formatDate(startDate)}, End Date: ${formatDate(endDate)}`);
    console.log(`Min Age: ${minAge}, Max Age: ${maxAge}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter City"
          placeholderTextColor="gray"
          onChangeText={setCity}
          value={city}
        />
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Использование DatePicker для выбора начальной и конечной даты */}
      <DatePicker label="Select Start Date" date={startDate} onConfirm={setStartDate} />
      <DatePicker label="Select End Date" date={endDate} onConfirm={setEndDate} minimumDate={startDate} />

      <TouchableOpacity onPress={handleSearch} style={[styles.dateButton, styles.searchButton]}>
        <Text style={styles.dateButtonText}>Search</Text>
      </TouchableOpacity>

      <Modal
        animationType='fade'
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={toggleFilterModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flex: 1 }}>
              <Slider 
                onValuesChange={(values) => {
                  setMinAge(values[0]);
                  setMaxAge(values[1]);
                }}
              />
            </View>
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
    alignSelf: 'center', // Выравниваем по центру
    flexDirection: 'row', // Элементы в строку
    justifyContent: 'space-between', // Разнести элементы по краям
    alignItems: 'center', // Выровнять элементы по центру по вертикали
    marginTop: 10,
    width: '70%', // Задаем полную ширину для контейнера
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
    elevation: 5,
    width: '80%', // Adjust width if necessary
    height: '50%', // Adjust height if necessary
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