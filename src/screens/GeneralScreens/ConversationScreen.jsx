import React, { useContext, useEffect, useState } from "react";
import { Icon, ScrollView, View, VStack } from "native-base";
import { AuthContext } from "../../context/Auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ChatHeader from "../../components/Chat/ChatHeader";
import CustomTextInput from "../../components/Inputs/CustomTextInput";
import Message from "../../components/Chat/Message";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { Formik } from "formik";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_CHAT } from "../../graphql/queries";
import { MESSAGE_SUBSCRIPTION } from "../../graphql/subscriptions";
import { SEND_MESSAGE } from "../../graphql/mutations";
const ConversationScreen = ({ route }) => {
  const { user } = useContext(AuthContext);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const { topUser, petPic, userPic, adoptedId, adopterId, petId } =
    route.params;
  const screenHeight = Dimensions.get("window").height;
  const [messages, setMessages] = useState([]);
  const { data: susData } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: {
      userId: user.account === "Adoptante" ? adopterId : adoptedId,
    },
  });
  const addMessage = (message) => {
    setMessages((oldArray) => [...oldArray, message]);
  };
  const [getMessages, { data }] = useLazyQuery(GET_CHAT, {
    variables: {
      userId: user.account === "Adoptante" ? adopterId : adoptedId,
      partnerId: user.account === "Adoptante" ? adoptedId : adopterId,
    },
    onCompleted: (data) => {
      setMessages(data?.getChat);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  useEffect(() => {
    addMessage(susData?.messages);
  }, [susData]);
  useEffect(() => {
    getMessages();
  }, []);
  return (
    <View flex={1} bg="white" height={screenHeight}>
      <ChatHeader
        user={topUser}
        pic={user.account === "Adoptante" ? petPic : userPic}
      />
      <ScrollView>
        <VStack>
          <View>
            {messages.map((message, index) => {
              return (
                <Message
                  message={message?.body}
                  key={index}
                  isLeft={user.id != message?.from ? false : true}
                />
              );
            })}
          </View>

          <KeyboardAwareScrollView>
            <VStack
              justifyContent={"flex-end"}
              height={screenHeight - 300}
              ml={2}
              mr={2}
            >
              <Formik
                initialValues={{ message: "" }}
                onSubmit={(values, { resetForm }) => {
                  sendMessage({
                    variables: {
                      body: values.message,
                      to: user.account === "Adoptante" ? adoptedId : adopterId,
                      userId:
                        user.account === "Adoptante" ? adopterId : adoptedId,
                      petId: petId,
                    },
                    onCompleted: (data) => {},
                    onError: (err) => {
                      console.log(err.message);
                      console.log(adoptedId);
                      console.log(adopterId);
                      console.log(petId);
                      console.log(values.message);
                    },
                  });
                  resetForm();
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                    <CustomTextInput
                      placeholder="Escribe tu mensaje..."
                      value={values.message}
                      onChangeText={handleChange("message")}
                      onBlur={handleBlur("message")}
                      InputRightElement={
                        <Icon
                          onPress={handleSubmit}
                          as={<MaterialCommunityIcons name="send-circle" />}
                          size="lg"
                          color="#6A994E"
                          mr={"6px"}
                        />
                      }
                    />
                  </View>
                )}
              </Formik>
            </VStack>
          </KeyboardAwareScrollView>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default ConversationScreen;
