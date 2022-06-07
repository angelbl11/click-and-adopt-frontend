import React from "react";
import { ChoiceContainer, ChoiceText } from "../Utils/Styles";
import { COLORS } from "./CardConstants";
const Choice = ({ type }) => {
  const TYPECOLOR = COLORS[type];
  return (
    <ChoiceContainer borderColor={TYPECOLOR}>
      <ChoiceText color={TYPECOLOR}>{type}</ChoiceText>
    </ChoiceContainer>
  );
};

export default Choice;
