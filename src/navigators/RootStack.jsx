import React from "react";

//React navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Colors } from "../components/Styles";
const { primary, tertiary } = Colors;
//screens
import Login from "../screens/GeneralScreens/Login.Screen";
import SignUp from "../screens/GeneralScreens/Signup.Screen";
import AdopterContract from "../screens/AdopterScreens/AdopterContract";
import AdopterCuestionary from "../screens/AdopterScreens/AdopterCuestionary";
import AdopterPreferencesCuestionary from "../screens/AdopterScreens/AdopterPreferencesCuestionary";
import AdoptedContract from "../screens/AdoptedScreens/AdoptedContract";
import AdoptedCuestionary from "../screens/AdoptedScreens/AdoptedCuestionary";
import AdoptedPetInfo from "../screens/AdoptedScreens/AdoptedPetInfo";

import Tabs from "./Tabs";
import TabsAdopted from "./TabsAdopted";
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
        <Stack.Screen
          name="AdoptedPetInfo"
          component={AdoptedPetInfo}
        ></Stack.Screen>
        <Stack.Screen name="AdopterProfile" component={Tabs}></Stack.Screen>
        <Stack.Screen
          name="AdoptedProfile"
          component={TabsAdopted}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
