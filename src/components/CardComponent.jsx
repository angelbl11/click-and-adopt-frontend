import React from "react";
import { CardPicture, CardWrapper, CardName, CardGradient } from "./Styles";
const CardComponent = ({ name, source }) => {
  return (
    <CardWrapper>
      <CardPicture source={source} alt={"ok"}></CardPicture>
      <CardGradient colors={["transparent", "rgba(0,0,0,0.9)"]}></CardGradient>
      <CardName>{name}</CardName>
    </CardWrapper>
  );
};
export default CardComponent;
