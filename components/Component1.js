import React, { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Component = ({
  actionButtonText,
  propPosition,
  propMarginTop,
  propMarginLeft,
  propTop,
  propLeft,
  propFontFamily,
  onComponent16Press,
}) => {
  const component16Style = useMemo(() => {
    return {
      ...getStyleValue("position", propPosition),
      ...getStyleValue("marginTop", propMarginTop),
      ...getStyleValue("marginLeft", propMarginLeft),
      ...getStyleValue("top", propTop),
      ...getStyleValue("left", propLeft),
    };
  }, [propPosition, propMarginTop, propMarginLeft, propTop, propLeft]);

  const createStyle = useMemo(() => {
    return {
      ...getStyleValue("fontFamily", propFontFamily),
    };
  }, [propFontFamily]);

  return (
    <TouchableOpacity
      style={[styles.component16, component16Style]}
      activeOpacity={0.5}
      onPress={onComponent16Press}
    >
      <View style={styles.textBox}>
        <View style={styles.textBoxChild} />
      </View>
      <Text style={[styles.create, createStyle]}>{actionButtonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textBoxChild: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_base,
    backgroundColor: Color.colorDarkslategray,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
    position: "absolute",
  },
  textBox: {
    width: 159,
    zIndex: 0,
    height: 56,
  },
  create: {
    top: "25%",
    left: "26.42%",
    fontSize: FontSize.size_5xl,
    fontWeight: "700",
    fontFamily: FontFamily.adventProBold,
    color: Color.colorWhite,
    textAlign: "left",
    zIndex: 1,
    position: "absolute",
  },
  component16: {
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
  },
});

export default Component;
