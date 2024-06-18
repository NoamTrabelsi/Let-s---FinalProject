import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const UsersReviews = ({ userReviews }) => (
  <View style={styles.reviewsContainer}>
    <Text style={styles.reviewsTitle}>User's Top Reviews</Text>
    {userReviews.length !== 0 ? (
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={userReviews}
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
    ) : (
      <Text style={styles.noReviewsText}>No reviews yet</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  reviewsContainer: {
    padding: 20,
    backgroundColor: "black",
    height: 250,
  },
  reviewsTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "left",
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
  noReviewsText: {
    color: "white",
    marginTop: 20,
  },
});

export default UsersReviews;
