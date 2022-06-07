import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyledContainer, PageTitle } from "../../components/Utils/Styles";

const AdoptedCardsScreen = () => {
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <PageTitle>Encuentra Adoptantes</PageTitle>
    </StyledContainer>
  );
};

export default AdoptedCardsScreen;
