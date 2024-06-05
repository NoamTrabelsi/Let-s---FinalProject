import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const adventureOptions = [
  "museum",
  "concert",
  "culinary",
  "spa",
  "beach",
  "sport",
  "extreme",
  "trips",
  "climbing",
  "chill",
  "casino",
  "bar",
  "clubs",
  "coffee shop",
  "new places",
  "nature",
  "renaissance",
  "shopping",
];

function Adventure() {
  const [selectedAdventures, setSelectedAdventures] = useState([]);
  const [adventuresVector, setAdventuresVector] = useState(
    new Array(adventureOptions.length).fill(0)
  );

  const toggleLocation = (adventure) => {
    setSelectedAdventures((prevAdventures) =>
      prevAdventures.includes(adventure)
        ? prevAdventures.filter((loc) => loc !== adventure)
        : [...prevAdventures, adventure]
    );
  };

  useEffect(() => {
    const vector = adventureOptions.map((adventure) =>
      selectedAdventures.includes(adventure) ? 1 : 0
    );
    setAdventuresVector(vector);
    console.log("Adventure options vector:", vector);
  }, [selectedAdventures]);

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>Adventure</Text>
      <Text style={styles.text}>Where do you party?</Text>
      <View style={styles.choicesContainer}>
        {adventureOptions.map((adventure, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.adventureBtn,
              selectedAdventures.includes(adventure) ? styles.selected : {},
            ]}
            onPress={() => toggleLocation(adventure)}
          >
            <Text style={styles.buttonText}>{adventure}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  textContainer: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
  },
  choicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  adventureBtn: {
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#808080",
  },
  buttonText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Adventure;
