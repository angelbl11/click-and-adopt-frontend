import React from "react";

//Libraries & Components
import { Ionicons } from "@expo/vector-icons";
import { HStack, Center } from "native-base";
import { CarruselButton } from "../Utils/Styles";
const FooterButtons = ({ pressLeft, pressRight }) => {
  return (
    <Center>
      <HStack bottom="150px" space={120}>
        <CarruselButton
          _icon={{
            as: Ionicons,
            name: "close",
            color: "#9CA3AF",
          }}
          onPress={pressLeft}
        ></CarruselButton>
        <CarruselButton
          _icon={{
            as: Ionicons,
            name: "heart-sharp",
            color: "#BC4749",
          }}
          onPress={pressRight}
        ></CarruselButton>
      </HStack>
    </Center>
  );
};

export default FooterButtons;
