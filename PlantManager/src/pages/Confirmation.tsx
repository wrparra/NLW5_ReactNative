import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: "smile" | "hug";
  nextPage: string;
}

const emojis = {
  hug: "🤗",
  smile: "😀",
};

export function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();
  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextPage,
  } = routes.params as Params;
  function handleNextPage() {
    navigation.navigate(nextPage);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.footer}>
          <Button onPress={handleNextPage}>{buttonTitle}</Button>
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
