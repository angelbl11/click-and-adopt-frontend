import React, { useEffect, useRef, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {
  Center,
  Heading,
  HStack,
  ScrollView,
  Spinner,
  View,
  VStack,
} from "native-base";

import { Alert, Dimensions, Platform } from "react-native";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_USER_MATCHES } from "../../graphql/queries";
import { DELETE_MATCH, SET_EXPO_TOKEN } from "../../graphql/mutations";
import { NOTIFICATION_SUBSCRIPTION } from "../../graphql/subscriptions";
import { AuthContext } from "../../context/Auth";

//Components
import ChatUserComponent from "../../components/RenderObjects/ChatUserComponent";
import MatchComponent from "../../components/RenderObjects/MatchComponent";

const ChatScreen = ({ navigation }) => {
  //Notifications
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
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

  //Alerts
  const showErrorAlert = (message) =>
    Alert.alert("Ha ocurrido un error", message, [
      {
        text: "Cerrar",
        style: "cancel",
      },
    ]);

  const deleteMatchAlert = () => {
    Alert.alert(
      "¿Estás seguro que quieres este match?",
      "Se eliminará el chat con este usuario",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            deleteMatch();
          },
        },
      ]
    );
  };
  //Variables for screensize
  const { user } = useContext(AuthContext);
  const screenHeight = Dimensions.get("window").height;
  const url = "https://click-and-adopt.herokuapp.com/ProfilePictures/";
  const [userMatches, setUserMatches] = useState([]);

  const [getUserMatches, { loading }] = useLazyQuery(GET_USER_MATCHES, {
    variables: {
      userId: user.id,
    },
    onCompleted: (data) => {
      setUserMatches(data?.getMatches);
    },
  });
  const { data: notificationData } = useSubscription(
    NOTIFICATION_SUBSCRIPTION,
    {
      variables: {
        userId: user.id,
      },
    }
  );
  const [setExpoToken] = useMutation(SET_EXPO_TOKEN);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [deleteMatch] = useMutation(DELETE_MATCH, {
    variables: {
      matchId: userMatches[0]?.id,
    },
    onCompleted: () => {
      getUserMatches();
    },
    onError: (err) => {
      console.log(err.message);
    },
  });
  useEffect(() => {
    getUserMatches();
  }, []);

  useEffect(() => {
    user.id === notificationData?.pushNotifications?.receiverUser?.id
      ? sendPushNotification(
          expoPushToken,
          notificationData?.pushNotifications?.senderUser?.fullName
        )
      : undefined;
  }, [notificationData]);

  return (
    <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
      <ScrollView>
        <StatusBar style="dark" />
        <Heading fontSize={"38px"} fontWeight="bold" color="#6A994E" left={5}>
          Matches
        </Heading>
        <ScrollView horizontal={true}>
          <HStack ml={8} mt={5} mb={5} space={5}>
            {loading ? (
              <Center ml={130} mt={5}>
                <Spinner color={"#6A994E"} />
                <Heading color="#6A994E" fontSize="xl">
                  Cargando
                </Heading>
              </Center>
            ) : userMatches.length === 0 ? (
              <Center ml={130} mt={5}>
                <Spinner color={"#6A994E"} />
                <Heading color="#6A994E" fontSize="xl">
                  Cargando
                </Heading>
              </Center>
            ) : (
              userMatches?.map(({}, index) => {
                return (
                  <MatchComponent
                    onLongPress={() => {
                      deleteMatchAlert();
                    }}
                    key={index}
                    onPress={() => {
                      navigation.navigate("Conversation", {
                        adopterId: userMatches[index]?.adopterInfo?.id,
                        adoptedId: userMatches[index]?.petOwnerInfo?.id,
                        topUser:
                          user.account === "Adoptante"
                            ? userMatches[index]?.petInvolved?.adoptedPetName
                            : userMatches[index]?.adopterInfo?.fullName,
                        petPic:
                          url +
                          userMatches[index]?.petInvolved?.petPicture?.filename,
                        userPic:
                          url +
                          userMatches[index]?.adopterInfo?.profilePicture
                            ?.filename,
                      });
                    }}
                    userName={
                      user.account === "Adoptante"
                        ? userMatches[index]?.petInvolved?.adoptedPetName
                        : userMatches[index]?.adopterInfo?.fullName
                    }
                    url={
                      user.account === "Adoptante"
                        ? url +
                          userMatches[index]?.petInvolved?.petPicture?.filename
                        : url +
                          userMatches[index]?.adopterInfo?.profilePicture
                            ?.filename
                    }
                  />
                );
              })
            )}
          </HStack>
        </ScrollView>
        <Heading fontSize={"38px"} fontWeight="bold" color="#6A994E" left={5}>
          Chats
        </Heading>
        <VStack space={2} mt={5}></VStack>
      </ScrollView>
    </View>
  );
};

export default ChatScreen;
