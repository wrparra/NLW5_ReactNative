import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Wellington</Text>
      </View>
      <Image
        style={styles.userIcon}
        source={{
          uri: "https://avatars.githubusercontent.com/u/687490?v=4",
        }}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
  },
  greeting: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 32,
    lineHeight: 36,
  },
  userName: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 36,
  },
  userIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
});
