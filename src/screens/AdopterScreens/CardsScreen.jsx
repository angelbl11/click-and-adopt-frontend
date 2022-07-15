import React, { useRef, useState, useContext, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";

//Libraries
import { StatusBar } from "expo-status-bar";
import { View, Text, HStack, Heading } from "native-base";
import CardStack from "react-native-card-stack-swiper";

//Components
import FooterButtons from "../../components/Card/FooterButtons";
import CardComponent from "../../components/Card/CardComponent";

//Graphql
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_RANDOM_PETS } from "../../graphql/queries";
import { GIVE_LIKE_PET, GIVE_NOPE_PET } from "../../graphql/mutations";

//Auth
import { AuthContext } from "../../context/Auth";

const CardsScreen = ({ navigation }) => {
  const cardRef = useRef(null);
  const [petsCards, setPetsCards] = useState([]);
  const [likeNumber, setLikeNumber] = useState();
  //Variables for screensize
  const screenHeight = Dimensions.get("window").height;
  const { user } = useContext(AuthContext);
  const url = "https://calm-forest-47055.herokuapp.com/ProfilePictures/";
  const [giveLikeToPet] = useMutation(GIVE_LIKE_PET, {
    variables: {
      petId: petsCards[0]?.id,
      userId: user.id,
    },
    onCompleted: (data) => {
      setLikeNumber(likeNumber - 1);
    },
  });
  const [giveNopeToPet] = useMutation(GIVE_NOPE_PET, {
    variables: {
      petId: petsCards[0]?.id,
      userId: user.id,
    },
  });
  const [getPets, { data, loading }] = useLazyQuery(GET_RANDOM_PETS, {
    variables: {
      userId: user.id,
    },
    onCompleted: (data) => {
      setPetsCards(data?.getRandomPet?.pets);
      setLikeNumber(10 - data?.getRandomPet?.numOfLikes);
    },
  });

  useEffect(() => {
    getPets();
  }, []);
  return (
    <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
      <StatusBar style="dark" />
      <Heading
        fontSize={"28px"}
        textAlign={"center"}
        fontWeight="bold"
        color="#6A994E"
        marginBottom={"15px"}
      >
        Encuentra Mascotas
      </Heading>
      <Text
        fontSize={"18px"}
        fontWeight={"semibold"}
        color={"#1F2937"}
        textAlign="center"
      >
        Likes disponibles: {likeNumber}
      </Text>

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

      <FooterButtons
        pressLeft={() => {
          cardRef.current.swipeLeft();
        }}
        pressRight={() => {
          cardRef.current.swipeRight();
        }}
      ></FooterButtons>
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
