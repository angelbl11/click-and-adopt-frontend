import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
} from "../../components/Styles";

const ChatScreen = () => {
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle>Chats</PageTitle>
      </InnerContainer>
    </StyledContainer>
  );
};

export default ChatScreen;
