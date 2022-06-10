import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
} from "../../components/Utils/Styles";

const AdoptedCardsScreen = () => {
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle>Cards</PageTitle>
      </InnerContainer>
    </StyledContainer>
  );
};

export default AdoptedCardsScreen;
