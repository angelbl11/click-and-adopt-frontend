import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Center, Heading, Spinner, View, VStack } from "native-base";
import { Dimensions } from "react-native";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_MATCHES } from "../../graphql/queries";
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";
import { useState } from "react";

//Components
import ChatUserComponent from "../../components/RenderObjects/ChatUserComponent";
const ChatScreen = ({ navigation }) => {
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
  useEffect(() => {
    getUserMatches();
  }, []);

  return (
    <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
      <StatusBar style="dark" />
      <VStack alignItems={"center"} width={screenWidth - 10}></VStack>
      <Heading fontSize={"38px"} fontWeight="bold" color="#6A994E" left={5}>
        Chats
      </Heading>
      <VStack space={2} mt={5}>
        {loading ? (
          <Center mt={150}>
            <Spinner color={"#6A994E"} />
            <Heading color="#6A994E" fontSize="xl">
              Cargando
            </Heading>
          </Center>
        ) : userMatches.length != 0 ? (
          userMatches?.map(({}, index) => {
            console.log(userMatches[index]?.adopterInfo?.fullName);
            return (
              <ChatUserComponent
                key={index}
                name={
                  user.account === "Adoptante"
                    ? userMatches[index]?.petInvolved?.adoptedPetName
                    : userMatches[index]?.adopterInfo?.fullName
                }
                url={
                  user.account === "Adoptante"
                    ? url + userMatches[index]?.petInvolved?.adoptedPetName
                    : url +
                      userMatches[index]?.adopterInfo?.profilePicture?.filename
                }
              />
            );
          })
        ) : (
          <Center mt={150}>
            <Heading color="#6A994E" fontSize="xl">
              No has dado match con ningún usuario
            </Heading>
          </Center>
        )}
      </VStack>
    </View>
  );
};

export default ChatScreen;
