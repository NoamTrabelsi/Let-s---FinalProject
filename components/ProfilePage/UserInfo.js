import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../UserContext/UserContext";
import { lightFormat } from "date-fns";
import axios from "axios";
import { lOCAL_HOST, SERVER_PORT, SOCKET_PORT } from "@env";

const UserInfo = ({ pageOwner, match }) => {
  const { user, setUser } = useContext(UserContext);

  const handlePress = (index) => {
    Alert.alert(
      "Delete Search",
      "Are you sure you want to delete this search?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteSearch(index),
          style: "destructive",
        },
      ]
    );
  };

  const deleteSearch = async (index) => {
    const updatedTripPlanning = pageOwner.trip_planning.filter(
      (_, i) => i !== index
    );

    try {
      const response = await axios.post(
        `https://${process.env.EXPO_PUBLIC_HOST}/update/${pageOwner._id}`,
        {
          trip_planning: updatedTripPlanning,
        }
      );

      if (response.data.status === "ok") {
        console.log("One of last searchings deleted");
        setUser({ ...user, trip_planning: updatedTripPlanning });
      } else {
        console.log("Error deleting last searching");
        Alert.alert("Error", response.data.data);
      }
    } catch (error) {
      console.error("Error deleting last searching:", error);
      Alert.alert("Error", "Failed to update user");
    }
  };

  const renderSearchingItem = (searching, index) => {
    const searchingItemContent = (
      <View style={styles.searchingItem}>
        <Text style={styles.searchingCountry}>{searching.country}</Text>
        <View style={styles.searchingRow}>
          <MaterialCommunityIcons
            name="airplane-takeoff"
            size={24}
            color="black"
          />
          <Text style={styles.searchingDates}>
            {lightFormat(searching.startDate, "dd/MM/yy")}
          </Text>
        </View>
        <View style={styles.searchingRow}>
          <MaterialCommunityIcons
            name="airplane-landing"
            size={24}
            color="black"
          />
          <Text style={styles.searchingDates}>
            {lightFormat(searching.endDate, "dd/MM/yy")}
          </Text>
        </View>
        {pageOwner._id === user._id && (
          <TouchableOpacity
            style={styles.deleteIcon}
            onPress={() => handlePress(index)}
          >
            <FontAwesome name="trash-o" size={15} color="red" />
          </TouchableOpacity>
        )}
      </View>
    );

    return <View key={index}>{searchingItemContent}</View>;
  };

  return (
    <View style={styles.profileInfo}>
      <Text style={styles.name}>
        {pageOwner.firstName + " " + pageOwner.lastName}
      </Text>
      <View style={styles.ageLocationContainer}>
        <Text style={styles.age}>{pageOwner.age}</Text>
        <Text style={styles.location}>
          <FontAwesome name="map-marker" size={16} color="black" />{" "}
          {pageOwner.location}
        </Text>
      </View>
      {pageOwner._id !== user._id && (
        <View style={styles.ratingContainer}>
          <Text style={styles.matchLabel}>Trip Match</Text>
          <View style={styles.ratingBar}>
            <View
              style={{
                width: `${match}%`,
                height: "100%",
                backgroundColor: "orange",
              }}
            />
          </View>
          <Text style={styles.matchPercentage}>{match}%</Text>
        </View>
      )}
      {pageOwner.trip_planning ? (
        pageOwner.trip_planning.length !== 0 ? (
          <View style={styles.searchingContainer}>
            <View style={styles.searchingHeader}>
              <Ionicons name="search-sharp" size={20} color="black" />
              <Text style={styles.searchingLabel}>Last searchings</Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {pageOwner.trip_planning
                ? pageOwner.trip_planning.map((searching, index) =>
                    renderSearchingItem(searching, index)
                  )
                : null}
            </ScrollView>
          </View>
        ) : null
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  profileInfo: {
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  ageLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  age: {
    fontSize: 16,
    color: "black",
    marginRight: 10,
  },
  location: {
    fontSize: 16,
    color: "black",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  matchLabel: {
    fontSize: 16,
    color: "gray",
    marginRight: 10,
  },
  ratingBar: {
    width: 150,
    height: 20,
    backgroundColor: "#EDEDED",
    borderRadius: 5,
    overflow: "hidden",
  },
  matchPercentage: {
    marginLeft: 10,
    fontSize: 14,
    color: "black",
  },
  searchingContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  searchingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchingLabel: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  searchingItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: 150,
    position: "relative",
  },
  searchingCountry: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  searchingDates: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
    marginLeft: 10,
  },
  searchingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  deleteIcon: {
    position: "absolute",
    top: 12,
    right: 5,
  },
});

export default UserInfo;
