import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Center,
  Heading,
  HStack,
  ScrollView,
  Spinner,
  Text,
  View,
  VStack,
} from "native-base";
import { Alert, Dimensions } from "react-native";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER_MATCHES } from "../../graphql/queries";
import { DELETE_MATCH } from "../../graphql/mutations";
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";
import { useState } from "react";

//Components
import ChatUserComponent from "../../components/RenderObjects/ChatUserComponent";
import MatchComponent from "../../components/RenderObjects/MatchComponent";
const ChatScreen = ({ navigation }) => {
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
  const screenWidth = Dimensions.get("window").width;
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
  const [deleteMatch] = useMutation(DELETE_MATCH, {
    variables: {
      matchId: userMatches[0]?.id,
    },
    onCompleted: (data) => {
      getUserMatches();
    },
    onError: (err) => {
      console.log(err.message);
    },
  });
  useEffect(() => {
    getUserMatches();
  }, []);

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
