import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function UserConfirmation() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{"😄"}</Text>
        <Text style={styles.title}>Prontinho</Text>
        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>
        <View style={styles.footer}>
          <Button>Começar</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 54,
  },
  title: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    marginVertical: 24,
  },
  subtitle: {
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    lineHeight: 25,
    textAlign: "center",
    marginVertical: 24,
  },
  emoji: {
    fontSize: 48,
  },
  footer: {
    width: "100%",
    marginTop: 40,
  },
});
