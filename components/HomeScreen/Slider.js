import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const Slider = ({ onValuesChange, defaultValues }) => {
  return (
    <View style={styles.sliderContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Age Range:</Text>
        <Text style={styles.value}>
          {defaultValues[0]} - {defaultValues[1]}
        </Text>
      </View>
      <MultiSlider
        values={[defaultValues[0], defaultValues[1]]}
        sliderLength={280}
        onValuesChange={onValuesChange}
        min={18}
        max={60}
        step={1}
        selectedStyle={{
          backgroundColor: "#ffba66",
        }}
        unselectedStyle={{
          backgroundColor: "#d3d3d3",
        }}
        trackStyle={{
          height: 5,
        }}
        markerStyle={{
          height: 20,
          width: 20,
          borderRadius: 10,
          backgroundColor: "#FF8C00",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Slider;
