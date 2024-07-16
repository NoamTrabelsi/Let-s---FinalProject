import React, { useMemo, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "../UserContext/UserContext";

//set the minimum value for the match
const minimumValue = 50;

function cosineSimilarity(vecA, vecB) {
  const minLength = Math.min(vecA.length, vecB.length);
  const truncatedVecA = vecA.slice(0, minLength);
  const truncatedVecB = vecB.slice(0, minLength);

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < minLength; i++) {
    dotProduct += truncatedVecA[i] * truncatedVecB[i];
    normA += truncatedVecA[i] ** 2;
    normB += truncatedVecB[i] ** 2;
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
