import * as React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import LogoIcon from "./LogoIcon";
import Component from "./Component";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const PartnerFinderView = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.frame}>
      <View style={styles.frame1}>
        <View style={styles.frame2}>
          <LogoIcon uniqueId={require("../assets/logo.png")} />
          <Text style={styles.findAPartner}>Find a Partner</Text>
        </View>
      </View>
      <View style={styles.frame3}>
        <View style={styles.frame4}>
          <Component
            actionButtonText="Search"
            propPosition="absolute"
            propMarginTop={-28}
            propMarginLeft={-80}
            propTop="50%"
            propLeft="50%"
            propFontFamily="Inter-Bold"
            onComponent16Press={() =>
              navigation.navigate("BottomTabsRoot", { screen: "HomeScreen" })
            }
          />
        </View>
        <View style={styles.frame5}>
          <View style={styles.frame6}>
            <Component
              component1Width={310}
              component1Position="relative"
              component1MarginTop="unset"
              component1MarginLeft="unset"
              component1Top="unset"
              component1Left="unset"
              component1Height={56}
            />
            <Image
              style={styles.settingsIcon}
              contentFit="cover"
              source={require("../assets/settings-icon.png")}
            />
          </View>
          <View style={styles.frame7}>
            <Component
              component1Width={175}
              component1Position="absolute"
              component1MarginTop={-28}
              component1MarginLeft={-182.5}
              component1Top="50%"
              component1Left="50%"
              component1Height={56}
            />
            <Component
              component1Width={175}
              component1Position="absolute"
              component1MarginTop={-28}
              component1MarginLeft={7.5}
              component1Top="50%"
              component1Left="50%"
              component1Height={56}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  findAPartner: {
    fontSize: FontSize.size_13xl,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.colorBlack,
    textAlign: "left",
    width: 45,
    height: 34,
    marginBottom: 11,
    marginLeft: 11,
  },
  frame2: {
    width: 300,
    height: 67,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  frame1: {
    position: "absolute",
    top: 80,
    left: 61,
    width: 308,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  frame4: {
    position: "absolute",
    top: 162,
    left: 95,
    width: 176,
    height: 56,
    overflow: "hidden",
  },
  settingsIcon: {
    position: "relative",
    width: 37,
    height: 34,
    marginLeft: 18,
  },
  frame6: {
    position: "relative",
    top: 0,
    left: 0,
    width: 365,
    height: 56,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 1,
  },
  frame7: {
    width: 365,
    height: 56,
    overflow: "hidden",
    marginRight: 1,
    marginTop: 20,
  },
  frame5: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 366,
    height: 132,
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  frame3: {
    position: "absolute",
    top: 177,
    left: 32,
    width: 366,
    height: 218,
    overflow: "hidden",
  },
  frame: {
    position: "relative",
    borderBottomRightRadius: Border.br_36xl,
    borderBottomLeftRadius: Border.br_36xl,
    backgroundColor: Color.colorCoral,
    width: 430,
    height: 418,
    overflow: "hidden",
  },
});

export default PartnerFinderView;
