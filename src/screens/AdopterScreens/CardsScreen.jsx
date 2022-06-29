import React, { useRef, useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import FooterButtons from "../../components/Card/FooterButtons";
import { PageTitle } from "../../components/Utils/Styles";
import { View } from "native-base";
import { AuthContext } from "../../context/Auth";
import CardStack from "react-native-card-stack-swiper";
import CardComponent from "../../components/Card/CardComponent";
//Graphql
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_RANDOM_PETS } from "../../graphql/queries";
import { GIVE_LIKE_PET } from "../../graphql/mutations";

const CardsScreen = ({ navigation }) => {
  const cardRef = useRef(null);
  const [petsCards, setPetsCards] = useState([]);
  const { user } = useContext(AuthContext);
  const url = "https://calm-forest-47055.herokuapp.com/ProfilePictures/";
  const [giveLikeToPet] = useMutation(GIVE_LIKE_PET, {
    variables: {
      petId: petsCards[0]?.id,
      userId: user.id,
    },
    onCompleted: (data) => {
      console.log("LIKE PARA QUE LO VEA");
      console.log(data);
    },
    onError: (err) => {
      console.log("ERROR ", err.graphQLErrors);
    },
  });
  const [getPets, { data, loading }] = useLazyQuery(GET_RANDOM_PETS, {
    variables: {
      userId: user.id,
    },
    onError: (err) => {
      console.log("Network error:");
    },

    onCompleted: (data) => {
      setPetsCards(data?.getRandomPet);
    },
  });

  useEffect(() => {
    getPets();
  }, []);
  return (
    <View flex={1} bgColor={"#FFFFFF"}>
      <StatusBar style="dark" />
      <PageTitle>Encuentra Mascotas</PageTitle>

      <CardStack
        style={styles.content}
        ref={cardRef}
        disableTopSwipe={true}
        disableBottomSwipe={true}
        onSwipedRight={() => giveLikeToPet()}
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
