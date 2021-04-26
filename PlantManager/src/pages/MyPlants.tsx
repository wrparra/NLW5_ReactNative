import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Alert } from "react-native";
import { Header } from "../components/Header";
import {
  PlantProps,
  loadPlant,
  StoragePlantProps,
  removePlant,
} from "../libs/storage";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import { PlantCardSecundary } from "../components/PlantCardSecundary";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import waterdrop from "../assets/waterdrop.png";
import { Load } from "../components/Load";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadStorageDate() {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} às ${nextTime} horas.`
      );

      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageDate();
  }, []);

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        style: "default",
        onPress: async () => {
          try {
            await removePlant(plant.id);
            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert("Não foi possível remover as planta.");
          }
        },
      },
    ]);
  }

  if (loading) return <Load />;
  else
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.spotlight}>
          <Image source={waterdrop} style={styles.spotlightImage} />
          <Text style={styles.spotlightText}>{nextWatered}</Text>
        </View>
        <View style={styles.plants}>
          <Text style={styles.plantsTitle}>Próximas regadas</Text>
          <FlatList
            data={myPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardSecundary
                data={item}
                handleRemove={() => {
                  handleRemove(item);
                }}
              ></PlantCardSecundary>
            )}
            showsVerticalScrollIndicator={false}
          ></FlatList>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background,
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
  },
  itemText: {},
});
