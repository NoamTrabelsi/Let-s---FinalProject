import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const sleepOptions = ["hotel", "hostel", "rental", "out-door"];

function Sleep() {
  const [selectedSleepOptions, setSelectedSleepOptions] = useState([]);
  const [sleepOptionsVector, setSleepOptionsVector] = useState(
    new Array(sleepOptions.length).fill(0)
  );

  const toggleSleepOption = (option) => {
    setSelectedSleepOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((opt) => opt !== option)
        : [...prevOptions, option]
    );
  };

  useEffect(() => {
    // Обновляем векторное представление при изменении selectedSleepOptions
    const vector = sleepOptions.map((option) =>
      selectedSleepOptions.includes(option) ? 1 : 0
    );
    setSleepOptionsVector(vector);
    console.log("Sleep options vector:", vector);
  }, [selectedSleepOptions]);

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>Sleep</Text>
      <Text style={styles.text}>Where do you dream?</Text>
      <View style={styles.view1}>
        {sleepOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.locationBtn,
              selectedSleepOptions.includes(option) ? styles.selected : {},
            ]}
            onPress={() => toggleSleepOption(option)}
          >
            <Text style={styles.buttonText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Здесь можете выводить sleepOptionsVector на экран, если это необходимо */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  textContainer: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
  },
  view1: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  locationBtn: {
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#808080",
  },
  buttonText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Sleep;
