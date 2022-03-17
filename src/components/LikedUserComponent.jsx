import React from "react";
import { Avatar } from "react-native-elements";
import { NativeBaseProvider, IconButton } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import {
  LikeComponentWrapper,
  SubTitle,
  LikeComponentInfoWrapper,
  LikeComponentDate,
} from "../components/Styles";
const LikedUserComponent = ({ pressed, url, name, date }) => {
  return (
    <NativeBaseProvider>
      <LikeComponentWrapper>
        <Avatar
          size={60}
          source={{
            uri: url,
          }}
          rounded
          onPress={pressed}
        ></Avatar>
        <LikeComponentInfoWrapper>
          <SubTitle likeComponent={true}>{name}</SubTitle>
          <LikeComponentDate>{date}</LikeComponentDate>
        </LikeComponentInfoWrapper>
        <IconButton
          _icon={{
            as: MaterialIcons,
            name: "favorite",
            color: "#1F2937",
          }}
          marginLeft={"10"}
        ></IconButton>
        <IconButton
          _icon={{
            as: MaterialIcons,
            name: "delete",
            color: "#1F2937",
          }}
          marginLeft={"2"}
        ></IconButton>
      </LikeComponentWrapper>
    </NativeBaseProvider>
  );
};

export default LikedUserComponent;
