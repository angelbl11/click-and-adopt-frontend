import React, { useContext, useEffect, useState, useCallback } from "react";
import { Dimensions, Alert, RefreshControl } from "react-native";

//Libraries
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Updates from "expo-updates";
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

//Custom Components
import LikedUserComponent from "../../components/RenderObjects/LikedUserComponent";

//GraphQL
import { GET_ADOPTED_LIKES } from "../../graphql/queries";
import { useMutation, useLazyQuery } from "@apollo/client";

//Auth
import { AuthContext } from "../../context/Auth";
import {
  DELETE_ADOPTER_LIKE,
  TRASH_ADOPTER_LIKE,
} from "../../graphql/mutations";
const AdoptedLikesScreen = ({ navigation }) => {
  const url = "https://calm-forest-47055.herokuapp.com/ProfilePictures/";
  const { user } = useContext(AuthContext);
  const [adoptedLikes, setAdoptedLikes] = useState([]);
  //Refresh control
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Updates.reloadAsync();
  }, []);
  //Variables for screensize
  const screenHeight = Dimensions.get("window").height;
  //Toast
  const toast = useToast();
  const [deleteUserLike] = useMutation(DELETE_ADOPTER_LIKE);
  const [trashUserLike] = useMutation(TRASH_ADOPTER_LIKE);
  const [getAdoptedLikes, { data, loading }] = useLazyQuery(GET_ADOPTED_LIKES, {
    variables: {
      userId: user.id,
    },
    onCompleted: (data) => {
      setAdoptedLikes(data?.getUserLikes?.likes);
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
            deleteUserLike({
              variables: {
                likedUserId: likedUserId,
                userId: user.id,
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
            trashUserLike({
              variables: {
                likedUserId: likedUserId,
                userId: user.id,
              },
              onCompleted: () => {
                navigation.navigate("PaperbinAdopted", { userId: user.id });
              },
            });
          },
        },
      ]
    );
  };

  useEffect(() => {
    getAdoptedLikes();
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
          <HStack mt={3}>
            <Heading
              fontSize={"38px"}
              fontWeight="bold"
              color="#6A994E"
              right={10}
            >
              Likes
            </Heading>
            <Link
              left={-12}
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
                navigation.navigate("PaperbinAdopted", { userId: user.id })
              }
              left={12}
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
            {loading ? (
              <Center mt={150}>
                <Spinner color={"#6A994E"} />
                <Heading color="#6A994E" fontSize="xl">
                  Cargando
                </Heading>
              </Center>
            ) : adoptedLikes.length === 0 ? (
              <Center mt={200}>
                <Heading color="#6A994E" fontSize="xl">
                  No has asignado likes
                </Heading>
              </Center>
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

export default AdoptedLikesScreen;
