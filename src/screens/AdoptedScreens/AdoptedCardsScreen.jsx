import React, { useRef, useState, useContext, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";

//Libraries
import { View, Text, Heading } from "native-base";
import CardStack from "react-native-card-stack-swiper";

//Custom Components
import CardComponent from "../../components/Card/CardComponent";
import FooterButtons from "../../components/Card/FooterButtons";

//Graphql
import { useLazyQuery, useMutation } from "@apollo/client";
import { GIVE_LIKE_USER, GIVE_NOPE_USER } from "../../graphql/mutations";
import { GET_RANDOM_ADOPTERS } from "../../graphql/queries";

//Auth
import { AuthContext } from "../../context/Auth";

const AdoptedCardsScreen = ({ navigation }) => {
  //Variables for screensize
  const screenHeight = Dimensions.get("window").height;
  const cardRef = useRef(null);
  const [adopterCards, setAdopterCards] = useState([]);
  const [likeNumber, setLikeNumber] = useState();
  const { user } = useContext(AuthContext);
  const url = "https://calm-forest-47055.herokuapp.com/ProfilePictures/";
  const [giveLikeToUser] = useMutation(GIVE_LIKE_USER, {
    variables: {
      likedUserId: adopterCards[0]?.id,
      userId: user.id,
    },
    onCompleted: (data) => {
      setLikeNumber(likeNumber - 1);
    },
  });
  const [giveNopeToUser] = useMutation(GIVE_NOPE_USER, {
    variables: {
      likedUserId: adopterCards[0]?.id,
      userId: user.id,
    },
  });
  const [getAdopters, { data, loading }] = useLazyQuery(GET_RANDOM_ADOPTERS, {
    variables: {
      userId: user.id,
    },
    onCompleted: (data) => {
      setAdopterCards(data?.getRandomAdopter?.users);
      setLikeNumber(10 - data?.getRandomAdopter?.numOfLikes);
    },
  });

  useEffect(() => {
    getAdopters();
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
        Encuentra Adoptantes
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
        onSwipedRight={() => giveLikeToUser()}
        onSwipedLeft={() => giveNopeToUser()}
        renderNoMoreCards={() => (
          <Text style={{ fontWeight: "700", fontSize: 18, color: "gray" }}>
            No hay adoptantes para mostrar
          </Text>
        )}
      >
        {adopterCards?.map(
          (
            {
              petGenderPreferences,
              petPreferences,
              petAgePreferences,
              reasonToAdopt,
              haveChildren,
              havePets,
              haveDog,
              haveCat,
              numberOfDogs,
              numberOfCats,
              isAgreeWithProtocol,
              hadPets,
              hadPetsValue,
              hadPetsDate,
              numberOfDays,
              numberOfMonths,
              numberOfYears,
              petSizePreferences,
            },
            index
          ) => {
            return (
              <CardComponent
                key={index}
                petName={adopterCards[index].userId?.fullName}
                uri={url + adopterCards[index].userId?.profilePicture?.filename}
                pressed={() =>
                  navigation.navigate("CarrouselAdopter", {
                    petGenderPreferences: petGenderPreferences,
                    petPreferences: petPreferences,
                    petAgePreferences: petAgePreferences,
                    reasonToAdopt: reasonToAdopt,
                    haveChildren: haveChildren,
                    havePets: havePets,
                    haveDog: haveDog,
                    haveCat: haveCat,
                    numberOfDogs: numberOfDogs,
                    numberOfCats: numberOfCats,
                    isAgreeWithProtocol: isAgreeWithProtocol,
                    hadPets: hadPets,
                    hadPetsValue: hadPetsValue,
                    hadPetsDate: hadPetsDate,
                    numberOfDays: numberOfDays,
                    numberOfMonths: numberOfMonths,
                    numberOfYears: numberOfYears,
                    petSizePreferences: petSizePreferences,
                    profilePic:
                      url +
                      adopterCards[index].userId?.profilePicture?.filename,
                    fullName: adopterCards[index].userId?.fullName,
                    account: adopterCards[index].userId?.account,
                    age: adopterCards[index].userId?.age,
                    email: adopterCards[index].userId?.email,
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

export default AdoptedCardsScreen;
