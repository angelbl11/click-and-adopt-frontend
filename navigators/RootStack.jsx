import React from "react";

//React navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Colors } from "./../components/Styles";
const { primary, tertiary } = Colors;
//screens
import Login from "./../screens/Login.Screen";
import SignUp from "./../screens/Signup.Screen";
import Welcome from "../screens/Welcome.Screen";
import AdopterContract from "../screens/AdopterContract";
import AdopterCuestionary from "../screens/AdopterCuestionary";
import AdopterPreferencesCuestionary from "../screens/AdopterPreferencesCuestionary";
import AdoptedContract from "../screens/AdoptedContract";
import AdoptedCuestionary from "../screens/AdoptedCuestionary";
const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: tertiary,
          headerTransparent: "true",
          headerTitle: "",
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
        <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
        <Stack.Screen
          name="AdopterContract"
          component={AdopterContract}
        ></Stack.Screen>
        <Stack.Screen
          name="AdoptedContract"
          component={AdoptedContract}
        ></Stack.Screen>
        <Stack.Screen
          name="AdopterCuestionary"
          component={AdopterCuestionary}
        ></Stack.Screen>
        <Stack.Screen
          name="AdoptedCuestionary"
          component={AdoptedCuestionary}
        ></Stack.Screen>
        <Stack.Screen
          name="AdopterPreferencesCuestionary"
          component={AdopterPreferencesCuestionary}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
