import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
} from "../../components/Styles";

const CardsScreen = () => {
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle>Cards</PageTitle>
      </InnerContainer>
    </StyledContainer>
  );
};

export default CardsScreen;
