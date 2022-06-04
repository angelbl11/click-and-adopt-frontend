import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { pets as petsArray } from "./data";
import CardComponent from "../../components/CardComponent";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  CardCont,
} from "../../components/Styles";
import { View } from "native-base";
const CardsScreen = () => {
  const [petsCards, setPetsCards] = useState(petsArray);
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle>Cards</PageTitle>
        <CardCont>
          {petsCards
            .map(({ name, source }) => {
              return <CardComponent key={name} name={name} source={source} />;
            })
            .reverse()}
        </CardCont>
      </InnerContainer>
    </StyledContainer>
  );
};

export default CardsScreen;
