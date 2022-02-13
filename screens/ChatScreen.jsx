import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
} from "../components/Styles";

import { NativeBaseProvider } from "native-base";

const ChatScreen = () => {
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Chats</PageTitle>
        </InnerContainer>
      </StyledContainer>
    </NativeBaseProvider>
  );
};

export default ChatScreen;
