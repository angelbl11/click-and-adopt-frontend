import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { CarruselButton, CarruselButtonsWrapper } from "../Utils/Styles";
const FooterButtons = ({ handleChoice }) => {
  return (
    <CarruselButtonsWrapper>
      <CarruselButton
        _icon={{
          as: MaterialIcons,
          name: "close",
          color: "#9CA3AF",
        }}
        onPress={() => handleChoice(-1)}
      ></CarruselButton>
      <CarruselButton
        _icon={{
          as: MaterialIcons,
          name: "favorite",
          color: "#BC4749",
        }}
        onPress={() => handleChoice(1)}
      ></CarruselButton>
    </CarruselButtonsWrapper>
  );
};

export default FooterButtons;
