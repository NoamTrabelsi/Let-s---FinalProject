import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const adventureOptions = [
  "museums",
  "historical sites",
  "concerts",
  "theater",
  "restaurants",
  "local cuisine",
  "spa",
  "beach",
  "hiking",
  "cycling",
  "bars",
  "clubs",
  "city tours",
  "nature walks",
  "shopping",
  "sightseeing",
  "extreme",
];

function Adventure({ userAdventureInfo, setUserAdventureInfo }) {
  useEffect(() => {
    if (userAdventureInfo.length === 0) {
      setUserAdventureInfo(new Array(adventureOptions.length).fill(0));
    } else if (userAdventureInfo.length !== adventureOptions.length) {
      const newOptions = new Array(adventureOptions.length).fill(0);
      userAdventureInfo.forEach((option, index) => {
        if (index < adventureOptions.length) {
          newOptions[index] = option;
        }
      });
      setUserAdventureInfo(newOptions);
    }
  });

  const toggleLocation = (index) => {
    const newOptions = [...userAdventureInfo];
    newOptions[index] = newOptions[index] === 0 ? 1 : 0;
    setUserAdventureInfo(newOptions);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>Adventure</Text>
      <Text style={styles.text}>Where do you party?</Text>
      <View style={styles.choicesContainer}>
        {adventureOptions.map((adventure, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.adventureBtn,
              userAdventureInfo[index] === 1 ? styles.selected : {},
            ]}
            onPress={() => toggleLocation(index)}
          >
            <Text style={styles.buttonText}>{adventure}</Text>
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
  adventureBtn: {
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

export default Adventure;
