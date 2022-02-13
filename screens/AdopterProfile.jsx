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
import { NativeBaseProvider, Switch, ScrollView } from "native-base";

const AdopterProfile = ({ navigation }) => {
  const [showMessage, setShowMessage] = useState(false);
  const handleMessage = () => {
    setShowMessage((previousState) => !previousState);
  };
  return (
    <NativeBaseProvider>
      <ScrollView>
        <StyledContainer>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageTitle profile={true}>Perfil</PageTitle>
            <ProfilePhoto size="2xl">AB</ProfilePhoto>
            <SubTitle profile={true}>Angel Barajas</SubTitle>
            <SubTitle typeOfUserLabel={true}>Adoptante</SubTitle>
            <Switch
              onTrackColor="green"
              onValueChange={handleMessage}
              isChecked={showMessage}
            />
            <StyledInputLabel userStatus={true}>
              {showMessage == true ? "Adoptando" : "No disponible"}
            </StyledInputLabel>
            <PageTitle about={true}>Acerca De</PageTitle>
            <SubTitle atributes={true}>Nombre</SubTitle>
            <SubTitle atributes={true}>Contacto</SubTitle>
            <SubTitle atributes={true}>Preferencias</SubTitle>
          </InnerContainer>
        </StyledContainer>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default AdopterProfile;
