import React, { memo } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import UserItem from "./UserItem";

const UsersList = ({ users, scrollY, inputContainerHeight }) => {
  console.log(users.length);
  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      {users.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No users found</Text>
        </View>
      ) : (
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: inputContainerHeight,
            backgroundColor: "#f0f0f0",
          }}
          data={users}
          numColumns={2}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => <UserItem item={item} />}
          keyExtractor={(item) => item._id.toString()}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
  },
});

export default memo(UsersList);
