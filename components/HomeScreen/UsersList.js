import React from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import UserItem from "./UserItem";

const UsersList = ({ users, scrollY, inputContainerHeight }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export default UsersList;
