import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, ImageSourcePropType } from "react-native";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const LogoIcon = ({
  uniqueId,
  propPosition,
  propMarginTop,
  propMarginLeft,
  propTop,
  propLeft,
  propWidth,
  propHeight,
}) => {
  const logoIconStyle = useMemo(() => {
    return {
      ...getStyleValue("position", propPosition),
      ...getStyleValue("marginTop", propMarginTop),
      ...getStyleValue("marginLeft", propMarginLeft),
      ...getStyleValue("top", propTop),
      ...getStyleValue("left", propLeft),
      ...getStyleValue("width", propWidth),
      ...getStyleValue("height", propHeight),
    };
  }, [
    propPosition,
    propMarginTop,
    propMarginLeft,
    propTop,
    propLeft,
    propWidth,
    propHeight,
  ]);

  return (
    <Image
      style={[styles.logoIcon, logoIconStyle]}
      contentFit="cover"
      source={uniqueId}
    />
  );
};

const styles = StyleSheet.create({
  logoIcon: {
    width: 67,
    height: 67,
    overflow: "hidden",
  },
});

export default LogoIcon;
