// StarRating.js
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const StarRating = ({ rating, setRating }) => (
  <View style={{ flexDirection: "row" }}>
    {Array.from({ length: 5 }).map((_, index) => (
      <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
        <FontAwesome
          name={index < rating ? "star" : "star-o"}
          size={32}
          color="orange"
        />
      </TouchableOpacity>
    ))}
  </View>
);

export default StarRating;
