import * as React from "react";
import {
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Component from "../components/Component";
import LogoIcon from "../components/LogoIcon";
import { FontFamily, Border, Color, FontSize } from "../GlobalStyles";

const Register = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.register}>
      <TouchableOpacity
        style={styles.textBox}
        activeOpacity={0.5}
        onPress={() => navigation.navigate("Info")}
      >
        <View style={styles.textBoxChild} />
      </TouchableOpacity>
      <Text style={[styles.create, styles.startTypo]}>Create</Text>
      <Component
        component1Width={277}
        component1Position="absolute"
        component1MarginTop="unset"
        component1MarginLeft="unset"
        component1Top={301}
        component1Left={75}
        component1Height={56}
      />
      <Component
        component1Width={277}
        component1Position="absolute"
        component1MarginTop="unset"
        component1MarginLeft="unset"
        component1Top={391}
        component1Left={75}
        component1Height={56}
      />
      <Component
        component1Width={277}
        component1Position="absolute"
        component1MarginTop="unset"
        component1MarginLeft="unset"
        component1Top={477}
        component1Left={75}
        component1Height={56}
      />
      <Component
        component1Width={277}
        component1Position="absolute"
        component1MarginTop="unset"
        component1MarginLeft="unset"
        component1Top={563}
        component1Left={75}
        component1Height={56}
      />
      <Component
        component1Width={277}
        component1Position="absolute"
        component1MarginTop="unset"
        component1MarginLeft="unset"
        component1Top={649}
        component1Left={75}
        component1Height={56}
      />
      <Text style={[styles.start, styles.startTypo]}>start</Text>
      <LogoIcon
        uniqueId={require("../assets/logo2.png")}
        propPosition="absolute"
        propMarginTop="unset"
        propMarginLeft="unset"
        propTop={168}
        propLeft={154}
        propWidth={67}
        propHeight={67}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  startTypo: {
    textAlign: "left",
    fontFamily: FontFamily.adventProBold,
    fontWeight: "700",
    position: "absolute",
  },
  textBoxChild: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_base,
    backgroundColor: Color.colorDarkslategray,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
    position: "absolute",
    width: "100%",
  },
  textBox: {
    top: 772,
    left: 134,
    width: 159,
    height: 56,
    position: "absolute",
  },
  create: {
    top: 786,
    left: 176,
    fontSize: FontSize.size_5xl,
    color: Color.colorWhite,
  },
  start: {
    top: 218,
    left: 195,
    fontSize: 36,
    color: Color.colorBlack,
    width: 79,
    height: 41,
  },
  register: {
    backgroundColor: Color.colorCoral,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default Register;
