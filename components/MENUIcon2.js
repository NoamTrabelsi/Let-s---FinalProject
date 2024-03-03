import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { Border } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const MENUIcon2 = ({ propFlexDirection, propPosition }) => {
  const mENUIcon1Style = useMemo(() => {
    return {
      ...getStyleValue("flexDirection", propFlexDirection),
      ...getStyleValue("position", propPosition),
    };
  }, [propFlexDirection, propPosition]);

  return (
    <Image
      style={[styles.menuIcon, mENUIcon1Style]}
      contentFit="cover"
      source={require("../assets/menu2.png")}
    />
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    borderRadius: Border.br_lgi,
    width: 361,
    height: 61,
    overflow: "hidden",
    zIndex: 2,
  },
});

export default MENUIcon2;
