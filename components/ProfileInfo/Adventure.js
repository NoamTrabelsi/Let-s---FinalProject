import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function Adventure() {
  return (
    <View>
      <Text style={styles.textContainer}>Adventure</Text>
      <Text style={styles.text}>Where do you party?</Text>
      <View style={styles.view1}>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>museum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>concert</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>culinary</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>spa</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.view1}>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>beach</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>sport</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>extreme</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>trips</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.view1}>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>climbing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>chill</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>casino</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>bar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.view1}>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>clubs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>coffe shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>new places</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.buttonText}>nature</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.view1}>
        <TouchableOpacity style={styles.locationBtn2}>
          <Text style={styles.buttonText2}>renachitecturetal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn2}>
          <Text style={styles.buttonText2}>shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Adventure;
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
  locationBtn2: {
    margin: 10,
    width: 120,
    height: 35,
    backgroundColor: "white",
    borderRadius: 20, // ניתן לשנות את עצמו ליצירת פינות מעוגלות
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText2: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
});
