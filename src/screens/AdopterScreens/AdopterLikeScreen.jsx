import React, { useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";

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

//Custom Components
import LikedUserComponent from "../../components/RenderObjects/LikedUserComponent";

//Auth
import { AuthContext } from "../../context/Auth";

//GraphQL
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ADOPTER_LIKES } from "../../graphql/queries";

const AdopterLikeScreen = ({ navigation }) => {
  const url = "https://calm-forest-47055.herokuapp.com/ProfilePictures/";
  const { user } = useContext(AuthContext);
  const [adopterLikes, setAdopterLikes] = useState([]);
  //Variables for screensize
  const screenHeight = Dimensions.get("window").height;
  //Toast
  const toast = useToast();
  const [getAdopterLikes, { data, loading }] = useLazyQuery(GET_ADOPTER_LIKES, {
    variables: {
      userId: user.id,
    },

    onCompleted: (data) => {
      setAdopterLikes(data?.getPetsLikes?.likes);
    },
  });

  useEffect(() => {
    getAdopterLikes();
  }, []);
  return (
    <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
      <StatusBar style="dark" />
      <ScrollView>
        <VStack alignItems={"center"} bgColor="#FFFFFF">
          <HStack space={3.5} mt={3}>
            <Heading
              fontSize={"38px"}
              fontWeight="bold"
              color="#6A994E"
              right={10}
            >
              Likes
            </Heading>
            <Link
              right={3.3}
              onPress={() =>
                toast.show({
                  description:
                    "Si no ves tus likes otorgados recientemente, recarga la aplicación.",
                })
              }
              _text={{
                fontSize: 16,
                color: "#6A994E",
                fontWeight: "semibold",
                mt: 4,
              }}
            >
              ¿No ves tus likes?
            </Link>
            <IconButton
              left={8}
              _icon={{
                as: MaterialCommunityIcons,
                name: "account-heart",
                size: "md",
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
