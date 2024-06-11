import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const AboutUser = ({ aboutUser }) => (
  <View style={styles.aboutContainer}>
    <Text style={styles.aboutTitle}>About {aboutUser.firstName}</Text>
    <TextInput
      style={styles.aboutInput}
      multiline={true}
      editable={false}
      value={aboutUser.about}
    />
  </View>
);

const styles = StyleSheet.create({
  aboutContainer: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  aboutInput: {
    marginTop: 10,
    fontSize: 16,
    color: "gray",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
  },
});

export default AboutUser;
