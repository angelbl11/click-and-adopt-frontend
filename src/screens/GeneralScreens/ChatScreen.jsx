import React, { useEffect, useRef, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {
  Center,
  Heading,
  HStack,
  IconButton,
  ScrollView,
  Spinner,
  Text,
  View,
  VStack,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Dimensions, Platform } from "react-native";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_USER_MATCHES, GET_CHAT_LIST } from "../../graphql/queries";
import {
  DELETE_MATCH,
  SET_EXPO_TOKEN,
  DELETE_CHAT,
} from "../../graphql/mutations";
import { NOTIFICATION_SUBSCRIPTION } from "../../graphql/subscriptions";
import { AuthContext } from "../../context/Auth";

//Components
import ChatUserComponent from "../../components/RenderObjects/ChatUserComponent";
import MatchComponent from "../../components/RenderObjects/MatchComponent";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ChatScreen = ({ navigation }) => {
  //Notifications
  //Alerts
  const showErrorAlert = (message) =>
    Alert.alert("Ha ocurrido un error", message, [
      {
        text: "Cerrar",
        style: "cancel",
      },
    ]);

  const unMuteNotificationsAlert = () => {
    Alert.alert("¿Estás seguro que quieres activar las notificaciones?", "", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Activar",
        onPress: () => {
          setIsMute(false);
          Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: false,
            }),
          });
        },
      },
    ]);
  };
  const muteNotificationsAlert = () => {
    Alert.alert(
      "¿Estás seguro que quieres desactivar las notificaciones?",
      "",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Desactivar",
          onPress: () => {
            setIsMute(true);
            Notifications.setNotificationHandler({
              handleNotification: async () => ({
                shouldShowAlert: false,
                shouldPlaySound: false,
                shouldSetBadge: false,
              }),
            });
          },
        },
      ]
    );
  };
  const deleteMatchAlert = () => {
    Alert.alert(
      "¿Estás seguro que quieres eliminar este match?",
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
  const deleteChatAlert = () => {
    Alert.alert("¿Estás seguro que quieres eliminar este chat?", "", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        onPress: () => {
          deleteChat();
        },
      },
    ]);
  };
  //Variables for screensize
  const { user } = useContext(AuthContext);
  const screenHeight = Dimensions.get("window").height;
  const url = "https://click-and-adopt.herokuapp.com/ProfilePictures/";
  const [userMatches, setUserMatches] = useState([]);
  const [isMute, setIsMute] = useState(false);
  const [chats, setChats] = useState([]);
  const [item, setItem] = useState([]);
  const [getChatList, { loading: chatLoading }] = useLazyQuery(GET_CHAT_LIST, {
    variables: {
      userId:
        user.account === "Adoptante"
          ? userMatches[0]?.adopterInfo?.id
          : userMatches[0]?.petOwnerInfo?.id,
      partnerId:
        user.account === "Adoptante"
          ? userMatches[0]?.petOwnerInfo?.id
          : userMatches[0]?.adopterInfo?.id,
    },
    onCompleted: (data) => {
      console.log("data");
      setChats(data?.getChatList);
      chats?.map(({}, count) => {
        setItem(chats[count]);
      });
    },
    onError: (err) => {
      console.log("err");
      console.log(userMatches[0]?.petOwnerInfo?.id);
      console.log(userMatches[0]?.adopterInfo?.id);
      console.log(err);
    },
  });
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

  const [setExpoToken] = useMutation(SET_EXPO_TOKEN);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [deleteChat] = useMutation(DELETE_CHAT, {
    variables: {
      chatId: chats[0]?.id,
    },
    onCompleted: () => {
      getChatList();
    },
    onError: (err) => {
      console.log(err.message);
    },
  });
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
    getChatList();
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
              <Center ml={10} mt={5}>
                <Heading color="#6A994E" fontSize="xl">
                  No hay match para mostrar
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
                        petId: userMatches[index]?.petInvolved?.id,
                        topUser:
                          user.account === "Adoptante"
                            ? userMatches[index]?.petOwnerInfo?.fullName +
                              " - " +
                              userMatches[index]?.petInvolved?.adoptedPetName
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
        <HStack>
          <Heading fontSize={"38px"} fontWeight="bold" color="#6A994E" left={5}>
            Chats
          </Heading>
          <IconButton
            onPress={() => {
              isMute ? unMuteNotificationsAlert() : muteNotificationsAlert();
            }}
            mt={2}
            ml={250}
            _icon={{
              as: Ionicons,
              name: isMute ? "notifications-off" : "notifications",
              size: "sm",
            }}
            _pressed={{
              bg: "#7db85c",
              borderRadius: 50,
            }}
          />
        </HStack>
        <VStack space={2} mt={5}>
          {chats?.map(({}, count) => {
            return (
              <ChatUserComponent
                pressed={() => {
                  navigation.navigate("Conversation", {
                    adopterId:
                      user.account === "Adoptante" &&
                      chats[count]?.receiver?.account
                        ? user.id
                        : chats[count]?.sender?.id,
                    adoptedId:
                      user.account === "Adoptado" &&
                      chats[count]?.receiver?.account
                        ? user.id
                        : chats[count]?.sender?.id,
                    petId: chats[count]?.petInvolved?.id,
                    topUser:
                      user.account === "Adoptante" &&
                      chats[count]?.receiver?.account
                        ? chats[count]?.sender?.fullName +
                          " - " +
                          chats[count]?.petInvolved?.adoptedPetName
                        : chats[count]?.receiver?.fullName,
                    petPic:
                      url + chats[count]?.petInvolved?.petPicture?.filename,
                    userPic:
                      url + chats[count]?.receiver?.profilePicture?.filename,
                  });
                }}
                pressDelete={() => {
                  deleteChatAlert();
                }}
                key={count}
                adoptedName={
                  user.account === "Adoptante"
                    ? chats[count]?.sender?.fullName + " - "
                    : ""
                }
                name={
                  user.id === chats[count]?.receiver?.id
                    ? chats[count]?.petInvolved?.adoptedPetName
                    : chats[count]?.receiver?.fullName
                }
                url={
                  user.account === "Adoptante" &&
                  chats[count]?.receiver?.account
                    ? url + chats[count]?.petInvolved?.petPicture?.filename
                    : url + chats[count]?.receiver?.profilePicture?.filename
                }
              ></ChatUserComponent>
            );
          })}
        </VStack>
      </ScrollView>
    </View>
  );
};

export default ChatScreen;
