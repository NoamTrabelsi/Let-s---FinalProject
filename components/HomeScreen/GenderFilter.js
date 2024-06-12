import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

const GenderFilter = ({ onValueChange, defaultValue }) => {
  const [selectedGender, setSelectedGender] = useState(defaultValue);

  const handleValueChange = (value) => {
    setSelectedGender(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gender:</Text>
      <View style={styles.radioGroup}>
        <View style={styles.radioButton}>
          <RadioButton.Item
            value="all"
            label="All"
            status={selectedGender === "all" ? "checked" : "unchecked"}
            onPress={() => handleValueChange("all")}
            labelStyle={styles.radioLabel}
            color="#FF8C00"
          />
        </View>
        <View style={styles.radioButton}>
          <RadioButton.Item
            value="male"
            label="Male"
            status={selectedGender === "male" ? "checked" : "unchecked"}
            onPress={() => handleValueChange("male")}
            labelStyle={styles.radioLabel}
            color="#FF8C00"
          />
        </View>
        <View style={styles.radioButton}>
          <RadioButton.Item
            value="female"
            label="Female"
            status={selectedGender === "female" ? "checked" : "unchecked"}
            onPress={() => handleValueChange("female")}
            labelStyle={styles.radioLabel}
            color="#FF8C00"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    fontSize: 14,
  },
});

export default GenderFilter;
