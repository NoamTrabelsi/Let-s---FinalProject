import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const UserInfo = ({ user }) => (
  <View style={styles.profileInfo}>
    <Text style={styles.name}>{user.firstName + " " + user.lastName}</Text>
    <View style={styles.ageLocationContainer}>
      <Text style={styles.age}>{user.age}</Text>
      <Text style={styles.location}>
        <FontAwesome name="map-marker" size={16} color="black" />{" "}
        {user.location}
      </Text>
    </View>
    <View style={styles.ratingContainer}>
      <Text style={styles.matchLabel}>Trip Match</Text>
      <View style={styles.ratingBar}>
        <View
          style={{
            width: "80%",
            height: "100%",
            backgroundColor: "orange",
          }}
        />
      </View>
      <Text style={styles.matchPercentage}>80%</Text>
      <FontAwesome
        name="comment"
        size={16}
        color="black"
        style={styles.commentIcon}
      />
    </View>
  </View>
);

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
  dot: {
    marginHorizontal: 5,
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
    fontSize: 14,
    color: "gray",
    marginRight: 10,
  },
  ratingBar: {
    width: 100,
    height: 10,
    backgroundColor: "#EDEDED",
    borderRadius: 5,
    overflow: "hidden",
  },
  matchPercentage: {
    marginLeft: 10,
    fontSize: 14,
    color: "black",
  },
  commentIcon: {
    marginLeft: 10,
  },
});

export default UserInfo;
