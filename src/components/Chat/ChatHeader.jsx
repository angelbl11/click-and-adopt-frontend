import React from "react";
import { View, Text, HStack } from "native-base";
import { Avatar } from "@rneui/themed";
const ChatHeader = ({ pic, user }) => {
  return (
    <View flexDir={"row"} pt={5} pb={5} pl={5} bg="#6A994E">
      <HStack flex={1} alignItems="center" space={5}>
        <Avatar
          size={60}
          rounded
          source={{
            uri: pic,
          }}
        ></Avatar>
        <Text fontSize={18} fontWeight="semibold" color={"white"}>
          {user}
        </Text>
      </HStack>
    </View>
  );
};

export default ChatHeader;
