import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const UserItem = React.memo(({ item }) => {
  const tripMatch = Math.floor(Math.random() * 100);
  const navigation = useNavigation();

  const handlePress = () => {
    console.log(`User ${item.firstName} ${item.lastName} clicked!`);
    // Переход на страницу профиля пользователя
    navigation.navigate("ProfilePage", { foundUser: item });
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={handlePress} activeOpacity={1}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.avatar}
        />

        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>
            {item.firstName} | {item.age}
          </Text>
          <View style={styles.spacing} />
          <Text style={styles.itemInfo}>{item.location}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBar}>
              <View
                style={{
                  width: `${tripMatch}%`,
                  height: "100%",
                  backgroundColor: "orange",
                }}
              />
            </View>
            <Text style={styles.matchPercentage}>{`${tripMatch}%`}</Text>
          </View>
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
    height: Dimensions.get("window").width / 2 - 40, // Adjust the height based on screen width
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
  ratingBar: {
    flex: 1,
    height: 10,
    backgroundColor: "#EDEDED",
    borderRadius: 5,
    overflow: "hidden",
  },
});

export default UserItem;
