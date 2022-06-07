import React from "react";
import { Radio, View } from "native-base";
import { SubTitle } from "../Utils/Styles";

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
    <View>
      <SubTitle cuestionary={true}>{label}</SubTitle>
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
