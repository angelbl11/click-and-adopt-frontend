import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { ip } from "../../graphql/client";
import { UPLOAD_PET_PROFILE_PICTURE } from "../../graphql/client";
import { MaterialIcons } from "@expo/vector-icons";
//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  ReasonText,
  ReasonTextContainer,
  UploadButtonText,
} from "../../components/Styles";

//Apollo
import { useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client/public";
import * as mime from "react-native-mime-types";
import { PetsContext } from "../../context/PetsContext";
import { Avatar } from "react-native-elements";
//Native Base Components
import { NativeBaseProvider, ScrollView, View, Button } from "native-base";

const AdoptedPetProfileScreen = ({ route }) => {
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
  } = route.params;
  const [status, setStatus] = useState(null);
  const [uploadPetImage] = useMutation(UPLOAD_PET_PROFILE_PICTURE);
  const { petImage, setPetImage } = useContext(PetsContext);
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
      petProfPic = result.uri;
      setPetImage(petProfPic);
    }
  };

  async function onUploadPress() {
    status && setStatus(null);
    const file = generateRNFile(petImage, `picture-${Date.now()}`);
    try {
      await uploadPetImage({
        variables: { addProfilePetPictureId: petId, petProfilePicture: file },
        onCompleted: (data) => {
          console.log("Foto subida");
          console.log(data);
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
  return (
    <NativeBaseProvider>
      <StyledContainer>
        <StatusBar style="dark" />
        <ScrollView>
          <InnerContainer>
            <PageTitle profile={true}>Perfil</PageTitle>
            <View marginTop={5}>
              {petProfPic && (
                <Avatar
                  size={140}
                  rounded
                  source={{
                    uri: petProfPic,
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
            <PageTitle about={true}>Protocolo</PageTitle>
            <ReasonTextContainer otherInfo={true} marginBottom={3}>
              <ReasonText>{protocol}</ReasonText>
            </ReasonTextContainer>
          </InnerContainer>
        </ScrollView>
      </StyledContainer>
    </NativeBaseProvider>
  );
};

export default AdoptedPetProfileScreen;
