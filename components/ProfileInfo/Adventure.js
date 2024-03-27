import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const locations = [
  "museum", "concert", "culinary", "spa",
  "beach", "sport", "extreme", "trips",
  "climbing", "chill", "casino", "bar",
  "clubs", "coffee shop", "new places", "nature",
  "renaissance", "shopping"
];

function Adventure() {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [locationsVector, setLocationsVector] = useState(new Array(locations.length).fill(0));

  const toggleLocation = (location) => {
    setSelectedLocations(prevLocations =>
      prevLocations.includes(location)
        ? prevLocations.filter((loc) => loc !== location)
        : [...prevLocations, location]
    );
  };

  useEffect(() => {
    // Обновляем векторное представление при изменении selectedLocations
    const vector = locations.map((location) => selectedLocations.includes(location) ? 1 : 0);
    setLocationsVector(vector);
    console.log("Adventure options vector:", vector);
  }, [selectedLocations]); // Зависимость от selectedLocations для пересчёта вектора

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>Adventure</Text>
      <Text style={styles.text}>Where do you party?</Text>
      <View style={styles.choicesContainer}>
        {locations.map((location, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.locationBtn, selectedLocations.includes(location) ? styles.selected : {}]}
            onPress={() => toggleLocation(location)}
          >
            <Text style={styles.buttonText}>{location}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Здесь можете выводить locationsVector на экран, если это необходимо */}
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
  locationBtn: {
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
