import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  UserLikeWrapper,
  ExtraText,
} from "../../components/Utils/Styles";

import { AuthContext } from "../../context/Auth";
import { GET_ADOPTED_LIKES } from "../../graphql/queries";
import { useMutation, useLazyQuery } from "@apollo/client";
import LikedUserComponent from "../../components/RenderObjects/LikedUserComponent";
import { Heading, HStack, Spinner, View } from "native-base";
const AdoptedLikesScreen = ({ navigation }) => {
  const url = "https://calm-forest-47055.herokuapp.com/ProfilePictures/";
  const { user } = useContext(AuthContext);
  const [adoptedLikes, setAdoptedLikes] = useState([]);
  const [getAdoptedLikes, { data, loading }] = useLazyQuery(GET_ADOPTED_LIKES, {
    variables: {
      userId: user.id,
    },
    onError: (err) => {
      console.log("Network error:");
      console.log(err.graphQLErrors);
    },

    onCompleted: (data) => {
      setAdoptedLikes(data?.getUserLikes?.likes);
    },
  });
  useEffect(() => {
    getAdoptedLikes();
  }, []);
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle marginRight={"280px"}>Likes</PageTitle>
        <HStack marginTop={7} marginBottom={3} textAlign={"center"}>
          <ExtraText>
            Nota: Si otorgaste un like recientemente, recarga la aplicación para
            visualizar los cambios.
          </ExtraText>
        </HStack>
        <View>
          {loading ? (
            <HStack
              space={2}
              justifyContent="center"
              width={"50%"}
              margin={"auto"}
            >
              <Spinner color={"#6A994E"} />
              <Heading color="#6A994E" fontSize="2xl">
                Cargando
              </Heading>
            </HStack>
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
                      hadPetsDate: adoptedLikes[index].likedUserId?.hadPetsDate,
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
                        adoptedLikes[index].likedUserId?.userId?.profilePicture
                          ?.filename,
                      fullName:
                        adoptedLikes[index].likedUserId?.userId?.fullName,
                      account: adoptedLikes[index].likedUserId?.userId?.account,
                      age: adoptedLikes[index].likedUserId?.userId?.age,
                      email: adoptedLikes[index].likedUserId?.userId?.email,
                    });
                  }}
                />
              );
            })
          )}
        </View>
      </InnerContainer>
    </StyledContainer>
  );
};

export default AdoptedLikesScreen;
