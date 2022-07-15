import React, { useState } from "react";

//Components
import { Switch, VStack, Text } from "native-base";
import { Avatar } from "react-native-elements";

//GraphQL
import { useMutation } from "@apollo/client";
import { UPDATE_PET_STATUS } from "../../graphql/mutations";

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
    });
  };
  return (
    <VStack alignItems="center">
      <Avatar
        size={100}
        source={{
          uri: url,
        }}
        rounded
        onPress={pressed}
      />
      <Switch
        mt={3}
        onTrackColor="green"
        onValueChange={() => {
          handleMessage();
          updateStatus();
        }}
        value={showMessage}
        isChecked={showMessage}
      />
      <Text color={"#9CA3AF"} fontSize={"13px"} mt={2} fontWeight={"medium"}>
        {showMessage == true ? "Disponible" : "No disponible"}
      </Text>
    </VStack>
  );
};

export default AdoptedProfileObject;
