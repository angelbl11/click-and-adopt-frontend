import React from "react";

//Libraries & Components
import { Avatar } from "react-native-elements";
import { IconButton } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { HStack, VStack, Text } from "native-base";

const LikedUserComponent = ({ pressed, url, name, date }) => {
  return (
    <HStack alignContent={"center"} alignItems="center" mb={3} mt={2}>
      <Avatar
        size={60}
        source={{
          uri: url,
        }}
        rounded
        onPress={pressed}
      ></Avatar>
      <VStack ml={3} width="1/3">
        <Text fontSize={18} fontWeight="semibold">
          {name}
        </Text>
        <Text fontSize={16} color="#9CA3AF">
          {date}
        </Text>
      </VStack>
      <IconButton
        _icon={{
          as: MaterialCommunityIcons,
          name: "heart-minus",
        }}
      />
      <IconButton
        _icon={{
          as: Ionicons,
          name: "trash",
        }}
      />
    </HStack>
  );
};

export default LikedUserComponent;
