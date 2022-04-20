import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
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
import { NativeBaseProvider, ScrollView, View, IconButton } from "native-base";

import { AuthContext } from "../../context/Auth";

const AdoptedProfile = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <StatusBar style="dark" />
        <ScrollView>
          <InnerContainer>
            <View flexDir={"row"} width={420} marginLeft={2} marginRight={12}>
              <View width={40} marginLeft={6}>
                <PageTitle profile={true}>Perfil</PageTitle>
              </View>
              <IconButton
                _icon={{
                  as: Entypo,
                  name: "plus",
                  color: "#1F2937",
                }}
                onPress={() => {
                  logout();
                  navigation.navigate("AdoptedCuestionary");
                }}
                marginLeft={140}
              ></IconButton>
              <IconButton
                _icon={{
                  as: MaterialIcons,
                  name: "logout",
                  color: "#1F2937",
                }}
                onPress={() => {
                  logout();
                  navigation.navigate("Login");
                }}
              ></IconButton>
            </View>
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
