import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  ChildWrapper,
  AdoptedItemWrapper,
  SubTitle,
} from "../../components/Styles";

import AdoptedProfileObject from "../../components/AdoptedProfileObject";

//Native Base Components
import { NativeBaseProvider, ScrollView, Avatar } from "native-base";

const AdoptedProfile = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <StatusBar style="dark" />
        <ScrollView>
          <InnerContainer>
            <PageTitle profile={true}>Perfil</PageTitle>
            <ChildWrapper>
              <AdoptedItemWrapper>
                <AdoptedProfileObject></AdoptedProfileObject>
              </AdoptedItemWrapper>
              <AdoptedItemWrapper>
                <AdoptedProfileObject></AdoptedProfileObject>
              </AdoptedItemWrapper>
            </ChildWrapper>
            <PageTitle about={true}>Acerca De</PageTitle>
            <SubTitle adoptedAtributes={true}>Nombre</SubTitle>
            <SubTitle adoptedAtributes={true}>Contacto</SubTitle>
          </InnerContainer>
        </ScrollView>
      </StyledContainer>
    </NativeBaseProvider>
  );
};

export default AdoptedProfile;
