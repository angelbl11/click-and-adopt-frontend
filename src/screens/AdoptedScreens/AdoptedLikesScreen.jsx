import React, { useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";

//Libraries
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
const AdoptedLikesScreen = ({ navigation }) => {
  const url = "https://calm-forest-47055.herokuapp.com/ProfilePictures/";
  const { user } = useContext(AuthContext);
  const [adoptedLikes, setAdoptedLikes] = useState([]);
  //Variables for screensize
  const screenHeight = Dimensions.get("window").height;
  //Toast
  const toast = useToast();
  const [getAdoptedLikes, { data, loading }] = useLazyQuery(GET_ADOPTED_LIKES, {
    variables: {
      userId: user.id,
    },
    onCompleted: (data) => {
      setAdoptedLikes(data?.getUserLikes?.likes);
    },
  });
  useEffect(() => {
    getAdoptedLikes();
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
