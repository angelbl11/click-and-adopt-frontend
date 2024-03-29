import React, { useState, useContext } from "react";
import { Alert, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Import Document Picker
import * as DocumentPicker from "expo-document-picker";
import * as OpenAnything from "react-native-openanything";
//Graphql
import {
  UPLOAD_PET_PROFILE_PICTURE,
  DELETE_PET_INFO,
  UPLOAD_PROTOCOL_FILE,
} from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client/public";

//Components
import ProtocolFileObject from "../../components/RenderObjects/ProtocolFileObject";
import { Avatar } from "react-native-elements";
import * as mime from "react-native-mime-types";

//Context
import { PetsContext } from "../../context/PetsContext";

//Native Base Components
import {
  ScrollView,
  View,
  Button,
  IconButton,
  Text,
  Heading,
  VStack,
  HStack,
  Link,
  useToast,
} from "native-base";

const AdoptedPetProfileScreen = ({ route, navigation }) => {
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
    petProfPic,
    petId,
    count,
    isVisible,
    petProtocolFiles,
  } = route.params;
  //Variables for screensize
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const url = "https://click-and-adopt.herokuapp.com/ProtocolFiles/";
  //Toast
  const toast = useToast();
  const [uploadPetImage, { loading }] = useMutation(UPLOAD_PET_PROFILE_PICTURE);
  const [showButton, setShowButton] = useState(false);
  const [deletePet] = useMutation(DELETE_PET_INFO);
  const [uploadProtocolFile] = useMutation(UPLOAD_PROTOCOL_FILE);
  const { petImage, setPetImage, num, setNum, pets, setPets } =
    useContext(PetsContext);
  const [fileUri, setFileUri] = useState();
  const [fileName, setFileName] = useState();
  const [newPetImage, setNewPetImage] = useState(petProfPic);
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
      let images = petImage;

      images[count] = result.uri;
      setPetImage(images);

      setNewPetImage(result.uri);
      setNum(num + 1);
    }
    if (result.cancelled) {
      setShowButton(false);
    }
  };
  async function onUploadFile() {
    const protocol = generateRNFile(fileUri, fileName);
    try {
      await uploadProtocolFile({
        variables: {
          addProtocolFileId: petId,
          protocolFile: protocol,
          fileName: fileName,
        },
        onCompleted: () => {
          navigation.goBack();
        },
        onError: (err) => {
          showErrorAlert(err.message);
        },
      });
    } catch (e) {
      return;
    }
  }
  async function onUploadPress() {
    const file = generateRNFile(newPetImage, `picture-${Date.now()}`);
    try {
      await uploadPetImage({
        variables: { addProfilePetPictureId: petId, petProfilePicture: file },
        onCompleted: (data) => {
          setShowButton(false);
          showUploadAlert();
          setNum(num + 1);
          navigation.goBack();
        },
        onError: (err) => {
          showErrorAlert(err.message);
        },
      });
    } catch (e) {
      return;
    }
  }

  //File manage
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    setFileUri(result.uri);
    setFileName(result.name);
    uploadFileAlert();
  };
  const showUploadAlert = () =>
    Alert.alert("Completado", "Foto de perfil subida con éxito", [
      {
        text: "Cerrar",
        style: "cancel",
      },
    ]);
  //Alerts
  const showErrorAlert = (message) =>
    Alert.alert("Ha ocurrido un error", message, [
      {
        text: "Cerrar",
        style: "cancel",
      },
    ]);
  const uploadFileAlert = () => {
    Alert.alert("¿Estás seguro que quieres subir este archivo?", "", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Subir",
        onPress: () => {
          onUploadFile();
        },
      },
    ]);
  };
  const deletePetInfoAlert = () => {
    Alert.alert("¿Estás seguro que quieres eliminar esta mascota?", "", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        onPress: () => {
          deletePet({
            variables: {
              petId: petId,
            },
            onCompleted: (data) => {
              let newPets = [];
              let newPetsImage = [];
              for (let i = 0; i < petImage.length; i++) {
                if (i != count) {
                  newPets.push(pets[i]);
                  newPetsImage.push(petImage[i]);
                }
              }

              setPets(newPets);
              setPetImage(newPetsImage);
              navigation.goBack();
            },
          });
        },
      },
    ]);
  };

  return (
    <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
      <StatusBar style="dark" />
      <ScrollView>
        <VStack alignItems={"center"} width={screenWidth - 10}>
          <HStack textAlign={"left"} mt={3}>
            <Heading
              fontSize={"38px"}
              fontWeight="bold"
              color="#6A994E"
              right={75}
            >
              Perfil
            </Heading>
            {isVisible ? (
              <HStack right={0}>
                <IconButton
                  _icon={{
                    as: MaterialIcons,
                    name: "edit",
                    color: "#1F2937",
                  }}
                  _pressed={{
                    bg: "#7db85c",
                    borderRadius: 100,
                  }}
                  left={115}
                  onPress={() => {
                    navigation.navigate("AdoptedCuestionary", {
                      isEdited: true,
                      petId: petId,
                      protocol: protocol,
                      age: age,
                      gender: gender,
                      isHealthyWithKids: isHealthyK,
                      isHealthyWithPets: isHealthyP,
                      typeOf: typeOf,
                      petName: name,
                      description: des,
                    });
                  }}
                />
                <IconButton
                  _icon={{
                    as: Ionicons,
                    name: "trash",
                    color: "#1F2937",
                  }}
                  _pressed={{
                    bg: "#7db85c",
                    borderRadius: 100,
                  }}
                  left={115}
                  onPress={() => {
                    deletePetInfoAlert();
                  }}
                />
              </HStack>
            ) : undefined}
          </HStack>
          <VStack mt={6} alignItems="center" alignContent={"center"}>
            {petProfPic && (
              <Avatar
                size={140}
                rounded
                source={{
                  uri: newPetImage
                    ? newPetImage
                    : "https://click-and-adopt.herokuapp.com/ProfilePictures/defaultprof.jpg",
                }}
              >
                {isVisible ? (
                  <Avatar.Accessory
                    size={25}
                    onPress={() => {
                      pickImage();
                      setShowButton(true);
                    }}
                  />
                ) : undefined}
              </Avatar>
            )}
            {petImage && showButton === true ? (
              <Button
                variant="unstyled"
                onPress={onUploadPress}
                isDisabled={loading}
                marginTop={2}
                leftIcon={
                  <MaterialIcons name="file-upload" size={24} color="#1F2937" />
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
              {name}
            </Text>
            <Text
              fontSize={"16px"}
              color={"#9CA3AF"}
              mb={3}
              fontWeight="medium"
            >
              {typeOf}
            </Text>
          </VStack>
          <VStack mt={6} space={2.3} mb={3} left={3}>
            <Heading
              fontSize={"28px"}
              textAlign={"left"}
              fontWeight="bold"
              color="#6A994E"
            >
              Acerca de
            </Heading>
            <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
              Descripción:
            </Text>
            <Text fontSize={"18px"} color={"#1F2937"}>
              {des}
            </Text>

            <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
              Edad:
            </Text>
            <Text fontSize={"18px"} color={"#1F2937"}>
              {age}
            </Text>
            <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
              Sexo:
            </Text>
            <Text fontSize={"18px"} color={"#1F2937"}>
              {gender}
            </Text>
            <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
              Convive con niños:
            </Text>
            <Text fontSize={"18px"} color={"#1F2937"}>
              {isHealthyK === true ? "Si" : "No"}
            </Text>
            <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
              Convive con otras mascotas:
            </Text>
            <Text fontSize={"18px"} color={"#1F2937"}>
              {isHealthyP === true ? "Si" : "No"}
            </Text>
            {isHealthyP === true ? (
              <>
                <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                  Convive con:
                </Text>
                {coexistence.map((pet) => (
                  <Text fontSize={"18px"} color={"#1F2937"} key={pet}>
                    {pet}
                  </Text>
                ))}
              </>
            ) : undefined}
            <HStack space={3.5} mt={1.5}>
              <Heading
                fontSize={"28px"}
                textAlign={"left"}
                fontWeight="bold"
                color="#6A994E"
              >
                Protocolo
              </Heading>
              {protocol != "No tiene" && isVisible ? (
                <>
                  <Link
                    right={3.2}
                    onPress={() =>
                      toast.show({
                        description:
                          "Especifica en el nombre del archivo el proceso que estás verificando. Ej: esterilizacion.pdf",
                      })
                    }
                    _text={{
                      fontSize: 14,
                      color: "#6A994E",
                      fontWeight: "semibold",
                      mt: 2.5,
                    }}
                  >
                    Archivos de protocolo
                  </Link>
                  <IconButton
                    mt={-2}
                    left={4}
                    _icon={{
                      as: AntDesign,
                      name: "addfile",
                      size: "md",
                    }}
                    _pressed={{
                      bg: "#7db85c",
                      borderRadius: 100,
                    }}
                    onPress={() => {
                      pickDocument();
                    }}
                  />
                </>
              ) : undefined}
            </HStack>
            <Text fontSize={"18px"} color={"#1F2937"}>
              {protocol}
            </Text>
            {protocol != "No tiene" ? (
              <View
                flex={0.5}
                flexWrap="wrap"
                flexDir={"row"}
                height="auto"
                justifyContent={"flex-start"}
                mb={"10px"}
                mt={"12px"}
              >
                {petProtocolFiles?.map((index) => {
                  return (
                    <ProtocolFileObject
                      key={index}
                      fileName={index}
                      onPress={() => {
                        OpenAnything.Pdf(url + index);
                      }}
                    />
                  );
                })}
              </View>
            ) : undefined}
          </VStack>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default AdoptedPetProfileScreen;
