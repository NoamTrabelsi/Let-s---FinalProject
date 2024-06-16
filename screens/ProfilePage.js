import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import UserProfileHeader from "../components/ProfilePage/UserProfileHeader";
import UserInfo from "../components/ProfilePage/UserInfo";
import UserInterests from "../components/ProfilePage/UserInterests";
import AboutUser from "../components/ProfilePage/AboutUser";
import UsersReviews from "../components/ProfilePage/UsersReviews";
import AddReviewModal from "../components/ProfilePage/AddReviewModal";
import { UserContext } from "../components/UserContext/UserContext";
import { transportOptions } from "../components/ProfileInfo/Movement";
import { foodOptions } from "../components/ProfileInfo/Food";
import { sleepOptions } from "../components/ProfileInfo/Sleep";
import { adventureOptions } from "../components/ProfileInfo/Adventure";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const ProfilePage = () => {
  const navigator = useNavigation();

  const { user, updateUser } = useContext(UserContext);
  const route = useRoute();
  const viewedUser = route.params?.foundUser;
  const viewedUserMatch = route.params?.tripMatch;

  const pageOwner = viewedUser ? viewedUser : user;
  const match = viewedUserMatch ? viewedUserMatch : 100;

  const [isModalVisible, setModalVisible] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");
  const [userReviews, setUserReviews] = useState(pageOwner.reviews || []);
  const [reviewRating, setReviewRating] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveReview = () => {
    if (newReviewText.trim() === "") {
      setErrorMessage("Review cannot be empty");
      return;
    }

    const newReview = {
      name: user.firstName || "Anonymous",
      age: user.age,
      location: user.location,
      rating: reviewRating,
      text: newReviewText,
    };

    const updatedReviews = [newReview, ...userReviews];
    setUserReviews(updatedReviews);
    updateUser("reviews", updatedReviews);
    setModalVisible(false);
    setNewReviewText("");
    setReviewRating(1);
  };

  const handleChatWithUser = () => {
    navigator.navigate("ChatWithUser");
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddReviewModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        handleSaveReview={handleSaveReview}
        reviewRating={reviewRating}
        setReviewRating={setReviewRating}
        newReviewText={newReviewText}
        setNewReviewText={setNewReviewText}
        errorMessage={errorMessage}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserProfileHeader imageUri={pageOwner.image} />
        <UserInfo pageOwner={pageOwner} match={match} />

        <UserInterests
          title="Movement"
          icon="bus"
          interests={pageOwner.interests.movement}
          options={transportOptions}
        />
        <UserInterests
          title="Food"
          icon="cafe"
          interests={pageOwner.interests.food}
          options={foodOptions}
        />
        <UserInterests
          title="Sleep"
          icon="bed"
          interests={pageOwner.interests.sleep}
          options={sleepOptions}
        />
        <UserInterests
          title="Adventure"
          icon="business"
          interests={pageOwner.interests.adventure}
          options={adventureOptions}
        />
        <AboutUser aboutUser={pageOwner} />
        <UsersReviews userReviews={userReviews} />
        {/* Add Review and Chat buttons if user is not the page owner */}
        {pageOwner.id !== user.id && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>Add Review</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.chatButton]}
              onPress={handleChatWithUser}
            >
              <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Add Review and Chat buttons if user is the page owner */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8C00",
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
