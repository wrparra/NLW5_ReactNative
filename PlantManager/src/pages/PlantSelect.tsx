import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import api from "../services/api";
import { Header } from "../components/Header";
import { EnvironmentButton } from "../components/EnvironmentButton";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { Load } from "../components/Load";
import { PlantProps } from "../libs/storage";

interface EnviromentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigation = useNavigation();

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);
    if (environment === "all") return setFilteredPlants(plants);

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get(
        "plants_environments?_sort=title&_order=asc"
      );
      setEnvironments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    }

    fetchEnvironment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  async function fetchPlants() {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    if (!data) {
      return setLoading(true);
    }

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }
    setLoading(false);
    setLoadingMore(false);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  }

  function handleNextPage(plant: PlantProps) {
    navigation.navigate("PlantSave", { plant });
  }

  if (loading) return <Load />;
  else
    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.subtitle}>
          Em qual ambiente{"\n"}você quer colocar sua planta?
        </Text>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.environmentList}
            data={environments}
            keyExtractor={(item) => String(item.key)}
            renderItem={({ item }) => (
              <EnvironmentButton
                active={item.key === environmentSelected}
                onPress={() => handleEnvironmentSelected(item.key)}
              >
                {item.title}
              </EnvironmentButton>
            )}
          ></FlatList>
        </View>
        <View style={styles.plantList}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.plantListItems}
            data={filteredPlants || plants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardPrimary
                data={item}
                onPress={() => handleNextPage(item)}
              ></PlantCardPrimary>
            )}
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd }) =>
              handleFetchMore(distanceFromEnd)
            }
            ListFooterComponent={
              loadingMore ? (
                <ActivityIndicator color={colors.green}></ActivityIndicator>
              ) : (
                <></>
              )
            }
          ></FlatList>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 30,
  },
  subtitle: {
    fontFamily: fonts.text,
    color: colors.body_text,
    fontSize: 17,
    lineHeight: 23,
  },
  environmentList: {
    marginVertical: 20,
    height: 40,
    justifyContent: "center",
  },
  plantList: {
    flex: 1,
    justifyContent: "center",
  },
  plantListItems: {
    justifyContent: "space-between",
  },
});
