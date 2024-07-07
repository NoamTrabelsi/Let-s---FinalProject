import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const MAX_LENGTH = 300;

const About = ({ aboutUser, setAboutUser }) => {
  const [remainingChars, setRemainingChars] = useState(
    MAX_LENGTH - aboutUser.length
  );

  const handleTextChange = (text) => {
    if (text.length <= MAX_LENGTH) {
      setAboutUser(text);
      setRemainingChars(MAX_LENGTH - text.length);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>About Me</Text>
      <Text style={styles.charCounter}>
        Remaining characters: {remainingChars} / {MAX_LENGTH}
      </Text>
      <TextInput
        style={styles.aboutInput}
        multiline={true}
        editable={true}
        value={aboutUser}
        blurOnSubmit={true}
        onChangeText={handleTextChange}
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
  charCounter: {
    fontSize: 12,
    color: "black",
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
