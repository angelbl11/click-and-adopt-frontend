import React, { useRef } from "react";
import { StyleSheet, StatusBar, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CardPicture, CardName, CardGradient } from "../Utils/Styles";
import { View, IconButton, Icon } from "native-base";
import { Card } from "react-native-card-stack-swiper";

const CardComponent = ({ uri, petName, pressed }) => {
  return (
    <View flex={1}>
      <StatusBar hidden={true} />

      <Card style={styles.card}>
        <View position={"absolute"}>
          <CardPicture source={{ uri: uri }} alt={"petPic"}></CardPicture>
          <CardGradient colors={["transparent", "rgba(0,0,0,0.9)"]} />
          <CardName>{petName}</CardName>
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
        </View>
      </Card>
    </View>
  );
};

export default CardComponent;

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  content: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width - 100,
    height: height - 300,
    borderRadius: 50,
  },
});
