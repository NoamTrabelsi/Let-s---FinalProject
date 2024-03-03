import * as React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import LogoIcon from "../components/LogoIcon";
import Component from "../components/Component";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Border, Color, FontSize } from "../GlobalStyles";

const LOGIN = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.login}>
      <Image
        style={styles.backPhotoIcon}
        contentFit="cover"
        source={require("../assets/back-photo.png")}
      />
      <LogoIcon
        uniqueId={require("../assets/logo3.png")}
        propPosition="absolute"
        propMarginTop={-249.7}
        propMarginLeft={-63.1}
        propTop="50%"
        propLeft="50%"
        propWidth={127}
        propHeight={129}
      />
      <Component
        component1Width={277}
        component1Position="absolute"
        component1MarginTop={-51.8}
        component1MarginLeft={-138}
        component1Top="50%"
        component1Left="50%"
        component1Height={56}
      />
      <Component
        component1Width={277}
        component1Position="absolute"
        component1MarginTop={43.6}
        component1MarginLeft={-138}
        component1Top="50%"
        component1Left="50%"
        component1Height={56}
      />
      <TouchableOpacity
        style={[styles.textBox, styles.textBoxPosition]}
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate("BottomTabsRoot", { screen: "HomeScreen" })
        }
      >
        <View style={styles.textBoxChild} />
      </TouchableOpacity>
      <Text style={[styles.firstTimeClickContainer, styles.textBoxPosition]}>
        <Text style={[styles.firstTime, styles.firstTimeTypo]}>
          First time?
        </Text>
        <Text style={styles.clickHere}>
          <Text style={styles.text}>{` `}</Text>
          <Text style={styles.firstTimeTypo}>Click here</Text>
        </Text>
      </Text>
      <Image
        style={styles.line2Icon}
        contentFit="cover"
        source={require("../assets/line-22.png")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textBoxPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  firstTimeTypo: {
    fontFamily: FontFamily.adventProBold,
    fontWeight: "700",
  },
  backPhotoIcon: {
    width: 932,
    zIndex: 0,
    height: 932,
  },
  textBoxChild: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_base,
    backgroundColor: Color.colorCoral,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
    position: "absolute",
    width: "100%",
  },
  textBox: {
    marginTop: 199,
    marginLeft: -79.7,
    width: 159,
    height: 56,
    zIndex: 4,
  },
  firstTime: {
    color: Color.colorBlack,
  },
  text: {
    fontFamily: FontFamily.adventProRegular,
  },
  clickHere: {
    color: "#0066ff",
  },
  firstTimeClickContainer: {
    marginTop: 284.8,
    marginLeft: -80.5,
    fontSize: FontSize.size_base,
    textAlign: "center",
    zIndex: 5,
  },
  line2Icon: {
    top: 768,
    left: 223,
    width: 74,
    height: 0,
    zIndex: 6,
    position: "absolute",
  },
  login: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-between",
    height: 932,
    width: "100%",
  },
});

export default LOGIN;
