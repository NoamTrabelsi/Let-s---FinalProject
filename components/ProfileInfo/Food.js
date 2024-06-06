import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const foodOptions = ["everything", "vegetarian", "vegan"];

function Food({ userFoodInfo, setUserFoodInfo }) {
  if (userFoodInfo.length === 0) {
    setUserFoodInfo(new Array(foodOptions.length).fill(0));
  }

  const toggleOption = (index) => {
    const newOptions = [...userFoodInfo];
    newOptions[index] = newOptions[index] === 0 ? 1 : 0;
    setUserFoodInfo(newOptions);
    console.log("New food options:", newOptions);
  };

  useEffect(() => {
    console.log("User food info:", userFoodInfo);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>Food</Text>
      <Text style={styles.text}>What do you want to eat?</Text>
      <View style={styles.choicesContainer}>
        {foodOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.locationBtn,
              userFoodInfo[index] === 1 ? styles.selected : {},
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

export default Food;
