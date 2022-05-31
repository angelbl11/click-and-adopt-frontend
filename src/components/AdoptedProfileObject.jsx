import React, { useState } from "react";
//Styles
import { StyledInputLabel, SwitchWrapper, LabelWrapper } from "./Styles";
//Native Base Components
import { Switch, View } from "native-base";
import { Avatar } from "react-native-elements";
import { useMutation } from "@apollo/client";
import { UPDATE_PET_STATUS } from "../graphql/client";

const AdoptedProfileObject = ({ pressed, url, id, status }) => {
  const [showMessage, setShowMessage] = useState(status);
  const [updatePetStatus] = useMutation(UPDATE_PET_STATUS);
  const handleMessage = () => {
    setShowMessage(!showMessage);
  };
  const updateStatus = () => {
    updatePetStatus({
      variables: {
        updateAdoptedStatusId: id,
        petStatus: !showMessage,
      },
      onCompleted: (data) => {
        console.log(data);
        console.log(!showMessage + "");
      },
      onError: (err) => {
        console.log("Network error");
        console.log(err);
      },
    });
  };
  return (
    <View>
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
          onValueChange={() => {
            handleMessage();
            updateStatus();
          }}
          value={showMessage}
          isChecked={showMessage}
        />
      </SwitchWrapper>
      <LabelWrapper>
        <StyledInputLabel userStatus={true}>
          {showMessage == true ? "Disponible" : "No disponible"}
        </StyledInputLabel>
      </LabelWrapper>
    </View>
  );
};

export default AdoptedProfileObject;
