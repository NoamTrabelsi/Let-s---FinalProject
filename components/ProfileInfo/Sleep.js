import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function Sleep() {
  return (
    <View>
      <Text style={styles.textContainer}>Sleep</Text>
      <Text style={styles.text}>Where do you dream?</Text>
      <View style={styles.view1}>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>hotel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>hostel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>rental</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>out-door</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Sleep;
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
    margin: 10,
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
