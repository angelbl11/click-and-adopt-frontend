import React from "react";
import { Checkbox, View } from "native-base";
import { SubTitle } from "../Utils/Styles";

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
  isCheckedFirst,
  isCheckedSecond,
  ...props
}) => {
  return (
    <View>
      <SubTitle cuestionary={true}>{label}</SubTitle>
      <Checkbox.Group value={groupValue && convert} {...props}>
        <Checkbox
          colorScheme="green"
          value={firstValue}
          isChecked={isCheckedFirst}
        >
          {firstCheckBoxLabel}
        </Checkbox>
        <Checkbox
          colorScheme="green"
          value={secondValue}
          isChecked={isCheckedSecond}
        >
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
