import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

const VectorIcon = ({ style }) => {
  return (
    <Image
      style={[styles.vectorIcon, style]}
      contentFit="cover"
      source={require("../assets/vector9.png")}
    />
  );
};

const styles = StyleSheet.create({
  vectorIcon: {
    width: 37,
    height: 37,
  },
});

export default VectorIcon;
