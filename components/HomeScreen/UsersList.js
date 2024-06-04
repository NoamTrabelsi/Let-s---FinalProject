import React from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { Skeleton } from "moti/skeleton";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const UsersList = ({
  users,
  usersPlaceholderList,
  loading,
  scrollY,
  inputContainerHeight,
}) => {
  const tripMatch = Math.floor(Math.random() * 100);

  return (
    <Animated.FlatList
      contentContainerStyle={{ paddingTop: inputContainerHeight }}
      data={users.length > 0 ? users : usersPlaceholderList}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => {
        const isLoading = users.length === 0;
        return (
          <View style={styles.itemContainer}>
            <Skeleton.Group show={isLoading}>
              <Skeleton height={70} width={70} radius="round" colorMode="light">
                {!isLoading && (
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.name?.[0]}</Text>
                  </View>
                )}
              </Skeleton>
              <View style={styles.itemDetails}>
                <Skeleton
                  height={30}
                  width="85%"
                  colorMode="light"
                  backgroundColor="#D4D4D4"
                >
                  {!isLoading && (
                    <Text style={styles.itemName}>{item.name}</Text>
                  )}
                </Skeleton>
                <View style={styles.spacing} />
                <Skeleton
                  height={30}
                  width="85%"
                  colorMode="light"
                  backgroundColor="#D4D4D4"
                >
                  {!isLoading && (
                    <View style={styles.ratingContainer}>
                      <Text style={styles.matchLabel}>Match</Text>
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
                    </View>
                  )}
                </Skeleton>
              </View>
            </Skeleton.Group>
          </View>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={loading && <Text>Loading more users...</Text>}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
  },
  itemContainer: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  avatar: {
    height: 70,
    aspectRatio: 1,
    backgroundColor: "#808080",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 25,
    color: "white",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  matchLabel: {
    fontSize: 14,
    color: "black",
    marginRight: 10,
  },
  matchPercentage: {
    marginLeft: 10,
    fontSize: 14,
    color: "black",
  },
  ratingBar: {
    width: 100,
    height: 10,
    backgroundColor: "#EDEDED",
    borderRadius: 5,
    overflow: "hidden",
  },
  itemDetails: {
    marginLeft: 15,
  },
  itemName: {
    fontSize: 20,
  },
  itemEmail: {
    fontSize: 15,
  },
  spacing: {
    height: 5,
  },
});

export default UsersList;
