import React from "react";
import { Platform } from "react-native";
//keyboard avoiding view
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { ScrollView, KeyboardAvoidingView } from "native-base";
const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      flex={1}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
