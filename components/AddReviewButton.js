import * as React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const AddReviewButton = () => {
  return (
    <Pressable style={styles.addReviewButton}>
      <View style={styles.textPosition}>
        <View style={[styles.textBoxChild, styles.textPosition]} />
      </View>
      <Text style={styles.addReview}>Add Review</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  textPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  textBoxChild: {
    borderRadius: Border.br_base,
    backgroundColor: Color.colorDarkslategray,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
  },
  addReview: {
    top: "25%",
    left: "6.29%",
    fontSize: FontSize.size_5xl,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorWhite,
    textAlign: "left",
    position: "absolute",
  },
  addReviewButton: {
    marginTop: -27.5,
    marginLeft: -177.5,
    top: "50%",
    left: "50%",
    width: 159,
    height: 56,
    position: "absolute",
  },
});

export default AddReviewButton;
