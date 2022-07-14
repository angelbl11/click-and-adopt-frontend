import React from "react";
import { Radio, View, Text, Link, useToast, HStack } from "native-base";
const RadioInput = ({
  label,
  linkLabel,
  toastDescription,
  groupValue,
  firstValue,
  secondValue,
  thirdValue,
  fourthValue,
  firstRadioLabel,
  secondRadioLabel,
  thirdRadioLabel,
  fourthRadioLabel,
  isThird,
  isFourth,
  isDate,
  marginLeftLink,
  ...Props
}) => {
  const toast = useToast();
  return (
    <View mt={4}>
      <HStack>
        <Text
          fontSize={"16px"}
          fontWeight={"semibold"}
          color={"#1F2937"}
          textAlign={"left"}
          mb={2}
        >
          {label}
        </Text>
        <Link
          mt={6}
          ml={marginLeftLink}
          _text={{
            fontSize: 16,
            color: "#6A994E",
            fontWeight: "semibold",
            mb: 2,
          }}
          onPress={() =>
            toast.show({
              description:
                "Un protocolo es si cuenta con vacunas, desparasitación,esterilización y otro tipo de tratamientos.",
            })
          }
        >
          {linkLabel}
        </Link>
      </HStack>
      <Radio.Group value={groupValue} {...Props}>
        <Radio colorScheme="green" value={firstValue} isBooleanDate={isDate}>
          {firstRadioLabel}
        </Radio>
        <Radio colorScheme="green" value={secondValue} isBooleanDate={isDate}>
          {secondRadioLabel}
        </Radio>
        {isThird == true ? (
          <Radio colorScheme="green" value={thirdValue}>
            {thirdRadioLabel}
          </Radio>
        ) : undefined}
        {isFourth == true
          ? isThird == true && (
              <Radio colorScheme="green" value={fourthValue}>
                {fourthRadioLabel}
              </Radio>
            )
          : undefined}
      </Radio.Group>
    </View>
  );
};

export default RadioInput;
