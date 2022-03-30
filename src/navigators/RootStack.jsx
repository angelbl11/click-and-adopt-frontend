import React from "react";

//React navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Colors } from "../components/Styles";
const { tertiary } = Colors;
//screens
import Login from "../screens/GeneralScreens/LoginScreen";
import SignUp from "../screens/GeneralScreens/SignupScreen";
import AdopterContract from "../screens/AdopterScreens/AdopterContractScreen";
import AdopterCuestionary from "../screens/AdopterScreens/AdopterCuestionaryScreen";
import AdopterPreferencesCuestionary from "../screens/AdopterScreens/AdopterPreferencesCuestionaryScreen";
import AdoptedContract from "../screens/AdoptedScreens/AdoptedContractScreen";
import AdoptedCuestionary from "../screens/AdoptedScreens/AdoptedCuestionaryScreen";
import AdoptedPetInfo from "../screens/AdoptedScreens/AdoptedPetInfoScreen";
import AdoptedPetProfileScreen from "../screens/AdoptedScreens/AdoptedPetProfileScreen";
import AdoptedCardsScreen from "../screens/AdoptedScreens/AdoptedCardsScreen";
import TabsAdopter from "./TabsAdopter";
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
        <Stack.Screen
          name="PetProfile"
          component={AdoptedPetProfileScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="AdopterProfile"
          component={TabsAdopter}
        ></Stack.Screen>
        <Stack.Screen
          name="AdoptedProfile"
          component={TabsAdopted}
        ></Stack.Screen>
        <Stack.Screen
          name="AdoptedCarrousel"
          component={AdoptedCardsScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
