import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import MatchCalculator from "./MatchCalculator";

const UserItem = React.memo(({ item }) => {
  const [tripMatch, setTripMatch] = useState(0);
  const navigation = useNavigation();

  const handlePress = () => {
    console.log(`User ${item.firstName} ${item.lastName} clicked!`);
    navigation.navigate("ProfilePage", {
      foundUser: item,
      tripMatch: tripMatch,
    });
  };

  const firstName = item.firstName || "Unknown";
  const lastName = item.lastName || "";
  const age = item.age != null ? item.age.toString() : "N/A";
  const location = item.location || "Unknown";
  const imageUri = item.image || "https://via.placeholder.com/150"; // Placeholder image if item.image is undefined

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={handlePress} activeOpacity={1}>
        <Image source={{ uri: imageUri }} style={styles.avatar} />

        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>
            {firstName} | {age}
          </Text>
          <View style={styles.spacing} />
          <Text style={styles.itemInfo}>{location}</Text>
          <MatchCalculator userFound={item} setTripMatch={setTripMatch} />
        </View>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  avatar: {
    width: "100%",
    height: Dimensions.get("window").width / 2 - 40,
  },
  itemDetails: {
    padding: 10,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  itemInfo: {
    fontSize: 13,
    color: "#777",
  },
  spacing: {
    height: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  matchPercentage: {
    marginLeft: 10,
    fontSize: 14,
    color: "black",
  },
});

export default UserItem;
