import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import AlexContainer from "../components/AlexContainer";
import MENUIcon2 from "../components/MENUIcon2";
import LogoIcon from "../components/LogoIcon";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const Chat = () => {
  return (
    <SafeAreaView style={styles.chat}>
      <View style={styles.orange} />
      <View style={styles.frameParent}>
        <AlexContainer />
        <AlexContainer iWasThinkingTop={252} iWasThinkingLeft={4} />
        <View style={styles.ellipseParent}>
          <Image
            style={[styles.frameChild, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/ellipse-7.png")}
          />
          <Text style={[styles.alex, styles.alexTypo]}>Alex</Text>
          <Text style={[styles.iWasThinking, styles.textTypo]}>
            I was thinking the same
          </Text>
          <Text style={[styles.text, styles.textTypo]}>14:36</Text>
          <Image
            style={[styles.frameItem, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/line-21.png")}
          />
          <Image
            style={[styles.frameInner, styles.framePosition]}
            contentFit="cover"
            source={require("../assets/ellipse-10.png")}
          />
          <Text style={[styles.text1, styles.alexTypo]}>3</Text>
        </View>
      </View>
      <MENUIcon2 />
      <LogoIcon
        uniqueId={require("../assets/logo1.png")}
        propPosition="absolute"
        propMarginTop={-388}
        propMarginLeft={-78}
        propTop="50%"
        propLeft="50%"
        propWidth={67}
        propHeight={67}
      />
      <Text style={[styles.chat1, styles.alexTypo]}>Chat</Text>
      <Image
        style={[styles.arrowIcon, styles.framePosition]}
        contentFit="cover"
        source={require("../assets/arrow-icon.png")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  framePosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  alexTypo: {
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  textTypo: {
    height: 17,
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.colorBlack,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  orange: {
    borderBottomRightRadius: Border.br_31xl,
    borderBottomLeftRadius: Border.br_31xl,
    backgroundColor: Color.colorCoral,
    width: 430,
    height: 170,
    zIndex: 0,
  },
  frameChild: {
    marginLeft: -179,
    width: 86,
    height: 86,
    marginTop: -53,
    top: "50%",
  },
  alex: {
    marginTop: -34,
    fontSize: FontSize.size_5xl,
    width: 59,
    height: 24,
    marginLeft: -76,
  },
  iWasThinking: {
    marginTop: -3,
    width: 156,
    marginLeft: -76,
  },
  text: {
    marginTop: -27,
    marginLeft: 139,
    width: 40,
  },
  frameItem: {
    marginTop: 53,
    marginLeft: -175,
    maxHeight: "100%",
    width: 354,
  },
  frameInner: {
    marginLeft: -110,
    width: 26,
    height: 26,
    marginTop: -53,
    top: "50%",
  },
  text1: {
    marginTop: -49,
    marginLeft: -102,
    fontSize: FontSize.size_mini,
    width: 10,
    height: 15,
  },
  ellipseParent: {
    top: 126,
    left: 4,
    width: 358,
    height: 106,
    position: "absolute",
  },
  frameParent: {
    width: 362,
    height: 358,
    zIndex: 1,
  },
  chat1: {
    marginTop: -376,
    marginLeft: 0,
    fontSize: FontSize.size_13xl,
    width: 77,
    height: 41,
    zIndex: 4,
  },
  arrowIcon: {
    marginTop: -363,
    marginLeft: 167,
    width: 20,
    height: 20,
    zIndex: 5,
  },
  chat: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Chat;
