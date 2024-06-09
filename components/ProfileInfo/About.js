import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

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
  aboutContainer: {
    padding: 12,
    backgroundColor: "#FF8C00",
    borderBottomColor: "#EDEDED",
  },
  aboutTitle: {
    fontSize: 18,
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
  },
  textContainer: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default About;
