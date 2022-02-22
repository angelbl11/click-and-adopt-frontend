import React from "react";

import { View, FormControl } from "native-base";

import { Octicons, Ionicons } from "@expo/vector-icons";

import * as Yup from "yup";

import {
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  Colors,
} from "./Styles";

//Colors
const { brand, darkLight } = Colors;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

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
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand}></Octicons>
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props}></StyledTextInput>
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
