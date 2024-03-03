import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

const VectorIcon2 = ({ style }) => {
  return (
    <Image
      style={[styles.vectorIcon, style]}
      contentFit="cover"
      source={require("../assets/vector12.png")}
    />
  );
};

const styles = StyleSheet.create({
  vectorIcon: {
    width: 32,
    height: 32,
  },
});

export default VectorIcon2;
