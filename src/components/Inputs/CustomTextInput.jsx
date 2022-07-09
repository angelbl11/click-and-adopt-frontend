import React from "react";
import { Input } from "native-base";
const CustomTextInput = ({ ...props }) => {
  return (
    <Input
      placeholderTextColor={"#9CA3AF"}
      fontSize={"16px"}
      height="60px"
      borderRadius={"6px"}
      color={"#1F2937"}
      bgColor={"#E5E7EB"}
      _focus={{ borderColor: "#6A994E" }}
      {...props}
    />
  );
};

export default CustomTextInput;
