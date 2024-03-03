import * as React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import PartnerFinderView from "../components/PartnerFinderView";
import MENUIcon from "../components/MENUIcon";
import TripMatchContainer from "../components/TripMatchContainer";
import { Color } from "../GlobalStyles";

const HomeScreen = () => {
  return (
    <ScrollView
      style={styles.homeScreen}
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.homeScreenScrollViewContent}
    >
      <PartnerFinderView />
      <View style={styles.frame}>
        <MENUIcon />
        <View style={styles.findUser}>
          <TripMatchContainer />
          <TripMatchContainer propTop={196} />
          <TripMatchContainer propTop={380} />
          <TripMatchContainer propTop={564} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeScreenScrollViewContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  findUser: {
    position: "absolute",
    marginTop: -253.5,
    marginLeft: -177,
    top: "50%",
    left: "50%",
    width: 354,
    height: 507,
  },
  frame: {
    width: 362,
    height: 507,
    overflow: "hidden",
  },
  homeScreen: {
    backgroundColor: Color.colorGray_100,
    flex: 1,
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
});

export default HomeScreen;
