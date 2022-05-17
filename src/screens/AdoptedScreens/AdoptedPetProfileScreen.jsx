import React, { useState, useContext } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import {
  UPLOAD_PET_PROFILE_PICTURE,
  DELETE_PET_INFO,
} from "../../graphql/client";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// Import Document Picker
import * as DocumentPicker from "expo-document-picker";
//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  ReasonText,
  ReasonTextContainer,
  UploadButtonText,
  ChildWrapper,
  AdoptedItemWrapper,
} from "../../components/Styles";

//Components
import ProtocolFileObject from "../../components/ProtocolFileObject";

//Apollo
import { useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client/public";
import * as mime from "react-native-mime-types";
import { PetsContext } from "../../context/PetsContext";
import { Avatar } from "react-native-elements";

//Native Base Components

import {
  NativeBaseProvider,
  ScrollView,
  View,
  Button,
  IconButton,
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
    petProfData,
    petProfPic,
    petId,
    count,
    imageArray,
  } = route.params;
  const [status, setStatus] = useState(null);
  const [uploadPetImage] = useMutation(UPLOAD_PET_PROFILE_PICTURE);
  const [deletePet] = useMutation(DELETE_PET_INFO);
  const { petImage, setPetImage } = useContext(PetsContext);
  const [viewFile, setViewFile] = useState(null);
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
      //petProfPic = result.uri;

      imageArray[count] = result.uri;

      let images = petImage;

      images[count] = result.uri;

      console.log("hola, es menor" + count);
      console.log(images);
      setPetImage(images);

      setNewPetImage(result.uri);
    }
  };

  async function onUploadPress() {
    status && setStatus(null);
    const file = generateRNFile(newPetImage, `picture-${Date.now()}`);
    try {
      await uploadPetImage({
        variables: { addProfilePetPictureId: petId, petProfilePicture: file },
        onCompleted: (data) => {
          console.log("Foto subida");
          console.log(data);
          navigation.navigate("AdoptedProfile");
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

  //File manage
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
    setViewFile(result.uri);
  };

  const deletePetInfoAlert = () => {
    Alert.alert("¿Estás seguro que quieres eliminar esta mascota?", "", [
      {
        text: "Cancelar",
        onPress: () => console.log("cancelado"),
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
              console.log("Eliminado: ", data);
              navigation.navigate("AdoptedProfile");
            },
            onError: (err) => {
              console.log("Error: ", err.networkError);
            },
          });
        },
      },
    ]);
  };

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
                  as: Ionicons,
                  name: "trash",
                  color: "#1F2937",
                }}
                marginLeft={180}
                onPress={() => {
                  deletePetInfoAlert();
                  console.log("Si m");
                }}
              ></IconButton>
            </View>
            <View marginTop={5}>
              {petProfPic && (
                <Avatar
                  size={140}
                  rounded
                  source={{
                    uri: newPetImage,
                  }}
                >
                  <Avatar.Accessory size={25} onPress={pickImage} />
                </Avatar>
              )}
              {petImage && (
                <Button
                  variant="unstyled"
                  onPress={onUploadPress}
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
                  <UploadButtonText marginRight={2}>Subir</UploadButtonText>
                </Button>
              )}
            </View>
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
            <View flexDir={"row"} width={420} marginLeft={2} marginRight={12}>
              <View width={50} marginLeft={6}>
                <PageTitle about={true}>Protocolo</PageTitle>
              </View>
              {protocol != "No tiene" ? (
                <IconButton
                  _icon={{
                    as: AntDesign,
                    name: "addfile",
                    color: "#1F2937",
                  }}
                  onPress={pickDocument}
                  marginLeft={82}
                ></IconButton>
              ) : undefined}
            </View>
            <ReasonTextContainer otherInfo={true} marginBottom={3}>
              <ReasonText>{protocol}</ReasonText>
              {protocol != "No tiene" ? (
                <ChildWrapper>
                  <AdoptedItemWrapper>
                    <ProtocolFileObject
                      fileName={"Si mande"}
                    ></ProtocolFileObject>
                  </AdoptedItemWrapper>
                </ChildWrapper>
              ) : undefined}
            </ReasonTextContainer>
          </InnerContainer>
        </ScrollView>
      </StyledContainer>
    </NativeBaseProvider>
  );
};

export default AdoptedPetProfileScreen;
