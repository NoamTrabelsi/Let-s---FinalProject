import React, { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Component = ({
  component1Width,
  component1Position,
  component1MarginTop,
  component1MarginLeft,
  component1Top,
  component1Left,
  component1Height,
}) => {
  const component1Style = useMemo(() => {
    return {
      ...getStyleValue("width", component1Width),
      ...getStyleValue("position", component1Position),
      ...getStyleValue("marginTop", component1MarginTop),
      ...getStyleValue("marginLeft", component1MarginLeft),
      ...getStyleValue("top", component1Top),
      ...getStyleValue("left", component1Left),
      ...getStyleValue("height", component1Height),
    };
  }, [
    component1Width,
    component1Position,
    component1MarginTop,
    component1MarginLeft,
    component1Top,
    component1Left,
    component1Height,
  ]);

  return (
    <View style={[styles.component1, component1Style]}>
      <View style={[styles.component1Inner, styles.userNamePosition]}>
        <View style={[styles.instanceChild, styles.userNamePosition]} />
      </View>
      <View style={styles.text}>
        <Text style={[styles.userName, styles.userNamePosition]}>
          User Name
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userNamePosition: {
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  instanceChild: {
    borderRadius: Border.br_base,
    backgroundColor: Color.colorGray_100,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
    bottom: "0%",
    right: "0%",
    width: "100%",
    height: "100%",
    left: "0%",
    top: "0%",
  },
  component1Inner: {
    bottom: "0%",
    right: "0%",
    width: "100%",
    height: "100%",
    left: "0%",
    top: "0%",
  },
  userName: {
    fontSize: FontSize.size_base,
    fontWeight: "300",
    fontFamily: FontFamily.interLight,
    color: Color.colorBlack,
    textAlign: "left",
    left: "0%",
    top: "0%",
  },
  text: {
    height: "41.29%",
    width: "36.84%",
    top: "33.03%",
    right: "55.76%",
    bottom: "25.67%",
    left: "7.4%",
    position: "absolute",
  },
  component1: {
    width: 277,
    height: 56,
  },
});

export default Component;
