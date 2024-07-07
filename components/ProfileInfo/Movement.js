import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const transportOptions = [
  "on foot",
  "public transport",
  "bicycle",
  "moped",
  "rental car",
  "ride sharing",
  "scooter",
  "taxi",
];

function Movement({ userMovementInfo, setUserMovementInfo }) {
  useEffect(() => {
    if (userMovementInfo.length === 0) {
      setUserMovementInfo(new Array(transportOptions.length).fill(0));
    } else if (userMovementInfo.length !== transportOptions.length) {
      const newOptions = new Array(transportOptions.length).fill(0);
      userMovementInfo.forEach((option, index) => {
        if (index < transportOptions.length) {
          newOptions[index] = option;
        }
      });
      setUserMovementInfo(newOptions);
    }
  });

  const toggleOption = (index) => {
    const newOptions = [...userMovementInfo];
    newOptions[index] = newOptions[index] === 0 ? 1 : 0;
    setUserMovementInfo(newOptions);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>Movement</Text>
      <Text style={styles.text}>How do you prefer to get around?</Text>
      <View style={styles.choicesContainer}>
        {transportOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.locationBtn,
              userMovementInfo[index] === 1 ? styles.selected : {},
            ]}
            onPress={() => toggleOption(index)}
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
