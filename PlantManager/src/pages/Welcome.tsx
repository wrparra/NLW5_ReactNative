import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";
import { Button } from "../components/Button";
import wateringImage from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export function Welcome() {
  const navigation = useNavigation();

  function handleNextPage() {
    navigation.navigate("UserIdentification");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie{"\n"}suas plantas{"\n"}de forma fácil
        </Text>
        <Image
          source={wateringImage}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembra sempre
          que precisar.
        </Text>
        <Button onPress={handleNextPage}>
          <Entypo name="chevron-right" style={styles.buttonIcon}></Entypo>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    marginTop: 64,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 25,
    textAlign: "center",
    paddingHorizontal: 20,
    color: colors.heading,
  },
  image: {
    height: Dimensions.get("window").width * 0.7,
  },
  buttonIcon: {
    fontSize: 32,
    color: colors.white,
  },
});
