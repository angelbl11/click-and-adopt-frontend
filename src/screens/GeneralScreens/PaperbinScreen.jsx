import React, { useEffect, useState } from "react";
import { Dimensions, Alert } from "react-native";
//Libraries
import { View, Spinner, Heading, VStack, Center } from "native-base";
import { StatusBar } from "expo-status-bar";

//GraphQL
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_TRASH_LIKES_ADOPTED,
  GET_TRASH_LIKES_ADOPTER,
} from "../../graphql/queries";
import LikedUserComponent from "../../components/RenderObjects/LikedUserComponent";
import {
  DELETE_ADOPTER_LIKE,
  DELETE_PET_LIKE,
  MOVE_ADOPTED_LIKE,
  MOVE_ADOPTER_LIKE,
} from "../../graphql/mutations";

const PaperbinScreen = ({ route, navigation }) => {
  const url = "https://click-and-adopt.herokuapp.com/ProfilePictures/";
  const { userId, userAccount } = route.params;
  const [adoptedTrashLikes, setAdoptedTrashLikes] = useState([]);
  const [adopterTrashLikes, setAdopterTrashLikes] = useState([]);
  //Graphql Hooks
  const [moveLikeAdopted] = useMutation(MOVE_ADOPTED_LIKE);
  const [deletePetLike] = useMutation(DELETE_PET_LIKE);
  const [deleteUserLike] = useMutation(DELETE_ADOPTER_LIKE);
  const [getTrashLikesAdopted, { loading, data }] = useLazyQuery(
    GET_TRASH_LIKES_ADOPTED,
    {
      variables: {
        userId: userId,
      },

      onCompleted: (data) => {
        setAdoptedTrashLikes(data?.getUsersTrashLikes?.likes);
      },
    }
  );
  const [moveLikeAdopter] = useMutation(MOVE_ADOPTER_LIKE);
  const [getTrashLikesAdopter, { loading: adopterLoading, data: adopterData }] =
    useLazyQuery(GET_TRASH_LIKES_ADOPTER, {
      variables: {
        userId: userId,
      },

      onCompleted: (data) => {
        setAdopterTrashLikes(adopterData?.getPetsTrashLikes?.likes);
      },
    });

  //Alerts
  const movetoLikeScreenAlert = (likedUserId) => {
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
            userAccount === "Adoptado"
              ? moveLikeAdopted({
                  variables: {
                    likedUserId: likedUserId,
                    userId: userId,
                  },
                  onCompleted: () => {
                    navigation.navigate("Profiles", { screen: "Likes" });
                  },
                  onError: (err) => {
                    showErrorAlert(err.message);
                  },
                })
              : moveLikeAdopter({
                  variables: {
                    petId: likedUserId,
                    userId: userId,
                  },
                  onCompleted: () => {
                    navigation.navigate("Profiles", { screen: "Likes" });
                  },
                  onError: (err) => {
                    showErrorAlert(err.message);
                  },
                });
          },
        },
      ]
    );
  };

  const showErrorAlert = (message) =>
    Alert.alert("Ha ocurrido un error", message, [
      {
        text: "Cerrar",
        style: "cancel",
      },
    ]);

  const deleteLikeAlert = (likedUserId) => {
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
            userAccount === "Adoptado"
              ? deleteUserLike({
                  variables: {
                    likedUserId: likedUserId,
                    userId: userId,
                  },
                  onCompleted: () => {
                    navigation.navigate("Profiles", { screen: "Likes" });
                  },
                })
              : deletePetLike({
                  variables: {
                    petId: likedUserId,
                    userId: userId,
                  },
                  onCompleted: () => {
                    navigation.navigate("Profiles", { screen: "Likes" });
                  },
                });
          },
        },
      ]
    );
  };
  useEffect(() => {
    userAccount === "Adoptado"
      ? getTrashLikesAdopted()
      : getTrashLikesAdopter();
  }, []);

  //Variables for screensize
  const screenHeight = Dimensions.get("window").height;
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
          {loading || adopterLoading ? (
            <Center mt={150}>
              <Spinner color={"#6A994E"} />
              <Heading color="#6A994E" fontSize="xl">
                Cargando
              </Heading>
            </Center>
          ) : (userAccount === "Adoptado" && adoptedTrashLikes?.length === 0) ||
            (userAccount === "Adoptante" && adopterTrashLikes?.length === 0) ? (
            <Center mt={200}>
              <Heading color="#6A994E" fontSize="xl">
                Aún no hay likes en la papelera
              </Heading>
            </Center>
          ) : userAccount === "Adoptado" ? (
            adoptedTrashLikes?.map(({ date }, index) => {
              return (
                <LikedUserComponent
                  isPaperBin={true}
                  key={index}
                  name={adoptedTrashLikes[index].likedUserId?.userId?.fullName}
                  url={
                    url +
                    adoptedTrashLikes[index].likedUserId?.userId?.profilePicture
                      ?.filename
                  }
                  date={date}
                  pressReasign={() =>
                    movetoLikeScreenAlert(
                      adoptedTrashLikes[index].likedUserId?.id
                    )
                  }
                  pressTrash={() =>
                    deleteLikeAlert(adoptedTrashLikes[index].likedUserId?.id)
                  }
                  pressed={() => {
                    navigation.navigate("AdopterProfile", {
                      petGenderPreferences:
                        adoptedTrashLikes[index].likedUserId
                          ?.petGenderPreferences,
                      petPreferences:
                        adoptedTrashLikes[index].likedUserId?.petPreferences,
                      petAgePreferences:
                        adoptedTrashLikes[index].likedUserId?.petAgePreferences,
                      reasonToAdopt:
                        adoptedTrashLikes[index].likedUserId?.reasonToAdopt,
                      haveChildren:
                        adoptedTrashLikes[index].likedUserId?.haveChildren,
                      havePets: adoptedTrashLikes[index].likedUserId?.havePets,
                      haveDog: adoptedTrashLikes[index].likedUserId?.haveDog,
                      haveCat: adoptedTrashLikes[index].likedUserId?.haveCat,
                      numberOfDogs:
                        adoptedTrashLikes[index].likedUserId?.numberOfDogs,
                      numberOfCats:
                        adoptedTrashLikes[index].likedUserId?.numberOfCats,
                      isAgreeWithProtocol:
                        adoptedTrashLikes[index].likedUserId
                          ?.isAgreeWithProtocol,
                      hadPets: adoptedTrashLikes[index].likedUserId?.hadPets,
                      hadPetsValue:
                        adoptedTrashLikes[index].likedUserId?.hadPetsValue,
                      hadPetsDate:
                        adoptedTrashLikes[index].likedUserId?.hadPetsDate,
                      numberOfDays:
                        adoptedTrashLikes[index].likedUserId?.numberOfDays,
                      numberOfMonths:
                        adoptedTrashLikes[index].likedUserId?.numberOfMonths,
                      numberOfYears:
                        adoptedTrashLikes[index].likedUserId?.numberOfYears,
                      petSizePreferences:
                        adoptedTrashLikes[index].likedUserId
                          ?.petSizePreferences,
                      profilePic:
                        url +
                        adoptedTrashLikes[index].likedUserId?.userId
                          ?.profilePicture?.filename,
                      fullName:
                        adoptedTrashLikes[index].likedUserId?.userId?.fullName,
                      account:
                        adoptedTrashLikes[index].likedUserId?.userId?.account,
                      age: adoptedTrashLikes[index].likedUserId?.userId?.age,
                      email:
                        adoptedTrashLikes[index].likedUserId?.userId?.email,
                    });
                  }}
                />
              );
            })
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

export default PaperbinScreen;
