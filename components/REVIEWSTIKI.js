import React, { useMemo } from "react";
import { StyleSheet, View, Text, ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const REVIEWSTIKI = ({
  ellipse1,
  ellipse2,
  ellipse3,
  ellipse4,
  ellipse5,
  ellipse6,
  vector,
  rEVIEWSTIKIPosition,
  rEVIEWSTIKITop,
  rEVIEWSTIKILeft,
  rEVIEWSTIKIWidth,
  rEVIEWSTIKIHeight,
  vectorIconTop,
  vectorIconBottom,
}) => {
  const rEVIEWSTIKIStyle = useMemo(() => {
    return {
      ...getStyleValue("position", rEVIEWSTIKIPosition),
      ...getStyleValue("top", rEVIEWSTIKITop),
      ...getStyleValue("left", rEVIEWSTIKILeft),
      ...getStyleValue("width", rEVIEWSTIKIWidth),
      ...getStyleValue("height", rEVIEWSTIKIHeight),
    };
  }, [
    rEVIEWSTIKIPosition,
    rEVIEWSTIKITop,
    rEVIEWSTIKILeft,
    rEVIEWSTIKIWidth,
    rEVIEWSTIKIHeight,
  ]);

  const vectorIconStyle = useMemo(() => {
    return {
      ...getStyleValue("top", vectorIconTop),
      ...getStyleValue("bottom", vectorIconBottom),
    };
  }, [vectorIconTop, vectorIconBottom]);

  return (
    <View style={[styles.reviewStiki, rEVIEWSTIKIStyle]}>
      <View style={[styles.reviewStikiChild, styles.reviewPosition]} />
      <Image
        style={[styles.reviewStikiItem, styles.vectorIconLayout]}
        contentFit="cover"
        source={ellipse1}
      />
      <Text style={[styles.liron25, styles.liron25FlexBox]}>
        Liron | 25 | Iceland
      </Text>
      <Text
        style={[styles.thisGuyIs, styles.liron25FlexBox]}
      >{`“This guy is the best, i had such a wonderful and funny i wish i’d....” `}</Text>
      <Image
        style={[styles.reviewStikiInner, styles.reviewChildLayout]}
        contentFit="cover"
        source={ellipse2}
      />
      <Image
        style={[styles.ellipseIcon, styles.ellipseIconPosition]}
        contentFit="cover"
        source={ellipse3}
      />
      <Image
        style={[styles.reviewStikiChild1, styles.reviewChildLayout]}
        contentFit="cover"
        source={ellipse4}
      />
      <Image
        style={[styles.reviewStikiChild2, styles.reviewChildLayout]}
        contentFit="cover"
        source={ellipse5}
      />
      <Image
        style={[styles.reviewStikiChild3, styles.reviewChildLayout]}
        contentFit="cover"
        source={ellipse6}
      />
      <View style={[styles.readFullReviewParent, styles.ellipseIconPosition]}>
        <Text style={[styles.readFullReview, styles.liron25FlexBox]}>
          Read full review
        </Text>
        <Image
          style={[styles.vectorIcon, styles.vectorIconLayout, vectorIconStyle]}
          contentFit="cover"
          source={vector}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewPosition: {
    left: "0%",
    top: "0%",
  },
  vectorIconLayout: {
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    position: "absolute",
  },
  liron25FlexBox: {
    textAlign: "left",
    color: Color.colorBlack,
    lineHeight: 20,
    position: "absolute",
  },
  reviewChildLayout: {
    bottom: "65.18%",
    top: "20.54%",
    width: "4.16%",
    height: "14.29%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
  },
  ellipseIconPosition: {
    left: "73.77%",
    position: "absolute",
  },
  reviewStikiChild: {
    height: "96.7%",
    width: "100%",
    bottom: "3.3%",
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorGray_100,
    right: "0%",
    position: "absolute",
  },
  reviewStikiItem: {
    height: "58.04%",
    width: "17.14%",
    top: "21.43%",
    right: "78.44%",
    bottom: "20.54%",
    left: "4.42%",
  },
  liron25: {
    height: "16.34%",
    width: "35.84%",
    top: "18.48%",
    left: "25.97%",
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    color: Color.colorBlack,
    lineHeight: 20,
  },
  thisGuyIs: {
    height: "42.41%",
    width: "64.68%",
    top: "41.07%",
    left: "25.71%",
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    color: Color.colorBlack,
    lineHeight: 20,
  },
  reviewStikiInner: {
    right: "27.79%",
    left: "68.05%",
    position: "absolute",
  },
  ellipseIcon: {
    right: "22.08%",
    bottom: "65.18%",
    top: "20.54%",
    width: "4.16%",
    height: "14.29%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
  },
  reviewStikiChild1: {
    right: "16.36%",
    left: "79.48%",
    position: "absolute",
  },
  reviewStikiChild2: {
    right: "10.91%",
    left: "84.94%",
    position: "absolute",
  },
  reviewStikiChild3: {
    right: "5.45%",
    left: "90.39%",
    position: "absolute",
  },
  readFullReview: {
    height: "100%",
    width: "91.67%",
    fontSize: FontSize.size_3xs,
    fontWeight: "300",
    fontFamily: FontFamily.interLight,
    left: "0%",
    top: "0%",
  },
  vectorIcon: {
    height: "40%",
    width: "9.52%",
    top: "35%",
    bottom: "25%",
    left: "90.48%",
    right: "0%",
  },
  readFullReviewParent: {
    height: "17.86%",
    width: "21.82%",
    top: "77.68%",
    right: "4.42%",
    bottom: "4.46%",
  },
  reviewStiki: {
    width: 385,
    height: 112,
  },
});

export default REVIEWSTIKI;
