import React from "react";

//Libraries & Components
import { Avatar } from "react-native-elements";
import { IconButton } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { HStack, VStack, Text, Pressable } from "native-base";

const ChatUserComponent = ({ url, name, pressDelete, pressMute, pressed }) => {
  return (
    <Pressable onPress={pressed}>
      <HStack alignContent={"center"} alignItems="center" mb={3} mt={2}>
        <Avatar
          size={60}
          source={{
            uri: url,
          }}
          rounded
        ></Avatar>
        <VStack ml={3} width="200">
          <HStack width={"200"}>
            <Text fontSize={18} fontWeight="semibold">
              {name}
            </Text>
          </HStack>
        </VStack>
        <IconButton
          onPress={pressDelete}
          _icon={{
            as: Ionicons,
            name: "trash",
          }}
          _pressed={{
            bg: "#7db85c",
            borderRadius: 100,
          }}
        />
        <IconButton
          onPress={pressMute}
          _icon={{
            as: Ionicons,
            name: "notifications-off",
          }}
          _pressed={{
            bg: "#7db85c",
            borderRadius: 100,
          }}
        />
      </HStack>
    </Pressable>
  );
};

export default ChatUserComponent;
