import React, { useMemo, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "../UserContext/UserContext";

//set the minimum value for the match
const minimumValue = 50;

function cosineSimilarity(vecA, vecB) {
  const maxLength = Math.max(vecA.length, vecB.length);
  const extendedVecA = [...vecA, ...Array(maxLength - vecA.length).fill(0)];
  const extendedVecB = [...vecB, ...Array(maxLength - vecB.length).fill(0)];

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < maxLength; i++) {
    dotProduct += extendedVecA[i] * extendedVecB[i];
    normA += extendedVecA[i] ** 2;
    normB += extendedVecB[i] ** 2;
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

const MatchCalculator = ({ userFound, setTripMatch }) => {
  const { user } = useContext(UserContext);

  const calculateMatch = useMemo(() => {
    if (!user || !userFound || !user.interests || !userFound.interests) {
      return minimumValue; //minimum value if no user or userFound
    }

    const interestCategoriesUser = Object.keys(user.interests);
    const interestCategoriesUserFound = Object.keys(userFound.interests);
    const commonCategories = interestCategoriesUser.filter((category) =>
      interestCategoriesUserFound.includes(category)
    );

    if (commonCategories.length === 0) {
      return minimumValue; //minimum value if no common categories
    }

    let totalSimilarity = 0;

    for (const category of commonCategories) {
      const userInterests = user.interests[category] || [];
      const userFoundInterests = userFound.interests[category] || [];

      const similarity = cosineSimilarity(userInterests, userFoundInterests);
      totalSimilarity += similarity;
    }

    const averageSimilarity = totalSimilarity / commonCategories.length;
    const normalizedSimilarity =
      minimumValue + (100 - minimumValue) * averageSimilarity;
    return parseFloat(normalizedSimilarity.toFixed(0));
  }, [user, userFound]);

  useEffect(() => {
    setTripMatch(calculateMatch);
  }, [calculateMatch, setTripMatch]);

  return (
    <View style={styles.ratingContainer}>
      <View style={styles.ratingBar}>
        <View
          style={{
            width: `${calculateMatch}%`,
            height: "100%",
            backgroundColor: "orange",
          }}
        />
      </View>
      <Text style={styles.matchPercentage}>{`${calculateMatch}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingBar: {
    flex: 1,
    height: 10,
    backgroundColor: "#EDEDED",
    borderRadius: 5,
    overflow: "hidden",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  matchPercentage: {
    marginLeft: 10,
    fontSize: 14,
    color: "black",
  },
});

export default MatchCalculator;
