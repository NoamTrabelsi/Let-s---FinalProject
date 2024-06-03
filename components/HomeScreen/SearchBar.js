import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import DatePicker from "./DatePicker";

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
          placeholder="Enter City"
          placeholderTextColor="gray"
          onChangeText={setCity}
          value={city}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={toggleFilterModal}
        >
          <Entypo name="sound-mix" size={30} color="#808080" />
        </TouchableOpacity>
      </View>

      <DatePicker
        label="Select Start Date"
        date={startDate}
        onConfirm={setStartDate}
      />
      <DatePicker
        label="Select End Date"
        date={endDate}
        onConfirm={setEndDate}
        minimumDate={startDate}
      />

      <TouchableOpacity
        onPress={handleSearch}
        style={[styles.dateButton, styles.searchButton]}
      >
        <Text style={styles.dateButtonText}>Search</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#FF8C00",
    marginBottom: 10,
    zIndex: 1,
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    width: "70%",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "white",
    color: "black",
  },
  filterButton: {
    padding: 10,
  },
  dateButton: {
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
    width: "45%",
    alignSelf: "center",
  },
  dateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SearchBar;
