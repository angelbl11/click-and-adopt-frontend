import React from "react";
import { StyleSheet, StatusBar, Dimensions } from "react-native";

//Libraries & Components
import { View, IconButton, Icon, Image, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "react-native-card-stack-swiper";
//Card Constants
import { CARD } from "./CardConstants";
const CardComponent = ({ uri, petName, pressed }) => {
  return (
    <View flex={1} mt={12}>
      <StatusBar hidden={true} />
      <Card style={styles.card}>
        <View position={"absolute"}>
          <Image
            source={{ uri: uri }}
            alt={"userPic"}
            borderRadius={CARD.BORDER_RADIUS}
            width={CARD.WIDTH}
            height={CARD.HEIGHT}
          />
          <LinearGradient
            position={"absolute"}
            bottom={15}
            left={0}
            right={0}
            height={180}
            borderRadius={CARD.BORDER_RADIUS}
            colors={["transparent", "rgba(255,255,255,0.9)"]}
          />
          <Text
            position={"absolute"}
            bottom="22px"
            left="12px"
            fontSize={"18px"}
            pt={"18px"}
            fontWeight="semibold"
          >
            {petName}
          </Text>
          <IconButton
            icon={<Icon as={MaterialIcons} name="info-outline" />}
            _icon={{
              position: "absolute",
              bottom: "22",
              right: "2",
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
