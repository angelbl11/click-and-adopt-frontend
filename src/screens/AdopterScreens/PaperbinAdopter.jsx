import React, { useState, useEffect } from "react";
import { Dimensions, Alert } from "react-native";

//Libraries
import { View, Spinner, Heading, VStack, Center } from "native-base";
import { StatusBar } from "expo-status-bar";

//GraphQl
import { GET_TRASH_LIKES_ADOPTER } from "../../graphql/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { MOVE_ADOPTER_LIKE } from "../../graphql/mutations";

//Custom Components
import LikedUserComponent from "../../components/RenderObjects/LikedUserComponent";

const PaperbinAdopter = ({ navigation, route }) => {
  const url = "https://calm-forest-47055.herokuapp.com/ProfilePictures/";
  //Variables for screensize
  const screenHeight = Dimensions.get("window").height;
  const { userId } = route.params;
  const [adopterTrashLikes, setAdopterTrashLikes] = useState([]);
  //graphql hooks
  const [moveLikeAdopter] = useMutation(MOVE_ADOPTER_LIKE);
  const [getTrashLikesAdopter, { loading, data }] = useLazyQuery(
    GET_TRASH_LIKES_ADOPTER,
    {
      variables: {
        userId: userId,
      },

      onCompleted: (data) => {
        setAdopterTrashLikes(data?.getPetsTrashLikes?.likes);
      },
    }
  );
  //Alerts
  const movetoLikeScreenAlert = (petId) => {
    Alert.alert(
      "¿Estás seguro que quieres reasignar este like?",
      "Si tienes likes disponibles, se moverá este usuario a tu pantalla de Likes",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: () => {
            moveLikeAdopter({
              variables: {
                petId: petId,
                userId: userId,
              },
              onCompleted: () => {
                navigation.navigate("AdopterProfile", { screen: "Likes" });
              },
            });
          },
        },
      ]
    );
  };

  const showErrorAlert = (message) =>
    Alert.alert("Error en la operación, " + message, [
      {
        text: "Cerrar",
        style: "cancel",
      },
    ]);

  const deleteLikeAlert = (petId) => {
    Alert.alert(
      "¿Estás seguro que quieres eliminar este like?",
      "Se reasignará a tus likes disponibles",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            deleteUserLike({
              variables: {
                petId: petId,
                userId: userId,
              },
              onCompleted: () => {
                navigation.navigate("AdopterProfile", { screen: "Likes" });
              },
            });
          },
        },
      ]
    );
  };
  useEffect(() => {
    getTrashLikesAdopter();
  }, []);
  return (
    <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
      <StatusBar style="dark" />
      <VStack alignItems={"center"} bgColor="#FFFFFF">
        <Heading
          fontSize={"38px"}
          fontWeight="bold"
          color="#6A994E"
          right={100}
        >
          Papelera
        </Heading>
        <VStack space={2} mt={5}>
          {loading ? (
            <Center mt={150}>
              <Spinner color={"#6A994E"} />
              <Heading color="#6A994E" fontSize="xl">
                Cargando
              </Heading>
            </Center>
          ) : adopterTrashLikes.length === 0 ? (
            <Center mt={200}>
              <Heading color="#6A994E" fontSize="xl">
                Aún no hay likes en la papelera
              </Heading>
            </Center>
          ) : (
            adopterTrashLikes?.map(({ date }, index) => {
              return (
                <LikedUserComponent
                  isPaperBin={true}
                  key={index}
                  name={adopterTrashLikes[index].petId?.adoptedPetName}
                  date={date}
                  pressReasign={() =>
                    movetoLikeScreenAlert(adopterTrashLikes[index].petId?.id)
                  }
                  pressTrash={() =>
                    deleteLikeAlert(adopterTrashLikes[index].petId?.id)
                  }
                  url={
                    url + adopterTrashLikes[index].petId?.petPicture?.filename
                  }
                  pressed={() =>
                    navigation.navigate("PetProfile", {
                      petId: adopterTrashLikes[index].petId?.id,
                      name: adopterTrashLikes[index].petId?.adoptedPetName,
                      gender:
                        adopterTrashLikes[index].petId?.genderOfAdoptedPet,
                      des: adopterTrashLikes[index].petId
                        ?.adoptedPetDescription,
                      age: adopterTrashLikes[index].petId?.ageOfAdoptedPet,
                      isHealthyP:
                        adopterTrashLikes[index].petId?.isHealthyWithOtherPets,
                      isHealthyK:
                        adopterTrashLikes[index].petId?.isHealthyWithKids,
                      typeOf: adopterTrashLikes[index].petId?.typeOfAdoptedPet,
                      coexistence:
                        adopterTrashLikes[index].petId
                          ?.coexistenceWithOtherPets,
                      protocol:
                        adopterTrashLikes[index].petId?.adoptedPetProtocol,
                      petProfPic:
                        url +
                        adopterTrashLikes[index].petId?.petPicture?.filename,
                      isVisible: false,
                    })
                  }
                />
              );
            })
          )}
        </VStack>
      </VStack>
    </View>
  );
};

export default PaperbinAdopter;
