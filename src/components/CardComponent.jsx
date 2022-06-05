import React, { useCallback } from "react";
import Choice from "./Choice";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 45,
  },
  choiceContainer: {
    position: "absolute",
    top: 40,
  },
  likeContainer: { left: 45, transform: [{ rotate: "-30deg" }] },
  nopeContainer: { right: 45, transform: [{ rotate: "30deg" }] },
});

import { CardPicture, CardName, CardGradient } from "./Styles";
import { Icon, IconButton } from "native-base";
import { ACTION_OFFSET } from "./CardConstants";
const CardComponent = ({
  name,
  source,
  isFirst,
  swipe,
  tiltSign,
  pressed,
  ...props
}) => {
  const renderChoice = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.likeContainer,
            { opacity: likeOpacity },
          ]}
        >
          <Choice type={"like"} />
        </Animated.View>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.nopeContainer,
            { opacity: nopeOpacity },
          ]}
        >
          <Choice type={"nope"} />
        </Animated.View>
      </>
    );
  }, []);

  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ["8deg", "0deg", "-8deg"],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, ACTION_OFFSET],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, -25],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  return (
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...props}
    >
      <CardPicture source={source} alt={"ok"} {...props}></CardPicture>
      <CardGradient colors={["transparent", "rgba(0,0,0,0.9)"]}></CardGradient>
      <CardName>{name}</CardName>
      <IconButton
        icon={<Icon as={MaterialIcons} name="info-outline"></Icon>}
        _icon={{
          color: "white",
          position: "absolute",
          bottom: "22",
          right: "5",
          size: "md",
        }}
        _pressed={{
          bg: "transparent",
        }}
        onPress={pressed}
      ></IconButton>
      {isFirst && renderChoice()}
    </Animated.View>
  );
};
export default CardComponent;
