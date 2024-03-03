import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FINDERUSER from "./FINDERUSER";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const TripMatchContainer = ({ propTop }) => {
  const frameStyle = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
    };
  }, [propTop]);

  return (
    <View style={[styles.frame, frameStyle]}>
      <FINDERUSER
        fINDERUSERPosition="absolute"
        fINDERUSERTop={0}
        fINDERUSERLeft={0}
        fINDERUSERHeight={164}
      />
      <FINDERUSER
        fINDERUSERPosition="absolute"
        fINDERUSERTop={0}
        fINDERUSERLeft={190}
        fINDERUSERHeight={164}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    position: "absolute",
    top: 12,
    left: 0,
    width: 354,
    height: 164,
    overflow: "hidden",
  },
});

export default TripMatchContainer;
