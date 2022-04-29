import React from "react";
import { StatusBar } from "expo-status-bar";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  ReasonText,
  ReasonTextContainer,
} from "../../components/Styles";

import { Avatar } from "react-native-elements";
//Native Base Components
import { NativeBaseProvider, ScrollView } from "native-base";

const AdoptedPetProfileScreen = ({ route }) => {
  const {
    name,
    des,
    protocol,
    age,
    coexistence,
    gender,
    isHealthyK,
    isHealthyP,
    typeOf,
  } = route.params;

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
            <SubTitle profile={true}>{name}</SubTitle>
            <SubTitle typeOfUserLabel={true}>{typeOf}</SubTitle>
            <PageTitle about={true}>Acerca De</PageTitle>
            <ReasonTextContainer otherInfo={true} marginBottom={3}>
              <ReasonText>Descripción:</ReasonText>
              <ReasonText>{des}</ReasonText>
            </ReasonTextContainer>
            <ReasonTextContainer otherInfo={true} marginBottom={3}>
              <ReasonText>Edad:</ReasonText>
              <ReasonText>{age}</ReasonText>
            </ReasonTextContainer>
            <ReasonTextContainer otherInfo={true} marginBottom={3}>
              <ReasonText>Sexo:</ReasonText>
              <ReasonText>{gender}</ReasonText>
            </ReasonTextContainer>
            <ReasonTextContainer otherInfo={true} marginBottom={3}>
              <ReasonText>Convive con niños:</ReasonText>
              <ReasonText>{isHealthyK === true ? "Si" : "No"}</ReasonText>
            </ReasonTextContainer>
            <ReasonTextContainer otherInfo={true} marginBottom={3}>
              <ReasonText>Convive con otras mascotas:</ReasonText>
              <ReasonText>{isHealthyP === true ? "Si" : "No"}</ReasonText>
            </ReasonTextContainer>
            {isHealthyP === true ? (
              <ReasonTextContainer otherInfo={true} marginBottom={3}>
                <ReasonText>Convive con:</ReasonText>
                {coexistence.map((pet) => (
                  <ReasonText key={pet}>{pet}</ReasonText>
                ))}
              </ReasonTextContainer>
            ) : undefined}
            <PageTitle about={true}>Protocolo</PageTitle>
            <ReasonTextContainer otherInfo={true} marginBottom={3}>
              <ReasonText>{protocol}</ReasonText>
            </ReasonTextContainer>
          </InnerContainer>
        </ScrollView>
      </StyledContainer>
    </NativeBaseProvider>
  );
};

export default AdoptedPetProfileScreen;
