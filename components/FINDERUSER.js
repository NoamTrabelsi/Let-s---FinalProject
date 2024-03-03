import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const FINDERUSER = ({
  fINDERUSERPosition,
  fINDERUSERTop,
  fINDERUSERLeft,
  fINDERUSERHeight,
}) => {
  const fINDERUSERStyle = useMemo(() => {
    return {
      ...getStyleValue("position", fINDERUSERPosition),
      ...getStyleValue("top", fINDERUSERTop),
      ...getStyleValue("left", fINDERUSERLeft),
      ...getStyleValue("height", fINDERUSERHeight),
    };
  }, [fINDERUSERPosition, fINDERUSERTop, fINDERUSERLeft, fINDERUSERHeight]);

  return (
    <View style={[styles.finderUser, fINDERUSERStyle]}>
      <Image
        style={[styles.finderUserChild, styles.finderPosition]}
        contentFit="cover"
        source={require("../assets/rectangle-15.png")}
      />
      <LinearGradient
        style={[styles.finderUserItem, styles.finderPosition]}
        locations={[0.34, 0.85]}
        colors={["rgba(217, 217, 217, 0)", "#000"]}
      />
      <Text style={styles.liron22Container}>
        <Text style={styles.liron}>
          <Text style={styles.text1Typo1}>Liron</Text>
        </Text>
        <Text style={styles.israel}>
          <Text style={styles.liron}>{` `}</Text>
          <Text style={styles.israel1}>| 22 | Israel</Text>
        </Text>
      </Text>
      <View style={[styles.finderUserInner, styles.rectangleViewLayout]} />
      <View style={[styles.rectangleView, styles.rectangleViewLayout]} />
      <Text style={[styles.text1, styles.text1Typo]}>80%</Text>
      <Text style={[styles.tripMatch, styles.text1Typo]}>Trip Match</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  finderPosition: {
    borderRadius: Border.br_8xl,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  rectangleViewLayout: {
    borderRadius: Border.br_40xl,
    position: "absolute",
  },
  text1Typo: {
    color: Color.colorBlack,
    fontSize: FontSize.size_8xs,
    top: "89.02%",
    height: "3.05%",
    textAlign: "left",
    position: "absolute",
  },
  finderUserChild: {
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  finderUserItem: {
    backgroundColor: "transparent",
  },
  text1Typo1: {
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  liron: {
    fontSize: FontSize.size_base,
  },
  israel1: {
    fontSize: FontSize.size_2xs,
  },
  israel: {
    fontWeight: "300",
    fontFamily: FontFamily.interLight,
  },
  liron22Container: {
    height: "10.98%",
    width: "90.85%",
    top: "74.39%",
    color: Color.colorWhite,
    textAlign: "left",
    left: "6.1%",
    position: "absolute",
  },
  finderUserInner: {
    height: "5.49%",
    width: "59.15%",
    top: "87.8%",
    right: "34.76%",
    bottom: "6.71%",
    borderStyle: "solid",
    borderColor: Color.colorGray_100,
    borderWidth: 1,
    left: "6.1%",
    borderRadius: Border.br_40xl,
  },
  rectangleView: {
    height: "4.27%",
    width: "48.78%",
    top: "88.41%",
    right: "44.51%",
    bottom: "7.32%",
    left: "6.71%",
    backgroundColor: Color.colorCoral,
  },
  text1: {
    width: "7.32%",
    left: "47.56%",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  tripMatch: {
    width: "16.46%",
    left: "8.54%",
    fontFamily: FontFamily.interRegular,
  },
  finderUser: {
    width: 164,
    height: 164,
  },
});

export default FINDERUSER;
