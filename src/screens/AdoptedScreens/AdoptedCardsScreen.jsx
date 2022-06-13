import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { StatusBar } from "expo-status-bar";
import CardComponent from "../../components/Card/CardComponent";
import { PageTitle, CardCont } from "../../components/Utils/Styles";
import FooterButtons from "../../components/Card/FooterButtons";
import { Animated, PanResponder } from "react-native";
import { CARD, ACTION_OFFSET } from "../../components/Card/CardConstants";
import { View } from "native-base";
import { AuthContext } from "../../context/Auth";

//Graphql
import { useLazyQuery } from "@apollo/client";
import { GET_RANDOM_ADOPTERS } from "../../graphql/queries";

const AdoptedCardsScreen = ({ navigation }) => {
  const [adopterCards, setAdoptersCards] = useState(data?.getRandomAdopter);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  const { user } = useContext(AuthContext);
  const url = "https://calm-forest-47055.herokuapp.com/ProfilePictures/";

  const [getAdopters, { data }] = useLazyQuery(GET_RANDOM_ADOPTERS, {
    variables: {
      userId: user.id,
    },
    onError: (err) => {
      console.log("Network error:", err.networkError);
      console.log(user.id);
    },

    update(proxy, { data }) {
      setAdoptersCards(data?.getRandomAdopter);
    },
  });

  useEffect(() => {
    getAdopters();
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setAdoptersCards((previousState) => previousState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleChoice = useCallback(
    (direction) => {
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCREEN,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x]
  );
  return (
    <View bgColor={"#FFFFFF"} flex={1}>
      <StatusBar style="dark" />
      <PageTitle>Encuentra Adoptantes</PageTitle>
      {adopterCards?.length == 0 ? (
        <PageTitle>no data</PageTitle>
      ) : (
        <CardCont>
          {data?.getRandomAdopter
            ?.map(
              (
                {
                  petPreferences,
                  petAgePreferences,
                  petGenderPreferences,
                  userId,
                  haveCat,
                  haveDog,
                  havePets,
                  hadPets,
                  hadPetsValue,
                  hadPetsDate,
                  numberOfDogs,
                  numberOfCats,
                  isAgreeWithProtocol,
                  isChildren,
                  petSizePreferences,
                  reasonToAdopt,
                  numberOfDays,
                  numberOfMonths,
                  numberOfYears,
                },
                index
              ) => {
                const isFirst = index === 0;
                const dragHandler = isFirst ? panResponder.panHandlers : {};
                console.log(url + userId?.profilePicture?.filename);
                return (
                  <CardComponent
                    key={index}
                    source={url + userId?.profilePicture?.filename}
                    name={userId?.fullName}
                    isFirst={isFirst}
                    {...dragHandler}
                    swipe={swipe}
                    tiltSign={tiltSign}
                    pressed={() => {
                      navigation.navigate("CarrouselAdopter", {
                        petGenderPreferences: petGenderPreferences,
                        petPreferences: petPreferences,
                        petAgePreferences: petAgePreferences,
                        reasonToAdopt: reasonToAdopt,
                        haveChildren: isChildren,
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
                        profilePic: url + userId?.profilePicture?.filename,
                        fullName: userId?.fullName,
                        email: userId?.email,
                        account: userId?.account,
                        age: userId?.age,
                      });
                    }}
                  />
                );
              }
            )
            .reverse()}
        </CardCont>
      )}

      <FooterButtons handleChoice={handleChoice}></FooterButtons>
    </View>
  );
};

export default AdoptedCardsScreen;
