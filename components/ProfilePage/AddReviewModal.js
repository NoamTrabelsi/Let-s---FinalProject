import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const StarRating = ({ rating, setRating }) => (
  <View style={styles.starRatingContainer}>
    {Array.from({ length: 5 }).map((_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => setRating(Math.max(1, index + 1))}
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

const AddReviewModal = ({
  isModalVisible,
  setModalVisible,
  handleSaveReview,
  reviewRating,
  setReviewRating,
  newReviewText,
  setNewReviewText,
  errorMessage,
}) => (
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
          <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
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
);

const styles = StyleSheet.create({
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
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddReviewModal;
