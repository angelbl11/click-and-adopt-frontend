import React from "react";
import { Radio, View } from "native-base";
import { SubTitle } from "./Styles";

const ThreeOptionsRadioInput = ({
  label,
  groupValue,
  firstValue,
  secondValue,
  thirdValue,
  firstRadioLabel,
  secondRadioLabel,
  thirdRadioLabel,
  ...Props
}) => {
  return (
    <View>
      <SubTitle cuestionary={true}>{label}</SubTitle>
      <Radio.Group value={groupValue} {...Props}>
        <Radio colorScheme="green" value={firstValue}>
          {firstRadioLabel}
        </Radio>
        <Radio colorScheme="green" value={secondValue}>
          {secondRadioLabel}
        </Radio>
        <Radio colorScheme="green" value={thirdValue}>
          {thirdRadioLabel}
        </Radio>
      </Radio.Group>
    </View>
  );
};

export default ThreeOptionsRadioInput;
