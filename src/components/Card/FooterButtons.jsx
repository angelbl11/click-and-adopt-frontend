import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { CarruselButton, CarruselButtonsWrapper } from "../Utils/Styles";
const FooterButtons = ({ pressLeft, pressRight }) => {
  return (
    <CarruselButtonsWrapper>
      <CarruselButton
        _icon={{
          as: MaterialIcons,
          name: "close",
          color: "#9CA3AF",
        }}
        onPress={pressLeft}
      ></CarruselButton>
      <CarruselButton
        _icon={{
          as: MaterialIcons,
          name: "favorite",
          color: "#BC4749",
        }}
        onPress={pressRight}
      ></CarruselButton>
    </CarruselButtonsWrapper>
  );
};

export default FooterButtons;
