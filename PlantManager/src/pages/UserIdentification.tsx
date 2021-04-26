import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }
  function handleInputFocus() {
    setIsFocused(true);
  }
  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  const navigation = useNavigation();

  async function handleConfirm() {
    if (!name) {
      return Alert.alert("Aviso", "Por favor, me diga posso chamar você? 🤔");
    }

    try {
      await AsyncStorage.setItem("@plantmanager:user", name);
      handleNextPage();
    } catch {
      Alert.alert("Não foi possível salvar o seu nome.");
    }
  }

  function handleNextPage() {
    navigation.navigate("Confirmation", {
      title: "Prontinho",
      subtitle:
        "Agora vamos começar a cuidar das suas plantinhas com muito cuidado.",
      buttonTitle: "Começar",
      icon: "smile",
      nextPage: "PlantSelect",
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <Text style={styles.emoji}>{isFilled ? "😄" : "😀"}</Text>
              <Text style={styles.title}>Como podemos chamar você?</Text>
              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                ]}
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              ></TextInput>
              <View style={styles.footer}>
                <Button onPress={handleConfirm} disabled={!isFilled}>
                  Confirmar
                </Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  },
  form: {
    flex: 1,
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
  emoji: {
    fontSize: 48,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: "100%",
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center",
  },
  footer: {
    width: "100%",
    marginTop: 40,
  },
});
