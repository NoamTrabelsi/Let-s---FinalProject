import { SafeAreaView, StyleSheet, TextInput, View, Text } from "react-native";
function SignUp() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Text style={styles.textContainer}>Create Account</Text>
      </View>
      {/* User name */}
      <View style={styles.viewBody}>
        <Text style={styles.textBody}>User name</Text>
        <View style={styles.textInputView}>
          <TextInput
            placeholder="Enter your user name"
            keyboardType="user-name"
            style={{ width: "100%" }}
          />
        </View>
      </View>
      {/* Password */}
      <View style={styles.viewBody}>
        <Text style={styles.textBody}>Password</Text>
        <View style={styles.textInputView}>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            style={{ width: "100%" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  viewContainer: {
    flex: 1,
    marginHorizontal: 22,
  },
  textContainer: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
    color: "black",
  },
  viewBody: {
    marginBottom: 12,
  },
  textBody: {
    fontSize: 16,
    fontWeight: 400,
    marginVertical: 8,
  },
  textInputView: {
    width: "100%",
    height: 48,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
  },
});
