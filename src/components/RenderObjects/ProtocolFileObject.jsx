import React from "react";
import { AntDesign } from "@expo/vector-icons";
//Native Base Components
import { Button, Icon } from "native-base";

const ProtocolFileObject = ({ fileName }) => {
  return (
    <Button leftIcon={<Icon as={AntDesign} name="file1" size="sm" />}>
      {fileName}
    </Button>
  );
};

export default ProtocolFileObject;
