import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, Avatar } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
//Apollo
import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_ADOPTER_INFO, UPDATE_ADOPTER_STATUS } from "../../graphql/client";
import { UPLOAD_PROFILE_PICTURE } from "../../graphql/client";
import { ReactNativeFile } from "apollo-upload-client/public";
import * as mime from "react-native-mime-types";

//Auth
import { AuthContext } from "../../context/Auth";
import { PetsContext } from "../../context/PetsContext";

//ip component
import { ip } from "../../graphql/client";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  ReasonTextContainer,
  ReasonText,
  UploadButtonText,
} from "../../components/Styles";

//Native Base Components
import {
  NativeBaseProvider,
  Switch,
  ScrollView,
  View,
  IconButton,
  Button,
} from "native-base";

const AdopterProfileScreen = ({ navigation }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const { num } = useContext(PetsContext);
  const [uploadPicture, { loading }] = useMutation(UPLOAD_PROFILE_PICTURE);
  const [updateAdopterStatus] = useMutation(UPDATE_ADOPTER_STATUS);
  const [image, setImage] = useState(
    `https://calm-forest-47055.herokuapp.com/ProfilePictures/defaultprof.jpg`
  );
  const getImgUrl = `https://calm-forest-47055.herokuapp.com/ProfilePictures/`;
  const [status, setStatus] = useState(null);
  const handleMessage = () => {
    setShowMessage((previousState) => !previousState);
  };
  const showAlert = () =>
    Alert.alert("Completado", "Foto de perfil subida con éxito", [
      {
        text: "Cerrar",
        style: "cancel",
      },
    ]);

  const [getInfo, { data }] = useLazyQuery(GET_ADOPTER_INFO, {
    variables: {
      getAdopterInfoId: user.id,
    },
    onError: (err) => {
      console.log("Network Error in User");
      console.log(err);
      console.log(user.id);
    },
    onCompleted: (data) => {
      if (data?.getAdopterInfo?.userInfo?.profilePicture?.filename) {
        setImage(
          getImgUrl + data?.getAdopterInfo?.userInfo?.profilePicture?.filename
        );
      }
      if (data?.getAdopterInfo.adopterInfo?.isAvailableToAdopt) {
        setShowMessage(data?.getAdopterInfo.adopterInfo?.isAvailableToAdopt);
      }
    },
  });

  function generateRNFile(uri, name) {
    return uri
      ? new ReactNativeFile({
          uri,
          type: mime.lookup(uri) || "image",
          name,
        })
      : null;
  }
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    } else {
      setShowButton(false);
    }
  };

  const updateStatus = () => {
    updateAdopterStatus({
      variables: {
        updateAdopterStatusId: data?.getAdopterInfo?.adopterInfo?.id,
        userStatus: !showMessage,
      },
      onCompleted: (data) => {},
      onError: (err) => {
        console.log("Network error");
        console.log(err.networkError);
      },
    });
  };

  async function onUploadPress() {
    status && setStatus(null);
    const file = generateRNFile(image, `picture-${Date.now()}`);
    try {
      await uploadPicture({
        variables: { addProfilePictureId: user.id, profilePicture: file },
        onCompleted: (data) => {
          setShowButton(false);
          showAlert();
        },
        onError: (err) => {
          console.log(err.networkError.result);
        },
      });
      setStatus("Subido");
    } catch (e) {
      setStatus("Error");
    }
  }
  useEffect(() => {
    getInfo();
    console.log("eL EFECTO");
    console.log(data);
  }, [num]);

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
                    name: "edit",
                    color: "#1F2937",
                  }}
                  marginLeft={140}
                  onPress={() => {
                    navigation.navigate("EditScreen", {
                      account: user.account,
                    });
                  }}
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

              <View marginTop={5}>
                {image && (
                  <Avatar
                    size={140}
                    rounded
                    source={{
                      uri: image,
                    }}
                  >
                    <Avatar.Accessory
                      size={25}
                      onPress={() => {
                        pickImage();
                        setShowButton(true);
                      }}
                    />
                  </Avatar>
                )}
                {image && showButton === true ? (
                  <Button
                    variant="unstyled"
                    onPress={onUploadPress}
                    isDisabled={loading}
                    marginTop={2}
                    width={100}
                    marginLeft={6}
                    leftIcon={
                      <MaterialIcons
                        name="file-upload"
                        size={24}
                        color="#1F2937"
                      />
                    }
                  >
                    <UploadButtonText marginRight={2}>
                      {loading ? "Subiendo..." : "Subir"}
                    </UploadButtonText>
                  </Button>
                ) : undefined}
              </View>

              <SubTitle profile={true}>{user.fullName}</SubTitle>

              <SubTitle typeOfUserLabel={true}>{user.account}</SubTitle>

              <Switch
                onTrackColor="green"
                onValueChange={() => {
                  handleMessage();
                  updateStatus();
                }}
                isChecked={showMessage}
              />
              <StyledInputLabel userStatus={true}>
                {showMessage === true ? "Adoptando" : "No disponible"}
              </StyledInputLabel>

              <PageTitle about={true}>Acerca De</PageTitle>
              <SubTitle atributes={true}>Información</SubTitle>

              <ReasonTextContainer otherInfo={true} marginBottom={3}>
                <ReasonText>Edad:</ReasonText>
                <ReasonText>{user.age} años</ReasonText>
              </ReasonTextContainer>
              <ReasonTextContainer otherInfo={true} marginBottom={3}>
                <ReasonText>Email:</ReasonText>
                <ReasonText>{user.email}</ReasonText>
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
