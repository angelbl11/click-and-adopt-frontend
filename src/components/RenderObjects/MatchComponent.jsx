import { Text, View } from "native-base";
import React from "react";
import { Avatar } from "react-native-elements";
const MatchComponent = ({ url, onPress, userName, onLongPress }) => {
  return (
    <View alignItems={"center"}>
      <Avatar
        size={80}
        onPress={onPress}
        onLongPress={onLongPress}
        source={{
          uri: url,
        }}
        rounded
      ></Avatar>
      <Text mt={3} fontSize={16} fontWeight="semibold">
        {userName}
      </Text>
    </View>
  );
};

export default MatchComponent;
