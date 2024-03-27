import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const transportOptions = [
  "on foot", "public transport", "bicycle", "moped", "rental car"
];

function Movement() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [optionsVector, setOptionsVector] = useState(new Array(transportOptions.length).fill(0));

  const toggleOption = (option) => {
    setSelectedOptions(prevOptions =>
      prevOptions.includes(option)
        ? prevOptions.filter((opt) => opt !== option)
        : [...prevOptions, option]
    );
  };

  useEffect(() => {
    const vector = transportOptions.map((option) => selectedOptions.includes(option) ? 1 : 0);
    setOptionsVector(vector);
    console.log("Movement options vector:", vector);
  }, [selectedOptions]);

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>Movement</Text>
      <Text style={styles.text}>How do you prefer to get around?</Text>
      <View style={styles.choicesContainer}>
        {transportOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.locationBtn, selectedOptions.includes(option) ? styles.selected : {}]}
            onPress={() => toggleOption(option)}
          >
            <Text style={styles.buttonText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  choicesContainer: {
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

export default Movement;
