import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import countryList from "react-select-country-list";
import { UserContext } from "../UserContext/UserContext";

function GetKnow() {
  const { user, updateUser } = useContext(UserContext);
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("Select your age");
  const [picture, setPicture] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const countries = countryList().getData();

  const handleCountryChange = (countryName) => {
    setLocation(countryName);
    updateUser("location", countryName);
    setFilteredCountries([]);
    setIsModalVisible(false);
    Keyboard.dismiss();
  };

  const findCountry = (query) => {
    if (query === "") {
      setFilteredCountries([]);
      return;
    }
    const regex = new RegExp(`${query.trim()}`, "i");
    const filtered = countries.filter(
      (country) => country.label.search(regex) >= 0
    );
    setFilteredCountries(filtered);
  };

  const handleQueryChange = (query) => {
    setLocation(query);
    findCountry(query);
  };

  // Placeholder function for adding a picture
  const addPicture = () => {
    Alert.alert("Add Picture", "Function to add a picture would be here.");
  };

  // Placeholder function for selecting an age
  const selectAge = () => {
    Alert.alert("Age", "Function to select age would be here.");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.text}>Get to know you</Text>
        <View style={styles.view1}>
          <TouchableOpacity style={styles.roundButton} onPress={addPicture}>
            <Text style={styles.buttonText}>Add picture</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={styles.locationBtn}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.buttonText}>
                {user.location || "Current Location"}
              </Text>
            </TouchableOpacity>
            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setIsModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <TextInput
                    style={styles.locationInput}
                    value={location}
                    placeholder="Type country name"
                    placeholderTextColor="gray"
                    onChangeText={handleQueryChange}
                  />
                  {filteredCountries.length > 0 && (
                    <FlatList
                      data={filteredCountries}
                      keyExtractor={(item) => item.value}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.item}
                          onPress={() => handleCountryChange(item.label)}
                        >
                          <Text style={styles.itemText}>{item.label}</Text>
                        </TouchableOpacity>
                      )}
                      style={styles.list}
                    />
                  )}
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setIsModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <TouchableOpacity style={styles.locationBtn} onPress={selectAge}>
              <Text style={styles.buttonText}>Age</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start", // Align modal at the top
    alignItems: "center",
    paddingTop: 50, // Add padding at the top for spacing
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  locationInput: {
    width: 250,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  list: {
    maxHeight: 200,
    alignSelf: "stretch", // Make the list take full width
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  itemText: {
    fontSize: 16,
    textAlign: "left", // Align text to the left
  },
  closeButton: {
    backgroundColor: "#FF8C00",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    width: "40%",
    justifyContent: "center",
    alignSelf: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default GetKnow;
