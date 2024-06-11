import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
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
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/lets-find.png")}
          style={styles.image}
        />
      </View>
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
        <DatePicker
          label="Start Date"
          date={startDate}
          onConfirm={setStartDate}
        />
        <DatePicker
          label="End Date"
          date={endDate}
          onConfirm={setEndDate}
          minimumDate={startDate}
        />
      </View>

      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.dateButtonText}>Search</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#FF8C00",
    paddingBottom: 80,
    zIndex: 1,
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
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
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
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
    alignSelf: "center",
    width: "30%",
  },
  dateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
    marginBottom: -30,
  },
});

export default SearchBar;
