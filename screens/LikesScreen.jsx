import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
} from "../components/Styles";

import { NativeBaseProvider } from "native-base";

const LikesScreen = () => {
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Likes</PageTitle>
        </InnerContainer>
      </StyledContainer>
    </NativeBaseProvider>
  );
};

export default LikesScreen;
