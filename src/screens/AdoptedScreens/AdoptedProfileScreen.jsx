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
import { NativeBaseProvider, ScrollView } from "native-base";

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
                <AdoptedProfileObject
                  pressed={() => navigation.navigate("PetProfile")}
                  url="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=843&q=80"
                ></AdoptedProfileObject>
              </AdoptedItemWrapper>
              <AdoptedItemWrapper>
                <AdoptedProfileObject url="https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=438&q=80"></AdoptedProfileObject>
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
