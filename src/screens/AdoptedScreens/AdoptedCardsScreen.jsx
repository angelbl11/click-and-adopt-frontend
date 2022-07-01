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
import { GIVE_LIKE_USER, GIVE_NOPE_USER } from "../../graphql/mutations";
import { GET_RANDOM_ADOPTERS } from "../../graphql/queries";
const AdoptedCardsScreen = ({ navigation }) => {
  const cardRef = useRef(null);
  const [adopterCards, setAdopterCards] = useState([]);
  const [likeNumber, setLikeNumber] = useState();
  const { user } = useContext(AuthContext);
  const url = "https://calm-forest-47055.herokuapp.com/ProfilePictures/";
  const [giveLikeToUser] = useMutation(GIVE_LIKE_USER, {
    variables: {
      likedUserId: adopterCards[0]?.userId?.id,
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
  const [giveNopeToUser] = useMutation(GIVE_NOPE_USER, {
    variables: {
      likedUserId: adopterCards[0]?.userId?.id,
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
  const [getAdopters, { data, loading }] = useLazyQuery(GET_RANDOM_ADOPTERS, {
    variables: {
      userId: user.id,
    },
    onError: (err) => {
      console.log("Network error:");
      console.log(err.graphQLErrors);
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
    <View flex={1} bgColor={"#FFFFFF"}>
      <StatusBar style="dark" />
      <PageTitle>Encuentra Adoptantes</PageTitle>
      <SubTitle textAlign={"center"} marginTop={"6px"}>
        Likes disponibles: {likeNumber}
      </SubTitle>
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
            console.log(
              "Id del usuario: " +
                adopterCards[index].userId?.profilePicture?.filename
            );
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
                    age: adopterCards[index].userId?.fullName,
                    email: adopterCards[index].userId?.email,
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

export default AdoptedCardsScreen;
