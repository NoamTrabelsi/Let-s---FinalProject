import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import Slider from "./Slider";
import GenderFilter from "./GenderFilter";
import { useState, useEffect } from "react";

const FilterModal = ({
  isVisible,
  toggleModal,
  minAge,
  maxAge,
  setMinAge,
  setMaxAge,
  gender,
  setGender,
}) => {
  const [filteredMinAge, setFilteredMinAge] = useState(minAge);
  const [filteredMaxAge, setFilteredMaxAge] = useState(maxAge);
  const [filteredGender, setFilteredGender] = useState(gender);

  useEffect(() => {
    setFilteredMinAge(minAge);
    setFilteredMaxAge(maxAge);
    setFilteredGender(gender);
  }, [minAge, maxAge, gender]);

  const handleFilterApply = () => {
    setMinAge(filteredMinAge);
    setMaxAge(filteredMaxAge);
    setGender(filteredGender);
    toggleModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Filter Options</Text>
          <View style={styles.filterContainer}>
            <Slider
              defaultValues={[filteredMinAge, filteredMaxAge]}
              onValuesChange={(values) => {
                setFilteredMinAge(values[0]);
                setFilteredMaxAge(values[1]);
              }}
            />
            <GenderFilter
              defaultValue={filteredGender}
              onValueChange={(value) => setFilteredGender(value)}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={handleFilterApply}
          >
            <Text style={styles.textStyle}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  filterContainer: {
    width: "100%",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  buttonClose: {
    height: 50,
    backgroundColor: "#FF8C00",
    padding: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default FilterModal;
