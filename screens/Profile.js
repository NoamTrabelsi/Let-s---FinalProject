import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

import { transportOptions } from "../components/ProfileInfo/Movement";
import { foodOptions } from "../components/ProfileInfo/Food";
import { sleepOptions } from "../components/ProfileInfo/Sleep";
import { adventureOptions } from "../components/ProfileInfo/Adventure";

const ProfilePage = ({ route }) => {
  const { userInformation } = route.params;

  console.log(transportOptions);

  const tripMatch = 80;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: userInformation.image,
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>
            {userInformation.firstName + " " + userInformation.lastName}
          </Text>
          <View style={styles.ageLocationContainer}>
            <Text style={styles.age}>{userInformation.age}</Text>
            <FontAwesome
              name="circle"
              size={4}
              color="black"
              style={styles.dot}
            />
            <Text style={styles.location}>
              <FontAwesome name="map-marker" size={16} color="black" />{" "}
              {userInformation.location}
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.matchLabel}>Trip Match</Text>
            <View style={styles.ratingBar}>
              <View
                style={{
                  width: tripMatch.toString() + "%",
                  height: "100%",
                  backgroundColor: "orange",
                }}
              />
            </View>
            <Text style={styles.matchPercentage}>
              {tripMatch.toString() + "%"}
            </Text>
            <FontAwesome
              name="comment"
              size={16}
              color="black"
              style={styles.commentIcon}
            />
          </View>
        </View>
        <View style={styles.interestsContainer}>
          <View style={styles.interestSubContainer}>
            <Text style={styles.interestLabel}>Movement</Text>
            {userInformation.interests.movement.map((movement, index) => {
              if (movement === 1) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.interestTag}
                    disabled={true}
                  >
                    <Text>{transportOptions[index]}</Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>

          <View style={styles.interestSubContainer}>
            <Text style={styles.interestLabel}>Food</Text>
            {userInformation.interests.food.map((food, index) => {
              if (food === 1) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.interestTag}
                    disabled={true}
                  >
                    <Text>{foodOptions[index]}</Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>

          <View style={styles.interestSubContainer}>
            <Text style={styles.interestLabel}>Sleep</Text>
            {userInformation.interests.sleep.map((sleep, index) => {
              if (sleep === 1) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.interestTag}
                    disabled={true}
                  >
                    <Text>{sleepOptions[index]}</Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>

          <View style={styles.interestSubContainer}>
            <Text style={styles.interestLabel}>Adventure</Text>
            {userInformation.interests.adventure.map((adventure, index) => {
              if (adventure === 1) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.interestTag}
                    disabled={true}
                  >
                    <Text>{adventureOptions[index]}</Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        </View>

        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>
            About {userInformation.firstName}
          </Text>
          <TextInput
            style={styles.aboutInput}
            multiline={true}
            editable={false}
            value={userInformation.about}
          />
        </View>
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>
            {userInformation.firstName}'s Top Reviews
          </Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={userInformation.reviews}
            keyExtractor={(item, index) => `key-${index}`}
            renderItem={({ item }) => (
              <View style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewName}>
                    {item.name + " | " + item.age + " | " + item.location}
                  </Text>
                  <View style={styles.reviewRating}>
                    {Array.from({ length: item.rating }).map((_, index) => (
                      <FontAwesome
                        key={index}
                        name="star"
                        size={14}
                        color="orange"
                      />
                    ))}
                    {Array.from({ length: 5 - item.rating }).map((_, index) => (
                      <FontAwesome
                        key={index}
                        name="star-o"
                        size={14}
                        color="orange"
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewText}>{item.text}</Text>
              </View>
            )}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.chatButton]}>
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8C00",
  },
  profileHeader: {
    backgroundColor: "white",
    borderBottomColor: "#EDEDED",
  },
  profileImage: {
    width: 400,
    height: 350,
  },
  profileInfo: {
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
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
  interestsContainer: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
  },
  interestSubContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  interestLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  interestTag: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    margin: 5, // Match locationBtn's margin
    paddingVertical: 8, // Match locationBtn's paddingVertical
    paddingHorizontal: 10, // Match locationBtn's paddingHorizontal
    backgroundColor: "#808080", // Match locationBtn's backgroundColor
    borderWidth: 1, // Match locationBtn's borderWidth
    borderColor: "grey", // Match locationBtn's borderColor
    borderRadius: 20, // Match locationBtn's borderRadius
    justifyContent: "center", // Match locationBtn's justifyContent
    alignItems: "center", // Match locationBtn's alignItems
    fontSize: 12, // Adjust font size as needed
    fontWeight: "bold", // Adjust font weight as needed
  },
  aboutContainer: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  aboutInput: {
    marginTop: 10,
    fontSize: 16,
    color: "gray",
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  reviewsContainer: {
    padding: 20,
    backgroundColor: "black",
    height: 250,
  },
  reviewsTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    height: 30,
  },
  reviewItem: {
    marginTop: 20,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    width: 250,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewRating: {
    flexDirection: "row",
  },
  reviewText: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#EDEDED",
  },
  button: {
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    width: "40%",
    justifyContent: "center",
    alignSelf: "center",
  },
  chatButton: {
    backgroundColor: "#FF8C00",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default ProfilePage;
