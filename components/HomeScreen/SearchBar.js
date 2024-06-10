import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const SearchBar = ({
  city,
  setCity,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  toggleFilterModal,
  handleSearch,
  inputContainerTranslateY,
  setInputContainerHeight,
}) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  return (
    <Animated.View
      style={[
        styles.inputContainer,
        { transform: [{ translateY: inputContainerTranslateY }] },
      ]}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        setInputContainerHeight(height);
      }}
    >
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Where to?"
          placeholderTextColor="gray"
          onChangeText={setCity}
          value={city}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={toggleFilterModal}
        >
          <Entypo name="sound-mix" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.datePickersContainer}>
        <TouchableOpacity
          onPress={() => setShowStartDatePicker(true)}
          style={styles.datePicker}
        >
          <Text style={styles.datePickerText}>
            {startDate ? startDate.toDateString() : "Start Date"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowEndDatePicker(true)}
          style={styles.datePicker}
        >
          <Text style={styles.datePickerText}>
            {endDate ? endDate.toDateString() : "End Date"}
          </Text>
        </TouchableOpacity>
      </View>

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
          minimumDate={startDate || new Date()}
        />
      )}

      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.dateButtonText}>Search</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#FF8C00",
    paddingBottom: 20,
    zIndex: 1,
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "white",
    color: "black",
  },
  filterButton: {
    padding: 10,
  },
  datePickersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  datePicker: {
    flex: 1,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerText: {
    color: "black",
  },
  searchButton: {
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  dateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SearchBar;
