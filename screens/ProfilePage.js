import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert,
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
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { lOCAL_HOST, SERVER_PORT, SOCKET_PORT } from "@env";

const ProfilePage = () => {
  const navigator = useNavigation();
  const { user } = useContext(UserContext);
  const route = useRoute();
  const viewedUser = route.params?.foundUser;
  const viewedUserMatch = route.params?.tripMatch;

  const pageOwner = viewedUser ? viewedUser : user;
  const match = viewedUserMatch ? viewedUserMatch : 100;

  const [isModalVisible, setModalVisible] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");
  const [userReviews, setUserReviews] = useState(pageOwner.reviews);
  const [reviewRating, setReviewRating] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [userHasReview, setUserHasReview] = useState(false);
  const [reviewBtnActive, setReviewBtnActive] = useState(false);

  useEffect(() => {
    setUserHasReview(userReviews.some((review) => review.leftBy === user._id));
  }, [userReviews]);

  useFocusEffect(
    useCallback(() => {
      const fetchReviews = async () => {
        try {
          const response = await axios.get(
            `http://${lOCAL_HOST}:${SERVER_PORT}/get_reviews/${pageOwner._id}`
          );
          if (response.data.status === "ok") {
            setUserReviews(response.data.data);
          } else {
            console.log("Error fetching user reviews");
          }
        } catch (error) {
          console.error("Error fetching user reviews:", error);
        }
      };

      const canLeaveReview = async () => {
        try {
          const response = await axios.post(
            `http://${lOCAL_HOST}:${SERVER_PORT}/check_both_clicked`,
            {
              user1Id: user._id,
              user2Id: pageOwner._id,
            }
          );
          if (response.data.bothClicked) {
            setReviewBtnActive(true);
          }
        } catch (error) {
          //console.log("Error checking if both users clicked:", error);
        }
      };

      fetchReviews();
      canLeaveReview();
    }, [pageOwner._id, user._id])
  );

  const handleSaveReview = () => {
    if (newReviewText.trim() === "") {
      setErrorMessage("Review cannot be empty");
      return;
    }

    if (userHasReview) {
      Alert.alert("Error", "You can only leave one review.");
      return;
    }

    const newReview = {
      name: user.firstName || "Anonymous",
      age: user.age,
      leftBy: user._id,
      location: user.location,
      rating: reviewRating,
      text: newReviewText,
    };

    const updatedReviews = [newReview, ...userReviews];

    // Update user reviews in the database
    axios
      .post(`http://${lOCAL_HOST}:${SERVER_PORT}/add_review/${pageOwner._id}`, {
        review: newReview,
      })
      .then((res) => {
        console.log(res.data);
        setUserReviews(updatedReviews);
      })
      .catch((err) => {
        console.log(err);
      });

    setNewReviewText("");
    setReviewRating(1);
    setModalVisible(false);
  };

  const handleChatWithUser = () => {
    navigator.navigate("ChatWithUser", {
      image: viewedUser.image,
      name: viewedUser.firstName,
      receiverId: viewedUser._id,
      senderId: user._id,
      match: match,
    });
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
        <UsersReviews
          userReviews={userReviews}
          user={user}
          owner={pageOwner}
          setUserReviews={setUserReviews}
        />
        {/* Add Review and Chat buttons if user is not the page owner */}
        {pageOwner._id !== user._id && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                (!reviewBtnActive || userHasReview) && styles.disabledButton,
              ]}
              onPress={() =>
                reviewBtnActive && !userHasReview && setModalVisible(true)
              }
              disabled={!reviewBtnActive || userHasReview}
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
  disabledButton: {
    backgroundColor: "#D3D3D3", // Бледный цвет для неактивной кнопки
  },
});

export default ProfilePage;
