import React from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

const UsersList = ({
  users,
  usersPlaceholderList,
  loading,
  scrollY,
  inputContainerHeight,
}) => {
  const tripMatch = Math.floor(Math.random() * 100);
  const data = users.length > 0 ? users : usersPlaceholderList;

  return (
    <Animated.FlatList
      key={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: inputContainerHeight,
        backgroundColor: "#f0f0f0",
      }}
      data={data}
      numColumns={2}
      ItemSeparatorComponent={() => <View />}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image
            source={{
              uri: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTom-qGZ2kbc-w_XAbwHOXbjk6dkRtMMubB7X7vSjSwQl0U3el57lfuXoQRWOMsjFJ5KBZrVpQNv-j0OTg",
            }}
            style={styles.avatar}
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.username}</Text>
            <Text style={styles.itemInfo}>
              {} | {}
            </Text>
            <View style={styles.spacing} />
            <View style={styles.ratingContainer}>
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
          </View>
        </View>
      )}
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
  itemContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  avatar: {
    width: 180,
    height: 150,
  },
  itemDetails: {
    padding: 10,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  itemInfo: {
    fontSize: 13,
    color: "#777",
  },
  spacing: {
    height: 10,
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
});

export default UsersList;
