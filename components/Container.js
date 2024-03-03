import React, { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Container = ({ propTop, propBorderColor }) => {
  const frameView1Style = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
    };
  }, [propTop]);

  const rectangleViewStyle = useMemo(() => {
    return {
      ...getStyleValue("borderColor", propBorderColor),
    };
  }, [propBorderColor]);

  return (
    <View style={[styles.rectangleParent, frameView1Style]}>
      <View style={[styles.frameChild, rectangleViewStyle]} />
      <Text style={[styles.text, styles.textTypo]}>14:36</Text>
      <Text style={[styles.iWasThinking, styles.textTypo]}>
        I was thinking the same
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    height: 17,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
    fontSize: FontSize.size_sm,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  frameChild: {
    marginTop: -52,
    marginLeft: -190,
    borderRadius: Border.br_mid,
    borderStyle: "solid",
    borderColor: Color.colorDarkslategray,
    borderWidth: 4,
    left: "50%",
    top: "50%",
    height: 104,
    width: 380,
    position: "absolute",
  },
  text: {
    marginTop: 19,
    marginLeft: 135,
    width: 40,
  },
  iWasThinking: {
    marginTop: -35,
    marginLeft: -170,
    width: 156,
  },
  rectangleParent: {
    top: 0,
    left: 0,
    height: 104,
    width: 380,
    position: "absolute",
  },
});

export default Container;
