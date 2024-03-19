import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function Food() {
  return (
    <View>
      <Text style={styles.textContainer}>Food</Text>
      <Text style={styles.text}>What do you want to eat?</Text>
      <View style={styles.view1}>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>everiting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>vegetarian</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>vegan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Food;
const styles = StyleSheet.create({
  textContainer: {
    marginTop: 12,
    fontSize: 20,
    padding: 12,
    fontWeight: "bold",
  },
  text: { fontSize: 16, paddingHorizontal: 12 },
  view1: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationBtn: {
    margin: 12,
    width: 75,
    height: 35,
    backgroundColor: "white",
    borderRadius: 20, // ניתן לשנות את עצמו ליצירת פינות מעוגלות
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
});
