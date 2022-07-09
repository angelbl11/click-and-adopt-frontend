import React from "react";

import { FormControl } from "native-base";

import { Ionicons } from "@expo/vector-icons";

import {
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  Colors,
} from "../Utils/Styles";

//Colors
const { brand, darkLight } = Colors;

const TextInputWithPassword = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  isInvalid,
  ...props
}) => {
  return (
    <FormControl isInvalid={isInvalid}>
      <StyledTextInput {...props}></StyledTextInput>
      <LeftIcon>
        <Ionicons name={icon} size={25} color={brand}></Ionicons>
      </LeftIcon>
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          ></Ionicons>
        </RightIcon>
      )}
    </FormControl>
  );
};

export default TextInputWithPassword;
