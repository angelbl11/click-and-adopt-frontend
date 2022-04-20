import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, Avatar } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

//Apollo
import { useQuery, useMutation } from "@apollo/client";
import { GET_ADOPTER_INFO } from "../../graphql/client";
import { UPLOAD_PROFILE_PICTURE } from "../../graphql/client";

//Auth
import { AuthContext } from "../../context/Auth";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  UserInfoText,
  InfoContainer,
  ReasonTextContainer,
  ReasonText,
} from "../../components/Styles";

//Native Base Components
import {
  NativeBaseProvider,
  Switch,
  ScrollView,
  View,
  IconButton,
} from "native-base";

const AdopterProfileScreen = ({ navigation }) => {
  const [showMessage, setShowMessage] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const [uploadPicture] = useMutation(UPLOAD_PROFILE_PICTURE);
  const handleMessage = () => {
    setShowMessage((previousState) => !previousState);
  };

  const { data } = useQuery(GET_ADOPTER_INFO, {
    variables: {
      getAdopterInfoId: user.id,
    },
  });
  const [image, setImage] = useState("AB");

  const pickImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    console.log(res);
    console.log(user.id);
    if (!res.cancelled) {
      setImage(res.uri);
    }
    uploadPicture({
      variables: {
        addProfilePicture: {
          addProfilePictureId: user.id,
          profilePicture: res,
        },
      },
      onError: (err) => {
        console.log("Network Error");
        console.log(err.networkError.result);
      },

      onCompleted: () => {
        console.log("OK");
      },
    });
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

              <SubTitle profile={true}>
                {data?.getAdopterInfo?.userInfo?.fullName}
              </SubTitle>

              <SubTitle typeOfUserLabel={true}>
                {data?.getAdopterInfo?.userInfo?.account}
              </SubTitle>

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

              <ReasonTextContainer otherInfo={true} marginBottom={3}>
                <ReasonText>Edad:</ReasonText>
                <ReasonText>
                  {data?.getAdopterInfo?.userInfo?.age} años
                </ReasonText>
              </ReasonTextContainer>
              <ReasonTextContainer otherInfo={true} marginBottom={3}>
                <ReasonText>Email:</ReasonText>
                <ReasonText>{data?.getAdopterInfo?.userInfo?.email}</ReasonText>
              </ReasonTextContainer>

              <SubTitle atributes={true}>Preferencias</SubTitle>
              <ReasonTextContainer>
                <ReasonText marginRight={12}>
                  Razones para adoptar:{"\n"}
                  {data?.getAdopterInfo?.adopterInfo?.reasonToAdopt}
                </ReasonText>
              </ReasonTextContainer>
              <ReasonTextContainer marginTop={3} otherInfo={true}>
                <ReasonText>En busca de:</ReasonText>
                {data?.getAdopterInfo?.adopterInfo?.petPreferences.map(
                  (pref) => (
                    <ReasonText key={pref}>{pref}</ReasonText>
                  )
                )}
              </ReasonTextContainer>
              <ReasonTextContainer marginTop={3} otherInfo={true}>
                <ReasonText>Prefiere en edades:</ReasonText>
                {data?.getAdopterInfo?.adopterInfo?.petAgePreferences.map(
                  (pref) => (
                    <ReasonText key={pref}>{pref}</ReasonText>
                  )
                )}
              </ReasonTextContainer>
              <ReasonTextContainer marginTop={3} otherInfo={true}>
                <ReasonText>Prefiere en tamaño:</ReasonText>
                {data?.getAdopterInfo?.adopterInfo?.petSizePreferences.map(
                  (pref) => (
                    <ReasonText key={pref}>{pref}</ReasonText>
                  )
                )}
              </ReasonTextContainer>
              <ReasonTextContainer marginTop={3} otherInfo={true}>
                <ReasonText>Prefiere que sea:</ReasonText>
                {data?.getAdopterInfo?.adopterInfo?.petGenderPreferences.map(
                  (pref) => (
                    <ReasonText key={pref}>{pref}</ReasonText>
                  )
                )}
              </ReasonTextContainer>
              <ReasonTextContainer
                marginTop={3}
                otherInfo={true}
                marginBottom={3}
              >
                <ReasonText>Menores de edad en su hogar:</ReasonText>
                {data?.getAdopterInfo?.adopterInfo?.isChildren === true ? (
                  <ReasonText>Si hay</ReasonText>
                ) : (
                  <ReasonText>No hay</ReasonText>
                )}
              </ReasonTextContainer>

              <ReasonTextContainer
                marginTop={3}
                otherInfo={true}
                marginBottom={3}
              >
                <ReasonText>Mascotas actuales:</ReasonText>
                {data?.getAdopterInfo?.adopterInfo?.havePets === false ? (
                  <ReasonText>No tiene mascotas</ReasonText>
                ) : data?.getAdopterInfo?.adopterInfo?.haveDog === true ? (
                  <ReasonText>
                    Perros: {data?.getAdopterInfo?.adopterInfo?.numberOfDogs}
                  </ReasonText>
                ) : undefined}
                {data?.getAdopterInfo?.adopterInfo?.haveCat === true ? (
                  <ReasonText>
                    Gatos: {data?.getAdopterInfo?.adopterInfo?.numberOfCats}
                  </ReasonText>
                ) : undefined}
              </ReasonTextContainer>

              <ReasonTextContainer
                marginTop={3}
                otherInfo={true}
                marginBottom={3}
              >
                <ReasonText>Preferencias de Protocolo:</ReasonText>
                {data?.getAdopterInfo?.adopterInfo?.isAgreeWithProtocol ===
                true ? (
                  <ReasonText>Está de acuerdo</ReasonText>
                ) : (
                  <ReasonText>No está de acuerdo</ReasonText>
                )}
              </ReasonTextContainer>

              <SubTitle atributes={true}>Historial</SubTitle>
              {data?.getAdopterInfo?.adopterInfo?.hadPets === true ? (
                <ReasonTextContainer
                  marginTop={3}
                  otherInfo={true}
                  marginBottom={3}
                >
                  <ReasonTextContainer otherInfo={true} marginBottom={3}>
                    <ReasonText>Su mascota más reciente fue un:</ReasonText>
                    <ReasonText>
                      {data?.getAdopterInfo.adopterInfo?.hadPetsValue}
                    </ReasonText>
                  </ReasonTextContainer>
                  <ReasonText>Aproximadamente hace: </ReasonText>
                  {data?.getAdopterInfo?.adopterInfo?.hadPetsDate === "Días" ? (
                    <ReasonText>
                      {data?.getAdopterInfo?.adopterInfo?.numberOfDays} días
                    </ReasonText>
                  ) : data?.getAdopterInfo?.adopterInfo?.hadPetsDate ===
                    "Meses" ? (
                    <ReasonText>
                      {data?.getAdopterInfo?.adopterInfo?.numberOfMonths} meses
                    </ReasonText>
                  ) : (
                    <ReasonText>
                      {data?.getAdopterInfo?.adopterInfo?.numberOfYears} años
                    </ReasonText>
                  )}
                </ReasonTextContainer>
              ) : (
                <ReasonTextContainer>
                  <ReasonText>No ha tenido mascotas anteriormente</ReasonText>
                </ReasonTextContainer>
              )}
            </InnerContainer>
          </ScrollView>
        </StyledContainer>
      </ThemeProvider>
    </NativeBaseProvider>
  );
};

export default AdopterProfileScreen;
