import React from "react";
import { ChoiceContainer, ChoiceText } from "./Styles";
import { View, Text } from "native-base";
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
