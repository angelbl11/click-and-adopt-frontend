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
import { GET_ADOPTER_LIKES } from "../../graphql/queries";
import { DELETE_PET_LIKE, TRASH_PET_LIKE } from "../../graphql/mutations";

const AdopterLikeScreen = ({ navigation }) => {
  const url = "https://calm-forest-47055.herokuapp.com/ProfilePictures/";
  const { user } = useContext(AuthContext);
  const [adopterLikes, setAdopterLikes] = useState([]);
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
            reasignPetLike({
              variables: {
                petId: petId,
                userId: user.id,
              },
              onError: (err) => {
                console.log(err.graphQLErrors);
                console.log(user.id);
              },
            });
          },
        },
      ]
    );
  };

  const trashLikeAlert = (petId) => {
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
            trashPetLike({
              variables: {
                petId: petId,
                userId: user.id,
              },
              onError: (err) => {
                console.log(err.graphQLErrors);
                console.log(user.id);
              },
            });
          },
        },
      ]
    );
  };

  useEffect(() => {
    getAdopterLikes();
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
            {loading ? (
              <Center mt={150}>
                <Spinner color={"#6A994E"} />
                <Heading color="#6A994E" fontSize="xl">
                  Cargando
                </Heading>
              </Center>
            ) : (
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
            )}
          </VStack>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default AdopterLikeScreen;
