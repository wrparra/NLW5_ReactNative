import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ButtonProps extends TouchableOpacityProps {
  children: any;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({ ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={rest.buttonStyle || styles.button} {...rest}>
      <Text style={rest.textStyle || styles.buttonText}> {rest.children} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 16,
    width: "100%",
    height: 56,
  },
  buttonText: {
    fontFamily: fonts.button,
    color: colors.white,
    fontSize: 17,
  },
});
