import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { Border } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const MENUIcon = ({
  propPosition,
  propMarginTop,
  propMarginLeft,
  propTop,
  propLeft,
  propFlexDirection,
}) => {
  const mENUIconStyle = useMemo(() => {
    return {
      ...getStyleValue("position", propPosition),
      ...getStyleValue("marginTop", propMarginTop),
      ...getStyleValue("marginLeft", propMarginLeft),
      ...getStyleValue("top", propTop),
      ...getStyleValue("left", propLeft),
      ...getStyleValue("flexDirection", propFlexDirection),
    };
  }, [
    propPosition,
    propMarginTop,
    propMarginLeft,
    propTop,
    propLeft,
    propFlexDirection,
  ]);

  return (
    <Image
      style={[styles.menuIcon, mENUIconStyle]}
      contentFit="cover"
      source={require("../assets/menu.png")}
    />
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    position: "absolute",
    marginTop: 162.5,
    marginLeft: -181,
    top: "50%",
    left: "50%",
    borderRadius: Border.br_lgi,
    width: 361,
    height: 61,
    overflow: "hidden",
  },
});

export default MENUIcon;
