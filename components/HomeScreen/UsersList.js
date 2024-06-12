import React, { useMemo } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import UserItem from "./UserItem";
import { TouchableOpacity } from "react-native-gesture-handler";

const UsersList = ({ users, loading, scrollY, inputContainerHeight }) => {
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
    height: 10,
  },
});

export default UsersList;
