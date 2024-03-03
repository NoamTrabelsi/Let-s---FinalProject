import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily, FontSize, Color } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const AlexContainer = ({ iWasThinkingTop, iWasThinkingLeft }) => {
  const frameViewStyle = useMemo(() => {
    return {
      ...getStyleValue("top", iWasThinkingTop),
      ...getStyleValue("left", iWasThinkingLeft),
    };
  }, [iWasThinkingTop, iWasThinkingLeft]);

  return (
    <View style={[styles.ellipseParent, frameViewStyle]}>
      <Image
        style={[styles.frameChild, styles.framePosition]}
        contentFit="cover"
        source={require("../assets/ellipse-7.png")}
      />
      <Text style={styles.alex}>Alex</Text>
      <Text style={[styles.iWasThinking, styles.textTypo]}>
        I was thinking the same
      </Text>
      <Text style={[styles.text, styles.textTypo]}>14:36</Text>
      <Image
        style={[styles.frameItem, styles.framePosition]}
        contentFit="cover"
        source={require("../assets/line-21.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  framePosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  textTypo: {
    height: 17,
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.colorBlack,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  frameChild: {
    marginTop: -53,
    marginLeft: -179,
    width: 86,
    height: 86,
  },
  alex: {
    marginTop: -34,
    fontSize: FontSize.size_5xl,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    width: 59,
    height: 24,
    textAlign: "left",
    color: Color.colorBlack,
    marginLeft: -76,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  iWasThinking: {
    marginTop: -3,
    width: 156,
    marginLeft: -76,
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
    fontSize: FontSize.size_sm,
  },
  text: {
    marginTop: -27,
    marginLeft: 139,
    width: 40,
  },
  frameItem: {
    marginTop: 53,
    marginLeft: -175,
    maxHeight: "100%",
    width: 354,
  },
  ellipseParent: {
    top: 0,
    left: 0,
    width: 358,
    height: 106,
    position: "absolute",
  },
});

export default AlexContainer;
