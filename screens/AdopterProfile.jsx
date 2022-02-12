import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledTextArea,
  StyledButton,
  ButtonText,
  StyledInputLabel,
  ProfilePhoto,
} from "./../components/Styles";

//Native Base Components
import { NativeBaseProvider, Switch } from "native-base";

const AdopterProfile = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle profile={true}>Perfil</PageTitle>
          <ProfilePhoto size="2xl"></ProfilePhoto>
          <SubTitle profile={true}>Angel Barajas</SubTitle>
          <SubTitle typeOfUserLabel={true}>Adoptante</SubTitle>
          <Switch onTrackColor="green" />
          <StyledInputLabel></StyledInputLabel>
        </InnerContainer>
      </StyledContainer>
    </NativeBaseProvider>
  );
};

export default AdopterProfile;
