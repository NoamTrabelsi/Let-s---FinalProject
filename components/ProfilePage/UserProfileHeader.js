import React from "react";
import { View, Image, StyleSheet } from "react-native";

const UserProfileHeader = ({ imageUri }) => (
  <View style={styles.profileHeader}>
    <Image
      source={{ uri: imageUri }}
      style={styles.profileImage}
      testID="profile-image"
    />
  </View>
);

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: "white",
    borderBottomColor: "#EDEDED",
  },
  profileImage: {
    width: 400,
    height: 350,
    borderBottomLeftRadius: 200,
  },
});

export default UserProfileHeader;
