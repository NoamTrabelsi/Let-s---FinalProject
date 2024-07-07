import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const UserInterests = ({ interests, options, title, icon }) => (
  <View style={styles.interestsContainer}>
    <View style={styles.interestSubContainer}>
      <Ionicons style={styles.icon} name={icon} size={24} color="black" />
      <Text style={styles.interestLabel}>{title}</Text>
      {interests.map((interest, index) => {
        if (interest === 1) {
          return (
            <TouchableOpacity
              key={index}
              style={styles.interestTag}
              disabled={true}
            >
              <Text style={styles.interestTagText}>{options[index]}</Text>
            </TouchableOpacity>
          );
        }
        return null;
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  interestsContainer: {
    backgroundColor: "white",
  },
  interestSubContainer: {
    marginHorizontal: 10,
    marginVertical: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  icon: {
    paddingTop: 10,
  },
  interestLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginHorizontal: 10,
  },
  interestTag: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    margin: 2,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#808080",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  interestTagText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default UserInterests;
