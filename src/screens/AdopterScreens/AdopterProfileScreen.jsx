import React, { useContext, useEffect, useState } from "react";
import { Alert, Dimensions, SafeAreaView } from "react-native";

//Libraries
import { StatusBar } from "expo-status-bar";
import { Avatar } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Switch,
  ScrollView,
  View,
  IconButton,
  Button,
  Text,
  VStack,
  HStack,
  Heading,
  Center,
} from "native-base";

//Graphql
import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_ADOPTER_INFO } from "../../graphql/queries";
import {
  UPLOAD_PROFILE_PICTURE,
  UPDATE_ADOPTER_STATUS,
} from "../../graphql/mutations";
import { ReactNativeFile } from "apollo-upload-client/public";
import * as mime from "react-native-mime-types";

//Auth
import { AuthContext } from "../../context/Auth";
import { PetsContext } from "../../context/PetsContext";

const AdopterProfileScreen = ({ navigation, route }) => {
  const [showMessage, setShowMessage] = useState(
    data?.getAdopterInfo.adopterInfo?.isAvailableToAdopt
  );
  const [showButton, setShowButton] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const { num } = useContext(PetsContext);
  const [uploadPicture, { loading }] = useMutation(UPLOAD_PROFILE_PICTURE);
  const [updateAdopterStatus] = useMutation(UPDATE_ADOPTER_STATUS);
  const [image, setImage] = useState(
    `https://click-and-adopt.herokuapp.com/ProfilePictures/defaultprof.jpg`
  );
  const getImgUrl = `https://click-and-adopt.herokuapp.com/ProfilePictures/`;
  const handleMessage = () => {
    setShowMessage((previousState) => !previousState);
  };
  //Alerts
  const showAlert = () =>
    Alert.alert("Completado", "Foto de perfil subida con éxito", [
      {
        text: "Cerrar",
        style: "cancel",
      },
    ]);
  const showErrorAlert = (message) =>
    Alert.alert("Ha ocurrido un error", message, [
      {
        text: "Cerrar",
        style: "cancel",
      },
    ]);
  const [getInfo, { data }] = useLazyQuery(GET_ADOPTER_INFO, {
    variables: {
      getAdopterInfoId: user.id,
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
  //Variables for screensize
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
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
    });
  };

  async function onUploadPress() {
    const file = generateRNFile(image, `picture-${Date.now()}`);
    try {
      await uploadPicture({
        variables: { addProfilePictureId: user.id, profilePicture: file },
        onCompleted: () => {
          setShowButton(false);
          showAlert();
        },
        onError: (err) => {
          showErrorAlert(err.message);
        },
      });
    } catch (e) {}
  }
  useEffect(() => {
    getInfo();
  }, [num]);

  return (
    <SafeAreaView flex={1}>
      <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
        <StatusBar style="dark" />
        <ScrollView>
          <VStack alignItems={"center"} width={screenWidth - 10}>
            <HStack textAlign={"left"} ml={12} mt={3}>
              <Heading
                fontSize={"38px"}
                fontWeight="bold"
                color="#6A994E"
                left={5}
              >
                Perfil
              </Heading>
              <IconButton
                ml={180}
                mr={5}
                _icon={{
                  as: MaterialCommunityIcons,
                  name: "account-edit",
                  color: "#1F2937",
                  size: "md",
                }}
                _pressed={{
                  bg: "#7db85c",
                  borderRadius: 100,
                }}
                onPress={() => {
                  navigation.navigate("EditScreen", {
                    account: user.account,
                  });
                }}
              />
              <IconButton
                mr={10}
                _icon={{
                  as: MaterialIcons,
                  name: "logout",
                  color: "#1F2937",
                  size: "md",
                }}
                _pressed={{
                  bg: "#7db85c",
                  borderRadius: 100,
                }}
                onPress={() => {
                  logout();
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                  });
                }}
              />
            </HStack>

            <Center mt={6} alignItems="center">
              {image && (
                <Avatar
                  size={140}
                  rounded
                  source={{
                    uri: image
                      ? image || image === undefined
                      : "https://click-and-adopt.herokuapp.com/ProfilePictures/defaultprof.jpg",
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
                  marginTop={6}
                  leftIcon={
                    <MaterialIcons
                      name="file-upload"
                      size={28}
                      color="#1F2937"
                    />
                  }
                >
                  <Text fontSize={17} fontWeight={"bold"} color={"#1F2937"}>
                    {loading ? "Subiendo..." : "Subir"}
                  </Text>
                </Button>
              ) : undefined}
              <Text
                fontSize={"22px"}
                fontWeight={"semibold"}
                color={"#1F2937"}
                mt={3}
                mb={2}
              >
                {user.fullName}
              </Text>
              <Text
                fontSize={"16px"}
                color={"#9CA3AF"}
                mb={3}
                fontWeight="medium"
              >
                {user.account}
              </Text>

              <Switch
                onTrackColor="green"
                onValueChange={() => {
                  handleMessage();
                  updateStatus();
                }}
                isChecked={showMessage}
              />
              <Text
                color={"#9CA3AF"}
                fontSize={"13px"}
                mt={2}
                fontWeight={"medium"}
              >
                {showMessage === true ? "Adoptando" : "No disponible"}
              </Text>
            </Center>
            <VStack mt={6} space={2.3} left={0}>
              <Heading
                fontSize={"28px"}
                textAlign={"left"}
                fontWeight="bold"
                color="#6A994E"
              >
                Acerca de
              </Heading>
              <Text
                fontSize={"20px"}
                fontWeight="semibold"
                color={"#1F2937"}
                mt={3}
              >
                Información
              </Text>
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Edad:
              </Text>
              <Text fontSize={"18px"} color={"#1F2937"}>
                {user.age} años
              </Text>
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Correo electrónico:
              </Text>
              <Text fontSize={"18px"} color={"#1F2937"}>
                {user.email}
              </Text>
              <Text
                fontSize={"20px"}
                fontWeight="semibold"
                color={"#1F2937"}
                mt={3}
              >
                Preferencias
              </Text>
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Razones para adoptar:
              </Text>
              <Text fontSize={"18px"} color={"#1F2937"}>
                {data?.getAdopterInfo?.adopterInfo?.reasonToAdopt}
              </Text>
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                En busca de:
              </Text>
              {data?.getAdopterInfo?.adopterInfo?.petPreferences.map((pref) => (
                <Text fontSize={"18px"} key={pref}>
                  {pref}
                </Text>
              ))}
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Prefiere en edades:
              </Text>
              {data?.getAdopterInfo?.adopterInfo?.petAgePreferences.map(
                (pref) => (
                  <Text fontSize={"18px"} key={pref}>
                    {pref}
                  </Text>
                )
              )}
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Prefiere en tamaño:
              </Text>
              {data?.getAdopterInfo?.adopterInfo?.petSizePreferences.map(
                (pref) => (
                  <Text fontSize={"18px"} key={pref}>
                    {pref}
                  </Text>
                )
              )}
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Prefiere que sea:
              </Text>
              {data?.getAdopterInfo?.adopterInfo?.petGenderPreferences.map(
                (pref) => (
                  <Text fontSize={"18px"} key={pref}>
                    {pref}
                  </Text>
                )
              )}
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Menores de edad en su hogar:
              </Text>
              {data?.getAdopterInfo?.adopterInfo?.isChildren === true ? (
                <Text fontSize={"18px"}>Si hay</Text>
              ) : (
                <Text fontSize={"18px"}>No hay</Text>
              )}
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Mascotas actuales:
              </Text>
              {data?.getAdopterInfo?.adopterInfo?.havePets === false ? (
                <Text fontSize={"18px"}>No tiene mascotas</Text>
              ) : data?.getAdopterInfo?.adopterInfo?.haveDog === true ? (
                <Text fontSize={"18px"}>
                  Perros: {data?.getAdopterInfo?.adopterInfo?.numberOfDogs}
                </Text>
              ) : undefined}
              {data?.getAdopterInfo?.adopterInfo?.haveCat === true ? (
                <Text fontSize={"18px"}>
                  Gatos: {data?.getAdopterInfo?.adopterInfo?.numberOfCats}
                </Text>
              ) : undefined}
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Preferencias de protocolo:
              </Text>
              {data?.getAdopterInfo?.adopterInfo?.isAgreeWithProtocol ===
              true ? (
                <Text fontSize={"18px"}>Tiene incovenientes</Text>
              ) : (
                <Text fontSize={"18px"}>No tiene inconvenientes</Text>
              )}
              <Text
                fontSize={"20px"}
                fontWeight="semibold"
                color={"#1F2937"}
                mt={3}
              >
                Historial
              </Text>
              {data?.getAdopterInfo?.adopterInfo?.hadPets === true ? (
                <>
                  <Text
                    fontSize={"18px"}
                    fontWeight="semibold"
                    color={"#1F2937"}
                  >
                    Su mascota más reciente fue un:
                  </Text>
                  <Text fontSize={"18px"}>
                    {data?.getAdopterInfo.adopterInfo?.hadPetsValue}
                  </Text>
                  <Text
                    fontSize={"18px"}
                    fontWeight="semibold"
                    color={"#1F2937"}
                  >
                    Aproximadamente hace:
                  </Text>
                  {data?.getAdopterInfo?.adopterInfo?.hadPetsDate === "Días" ? (
                    <Text fontSize={"18px"}>
                      {data?.getAdopterInfo?.adopterInfo?.numberOfDays} días
                    </Text>
                  ) : data?.getAdopterInfo?.adopterInfo?.hadPetsDate ===
                    "Meses" ? (
                    <Text fontSize={"18px"}>
                      {data?.getAdopterInfo?.adopterInfo?.numberOfMonths} meses
                    </Text>
                  ) : (
                    <Text fontSize={"18px"}>
                      {data?.getAdopterInfo?.adopterInfo?.numberOfYears} años
                    </Text>
                  )}
                </>
              ) : (
                <Text fontSize={"18px"}>
                  No ha tenido mascotas anteriormente
                </Text>
              )}
            </VStack>
          </VStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AdopterProfileScreen;
