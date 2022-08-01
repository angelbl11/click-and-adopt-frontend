import React, { useRef, useState, useContext, useEffect } from "react";
import { Alert, Dimensions, StyleSheet } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
//Libraries
import { StatusBar } from "expo-status-bar";
import { View, Text, Heading } from "native-base";
import CardStack from "react-native-card-stack-swiper";

//Components
import FooterButtons from "../../components/Card/FooterButtons";
import CardComponent from "../../components/Card/CardComponent";

//Graphql
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_RANDOM_PETS, GET_RANDOM_ADOPTERS } from "../../graphql/queries";
import {
  GIVE_LIKE_PET,
  GIVE_NOPE_PET,
  GIVE_NOPE_USER,
  GIVE_LIKE_USER,
  SET_EXPO_TOKEN,
} from "../../graphql/mutations";
import { NOTIFICATION_SUBSCRIPTION } from "../../graphql/subscriptions";

//Auth
import { AuthContext } from "../../context/Auth";

const CardsScreen = ({ navigation }) => {
  //Alerts
  const matchAlert = () => {
    Alert.alert("¡Match!", "Ahora puedes chatear con este usuario", [
      {
        text: "Cerrar",
        style: "cancel",
      },
      {
        text: "Ir al chat",
        onPress: () => {
          navigation.jumpTo("Chats");
        },
      },
    ]);
  };
  const showErrorAlert = (message) =>
    Alert.alert("Ha ocurrido un error", message, [
      {
        text: "Cerrar",
        style: "cancel",
      },
    ]);
  //NOTIFICATIONS
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (token) {
      setExpoToken({
        variables: {
          addExpoTokenId: user.id,
          expoToken: token,
        },
        onCompleted: (data) => {
          setExpoPushToken(token);
          console.log(data);
        },
        onError: (err) => {
          console.log(err);
        },
      });
    }
    return token;
  }
  registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

  async function sendPushNotification(expoPushToken, user) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: `Tienes un mensaje de ${user} `,
      body: "¡Enterate sobre lo que tiene que decir!",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  const [setExpoToken] = useMutation(SET_EXPO_TOKEN);
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    user.id === notificationData?.pushNotifications?.receiverUser?.id
      ? sendPushNotification(
          expoPushToken,
          notificationData?.pushNotifications?.senderUser?.fullName
        )
      : undefined;
  }, [notificationData]);

  const cardRef = useRef(null);
  const [petsCards, setPetsCards] = useState([]);
  const [adopterCards, setAdopterCards] = useState([]);
  const [likeNumber, setLikeNumber] = useState();
  //Variables for screensize
  const screenHeight = Dimensions.get("window").height;
  const { user } = useContext(AuthContext);
  const url = "https://click-and-adopt.herokuapp.com/ProfilePictures/";
  const { data: notificationData } = useSubscription(
    NOTIFICATION_SUBSCRIPTION,
    {
      variables: {
        userId: user.id,
      },
    }
  );
  const [giveLikeToPet] = useMutation(GIVE_LIKE_PET, {
    variables: {
      petId: petsCards[0]?.id,
      userId: user.id,
    },
    onCompleted: (data) => {
      setLikeNumber(likeNumber - 1);
      console.log("Like Mascota");
      data?.likePet === "Match" ? matchAlert() : undefined;
    },
    onError: (err) => {
      showErrorAlert(err.message);
    },
  });
  const [giveNopeToPet] = useMutation(GIVE_NOPE_PET, {
    variables: {
      petId: petsCards[0]?.id,
      userId: user.id,
    },
    onError: (err) => {
      showErrorAlert(err.message);
    },
  });
  const [getPets] = useLazyQuery(GET_RANDOM_PETS, {
    variables: {
      userId: user.id,
    },
    onCompleted: (data) => {
      setPetsCards(data?.getRandomPet?.pets);
      setLikeNumber(10 - data?.getRandomPet?.numOfLikes);
    },
    onError: (err) => {
      showErrorAlert(err.message);
    },
  });
  const [giveLikeToUser] = useMutation(GIVE_LIKE_USER, {
    variables: {
      likedUserId: adopterCards[0]?.id,
      userId: user.id,
    },
    onCompleted: (data) => {
      setLikeNumber(likeNumber - 1);
      data?.likeUser === "Match" ? matchAlert() : undefined;
    },
    onError: (err) => {
      showErrorAlert(err.message);
    },
  });
  const [giveNopeToUser] = useMutation(GIVE_NOPE_USER, {
    variables: {
      likedUserId: adopterCards[0]?.id,
      userId: user.id,
    },
  });
  const [getAdopters, { data: adopterdata }] = useLazyQuery(
    GET_RANDOM_ADOPTERS,
    {
      variables: {
        userId: user.id,
      },
      onCompleted: () => {
        setAdopterCards(adopterdata?.getRandomAdopter?.users);
        setLikeNumber(10 - adopterdata?.getRandomAdopter?.numOfLikes);
      },
      onError: (err) => {
        showErrorAlert(err.message);
      },
    }
  );
  useEffect(() => {
    user.account === "Adoptante" ? getPets() : getAdopters();
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
        {user.account === "Adoptante"
          ? "Encuentra Mascotas"
          : "Encuentra Adoptantes"}
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
        onSwipedRight={() => {
          user.account === "Adoptante" ? giveLikeToPet() : giveLikeToUser();
        }}
        onSwipedLeft={() =>
          user.account === "Adoptante" ? giveNopeToPet() : giveNopeToUser()
        }
        renderNoMoreCards={() => (
          <Text style={{ fontWeight: "700", fontSize: 18, color: "gray" }}>
            {user.account === "Adoptante"
              ? "No hay mascotas para mostrar"
              : "No hay adoptantes para mostrar"}
          </Text>
        )}
      >
        {user.account === "Adoptante"
          ? petsCards?.map(
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
            )
          : adopterCards?.map(
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
                    uri={
                      url + adopterCards[index].userId?.profilePicture?.filename
                    }
                    pressed={() =>
                      navigation.navigate("AdopterProfile", {
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

export default CardsScreen;
