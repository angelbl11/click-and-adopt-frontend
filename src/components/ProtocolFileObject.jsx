import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
//Native Base Components
import { Button, Icon, NativeBaseProvider } from "native-base";

const ProtocolFileObject = ({ fileName }) => {
  return (
    <NativeBaseProvider>
      <Button leftIcon={<Icon as={AntDesign} name="file1" size="sm" />}>
        {fileName}
      </Button>
    </NativeBaseProvider>
  );
};

export default ProtocolFileObject;
