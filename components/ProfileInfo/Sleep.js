import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const sleepOptions = [
  "hotel",
  "hostel",
  "rental",
  "camping",
  "couchsurfing",
  "bed and breakfast",
];

function Sleep({ userSleepInfo, setUserSleepInfo }) {
  useEffect(() => {
    if (userSleepInfo.length === 0) {
      setUserSleepInfo(new Array(sleepOptions.length).fill(0));
    } else if (userSleepInfo.length !== sleepOptions.length) {
      const newOptions = new Array(sleepOptions.length).fill(0);
      userSleepInfo.forEach((option, index) => {
        if (index < sleepOptions.length) {
          newOptions[index] = option;
        }
      });
      setUserSleepInfo(newOptions);
    }
  });

  const toggleSleepOption = (index) => {
    const newOptions = [...userSleepInfo];
    newOptions[index] = newOptions[index] === 0 ? 1 : 0;
    setUserSleepInfo(newOptions);
  };

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
              userSleepInfo[index] === 1 ? styles.selected : {},
            ]}
            onPress={() => toggleSleepOption(index)}
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
