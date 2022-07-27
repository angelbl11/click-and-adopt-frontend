import React, { useContext, useEffect, useState, useCallback } from "react";
import { Dimensions, Alert, RefreshControl } from "react-native";

//Libraries
import {
  View,
  Spinner,
  Heading,
  VStack,
  Center,
  ScrollView,
  HStack,
  Link,
  useToast,
  IconButton,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Updates from "expo-updates";
//Custom Components
import LikedUserComponent from "../../components/RenderObjects/LikedUserComponent";

//Auth
import { AuthContext } from "../../context/Auth";

//GraphQL
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ADOPTER_LIKES, GET_ADOPTED_LIKES } from "../../graphql/queries";
import {
  DELETE_PET_LIKE,
  TRASH_PET_LIKE,
  DELETE_ADOPTER_LIKE,
  TRASH_ADOPTER_LIKE,
} from "../../graphql/mutations";

const LikeScreen = ({ navigation }) => {
  const url = "https://click-and-adopt.herokuapp.com/ProfilePictures/";
  const { user } = useContext(AuthContext);
  const [adopterLikes, setAdopterLikes] = useState([]);
  const [adoptedLikes, setAdoptedLikes] = useState([]);
  //Variables for screensize
  const screenHeight = Dimensions.get("window").height;
  //Refresh control
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Updates.reloadAsync();
  }, []);
  //Toast
  const toast = useToast();
  const [reasignPetLike] = useMutation(DELETE_PET_LIKE);
  const [trashPetLike] = useMutation(TRASH_PET_LIKE);
  const [getAdopterLikes, { data, loading }] = useLazyQuery(GET_ADOPTER_LIKES, {
    variables: {
      userId: user.id,
    },

    onCompleted: (data) => {
      setAdopterLikes(data?.getPetsLikes?.likes);
    },
  });
  const [reasignUserLike] = useMutation(DELETE_ADOPTER_LIKE);
  const [trashUserLike] = useMutation(TRASH_ADOPTER_LIKE);
  const [getAdoptedLikes, { data: adoptedData, loading: adoptedLoading }] =
    useLazyQuery(GET_ADOPTED_LIKES, {
      variables: {
        userId: user.id,
      },
      onCompleted: (data) => {
        setAdoptedLikes(adoptedData?.getUserLikes?.likes);
      },
    });
  const deleteLikeAlert = (likedUserId) => {
    Alert.alert(
      "¿Estás seguro que quieres eliminar este like?",
      "Se reasignará a tus likes disponibles y no será guardado en la papelera",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            user.account === "Adoptante"
              ? reasignPetLike({
                  variables: {
                    petId: likedUserId,
                    userId: user.id,
                  },
                  onCompleted: () => {
                    getAdopterLikes();
                  },
                })
              : reasignUserLike({
                  variables: {
                    likedUserId: likedUserId,
                    userId: user.id,
                  },
                  onCompleted: () => {
                    getAdoptedLikes();
                  },
                });
          },
        },
      ]
    );
  };

  const trashLikeAlert = (likedUserId) => {
    Alert.alert(
      "¿Estás seguro que quieres enviar este like a la papelera?",
      "Se reasignará a tus likes disponibles y se almacenará este like en tu papelera",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Enviar",
          onPress: () => {
            user.account === "Adoptante"
              ? trashPetLike({
                  variables: {
                    petId: likedUserId,
                    userId: user.id,
                  },
                  onCompleted: () => {
                    navigation.navigate("Paperbin", {
                      userId: user.id,
                      userAccount: user.account,
                    });
                  },
                })
              : trashUserLike({
                  variables: {
                    likedUserId: likedUserId,
                    userId: user.id,
                  },
                  onCompleted: () => {
                    navigation.navigate("Paperbin", {
                      userId: user.id,
                      userAccount: user.account,
                    });
                  },
                });
          },
        },
      ]
    );
  };
  useEffect(() => {
    user.account === "Adoptante" ? getAdopterLikes() : getAdoptedLikes();
  }, []);
  return (
    <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
      <StatusBar style="dark" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <VStack alignItems={"center"} bgColor="#FFFFFF">
          <HStack space={3.5} mt={3}>
            <Heading
              fontSize={"38px"}
              fontWeight="bold"
              color="#6A994E"
              right={6}
            >
              Likes
            </Heading>
            <Link
              right={3.3}
              onPress={() =>
                toast.show({
                  description:
                    "Si no ves tus likes otorgados o reasignados recientemente, recarga la aplicación.",
                })
              }
              _text={{
                fontSize: 16,
                color: "#6A994E",
                fontWeight: "semibold",
                mt: 4,
              }}
            >
              ¿No ves los cambios?
            </Link>
            <IconButton
              onPress={() =>
                navigation.navigate("Paperbin", {
                  userId: user.id,
                  userAccount: user.account,
                })
              }
              left={8}
              _icon={{
                as: MaterialCommunityIcons,
                name: "account-heart",
                size: "md",
              }}
              _pressed={{
                bg: "#7db85c",
                borderRadius: 100,
              }}
            />
          </HStack>
          <VStack space={2} mt={5}>
            {loading || adoptedLoading ? (
              <Center mt={150}>
                <Spinner color={"#6A994E"} />
                <Heading color="#6A994E" fontSize="xl">
                  Cargando
                </Heading>
              </Center>
            ) : user.account === "Adoptante" ? (
              adopterLikes?.map(({ date }, index) => {
                return (
                  <LikedUserComponent
                    key={index}
                    name={adopterLikes[index].petId?.adoptedPetName}
                    date={date}
                    pressReasign={() =>
                      deleteLikeAlert(adopterLikes[index].petId?.id)
                    }
                    pressTrash={() =>
                      trashLikeAlert(adopterLikes[index].petId?.id)
                    }
                    url={url + adopterLikes[index].petId?.petPicture?.filename}
                    pressed={() =>
                      navigation.navigate("PetProfile", {
                        petId: adopterLikes[index].petId?.id,
                        name: adopterLikes[index].petId?.adoptedPetName,
                        gender: adopterLikes[index].petId?.genderOfAdoptedPet,
                        des: adopterLikes[index].petId?.adoptedPetDescription,
                        age: adopterLikes[index].petId?.ageOfAdoptedPet,
                        isHealthyP:
                          adopterLikes[index].petId?.isHealthyWithOtherPets,
                        isHealthyK:
                          adopterLikes[index].petId?.isHealthyWithKids,
                        typeOf: adopterLikes[index].petId?.typeOfAdoptedPet,
                        coexistence:
                          adopterLikes[index].petId?.coexistenceWithOtherPets,
                        protocol: adopterLikes[index].petId?.adoptedPetProtocol,
                        petProfPic:
                          url + adopterLikes[index].petId?.petPicture?.filename,
                        isVisible: false,
                      })
                    }
                  />
                );
              })
            ) : (
              adoptedLikes?.map(({ date }, index) => {
                return (
                  <LikedUserComponent
                    key={index}
                    name={adoptedLikes[index].likedUserId?.userId?.fullName}
                    url={
                      url +
                      adoptedLikes[index].likedUserId?.userId?.profilePicture
                        ?.filename
                    }
                    date={date}
                    pressReasign={() =>
                      deleteLikeAlert(adoptedLikes[index].likedUserId?.id)
                    }
                    pressTrash={() =>
                      trashLikeAlert(adoptedLikes[index].likedUserId?.id)
                    }
                    pressed={() => {
                      navigation.navigate("CarrouselAdopter", {
                        petGenderPreferences:
                          adoptedLikes[index].likedUserId?.petGenderPreferences,
                        petPreferences:
                          adoptedLikes[index].likedUserId?.petPreferences,
                        petAgePreferences:
                          adoptedLikes[index].likedUserId?.petAgePreferences,
                        reasonToAdopt:
                          adoptedLikes[index].likedUserId?.reasonToAdopt,
                        haveChildren:
                          adoptedLikes[index].likedUserId?.haveChildren,
                        havePets: adoptedLikes[index].likedUserId?.havePets,
                        haveDog: adoptedLikes[index].likedUserId?.haveDog,
                        haveCat: adoptedLikes[index].likedUserId?.haveCat,
                        numberOfDogs:
                          adoptedLikes[index].likedUserId?.numberOfDogs,
                        numberOfCats:
                          adoptedLikes[index].likedUserId?.numberOfCats,
                        isAgreeWithProtocol:
                          adoptedLikes[index].likedUserId?.isAgreeWithProtocol,
                        hadPets: adoptedLikes[index].likedUserId?.hadPets,
                        hadPetsValue:
                          adoptedLikes[index].likedUserId?.hadPetsValue,
                        hadPetsDate:
                          adoptedLikes[index].likedUserId?.hadPetsDate,
                        numberOfDays:
                          adoptedLikes[index].likedUserId?.numberOfDays,
                        numberOfMonths:
                          adoptedLikes[index].likedUserId?.numberOfMonths,
                        numberOfYears:
                          adoptedLikes[index].likedUserId?.numberOfYears,
                        petSizePreferences:
                          adoptedLikes[index].likedUserId?.petSizePreferences,
                        profilePic:
                          url +
                          adoptedLikes[index].likedUserId?.userId
                            ?.profilePicture?.filename,
                        fullName:
                          adoptedLikes[index].likedUserId?.userId?.fullName,
                        account:
                          adoptedLikes[index].likedUserId?.userId?.account,
                        age: adoptedLikes[index].likedUserId?.userId?.age,
                        email: adoptedLikes[index].likedUserId?.userId?.email,
                      });
                    }}
                  />
                );
              })
            )}
          </VStack>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default LikeScreen;
