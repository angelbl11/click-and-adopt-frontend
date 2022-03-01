import React from "react";
import { StatusBar } from "expo-status-bar";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  ChildWrapper,
  AdoptedItemWrapper,
  SubTitle,
  AtributesLabel,
  AtributesContainer,
} from "../../components/Styles";

import AdoptedProfileObject from "../../components/AdoptedProfileObject";
import { Avatar } from "react-native-elements";
//Native Base Components
import { NativeBaseProvider, ScrollView } from "native-base";

const AdoptedPetProfileScreen = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <StatusBar style="dark" />
        <ScrollView>
          <InnerContainer>
            <PageTitle profile={true}>Perfil</PageTitle>
            <Avatar
              size={155}
              source={{
                uri: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=843&q=80",
              }}
              rounded
            ></Avatar>
            <SubTitle profile={true}>Ace</SubTitle>
            <SubTitle typeOfUserLabel={true}>Gato</SubTitle>
            <PageTitle about={true}>Acerca De</PageTitle>
            <AtributesContainer>
              <AtributesLabel>Macho</AtributesLabel>
              <AtributesLabel>Cachorro</AtributesLabel>
              <AtributesLabel>Convive con gatos</AtributesLabel>
              <AtributesLabel>Protocolo completo</AtributesLabel>
            </AtributesContainer>
            <PageTitle about={true}>Protocolo</PageTitle>
          </InnerContainer>
        </ScrollView>
      </StyledContainer>
    </NativeBaseProvider>
  );
};

export default AdoptedPetProfileScreen;
