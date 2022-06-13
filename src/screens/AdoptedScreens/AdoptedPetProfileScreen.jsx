import React, { useState, useContext } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// Import Document Picker
import * as DocumentPicker from "expo-document-picker";

//Graphql
import {
  UPLOAD_PET_PROFILE_PICTURE,
  DELETE_PET_INFO,
} from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client/public";

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
} from "../../components/Utils/Styles";

//Components
import ProtocolFileObject from "../../components/RenderObjects/ProtocolFileObject";
import { Avatar } from "react-native-elements";
import * as mime from "react-native-mime-types";

//Context
import { PetsContext } from "../../context/PetsContext";

//Native Base Components
import { ScrollView, View, Button, IconButton } from "native-base";

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
  } = route.params;
  const [uploadPetImage, { loading }] = useMutation(UPLOAD_PET_PROFILE_PICTURE);
  const [showButton, setShowButton] = useState(false);
  const [deletePet] = useMutation(DELETE_PET_INFO);
  const { petImage, setPetImage, num, setNum, pets, setPets } =
    useContext(PetsContext);
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
      let images = petImage;

      images[count] = result.uri;

      console.log("hola, es menor" + count);
      console.log(images);
      setPetImage(images);

      setNewPetImage(result.uri);
      setNum(num + 1);
      console.log("num: " + num);
    }
    if (result.cancelled) {
      setShowButton(false);
    }
  };

  async function onUploadPress() {
    const file = generateRNFile(newPetImage, `picture-${Date.now()}`);
    try {
      await uploadPetImage({
        variables: { addProfilePetPictureId: petId, petProfilePicture: file },
        onCompleted: (data) => {
          setShowButton(false);
          showUploadAlert();
          setNum(num + 1);
          navigation.navigate("AdoptedProfile");
        },
        onError: (err) => {
          console.log(err.networkError.result);
        },
      });
    } catch (e) {
      return;
    }
  }

  //File manage
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
    setViewFile(result.uri);
  };
  const showUploadAlert = () =>
    Alert.alert("Completado", "Foto de perfil subida con éxito", [
      {
        text: "Cerrar",
        style: "cancel",
      },
    ]);
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
    <StyledContainer>
      <StatusBar style="dark" />
      <ScrollView>
        <InnerContainer>
          <View flexDir={"row"} width={420} marginLeft={2} marginRight={12}>
            <View width={40} marginLeft={6}>
              <PageTitle profile={true}>Perfil</PageTitle>
            </View>
            {isVisible ? (
              <IconButton
                _icon={{
                  as: Ionicons,
                  name: "trash",
                  color: "#1F2937",
                }}
                marginLeft={180}
                onPress={() => {
                  deletePetInfoAlert();
                }}
              ></IconButton>
            ) : undefined}
          </View>
          <View marginTop={5}>
            {petProfPic && (
              <Avatar
                size={140}
                rounded
                source={{
                  uri: newPetImage
                    ? newPetImage
                    : "https://calm-forest-47055.herokuapp.com/ProfilePictures/defaultprof.jpg",
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
                width={100}
                marginLeft={6}
                leftIcon={
                  <MaterialIcons name="file-upload" size={24} color="#1F2937" />
                }
              >
                <UploadButtonText marginRight={2}>
                  {loading ? "Subiendo..." : "Subir"}
                </UploadButtonText>
              </Button>
            ) : undefined}
          </View>
          <SubTitle profile={true}>{name}</SubTitle>
          <SubTitle typeOfUserLabel={true}>{typeOf}</SubTitle>
          <PageTitle about={true} marginLeft={"15px"}>
            Acerca De
          </PageTitle>
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
              <PageTitle about={true} marginLeft={"15px"}>
                Protocolo
              </PageTitle>
            </View>
            {protocol != "No tiene" && isVisible ? (
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
  );
};

export default AdoptedPetProfileScreen;
