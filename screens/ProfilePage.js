import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { UserContext } from "../components/UserContext/UserContext";
import { transportOptions } from "../components/ProfileInfo/Movement";
import { foodOptions } from "../components/ProfileInfo/Food";
import { sleepOptions } from "../components/ProfileInfo/Sleep";
import { adventureOptions } from "../components/ProfileInfo/Adventure";

const ProfilePage = () => {
  const { user, updateUser } = useContext(UserContext); // Убедитесь, что updateUser доступна

  const [isModalVisible, setModalVisible] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");
  const [userReviews, setUserReviews] = useState(user.reviews || []);
  const [reviewRating, setReviewRating] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveReview = () => {
    if (newReviewText.trim() === "") {
      setErrorMessage("Review cannot be empty");
      return;
    }

    const newReview = {
      name: user.firstName || "Anonymous", // Используйте имя текущего пользователя или "Anonymous"
      age: user.age,
      location: user.location,
      rating: reviewRating,
      text: newReviewText,
    };

    const updatedReviews = [newReview, ...userReviews];
    setUserReviews(updatedReviews);
    updateUser("reviews", updatedReviews); // Обновляем контекст пользователя
    setModalVisible(false);
    setNewReviewText(""); // Очистите поле ввода после сохранения
    setReviewRating(1); // Сброс рейтинга после сохранения
  };

  const StarRating = ({ rating, setRating }) => {
    return (
      <View style={styles.starRatingContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <TouchableOpacity
            key={index}
            onPressIn={() => setRating(Math.max(1, index + 1))}
          >
            <FontAwesome
              name={index < rating ? "star" : "star-o"}
              size={32}
              color="orange"
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const tripMatch = 80;

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Review</Text>
            {errorMessage ? (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errorMessage}
              </Text>
            ) : null}
            <TextInput
              style={styles.reviewInput}
              multiline={true}
              placeholder="Write your review here"
              value={newReviewText}
              blurOnSubmit={true}
              onChangeText={(text) => setNewReviewText(text)}
            />
            <StarRating rating={reviewRating} setRating={setReviewRating} />
            <View style={styles.reviewBtnContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveReview}
              >
                <Text style={styles.buttonText}>Save Review</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: user.image,
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>
            {user.firstName + " " + user.lastName}
          </Text>
          <View style={styles.ageLocationContainer}>
            <Text style={styles.age}>{user.age}</Text>
            <FontAwesome
              name="circle"
              size={4}
              color="black"
              style={styles.dot}
            />
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
            {user.interests.movement.map((movement, index) => {
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
            {user.interests.food.map((food, index) => {
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
            {user.interests.sleep.map((sleep, index) => {
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
            {user.interests.adventure.map((adventure, index) => {
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
          <Text style={styles.aboutTitle}>About {user.firstName}</Text>
          <TextInput
            style={styles.aboutInput}
            multiline={true}
            editable={false}
            value={user.about}
          />
        </View>
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>
            {user.firstName}'s Top Reviews
          </Text>
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
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
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
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#808080",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewInput: {
    width: "100%",
    height: 100,
    borderColor: "#EDEDED",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#F5F5F5",
    textAlignVertical: "top",
  },
  reviewBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#FF8C00",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 5,
  },
  starRatingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
});

export default ProfilePage;
