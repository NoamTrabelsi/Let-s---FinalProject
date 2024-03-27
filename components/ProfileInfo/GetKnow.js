import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
// Assuming necessary libraries for working with date, picture, and location have been imported

function GetKnow() {
  // States for demonstrating functionality without actual implementation
  const [location, setLocation] = useState('Unknown');
  const [age, setAge] = useState('Select your age');
  const [picture, setPicture] = useState(null);

  // Placeholder function for adding a picture
  const addPicture = () => {
    // Code to choose a picture would go here
    Alert.alert('Add Picture', 'Function to add a picture would be here.');
  };

  // Placeholder function for getting the current location
  const getCurrentLocation = () => {
    // Code to get the location would go here
    Alert.alert('Location', 'Function to get current location would be here.');
  };

  // Placeholder function for selecting an age
  const selectAge = () => {
    // Code to select a date would go here
    Alert.alert('Age', 'Function to select age would be here.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Get to know you</Text>
      <View style={styles.view1}>
        <TouchableOpacity style={styles.roundButton} onPress={addPicture}>
          <Text style={styles.buttonText}>Add picture</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.locationBtn} onPress={getCurrentLocation}>
            <Text style={styles.buttonText}>Current Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationBtn} onPress={selectAge}>
            <Text style={styles.buttonText}>Age</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 36,
    fontSize: 24,
    padding: 12,
    fontWeight: "bold",
  },
  view1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  roundButton: {
    margin: 12,
    width: 90,
    height: 90,
    borderRadius: 75, // Half the height of the button - stable for creating a circle
    backgroundColor: "white", // Button background color
    justifyContent: "center",
    alignItems: "center",
  },
  locationBtn: {
    margin: 12,
    width: 150,
    height: 35,
    backgroundColor: "white",
    borderRadius: 20, // Can be adjusted to create rounded corners
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default GetKnow;
