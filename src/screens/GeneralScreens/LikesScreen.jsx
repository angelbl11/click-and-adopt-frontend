import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
} from "../../components/Utils/Styles";

const LikesScreen = () => {
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle>Likes</PageTitle>
      </InnerContainer>
    </StyledContainer>
  );
};

export default LikesScreen;
