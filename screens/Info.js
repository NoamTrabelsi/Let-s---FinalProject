import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { CheckBox } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Component from "../components/Component";
import { Color, FontSize, Padding, FontFamily, Border } from "../GlobalStyles";

const Info = () => {
  const [frameCheckboxchecked, setFrameCheckboxchecked] = useState(false);
  const [frameCheckbox1checked, setFrameCheckbox1checked] = useState(false);
  const [frameCheckbox2checked, setFrameCheckbox2checked] = useState(false);
  const [frameCheckbox3checked, setFrameCheckbox3checked] = useState(false);
  const [frameCheckbox4checked, setFrameCheckbox4checked] = useState(false);
  const [frameCheckbox5checked, setFrameCheckbox5checked] = useState(false);
  const [frameCheckbox6checked, setFrameCheckbox6checked] = useState(false);
  const [frameCheckbox7checked, setFrameCheckbox7checked] = useState(false);
  const [frameCheckbox8checked, setFrameCheckbox8checked] = useState(false);
  const [frameCheckbox9checked, setFrameCheckbox9checked] = useState(false);
  const [frameCheckbox10checked, setFrameCheckbox10checked] = useState(false);
  const [frameCheckbox11checked, setFrameCheckbox11checked] = useState(false);
  const [frameCheckbox12checked, setFrameCheckbox12checked] = useState(false);
  const [frameCheckbox13checked, setFrameCheckbox13checked] = useState(false);
  const [frameCheckbox14checked, setFrameCheckbox14checked] = useState(false);
  const [frameCheckbox15checked, setFrameCheckbox15checked] = useState(false);
  const [frameCheckbox16checked, setFrameCheckbox16checked] = useState(false);
  const [frameCheckbox17checked, setFrameCheckbox17checked] = useState(false);
  const [frameCheckbox18checked, setFrameCheckbox18checked] = useState(false);
  const [frameCheckbox19checked, setFrameCheckbox19checked] = useState(false);
  const [frameCheckbox20checked, setFrameCheckbox20checked] = useState(false);
  const [frameCheckbox21checked, setFrameCheckbox21checked] = useState(false);
  const [frameCheckbox22checked, setFrameCheckbox22checked] = useState(false);
  const [frameCheckbox23checked, setFrameCheckbox23checked] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.info}>
      <Text style={styles.getToKnow}>Get to know you</Text>
      <View style={styles.frame}>
        <View style={styles.frame1}>
          <View style={[styles.frame2, styles.frameLayout2]}>
            <Component
              component1Width={225}
              component1Position="absolute"
              component1MarginTop={-22}
              component1MarginLeft={-112.5}
              component1Top="50%"
              component1Left="50%"
              component1Height={44}
            />
            <Image
              style={[styles.vectorIcon, styles.wrapperIconPosition]}
              contentFit="cover"
              source={require("../assets/vector.png")}
            />
          </View>
          <View style={[styles.frame3, styles.frameLayout2]}>
            <Component
              component1Width={225}
              component1Position="absolute"
              component1MarginTop={-22}
              component1MarginLeft={-112.5}
              component1Top="50%"
              component1Left="50%"
              component1Height={44}
            />
            <Image
              style={[styles.calendarIcon, styles.wrapperIconPosition]}
              contentFit="cover"
              source={require("../assets/calendar.png")}
            />
          </View>
        </View>
        <Image
          style={styles.frameIcon}
          contentFit="cover"
          source={require("../assets/frame.png")}
        />
      </View>
      <View style={[styles.frame4, styles.frameLayout1]}>
        <Text
          style={[styles.destinationWhereDoContainer, styles.containerPosition]}
        >
          <Text style={[styles.destination, styles.foodTypo]}>{`Destination
`}</Text>
          <Text style={styles.whereDoYou}>Where do you want to visit?</Text>
        </Text>
        <Image
          style={[styles.vectorIcon1, styles.wrapperIconPosition]}
          contentFit="cover"
          source={require("../assets/vector1.png")}
        />
      </View>
      <View style={styles.frame5}>
        <Pressable style={[styles.brazilWrapper, styles.wrapperFrameFlexBox]}>
          <Text style={[styles.brazil, styles.brazilTypo]}>Brazil</Text>
        </Pressable>
        <Pressable
          style={[styles.californiaWrapper, styles.wrapperFrameFlexBox]}
        >
          <Text style={[styles.california, styles.brazilTypo]}>California</Text>
        </Pressable>
        <Pressable style={[styles.wrapper, styles.wrapperLayout]}>
          <Text style={styles.text}>+</Text>
        </Pressable>
      </View>
      <View style={[styles.frame6, styles.frameLayout1]}>
        <Text style={[styles.foodWhatDoContainer, styles.containerPosition]}>
          <Text style={[styles.food, styles.foodTypo]}>{`Food
`}</Text>
          <Text style={styles.whatDoYou}>What do you eat?</Text>
        </Text>
        <Image
          style={[styles.foodIcon, styles.iconPosition]}
          contentFit="cover"
          source={require("../assets/food.png")}
        />
      </View>
      <View style={styles.frame7}>
        <CheckBox
          style={[styles.frameChild, styles.wrapperFrameFlexBox]}
          title="everything"
          disabled={true}
          checked={frameCheckboxchecked}
          onPress={() => setFrameCheckboxchecked(!frameCheckboxchecked)}
          checkedColor="#fefefe"
          containerStyle={styles.frameCheckboxLayout}
        />
        <CheckBox
          style={[styles.frameChild, styles.wrapperFrameFlexBox]}
          title="vegetarian"
          checked={frameCheckbox1checked}
          onPress={() => setFrameCheckbox1checked(!frameCheckbox1checked)}
          checkedColor="#fefefe"
          containerStyle={styles.frameCheckbox1Layout}
        />
        <CheckBox
          style={[styles.frameInner, styles.wrapperFrameFlexBox]}
          title="vegan"
          disabled={true}
          checked={frameCheckbox2checked}
          onPress={() => setFrameCheckbox2checked(!frameCheckbox2checked)}
          checkedColor="#405b66"
          containerStyle={styles.frameCheckbox2Layout}
        />
      </View>
      <View style={[styles.frame8, styles.frameLayout1]}>
        <Text
          style={[styles.sleepWhereDoContainer, styles.whereContainerLayout]}
        >
          <Text style={[styles.food, styles.foodTypo]}>{`Sleep
`}</Text>
          <Text style={styles.whatDoYou}>Where do you dream?</Text>
        </Text>
        <Image
          style={[styles.sleepIcon, styles.wrapperIconPosition]}
          contentFit="cover"
          source={require("../assets/sleep.png")}
        />
      </View>
      <View style={[styles.frame9, styles.frameLayout]}>
        <CheckBox
          style={[styles.frameChild, styles.wrapperFrameFlexBox]}
          title="hotel"
          disabled={true}
          checked={frameCheckbox3checked}
          onPress={() => setFrameCheckbox3checked(!frameCheckbox3checked)}
          checkedColor="#fefefe"
          containerStyle={styles.frameCheckbox3Layout}
        />
        <CheckBox
          style={[styles.frameChild, styles.wrapperFrameFlexBox]}
          title="hostel"
          disabled={true}
          checked={frameCheckbox4checked}
          onPress={() => setFrameCheckbox4checked(!frameCheckbox4checked)}
          checkedColor="#fefefe"
          containerStyle={styles.frameCheckbox4Layout}
        />
        <CheckBox
          style={[styles.frameChild, styles.wrapperFrameFlexBox]}
          title="rental"
          disabled={true}
          checked={frameCheckbox5checked}
          onPress={() => setFrameCheckbox5checked(!frameCheckbox5checked)}
          checkedColor="#fefefe"
          containerStyle={styles.frameCheckbox5Layout}
        />
        <CheckBox
          style={[styles.frameInner, styles.wrapperFrameFlexBox]}
          title="out-door"
          disabled={true}
          checked={frameCheckbox6checked}
          onPress={() => setFrameCheckbox6checked(!frameCheckbox6checked)}
          checkedColor="#405b66"
          containerStyle={styles.frameCheckbox6Layout}
        />
      </View>
      <View style={styles.frame10}>
        <Text
          style={[
            styles.adventureWhereDoContainer,
            styles.whereContainerLayout,
          ]}
        >
          <Text style={[styles.food, styles.foodTypo]}>{`Adventure
`}</Text>
          <Text style={styles.whatDoYou}>Where do you party?</Text>
        </Text>
        <Image
          style={[styles.hotAirBalloon, styles.wrapperIconPosition]}
          contentFit="cover"
          source={require("../assets/hot-air-balloon.png")}
        />
      </View>
      <View>
        <View style={[styles.frame11, styles.frameLayout]}>
          <CheckBox
            style={[styles.frameChild, styles.wrapperFrameFlexBox]}
            title="museum"
            disabled={true}
            checked={frameCheckbox7checked}
            onPress={() => setFrameCheckbox7checked(!frameCheckbox7checked)}
            checkedColor="#fefefe"
            containerStyle={styles.frameCheckbox7Layout}
          />
          <CheckBox
            style={[styles.frameChild, styles.wrapperFrameFlexBox]}
            title="concert"
            disabled={true}
            checked={frameCheckbox8checked}
            onPress={() => setFrameCheckbox8checked(!frameCheckbox8checked)}
            checkedColor="#fefefe"
            containerStyle={styles.frameCheckbox8Layout}
          />
          <CheckBox
            style={[styles.frameChild, styles.wrapperFrameFlexBox]}
            title="renarchitecturetal"
            checked={frameCheckbox9checked}
            onPress={() => setFrameCheckbox9checked(!frameCheckbox9checked)}
            checkedColor="#fefefe"
            containerStyle={styles.frameCheckbox9Layout}
          />
          <CheckBox
            style={[styles.frameChild, styles.wrapperFrameFlexBox]}
            title="culinary"
            disabled={true}
            checked={frameCheckbox10checked}
            onPress={() => setFrameCheckbox10checked(!frameCheckbox10checked)}
            checkedColor="#fefefe"
            containerStyle={styles.frameCheckbox10Layout}
          />
        </View>
        <View style={[styles.frame12, styles.frameSpaceBlock]}>
          <CheckBox
            style={[styles.frameChild, styles.wrapperFrameFlexBox]}
            title="beach"
            disabled={true}
            checked={frameCheckbox11checked}
            onPress={() => setFrameCheckbox11checked(!frameCheckbox11checked)}
            checkedColor="#fefefe"
            containerStyle={styles.frameCheckbox11Layout}
          />
          <CheckBox
            style={[styles.frameInner, styles.wrapperFrameFlexBox]}
            title="shopping"
            disabled={true}
            checked={frameCheckbox12checked}
            onPress={() => setFrameCheckbox12checked(!frameCheckbox12checked)}
            checkedColor="#405b66"
            containerStyle={styles.frameCheckbox12Layout}
          />
          <CheckBox
            style={[styles.frameChild, styles.wrapperFrameFlexBox]}
            title="spa"
            disabled={true}
            checked={frameCheckbox13checked}
            onPress={() => setFrameCheckbox13checked(!frameCheckbox13checked)}
            checkedColor="#fefefe"
            containerStyle={styles.frameCheckbox13Layout}
          />
          <CheckBox
            style={[styles.frameChild, styles.wrapperFrameFlexBox]}
            title="extreme"
            disabled={true}
            checked={frameCheckbox14checked}
            onPress={() => setFrameCheckbox14checked(!frameCheckbox14checked)}
            checkedColor="#fefefe"
            containerStyle={styles.frameCheckbox14Layout}
          />
          <CheckBox
            style={[styles.frameChild, styles.wrapperFrameFlexBox]}
            title="sport"
            disabled={true}
            checked={frameCheckbox15checked}
            onPress={() => setFrameCheckbox15checked(!frameCheckbox15checked)}
            checkedColor="#fefefe"
            containerStyle={styles.frameCheckbox15Layout}
          />
        </View>
        <View style={[styles.frame13, styles.frameSpaceBlock]}>
          <CheckBox
            style={[styles.frameChild, styles.wrapperFrameFlexBox]}
            title="trips"
            disabled={true}
            checked={frameCheckbox16checked}
            onPress={() => setFrameCheckbox16checked(!frameCheckbox16checked)}
            checkedColor="#fefefe"
            containerStyle={styles.frameCheckbox16Layout}
          />
          <CheckBox
            style={[styles.frameChild, styles.wrapperFrameFlexBox]}
            title="climbing"
            disabled={true}
            checked={frameCheckbox17checked}
            onPress={() => setFrameCheckbox17checked(!frameCheckbox17checked)}
            checkedColor="#fefefe"
            containerStyle={styles.frameCheckbox17Layout}
          />
          <CheckBox
            style={[styles.frameChild, styles.wrapperFrameFlexBox]}
            title="Chill"
            disabled={true}
            checked={frameCheckbox18checked}
            onPress={() => setFrameCheckbox18checked(!frameCheckbox18checked)}
            checkedColor="#fefefe"
            containerStyle={styles.frameCheckbox18Layout}
          />
          <CheckBox
            style={[styles.frameChild, styles.wrapperFrameFlexBox]}
            title="casino"
            disabled={true}
            checked={frameCheckbox19checked}
            onPress={() => setFrameCheckbox19checked(!frameCheckbox19checked)}
            checkedColor="#fefefe"
            containerStyle={styles.frameCheckbox19Layout}
          />
          <CheckBox
            style={[styles.frameInner, styles.wrapperFrameFlexBox]}
            title="new places"
            disabled={true}
            checked={frameCheckbox20checked}
            onPress={() => setFrameCheckbox20checked(!frameCheckbox20checked)}
            checkedColor="#405b66"
            containerStyle={styles.frameCheckbox20Layout}
          />
        </View>
        <View style={[styles.frame14, styles.frameSpaceBlock]}>
          <CheckBox
            style={[styles.frameChild, styles.wrapperFrameFlexBox]}
            title="bars"
            disabled={true}
            checked={frameCheckbox21checked}
            onPress={() => setFrameCheckbox21checked(!frameCheckbox21checked)}
            checkedColor="#fefefe"
            containerStyle={styles.frameCheckbox21Layout}
          />
          <CheckBox
            style={[styles.frameChild, styles.wrapperFrameFlexBox]}
            title="clubs"
            disabled={true}
            checked={frameCheckbox22checked}
            onPress={() => setFrameCheckbox22checked(!frameCheckbox22checked)}
            checkedColor="#fefefe"
            containerStyle={styles.frameCheckbox22Layout}
          />
          <CheckBox
            style={[styles.frameChild, styles.wrapperFrameFlexBox]}
            title="coffee shop"
            disabled={true}
            checked={frameCheckbox23checked}
            onPress={() => setFrameCheckbox23checked(!frameCheckbox23checked)}
            checkedColor="#fefefe"
            containerStyle={styles.frameCheckbox23Layout}
          />
        </View>
      </View>
      <View style={[styles.frame15, styles.frameLayout1]}>
        <Text style={[styles.languageHowDoContainer, styles.containerPosition]}>
          <Text style={[styles.destination, styles.foodTypo]}>{`language
`}</Text>
          <Text style={styles.whereDoYou}>how do you say hi?</Text>
        </Text>
        <Image
          style={[styles.vectorIcon2, styles.iconPosition]}
          contentFit="cover"
          source={require("../assets/vector2.png")}
        />
      </View>
      <View style={styles.frame16}>
        <Pressable style={[styles.frameInner, styles.wrapperFrameFlexBox]}>
          <Text style={[styles.brazil, styles.brazilTypo]}>Hebrew</Text>
        </Pressable>
        <Pressable style={[styles.englishWrapper, styles.containerSpaceBlock]}>
          <Text style={[styles.california, styles.brazilTypo]}>English</Text>
        </Pressable>
        <Pressable style={[styles.container, styles.containerSpaceBlock]}>
          <Text style={styles.text}>+</Text>
        </Pressable>
      </View>
      <Component
        actionButtonText="Create"
        onComponent16Press={() =>
          navigation.navigate("BottomTabsRoot", { screen: "HomeScreen" })
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  frameCheckboxLayout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: -115.25,
    marginTop: -16.85,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox1Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: -26.65,
    marginTop: -17.15,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox2Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: 63.25,
    marginTop: -16.85,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox3Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: -121.55,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox4Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: -64.85,
    marginTop: -17,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox5Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: 0.35,
    marginTop: -17,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox6Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: 58.55,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox7Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: -170.1,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox8Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: -92,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox9Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: -19,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox10Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: 280,
    top: 0,
    position: "absolute",
  },
  frameCheckbox11Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: -159.15,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox12Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: -93.85,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox13Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: -10.45,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox14Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: 98.15,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox15Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: 39.85,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox16Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: -166.05,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox17Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: -112.25,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox18Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: -34.45,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox19Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: 19.35,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox20Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: 86.05,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox21Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: -98.55,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox22Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: -44.55,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameCheckbox23Layout: {
    backgroundColor: "transparent",
    padding: 0,
    left: "50%",
    marginLeft: 15.55,
    marginTop: -16.5,
    top: "50%",
    position: "absolute",
  },
  frameLayout2: {
    height: 44,
    left: 0,
    width: 225,
    position: "absolute",
    overflow: "hidden",
  },
  wrapperIconPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  frameLayout1: {
    height: 42,
    overflow: "hidden",
  },
  containerPosition: {
    lineHeight: 20,
    marginTop: -21,
    height: 42,
    left: "50%",
    top: "50%",
    position: "absolute",
    textAlign: "left",
    color: Color.colorBlack,
  },
  foodTypo: {
    fontSize: FontSize.size_5xl,
    fontWeight: "700",
  },
  wrapperFrameFlexBox: {
    paddingVertical: Padding.p_4xs,
    paddingHorizontal: Padding.p_6xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  brazilTypo: {
    fontSize: FontSize.size_smi,
    textAlign: "center",
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
  },
  wrapperLayout: {
    width: 32,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_xs,
  },
  iconPosition: {
    width: 35,
    height: 35,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  whereContainerLayout: {
    width: 150,
    lineHeight: 20,
    height: 42,
    left: "50%",
    top: "50%",
    position: "absolute",
    textAlign: "left",
    color: Color.colorBlack,
  },
  frameLayout: {
    height: 33,
    overflow: "hidden",
  },
  frameSpaceBlock: {
    marginTop: 18,
    height: 33,
    overflow: "hidden",
  },
  containerSpaceBlock: {
    marginLeft: 11,
    paddingVertical: Padding.p_4xs,
    paddingHorizontal: Padding.p_6xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  getToKnow: {
    fontSize: FontSize.size_13xl,
    width: 277,
    height: 37,
    textAlign: "left",
    fontWeight: "700",
    color: Color.colorBlack,
    fontFamily: FontFamily.adventProBold,
  },
  vectorIcon: {
    marginTop: -7.8,
    marginLeft: -98.2,
    width: 14,
    height: 19,
  },
  frame2: {
    top: 0,
    height: 44,
  },
  calendarIcon: {
    marginTop: -7.5,
    marginLeft: -102.4,
    width: 21,
    height: 21,
  },
  frame3: {
    top: 67,
  },
  frame1: {
    left: 130,
    height: 111,
    width: 225,
    position: "absolute",
    top: 0,
    overflow: "hidden",
  },
  frameIcon: {
    width: 89,
    left: 0,
    top: 0,
    position: "absolute",
    overflow: "hidden",
    height: 113,
  },
  frame: {
    width: 355,
    overflow: "hidden",
    height: 113,
  },
  destination: {
    fontFamily: FontFamily.interBold,
  },
  whereDoYou: {
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
    fontSize: FontSize.size_mini,
  },
  destinationWhereDoContainer: {
    marginLeft: -78,
    width: 195,
  },
  vectorIcon1: {
    marginLeft: -117,
    width: 30,
    height: 29,
    marginTop: -17,
  },
  frame4: {
    width: 234,
  },
  brazil: {
    color: Color.colorGray_100,
    textAlign: "center",
  },
  brazilWrapper: {
    marginTop: -16.35,
    marginLeft: -90,
    borderWidth: 2,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_19xl,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  california: {
    color: Color.colorWhite,
    textAlign: "center",
  },
  californiaWrapper: {
    marginTop: -16.65,
    marginLeft: -28,
    borderWidth: 2,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_19xl,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  text: {
    fontSize: FontSize.size_sm,
    fontWeight: "900",
    fontFamily: FontFamily.interBlack,
    textAlign: "center",
    color: Color.colorBlack,
  },
  wrapper: {
    marginTop: -17.65,
    marginLeft: 58,
    paddingVertical: Padding.p_4xs,
    paddingHorizontal: Padding.p_6xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  frame5: {
    width: 180,
    height: 35,
    overflow: "hidden",
  },
  food: {
    fontFamily: FontFamily.adventProBold,
    fontSize: FontSize.size_5xl,
  },
  whatDoYou: {
    fontFamily: FontFamily.adventProLight,
    fontWeight: "300",
    fontSize: FontSize.size_mini,
  },
  foodWhatDoContainer: {
    marginLeft: -39.7,
    width: 120,
  },
  foodIcon: {
    marginLeft: -80.4,
    marginTop: -21,
  },
  frame6: {
    width: 161,
  },
  frameChild: {
    backgroundColor: Color.colorGray_100,
    borderRadius: Border.br_19xl,
    paddingHorizontal: Padding.p_6xs,
    justifyContent: "center",
    alignItems: "center",
  },
  frameInner: {
    borderWidth: 2,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_19xl,
  },
  frame7: {
    width: 231,
    height: 34,
    overflow: "hidden",
  },
  sleepWhereDoContainer: {
    marginLeft: -56.2,
    marginTop: -21,
  },
  sleepIcon: {
    marginTop: -16.8,
    marginLeft: -93.6,
    width: 34,
    height: 34,
  },
  frame8: {
    width: 187,
  },
  frame9: {
    width: 243,
  },
  adventureWhereDoContainer: {
    marginTop: -18.5,
    marginLeft: -52.5,
  },
  hotAirBalloon: {
    marginTop: -23.5,
    marginLeft: -97.3,
    width: 40,
    height: 46,
  },
  frame10: {
    height: 47,
    width: 195,
    overflow: "hidden",
  },
  frame11: {
    width: 340,
  },
  frame12: {
    width: 318,
  },
  frame13: {
    width: 332,
  },
  frame14: {
    width: 197,
  },
  languageHowDoContainer: {
    marginLeft: -45.5,
    width: 136,
  },
  vectorIcon2: {
    marginLeft: -90.5,
    marginTop: -17,
  },
  frame15: {
    width: 181,
  },
  englishWrapper: {
    borderWidth: 2,
    borderColor: Color.colorBlack,
    borderStyle: "solid",
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_19xl,
  },
  container: {
    width: 32,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_xs,
  },
  frame16: {
    width: 175,
    flexDirection: "row",
    overflow: "hidden",
  },
  info: {
    backgroundColor: Color.colorCoral,
    flex: 1,
    width: "100%",
    height: 1184,
    justifyContent: "space-between",
    paddingHorizontal: 33,
    paddingVertical: 57,
  },
});

export default Info;
