import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
}

export function PlantCardPrimary({ data, ...rest }: PlantProps) {
  return (
    <RectButton style={styles.button} {...rest}>
      <View style={styles.imageContainer}>
        <SvgFromUri uri={data.photo} style={styles.image} />
      </View>
      <Text style={styles.text}>{data.name}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 70,
    height: 90,
  },
  image: {
    maxWidth: 70,
    maxHeight: 90,
  },
  button: {
    flex: 0.48,
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  },
});
