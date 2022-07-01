import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  ExtraText,
} from "../../components/Utils/Styles";

import { View, Spinner, Heading, HStack } from "native-base";

import { AuthContext } from "../../context/Auth";

//GraphQL
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ADOPTER_LIKES } from "../../graphql/queries";
import LikedUserComponent from "../../components/RenderObjects/LikedUserComponent";
import { useEffect } from "react";
import { useState } from "react";

const AdopterLikeScreen = ({ navigation }) => {
  const url = "https://calm-forest-47055.herokuapp.com/ProfilePictures/";
  const { user } = useContext(AuthContext);
  const [adopterLikes, setAdopterLikes] = useState([]);
  const [getAdopterLikes, { data, loading }] = useLazyQuery(GET_ADOPTER_LIKES, {
    variables: {
      userId: user.id,
    },
    onError: (err) => {
      console.log("Network error:");
      console.log(err.graphQLErrors);
    },

    onCompleted: (data) => {
      setAdopterLikes(data?.getPetsLikes?.likes);
      console.log("HECHO");
    },
  });

  useEffect(() => {
    getAdopterLikes();
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
            adopterLikes?.map(({ date }, index) => {
              console.log(
                "Id de la mascota like: " +
                  adopterLikes[index].petId?.adoptedPetName
              );
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
                      isHealthyK: adopterLikes[index].petId?.isHealthyWithKids,
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
        </View>
      </InnerContainer>
    </StyledContainer>
  );
};

export default AdopterLikeScreen;
