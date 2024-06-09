import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const About = ({ aboutUser, setAboutUser }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>About Me</Text>
      <TextInput
        style={styles.aboutInput}
        multiline={true}
        editable={true}
        value={aboutUser}
        blurOnSubmit={true}
        onChangeText={(text) => setAboutUser(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  textContainer: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "bold",
  },
  aboutInput: {
    marginTop: 10,
    fontSize: 16,
    color: "black",
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#F5F5F5",
    textAlignVertical: "top",
    height: 100,
  },
});

export default About;
