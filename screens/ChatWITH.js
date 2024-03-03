import * as React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import Container from "../components/Container";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const ChatWITH = () => {
  return (
    <ScrollView
      style={styles.chatWith}
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chatWITHScrollViewContent}
    >
      <View style={styles.orangeTop} />
      <View style={styles.frameParent}>
        <View style={[styles.sendMessegParent, styles.sendLayout]}>
          <View style={[styles.sendMesseg, styles.sendMessegBorder]} />
          <Image
            style={[styles.vectorIcon, styles.iconPosition]}
            contentFit="cover"
            source={require("../assets/vector7.png")}
          />
        </View>
        <Container />
        <Container propTop={374} propBorderColor="#405b66" />
        <Container propTop={126} propBorderColor="#ff8745" />
        <View style={[styles.rectangleParent, styles.frameChildLayout]}>
          <View style={[styles.frameChild, styles.frameChildLayout]} />
          <Text style={[styles.text, styles.textTypo]}>14:36</Text>
          <Text style={[styles.iWasThinking, styles.textTypo]}>
            I was thinking the same
          </Text>
        </View>
      </View>
      <Image
        style={[styles.arrowIcon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/arrow-icon.png")}
      />
      <View style={[styles.profilePicParent, styles.profileLayout]}>
        <ImageBackground
          style={[styles.profilePicIcon, styles.profileLayout]}
          resizeMode="cover"
          source={require("../assets/profilepic.png")}
        />
        <Text style={[styles.alex, styles.alexTypo]}>Alex</Text>
        <Text style={[styles.viewProfile, styles.alexSpaceBlock]}>
          View Profile
        </Text>
      </View>
      <Pressable style={styles.chatWithChild} />
      <Text style={[styles.letsGo, styles.alexTypo]}>Let’s GO!</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chatWITHScrollViewContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sendLayout: {
    height: 104,
    position: "absolute",
    width: 380,
  },
  sendMessegBorder: {
    borderWidth: 4,
    borderRadius: Border.br_mid,
    marginTop: -52,
    borderStyle: "solid",
    left: "50%",
    top: "50%",
  },
  iconPosition: {
    left: "50%",
    top: "50%",
  },
  frameChildLayout: {
    width: 260,
    height: 104,
    position: "absolute",
  },
  textTypo: {
    height: 17,
    color: Color.colorBlack,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  profileLayout: {
    height: 61,
    position: "absolute",
  },
  alexTypo: {
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    textAlign: "left",
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  alexSpaceBlock: {
    marginLeft: -1.5,
    color: Color.colorBlack,
  },
  orangeTop: {
    borderBottomRightRadius: Border.br_31xl,
    borderBottomLeftRadius: Border.br_31xl,
    backgroundColor: Color.colorCoral,
    width: 430,
    height: 170,
    zIndex: 0,
  },
  sendMesseg: {
    marginLeft: -190,
    borderColor: Color.colorBlack,
    height: 104,
    position: "absolute",
    width: 380,
  },
  vectorIcon: {
    marginTop: -9,
    marginLeft: 147,
    width: 29,
    height: 25,
    position: "absolute",
    top: "50%",
  },
  sendMessegParent: {
    top: 572,
    left: 0,
  },
  frameChild: {
    marginLeft: -130,
    borderColor: Color.colorCoral,
    borderWidth: 4,
    borderRadius: Border.br_mid,
    marginTop: -52,
    borderStyle: "solid",
    left: "50%",
    top: "50%",
  },
  text: {
    marginTop: 21,
    marginLeft: 75,
    width: 40,
  },
  iWasThinking: {
    marginTop: -31,
    marginLeft: -107,
    width: 156,
  },
  rectangleParent: {
    top: 248,
    left: 120,
  },
  frameParent: {
    height: 676,
    zIndex: 1,
    width: 380,
  },
  arrowIcon: {
    marginTop: -363,
    marginLeft: 167,
    width: 20,
    height: 20,
    zIndex: 2,
    position: "absolute",
    top: "50%",
  },
  profilePicIcon: {
    marginTop: -30.5,
    marginLeft: -71.5,
    width: 61,
    left: "50%",
    top: "50%",
  },
  alex: {
    marginTop: -17.5,
    fontSize: FontSize.size_5xl,
    width: 59,
    height: 24,
    marginLeft: -1.5,
    color: Color.colorBlack,
  },
  viewProfile: {
    marginTop: 11.5,
    fontSize: FontSize.size_smi,
    width: 73,
    height: 13,
    textAlign: "left",
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
    marginLeft: -1.5,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  profilePicParent: {
    top: 81,
    left: 25,
    width: 143,
    zIndex: 3,
  },
  chatWithChild: {
    marginTop: -367,
    marginLeft: 0,
    borderRadius: 8,
    backgroundColor: Color.colorDarkslategray,
    borderColor: Color.colorWhite,
    borderWidth: 2,
    width: 113,
    height: 38,
    zIndex: 4,
    borderStyle: "solid",
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  letsGo: {
    marginTop: -359,
    marginLeft: 12,
    fontSize: FontSize.size_xl,
    color: Color.colorWhite,
    width: 88,
    zIndex: 5,
  },
  chatWith: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    overflow: "hidden",
    maxWidth: "100%",
  },
});

export default ChatWITH;
