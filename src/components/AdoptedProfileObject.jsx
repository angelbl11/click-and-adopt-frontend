import React, { useState } from "react";
//Styles
import {
  ParentWrapper,
  StyledInputLabel,
  SwitchWrapper,
  LabelWrapper,
} from "./Styles";
//Native Base Components
import { NativeBaseProvider, Switch } from "native-base";
import { Avatar } from "react-native-elements";
const AdoptedProfileObject = (navigation, url) => {
  const [showMessage, setShowMessage] = useState(false);
  const handleMessage = () => {
    setShowMessage(!showMessage);
  };
  return (
    <NativeBaseProvider>
      <Avatar
        size={100}
        source={{
          uri: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=843&q=80",
        }}
        rounded
      ></Avatar>
      <SwitchWrapper>
        <Switch
          onTrackColor="green"
          onValueChange={handleMessage}
          value={showMessage}
          isChecked={showMessage}
        />
      </SwitchWrapper>
      <LabelWrapper>
        <StyledInputLabel userStatus={true}>
          {showMessage == true ? "Disponible" : "No disponible"}
        </StyledInputLabel>
      </LabelWrapper>
    </NativeBaseProvider>
  );
};

export default AdoptedProfileObject;
