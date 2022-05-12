import React, { useState } from "react";
//Styles
import { StyledInputLabel, SwitchWrapper, LabelWrapper } from "./Styles";
//Native Base Components
import { NativeBaseProvider, Switch } from "native-base";
import { Avatar } from "react-native-elements";
const AdoptedProfileObject = ({ pressed, url }) => {
  const [showMessage, setShowMessage] = useState(false);
  const handleMessage = () => {
    setShowMessage(!showMessage);
  };

  return (
    <NativeBaseProvider>
      <Avatar
        size={100}
        source={{
          uri: url,
        }}
        rounded
        onPress={pressed}
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
