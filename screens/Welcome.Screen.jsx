import { StatusBar } from "expo-status-bar";
import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from "./../components/Styles";

import { NativeBaseProvider } from "native-base";

const Welcome = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <StatusBar style="dark" />
      <InnerContainer>
        <WelcomeImage
          resizeMode="cover"
          source={require("./../assets/welcome-image.jpg")}
          alt="welcome"
        ></WelcomeImage>
        <WelcomeContainer>
          <PageTitle welcome={true}>¡Bievenido!</PageTitle>
          <SubTitle> Benito Martinez</SubTitle>
          <StyledFormArea>
            <Avatar
              resizeMode="cover"
              source={require("./../assets/logo.png")}
              alt="avatar"
            />
            <StyledButton
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <ButtonText>Cerrar Sesión</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </NativeBaseProvider>
  );
};

export default Welcome;
