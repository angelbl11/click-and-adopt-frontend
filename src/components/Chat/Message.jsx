import React from "react";
import { View, Text } from "native-base";
const Message = ({ message, isLeft }) => {
  return (
    <View
      bg={isLeft ? "#9CA3AF" : "#6A994E"}
      maxW={"80%"}
      alignSelf={isLeft ? "flex-end" : "flex-start"}
      flexDir={"row"}
      borderRadius={15}
      pt={5}
      mr={4}
      mt={4}
      ml={3}
      pb={5}
    >
      <View minW={"75"} ml={3} mr={3}>
        <Text
          alignSelf={"flex-start"}
          fontSize={16}
          fontWeight="medium"
          color={"white"}
        >
          {message}
        </Text>
      </View>
    </View>
  );
};

export default Message;
