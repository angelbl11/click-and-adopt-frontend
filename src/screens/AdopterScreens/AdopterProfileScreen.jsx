import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledInputLabel,
} from "../../components/Styles";

//Native Base Components
import { NativeBaseProvider, Switch, ScrollView, Button } from "native-base";
import { Avatar } from "react-native-elements";
import { AuthContext } from "../../context/Auth";

const AdopterProfileScreen = ({ navigation }) => {
  const [showMessage, setShowMessage] = useState(false);

  const { logout } = useContext(AuthContext);
  const handleMessage = () => {
    setShowMessage((previousState) => !previousState);
  };
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <ScrollView>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageTitle profile={true}>Perfil</PageTitle>
            <Button
              onPress={() => {
                logout();
                navigation.navigate("Login");
              }}
            >
              Cerrar sesión
            </Button>
            <Avatar
              size={100}
              source={{
                uri: "https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
              }}
              rounded
            ></Avatar>
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
        </ScrollView>
      </StyledContainer>
    </NativeBaseProvider>
  );
};

export default AdopterProfileScreen;
