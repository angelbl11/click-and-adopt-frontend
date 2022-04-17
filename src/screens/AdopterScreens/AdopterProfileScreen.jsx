import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, Avatar } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledInputLabel,
} from "../../components/Styles";

//Native Base Components
import {
  NativeBaseProvider,
  Switch,
  ScrollView,
  View,
  IconButton,
} from "native-base";
import { AuthContext } from "../../context/Auth";

const AdopterProfileScreen = ({ navigation }) => {
  const [showMessage, setShowMessage] = useState(false);
  const { logout } = useContext(AuthContext);
  const handleMessage = () => {
    setShowMessage((previousState) => !previousState);
  };

  const [image, setImage] = useState("../../assets/default-profile-icon.jpg");

  const pickImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    console.log(res);

    if (!res.cancelled) {
      setImage(res.uri);
    }
  };

  return (
    <NativeBaseProvider>
      <ThemeProvider>
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
                    as: MaterialIcons,
                    name: "logout",
                    color: "#1F2937",
                  }}
                  marginLeft={190}
                  onPress={() => {
                    logout();
                    navigation.navigate("Login");
                  }}
                ></IconButton>
              </View>

              <View marginTop={5}>
                {image && (
                  <Avatar size={140} rounded source={{ uri: image }}>
                    <Avatar.Accessory size={25} onPress={pickImage} />
                  </Avatar>
                )}
              </View>

              <SubTitle profile={true}>FullName</SubTitle>
              <SubTitle typeOfUserLabel={true}>Account</SubTitle>

              <Switch
                onTrackColor="green"
                onValueChange={handleMessage}
                isChecked={showMessage}
              />
              <StyledInputLabel userStatus={true}>
                {showMessage == true ? "Adoptando" : "No disponible"}
              </StyledInputLabel>
              <PageTitle about={true}>Acerca De</PageTitle>
              <SubTitle atributes={true}>Información</SubTitle>
              <SubTitle atributes={true}>Preferencias</SubTitle>
            </InnerContainer>
          </ScrollView>
        </StyledContainer>
      </ThemeProvider>
    </NativeBaseProvider>
  );
};

export default AdopterProfileScreen;
