import React from "react";
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
} from "../components/Styles";

//Native Base Components
import { NativeBaseProvider, Switch, ScrollView } from "native-base";

const AdoptedProfile = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Perfil Adoptado</PageTitle>
        </InnerContainer>
      </StyledContainer>
    </NativeBaseProvider>
  );
};

export default AdoptedProfile;
