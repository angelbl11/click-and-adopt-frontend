import React from "react";
import { Radio, View, Text } from "native-base";
const RadioInput = ({
  label,
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
  ...Props
}) => {
  return (
    <View mt={4}>
      <Text
        fontSize={"16px"}
        fontWeight={"semibold"}
        color={"#1F2937"}
        textAlign={"left"}
        mb={2}
      >
        {label}
      </Text>
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
