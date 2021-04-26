import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";

import DateTimePicker from "@react-native-community/datetimepicker";
import { SvgFromUri } from "react-native-svg";
import waterdrop from "../assets/waterdrop.png";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import isBefore from "date-fns/isBefore";
import { format } from "date-fns";
import { loadPlant, PlantProps, savePlant } from "../libs/storage";

interface Params {
  plant: PlantProps;
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == "ios");
  const route = useRoute();
  const navigation = useNavigation();
  const { plant } = route.params as Params;

  function handleChangeTime(event: Event, date?: Date | undefined) {
    if (Platform.OS === "android") {
      setShowDatePicker((oldState) => !oldState);
    }

    if (date && isBefore(date, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert("Escolha a próxima hora!");
    }

    if (date) setSelectedDateTime(date);
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker((oldState) => !oldState);
  }

  async function handleSavePlant() {
    try {
      await savePlant({ ...plant, dateTimeNotification: selectedDateTime });
      handleNextPage();
    } catch {
      return Alert.alert("Não foi possível Salvar a Planta.");
    }
  }

  function handleNextPage() {
    navigation.navigate("Confirmation", {
      title: "Tudo certo",
      subtitle:
        "Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.",
      buttonTitle: "Muito obrigado! :D",
      icon: "hug",
      nextPage: "MyPlants",
    });
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <SvgFromUri uri={plant.photo} style={styles.plantImage}></SvgFromUri>
          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.plantAbout}>{plant.about}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.tipContainer}>
            <Image source={waterdrop} style={styles.tipImage}></Image>
            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>
          <View style={styles.alertContainer}>
            <Text style={styles.alertLabel}>
              Escolha o melhor horário para ser lembrado
            </Text>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDateTime}
                mode="time"
                display="spinner"
                onChange={handleChangeTime}
              />
            )}

            {Platform.OS === "android" && (
              <TouchableOpacity
                style={styles.dateTimePickerButton}
                onPress={handleOpenDateTimePickerForAndroid}
              >
                <Text style={styles.dateTimePickerText}>{`Alterar ${format(
                  selectedDateTime,
                  "HH:mm"
                )}`}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.footer}>
          <Button onPress={handleSavePlant}>Cadastrar Planta</Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
    paddingHorizontal: 30,
    paddingVertical: 60,
    maxHeight: 360,
  },
  body: {
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  footer: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  plantImage: {
    maxWidth: 150,
    maxHeight: 150,
  },
  plantName: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 32,
  },
  plantAbout: {
    color: colors.body_text,
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 25,
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: "relative",
    bottom: 60,
  },
  tipImage: {
    marginRight: 20,
  },
  tipText: {
    color: colors.blue,
    fontFamily: fonts.text,
    fontSize: 15,
    lineHeight: 23,
    flex: 1,
  },
  alertContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  alertLabel: {
    color: colors.body_text,
    fontFamily: fonts.complement,
    fontSize: 13,
    lineHeight: 23,
    textAlign: "center",
  },
  dateTimePickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    minHeight: 160,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});
