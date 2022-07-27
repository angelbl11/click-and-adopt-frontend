import React from "react";
import { AntDesign } from "@expo/vector-icons";
//Native Base Components
import { Button, Icon, VStack } from "native-base";

const ProtocolFileObject = ({ fileName, onPress }) => {
  return (
    <VStack alignItems="center">
      <Button
        leftIcon={<Icon as={AntDesign} name="file1" size="sm" />}
        _text={{ color: "#FFFFFF" }}
        ml={2}
        mb={2}
        bg={"#6A994E"}
        onPress={onPress}
      >
        {fileName}
      </Button>
    </VStack>
  );
};

export default ProtocolFileObject;
