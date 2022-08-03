import React from "react";

//Libraries & Components
import { Avatar } from "react-native-elements";
import { IconButton } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { HStack, VStack, Text, Pressable } from "native-base";

const ChatUserComponent = ({
  url,
  name,
  pressDelete,
  pressed,
  adoptedName,
}) => {
  return (
    <Pressable
      onPress={pressed}
      ml={3}
      bg="#E5E7EB"
      borderRadius={10}
      width={395}
      p={2}
    >
      <HStack alignContent={"center"} alignItems="center" mb={3} mt={2}>
        <Avatar
          size={60}
          source={{
            uri: url,
          }}
          rounded
        ></Avatar>
        <VStack ml={3} width="230">
          <HStack width={"250"}>
            <Text fontSize={16} fontWeight="semibold">
              {adoptedName}
            </Text>
            <Text fontSize={16} fontWeight="semibold">
              {name}
            </Text>
          </HStack>
        </VStack>
        <IconButton
          onPress={pressDelete}
          _icon={{
            as: Ionicons,
            name: "trash",
            size: "sm",
          }}
          _pressed={{
            bg: "#7db85c",
            borderRadius: 50,
          }}
        />
      </HStack>
    </Pressable>
  );
};

export default ChatUserComponent;
