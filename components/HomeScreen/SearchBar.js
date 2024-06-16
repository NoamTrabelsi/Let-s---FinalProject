import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
  Image,
  TextInput,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import DatePicker from "./DatePicker";
import countryList from "react-select-country-list";
import Autocomplete from "react-native-autocomplete-input";

const SearchBar = ({
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
  const [suggestions, setSuggestions] = useState([]);
  const [inputText, setInputText] = useState("");

  const countries = countryList()
    .getData()
    .map((country) => country.label);

  const handleInputChange = (query) => {
    setInputText(query);
    const regex = new RegExp(`^${query.trim()}`, "i");
    const filtered = countries.filter((country) => country.search(regex) >= 0);
    setSuggestions(filtered);
  };

  const handleSelectSuggestion = (suggestion) => {
    setInputText(suggestion);
    setSuggestions([]);
  };

  const handleSearchBtn = () => {
    if (inputText !== "" && startDate && endDate) {
      setCity(inputText);
      handleSearch();
    }
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
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/lets-find.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.autocompleteContainer}>
          <Autocomplete
            value={inputText}
            data={
              suggestions.length > 0 && inputText.length > 0 ? suggestions : []
            }
            onChangeText={handleInputChange}
            placeholder="Where to?"
            placeholderTextColor="gray"
            inputContainerStyle={styles.inputContainerStyle}
            listContainerStyle={styles.autocompleteList}
            flatListProps={{
              keyExtractor: (_, index) => index.toString(),
              renderItem: ({ item }) => (
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => handleSelectSuggestion(item)}
                >
                  <View>
                    <Text>{item}</Text>
                  </View>
                </TouchableOpacity>
              ),
            }}
            renderTextInput={(props) => (
              <TextInput
                {...props}
                style={styles.input}
                placeholderTextColor="gray"
              />
            )}
          />
        </View>
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

      <TouchableOpacity onPress={handleSearchBtn} style={styles.searchButton}>
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
    zIndex: 2,
  },
  autocompleteContainer: {
    position: "relative",
    flex: 1,
  },
  inputContainerStyle: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    color: "black",
  },
  autocompleteList: {
    position: "absolute",
    top: 40, // This should match the height of the input field
    // Adjust the width to match the input field
    left: 10,
    right: 10,
    zIndex: 1,
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
