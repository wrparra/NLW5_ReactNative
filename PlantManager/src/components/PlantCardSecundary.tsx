import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipable from "react-native-gesture-handler/Swipeable";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Feather } from "@expo/vector-icons";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

export function PlantCardSecundary({
  data,
  handleRemove,
  ...rest
}: PlantProps) {
  return (
    <Swipable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton style={styles.removeButton} onPress={handleRemove}>
              <Feather name="trash" size={32} color={colors.white}></Feather>
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.button} {...rest}>
        <SvgFromUri uri={data.photo} style={styles.image} />

        <Text style={styles.title}>{data.name}</Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel}>Regar às</Text>
          <Text style={styles.time}>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.shape,
    marginVertical: 5,
  },
  image: {
    maxWidth: 50,
    maxHeight: 50,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading,
  },
  details: {
    alignItems: "flex-end",
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },
  removeButton: {
    width: 100,
    height: 100,
    backgroundColor: colors.red,
    marginVertical: 5,
    borderRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    marginLeft: -30,
  },
});
