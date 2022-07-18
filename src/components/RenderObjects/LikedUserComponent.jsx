import React from "react";

//Libraries & Components
import { Avatar } from "react-native-elements";
import { IconButton } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { HStack, VStack, Text } from "native-base";

const LikedUserComponent = ({
  pressed,
  url,
  name,
  date,
  pressReasign,
  pressTrash,
  isPaperBin,
}) => {
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
      <VStack ml={3} width="200">
        <HStack width={"200"}>
          <Text fontSize={18} fontWeight="semibold">
            {name}
          </Text>
        </HStack>
        <Text fontSize={16} color="#9CA3AF">
          {date}
        </Text>
      </VStack>
      <IconButton
        onPress={pressReasign}
        _icon={{
          as: MaterialCommunityIcons,
          name: isPaperBin ? "heart-plus" : "heart-minus",
        }}
        _pressed={{
          bg: "#7db85c",
          borderRadius: 100,
        }}
      />
      <IconButton
        onPress={pressTrash}
        _icon={{
          as: isPaperBin ? MaterialCommunityIcons : Ionicons,
          name: isPaperBin ? "heart-broken" : "trash",
        }}
        _pressed={{
          bg: "#7db85c",
          borderRadius: 100,
        }}
      />
    </HStack>
  );
};

export default LikedUserComponent;
