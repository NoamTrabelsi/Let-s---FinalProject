import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearProgress } from "@rneui/themed";
import REVIEWSTIKI from "../components/REVIEWSTIKI";
import AddReviewButton from "../components/AddReviewButton";
import ChatButton from "../components/ChatButton";
import { FontFamily, FontSize, Color, Padding, Border } from "../GlobalStyles";

const Profile = () => {
  return (
    <SafeAreaView style={styles.profile}>
      <Image
        style={[styles.frameIcon, styles.frameLayout5]}
        contentFit="cover"
        source={require("../assets/frame1.png")}
      />
      <View style={styles.frameParent}>
        <View style={[styles.frame, styles.frameLayout4]}>
          <View style={[styles.frame1, styles.framePosition1]}>
            <Text style={styles.tomSeleki}>Tom SelekI</Text>
            <Text style={[styles.israel, styles.textTypo]}>Israel</Text>
            <Text style={[styles.text, styles.textPosition]}>24</Text>
            <Image
              style={[styles.vectorIcon, styles.sleepIconPosition]}
              contentFit="cover"
              source={require("../assets/vector3.png")}
            />
            <Image
              style={[styles.line2Icon, styles.line2IconPosition]}
              contentFit="cover"
              source={require("../assets/line-2.png")}
            />
            <Image
              style={[styles.line2Icon1, styles.line2IconPosition]}
              contentFit="cover"
              source={require("../assets/line-2.png")}
            />
          </View>
        </View>
        <LinearProgress
          style={[styles.frame2, styles.frameLayout4]}
          value={0.8}
          variant="determinate"
        />
        <View style={[styles.frame3, styles.frameLayout4]}>
          <View style={[styles.frame4, styles.frameLayout4]}>
            <Text style={[styles.destination, styles.destinationPosition]}>
              Destination
            </Text>
            <View style={[styles.brazilWrapper, styles.wrapperBorder]}>
              <Text style={[styles.brazil, styles.veganTypo]}>Brazil</Text>
            </View>
            <View style={[styles.californiaWrapper, styles.wrapperBorder]}>
              <Text style={[styles.california, styles.veganTypo]}>
                California
              </Text>
            </View>
            <Image
              style={[styles.planeIcon, styles.textPosition]}
              contentFit="cover"
              source={require("../assets/plane-icon.png")}
            />
          </View>
        </View>
        <View style={[styles.frame5, styles.frameLayout3]}>
          <View style={[styles.frame6, styles.framePosition]}>
            <Text style={[styles.food, styles.foodLayout]}>Food</Text>
            <View style={[styles.veganWrapper, styles.foodIconPosition]}>
              <Text style={[styles.vegan, styles.veganTypo]}>vegan</Text>
            </View>
            <Image
              style={[styles.foodIcon, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/food1.png")}
            />
          </View>
        </View>
        <View style={[styles.frame7, styles.frameLayout2]}>
          <View style={[styles.frame8, styles.frameLayout2]}>
            <Text style={[styles.sleep, styles.foodLayout1]}>Sleep</Text>
            <View style={[styles.outDoorWrapper, styles.wrapperBorder]}>
              <Text style={[styles.outDoor, styles.veganTypo]}>out-door</Text>
            </View>
            <Image
              style={[styles.sleepIcon, styles.sleepIconPosition]}
              contentFit="cover"
              source={require("../assets/sleep1.png")}
            />
          </View>
        </View>
        <View style={[styles.frame9, styles.frameLayout1]}>
          <View style={[styles.frame10, styles.frameLayout1]}>
            <Text style={[styles.adventure, styles.foodLayout]}>Adventure</Text>
            <View style={[styles.shoppingWrapper, styles.wrapperPosition]}>
              <Text style={[styles.outDoor, styles.veganTypo]}>shopping</Text>
            </View>
            <View style={[styles.newPlacesWrapper, styles.wrapperPosition]}>
              <Text style={[styles.outDoor, styles.veganTypo]}>new places</Text>
            </View>
            <Image
              style={[styles.hotAirBalloon, styles.frameLayout1]}
              contentFit="cover"
              source={require("../assets/hot-air-balloon1.png")}
            />
          </View>
        </View>
        <View style={[styles.frame11, styles.frameLayout3]}>
          <View style={[styles.frame12, styles.frameLayout3]}>
            <Text style={[styles.language, styles.foodLayout1]}>language</Text>
            <Image
              style={[styles.vectorIcon1, styles.vectorIcon1Position]}
              contentFit="cover"
              source={require("../assets/vector4.png")}
            />
            <View style={[styles.hebrewWrapper, styles.wrapperBorder]}>
              <Text style={[styles.brazil, styles.veganTypo]}>Hebrew</Text>
            </View>
            <View style={[styles.englishWrapper, styles.vectorIcon1Position]}>
              <Text style={[styles.california, styles.veganTypo]}>English</Text>
            </View>
          </View>
        </View>
        <View style={[styles.frame13, styles.foodLayout]}>
          <Text style={[styles.aboutTom, styles.foodLayout]}>About Tom</Text>
        </View>
        <View style={[styles.frame14, styles.frameLayout]}>
          <View style={[styles.frame15, styles.frameLayout]}>
            <Text style={[styles.hiThereIm, styles.brazilTypo]}>
              Hi there! I’m Tom :)
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.frame16, styles.frameLayout5]}>
        <Text style={[styles.tomsTopReviews, styles.foodLayout]}>
          Tom’s Top Reviews
        </Text>
        <Image
          style={[styles.setingsIcon, styles.destinationPosition]}
          contentFit="cover"
          source={require("../assets/setings-icon.png")}
        />
        <View style={[styles.reviews, styles.sleepIconPosition]}>
          <REVIEWSTIKI
            ellipse1={require("../assets/ellipse-1.png")}
            ellipse2={require("../assets/ellipse-2.png")}
            ellipse3={require("../assets/ellipse-2.png")}
            ellipse4={require("../assets/ellipse-2.png")}
            ellipse5={require("../assets/ellipse-2.png")}
            ellipse6={require("../assets/ellipse-6.png")}
            vector={require("../assets/vector5.png")}
            rEVIEWSTIKIPosition="absolute"
            rEVIEWSTIKITop={0}
            rEVIEWSTIKILeft={4}
            rEVIEWSTIKIWidth={385}
            rEVIEWSTIKIHeight={112}
            vectorIconTop="35%"
            vectorIconBottom="25%"
          />
          <REVIEWSTIKI
            ellipse1={require("../assets/ellipse-1.png")}
            ellipse2={require("../assets/ellipse-2.png")}
            ellipse3={require("../assets/ellipse-2.png")}
            ellipse4={require("../assets/ellipse-2.png")}
            ellipse5={require("../assets/ellipse-2.png")}
            ellipse6={require("../assets/ellipse-6.png")}
            vector={require("../assets/vector5.png")}
            rEVIEWSTIKIPosition="absolute"
            rEVIEWSTIKITop={122}
            rEVIEWSTIKILeft={4}
            rEVIEWSTIKIWidth={385}
            rEVIEWSTIKIHeight={112}
            vectorIconTop="35%"
            vectorIconBottom="25%"
          />
          <REVIEWSTIKI
            ellipse1={require("../assets/ellipse-1.png")}
            ellipse2={require("../assets/ellipse-2.png")}
            ellipse3={require("../assets/ellipse-2.png")}
            ellipse4={require("../assets/ellipse-2.png")}
            ellipse5={require("../assets/ellipse-2.png")}
            ellipse6={require("../assets/ellipse-6.png")}
            vector={require("../assets/vector5.png")}
            rEVIEWSTIKIPosition="absolute"
            rEVIEWSTIKITop={244}
            rEVIEWSTIKILeft={4}
            rEVIEWSTIKIWidth={385}
            rEVIEWSTIKIHeight={112}
            vectorIconTop="75%"
            vectorIconBottom="-15%"
          />
          <REVIEWSTIKI
            ellipse1={require("../assets/ellipse-1.png")}
            ellipse2={require("../assets/ellipse-2.png")}
            ellipse3={require("../assets/ellipse-2.png")}
            ellipse4={require("../assets/ellipse-2.png")}
            ellipse5={require("../assets/ellipse-2.png")}
            ellipse6={require("../assets/ellipse-6.png")}
            vector={require("../assets/vector5.png")}
            rEVIEWSTIKIPosition="absolute"
            rEVIEWSTIKITop={366}
            rEVIEWSTIKILeft={4}
            rEVIEWSTIKIWidth={385}
            rEVIEWSTIKIHeight={112}
            vectorIconTop="75%"
            vectorIconBottom="-15%"
          />
        </View>
      </View>
      <View style={styles.frame17}>
        <AddReviewButton />
        <ChatButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  frameLayout5: {
    width: 430,
    overflow: "hidden",
  },
  frameLayout4: {
    height: 34,
    position: "absolute",
  },
  framePosition1: {
    left: 20,
    top: 0,
    overflow: "hidden",
  },
  textTypo: {
    height: 23,
    marginTop: -9,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_5xl,
    textAlign: "left",
    color: Color.colorBlack,
  },
  textPosition: {
    width: 30,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  sleepIconPosition: {
    left: "50%",
    top: "50%",
  },
  line2IconPosition: {
    height: 24,
    maxWidth: "100%",
    marginTop: -8,
    left: "50%",
    top: "50%",
    position: "absolute",
    overflow: "hidden",
  },
  destinationPosition: {
    height: 22,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  wrapperBorder: {
    paddingVertical: Padding.p_4xs,
    paddingHorizontal: Padding.p_6xs,
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_19xl,
    flexDirection: "row",
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    alignItems: "center",
  },
  veganTypo: {
    textAlign: "center",
    fontSize: FontSize.size_smi,
  },
  frameLayout3: {
    height: 35,
    position: "absolute",
    overflow: "hidden",
  },
  framePosition: {
    left: 23,
    top: 0,
  },
  foodLayout: {
    height: 21,
    position: "absolute",
  },
  foodIconPosition: {
    marginTop: -17.45,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  iconLayout: {
    width: 35,
    height: 35,
  },
  frameLayout2: {
    height: 38,
    position: "absolute",
    overflow: "hidden",
  },
  foodLayout1: {
    lineHeight: 20,
    textAlign: "left",
  },
  frameLayout1: {
    height: 46,
    position: "absolute",
  },
  wrapperPosition: {
    marginTop: -12.95,
    paddingVertical: Padding.p_4xs,
    paddingHorizontal: Padding.p_6xs,
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_19xl,
    left: "50%",
    top: "50%",
    position: "absolute",
    alignItems: "center",
    overflow: "hidden",
  },
  vectorIcon1Position: {
    marginTop: -17.5,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  frameLayout: {
    height: 140,
    position: "absolute",
    overflow: "hidden",
  },
  brazilTypo: {
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
  },
  frameIcon: {
    height: 488,
  },
  tomSeleki: {
    marginTop: -17,
    marginLeft: -194.5,
    fontSize: FontSize.size_13xl,
    width: 171,
    textAlign: "left",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    color: Color.colorBlack,
    left: "50%",
    top: "50%",
    height: 34,
    position: "absolute",
  },
  israel: {
    marginLeft: 131.5,
    width: 63,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  text: {
    marginLeft: 28.5,
    height: 23,
    marginTop: -9,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_5xl,
    textAlign: "left",
    color: Color.colorBlack,
  },
  vectorIcon: {
    marginTop: -6,
    marginLeft: 112.5,
    width: 14,
    height: 20,
    position: "absolute",
    top: "50%",
  },
  line2Icon: {
    marginLeft: 0.5,
  },
  line2Icon1: {
    marginLeft: 85.5,
  },
  frame1: {
    width: 389,
    height: 34,
    position: "absolute",
  },
  frame: {
    left: 0,
    top: 0,
    width: 409,
    overflow: "hidden",
  },
  frame2: {
    top: 58,
    width: 391,
    left: 0,
    overflow: "hidden",
  },
  destination: {
    marginTop: -13.15,
    marginLeft: -117,
    width: 141,
    lineHeight: 20,
    textAlign: "left",
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    color: Color.colorBlack,
  },
  brazil: {
    color: Color.colorGray_100,
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
  },
  brazilWrapper: {
    marginTop: -16.85,
    marginLeft: 33,
    left: "50%",
    top: "50%",
    position: "absolute",
    overflow: "hidden",
  },
  california: {
    color: Color.colorWhite,
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
  },
  californiaWrapper: {
    marginTop: -17.15,
    marginLeft: 92,
    left: "50%",
    top: "50%",
    position: "absolute",
    overflow: "hidden",
  },
  planeIcon: {
    marginTop: -15.15,
    marginLeft: -164,
    height: 27,
  },
  frame4: {
    left: 28,
    width: 328,
    top: 0,
    overflow: "hidden",
  },
  frame3: {
    top: 116,
    width: 356,
    left: 0,
    overflow: "hidden",
  },
  food: {
    marginTop: -11.45,
    marginLeft: -34.7,
    width: 61,
    lineHeight: 20,
    textAlign: "left",
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    color: Color.colorBlack,
    left: "50%",
    top: "50%",
  },
  vegan: {
    color: Color.colorGray_100,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_smi,
  },
  veganWrapper: {
    marginLeft: 34.5,
    paddingVertical: Padding.p_4xs,
    paddingHorizontal: Padding.p_6xs,
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_19xl,
    flexDirection: "row",
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    alignItems: "center",
    overflow: "hidden",
  },
  foodIcon: {
    marginLeft: -86.5,
    marginTop: -17.45,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  frame6: {
    width: 173,
    height: 35,
    position: "absolute",
    overflow: "hidden",
  },
  frame5: {
    top: 174,
    width: 196,
    left: 0,
  },
  sleep: {
    marginTop: -10,
    marginLeft: -44.5,
    width: 73,
    height: 25,
    fontSize: FontSize.size_5xl,
    lineHeight: 20,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    color: Color.colorBlack,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  outDoor: {
    fontFamily: FontFamily.adventProRegular,
    color: Color.colorGray_100,
  },
  outDoorWrapper: {
    marginTop: -14,
    marginLeft: 33.5,
    left: "50%",
    top: "50%",
    position: "absolute",
    overflow: "hidden",
  },
  sleepIcon: {
    marginTop: -19,
    marginLeft: -96.5,
    width: 34,
    height: 34,
    position: "absolute",
  },
  frame8: {
    width: 193,
    left: 23,
    top: 0,
  },
  frame7: {
    top: 233,
    width: 216,
    left: 0,
  },
  adventure: {
    marginTop: -6.95,
    marginLeft: -122.5,
    width: 126,
    lineHeight: 20,
    textAlign: "left",
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    color: Color.colorBlack,
    left: "50%",
    top: "50%",
  },
  shoppingWrapper: {
    marginLeft: 16.5,
  },
  newPlacesWrapper: {
    marginLeft: 95.5,
  },
  hotAirBalloon: {
    marginTop: -22.95,
    marginLeft: -175.5,
    width: 40,
    left: "50%",
    top: "50%",
  },
  frame10: {
    width: 351,
    left: 20,
    top: 0,
    overflow: "hidden",
  },
  frame9: {
    top: 295,
    width: 371,
    left: 0,
    overflow: "hidden",
  },
  language: {
    marginTop: -9.5,
    marginLeft: -102.5,
    width: 109,
    height: 26,
    fontSize: FontSize.size_5xl,
    lineHeight: 20,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    color: Color.colorBlack,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  vectorIcon1: {
    marginLeft: -151.5,
    width: 35,
    height: 35,
  },
  hebrewWrapper: {
    marginTop: -17.2,
    marginLeft: 20.5,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  englishWrapper: {
    marginLeft: 93.5,
    paddingVertical: Padding.p_4xs,
    paddingHorizontal: Padding.p_6xs,
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_19xl,
    flexDirection: "row",
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    alignItems: "center",
  },
  frame12: {
    left: 24,
    width: 303,
    top: 0,
  },
  frame11: {
    top: 365,
    width: 327,
    left: 0,
  },
  aboutTom: {
    marginTop: -10.5,
    marginLeft: -51.5,
    width: 130,
    lineHeight: 20,
    textAlign: "left",
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    color: Color.colorBlack,
    left: "50%",
    top: "50%",
  },
  frame13: {
    top: 424,
    width: 157,
    left: 0,
    overflow: "hidden",
  },
  hiThereIm: {
    marginTop: -51,
    marginLeft: -173.5,
    fontSize: FontSize.size_xl,
    width: 189,
    height: 30,
    lineHeight: 20,
    textAlign: "left",
    color: Color.colorBlack,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  frame15: {
    marginTop: -70,
    marginLeft: -182.5,
    borderRadius: Border.br_xl,
    borderWidth: 3,
    width: 385,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    height: 140,
    left: "50%",
    top: "50%",
  },
  frame14: {
    top: 469,
    width: 405,
    left: 0,
  },
  frameParent: {
    height: 609,
    width: 409,
  },
  tomsTopReviews: {
    marginTop: -145,
    marginLeft: -188,
    width: 227,
    color: Color.colorGray_100,
    lineHeight: 20,
    textAlign: "left",
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    left: "50%",
    top: "50%",
  },
  setingsIcon: {
    marginTop: -143,
    marginLeft: 162,
    width: 24,
  },
  reviews: {
    marginTop: -97,
    marginLeft: -197,
    width: 395,
    height: 257,
    position: "absolute",
    top: "50%",
  },
  frame16: {
    backgroundColor: Color.colorBlack,
    height: 344,
  },
  frame17: {
    width: 355,
    height: 57,
    marginLeft: 41,
    top: 0,
    overflow: "hidden",
  },
  profile: {
    backgroundColor: "#fffdfc",
    flex: 1,
    width: "100%",
    height: 1656,
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default Profile;
