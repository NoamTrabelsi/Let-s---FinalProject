import * as React from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const ChatButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.chatButton}
      activeOpacity={0.5}
      onPress={() => navigation.navigate("ChatWITH")}
    >
      <View style={styles.textPosition}>
        <View style={[styles.textBoxChild, styles.textPosition]} />
      </View>
      <Text style={styles.chat}>Chat</Text>
      <Image
        style={styles.vectorIcon}
        contentFit="cover"
        source={require("../assets/vector6.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  textBoxChild: {
    borderRadius: Border.br_base,
    backgroundColor: Color.colorCoral,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
  },
  chat: {
    top: "25%",
    left: "45.28%",
    fontSize: FontSize.size_5xl,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorWhite,
    textAlign: "left",
    position: "absolute",
  },
  vectorIcon: {
    height: "53.57%",
    width: "21.38%",
    top: "23.21%",
    right: "59.12%",
    bottom: "23.21%",
    left: "19.5%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    position: "absolute",
  },
  chatButton: {
    marginTop: -28.5,
    marginLeft: 18.5,
    top: "50%",
    left: "50%",
    width: 159,
    height: 56,
    position: "absolute",
  },
});

export default ChatButton;
