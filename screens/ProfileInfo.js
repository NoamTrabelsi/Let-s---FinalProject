import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

function ProfileInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Get to know you</Text>
      <View style={styles.view1}>
        <TouchableOpacity style={styles.roundButton}>
          <Text style={styles.buttonText}>Add picture</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.locationBtn}>
            <Text style={styles.buttonText}>Current Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationBtn}>
            <Text style={styles.buttonText}>Age</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default ProfileInfo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8C00",
  },
  text: {
    marginTop: 36,
    fontSize: 24,
    padding: 12,
    fontWeight: "bold",
  },
  view1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  roundButton: {
    margin: 12,
    width: 90,
    height: 90,
    borderRadius: 75, // חצי גובה הכפתור - יציב ליצירת עיגול
    backgroundColor: "white", // צבע רקע של הכפתור
    justifyContent: "center",
    alignItems: "center",
  },
  locationBtn: {
    margin: 12,
    width: 150,
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
