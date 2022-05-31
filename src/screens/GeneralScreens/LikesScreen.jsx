import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  UserLikeWrapper,
} from "../../components/Styles";
import LikedUserComponent from "../../components/LikedUserComponent";
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
