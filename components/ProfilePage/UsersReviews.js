import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { lOCAL_HOST, SERVER_PORT, SOCKET_PORT } from "@env";

const UsersReviews = ({ userReviews, user, owner, setUserReviews }) => {
  const handlePress = (index) => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteReview(index),
          style: "destructive",
        },
      ]
    );
  };

  const deleteReview = async (index) => {
    const updatedReviews = userReviews.filter((_, i) => i !== index);
    try {
      const response = await axios.post(
        `https://${process.env.EXPO_PUBLIC_HOST}/update/${owner._id}`,
        {
          reviews: updatedReviews,
        }
      );

      if (response.data.status === "ok") {
        console.log("Review deleted");
        // Обновление локального состояния для повторного рендеринга компонента
        setUserReviews(updatedReviews);
      } else {
        console.log("Error deleting review");
        Alert.alert("Error", response.data.data);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      Alert.alert("Error", "Failed to update user");
    }
  };

  return (
    <View style={styles.reviewsContainer}>
      <Text style={styles.reviewsTitle}>User's Top Reviews</Text>
      {userReviews.length !== 0 ? (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={userReviews}
          keyExtractor={(item, index) => `key-${index}`}
          renderItem={({ item, index }) => (
            <View style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewName}>
                  {item.name + " | " + item.age + " | " + item.location}
                </Text>
                <View style={styles.reviewRating}>
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <FontAwesome
                      key={idx}
                      name="star"
                      size={14}
                      color="orange"
                    />
                  ))}
                  {Array.from({ length: 5 - item.rating }).map((_, idx) => (
                    <FontAwesome
                      key={idx}
                      name="star-o"
                      size={14}
                      color="orange"
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewText}>{item.text}</Text>
              {item.leftBy === user._id && (
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => handlePress(index)}
                >
                  <FontAwesome name="trash-o" size={15} color="red" />
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      ) : (
        <Text style={styles.noReviewsText}>No reviews yet</Text>
      )}
    </View>
  );
};

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
    alignItems: "flex-start",
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
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  deleteIcon: {
    position: "absolute",
    top: 13,
    right: 10,
  },
});

export default UsersReviews;
