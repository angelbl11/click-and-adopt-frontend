import React from "react";
import { Checkbox, View } from "native-base";
import { SubTitle } from "./Styles";

const CheckBoxInput = ({
  label,
  groupValue,
  firstValue,
  secondValue,
  thirdValue,
  fourthValue,
  firstCheckBoxLabel,
  secondCheckBoxLabel,
  thirdCheckBoxLabel,
  fourthCheckBoxLabel,
  isThird,
  isFourth,
  convert,
  ...props
}) => {
  return (
    <View>
      <SubTitle cuestionary={true}>{label}</SubTitle>
      <Checkbox.Group value={groupValue && convert} {...props}>
        <Checkbox colorScheme="green" value={firstValue}>
          {firstCheckBoxLabel}
        </Checkbox>
        <Checkbox colorScheme="green" value={secondValue}>
          {secondCheckBoxLabel}
        </Checkbox>
        {isThird == true ? (
          <Checkbox colorScheme="green" value={thirdValue}>
            {thirdCheckBoxLabel}
          </Checkbox>
        ) : undefined}
        {isFourth == true
          ? isThird == true && (
              <Checkbox colorScheme="green" value={fourthValue}>
                {fourthCheckBoxLabel}
              </Checkbox>
            )
          : undefined}
      </Checkbox.Group>
    </View>
  );
};

export default CheckBoxInput;
