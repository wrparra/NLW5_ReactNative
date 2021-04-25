import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnvironmentButtonProps extends RectButtonProps {
  children: any;
  active?: boolean;
}

export function EnvironmentButton({
  children,
  active = false,
  ...rest
}: EnvironmentButtonProps) {
  return (
    <RectButton
      style={[styles.button, active && styles.activeButton]}
      {...rest}
    >
      <Text style={[styles.text, active && styles.activeText]}>{children}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.shape,
    borderRadius: 12,
    minWidth: 76,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  activeButton: {
    backgroundColor: colors.green_light,
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 13,
  },
  activeText: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  },
});
