import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../UserContext/UserContext";
import { lightFormat } from "date-fns";

const UserInfo = ({ pageOwner, match }) => {
  const { user } = useContext(UserContext);

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
      {pageOwner.id !== user.id && (
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
      <View style={styles.searchingContainer}>
        <View style={styles.searchingHeader}>
          <Ionicons name="search-sharp" size={20} color="black" />
          <Text style={styles.searchingLabel}>Last searchings</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {pageOwner.trip_planning.map((searching, index) => (
            <View key={index} style={styles.searchingItem}>
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
            </View>
          ))}
        </ScrollView>
      </View>
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
});

export default UserInfo;
