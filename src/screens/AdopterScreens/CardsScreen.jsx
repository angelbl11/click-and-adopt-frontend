import React, { useRef, useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import FooterButtons from "../../components/Card/FooterButtons";
import { PageTitle, SubTitle } from "../../components/Utils/Styles";
import { View, Text } from "native-base";
import { AuthContext } from "../../context/Auth";
import CardStack from "react-native-card-stack-swiper";
import CardComponent from "../../components/Card/CardComponent";
//Graphql
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_RANDOM_PETS } from "../../graphql/queries";
import { GIVE_LIKE_PET, GIVE_NOPE_PET } from "../../graphql/mutations";

const CardsScreen = ({ navigation }) => {
  const cardRef = useRef(null);
  const [petsCards, setPetsCards] = useState([]);
  const [likeNumber, setLikeNumber] = useState();
  const { user } = useContext(AuthContext);
  const url = "https://calm-forest-47055.herokuapp.com/ProfilePictures/";
  const [giveLikeToPet] = useMutation(GIVE_LIKE_PET, {
    variables: {
      petId: petsCards[0]?.id,
      userId: user.id,
    },
    onCompleted: (data) => {
      console.log("LIKE");
      console.log(data);
      setLikeNumber(likeNumber - 1);
    },
    onError: (err) => {
      console.log("ERROR ", err.graphQLErrors);
    },
  });
  const [giveNopeToPet] = useMutation(GIVE_NOPE_PET, {
    variables: {
      petId: petsCards[0]?.id,
      userId: user.id,
    },
    onCompleted: (data) => {
      console.log("NOPE");
      console.log(data);
    },
    onError: (err) => {
      console.log("ERROR ", err.clientErrors);
    },
  });
  const [getPets, { data, loading }] = useLazyQuery(GET_RANDOM_PETS, {
    variables: {
      userId: user.id,
    },
    onError: (err) => {
      console.log("Network error:");
      console.log(err.graphQLErrors);
    },

    onCompleted: (data) => {
      console.log(data?.getRandomPet);
      setPetsCards(data?.getRandomPet?.pets);
      setLikeNumber(10 - data?.getRandomPet?.numOfLikes);
    },
  });

  useEffect(() => {
    getPets();
  }, []);
  return (
    <View flex={1} bgColor={"#FFFFFF"}>
      <StatusBar style="dark" />
      <PageTitle>Encuentra Mascotas</PageTitle>
      <SubTitle textAlign={"center"} marginTop={"6px"}>
        Likes disponibles: {likeNumber}
      </SubTitle>
      <CardStack
        style={styles.content}
        ref={cardRef}
        disableTopSwipe={true}
        disableBottomSwipe={true}
        onSwipedRight={() => giveLikeToPet()}
        onSwipedLeft={() => giveNopeToPet()}
        renderNoMoreCards={() => (
          <Text style={{ fontWeight: "700", fontSize: 18, color: "gray" }}>
            No hay mascotas para mostrar
          </Text>
        )}
      >
        {petsCards?.map(
          (
            {
              adoptedPetName,
              petPicture,
              id,
              genderOfAdoptedPet,
              adoptedPetDescription,
              ageOfAdoptedPet,
              isHealthyWithOtherPets,
              isHealthyWithKids,
              typeOfAdoptedPet,
              coexistenceWithOtherPets,
              adoptedPetProtocol,
            },
            index
          ) => {
            console.log("Id de la mascota: " + petsCards[index].adoptedPetName);
            return (
              <CardComponent
                key={index}
                petName={adoptedPetName}
                uri={url + petPicture?.filename}
                pressed={() =>
                  navigation.navigate("PetProfile", {
                    petId: id,
                    name: adoptedPetName,
                    gender: genderOfAdoptedPet,
                    des: adoptedPetDescription,
                    age: ageOfAdoptedPet,
                    isHealthyP: isHealthyWithOtherPets,
                    isHealthyK: isHealthyWithKids,
                    typeOf: typeOfAdoptedPet,
                    coexistence: coexistenceWithOtherPets,
                    protocol: adoptedPetProtocol,
                    petProfPic: url + petPicture?.filename,
                    isVisible: false,
                  })
                }
              />
            );
          }
        )}
      </CardStack>

      <View>
        <FooterButtons
          pressLeft={() => {
            cardRef.current.swipeLeft();
          }}
          pressRight={() => {
            cardRef.current.swipeRight();
          }}
        ></FooterButtons>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    top: -60,
  },
});

export default CardsScreen;
