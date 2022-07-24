import React, { useContext } from "react";

//React navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

//Screens
import Login from "../../screens/GeneralScreens/LoginScreen";
import SignUp from "../../screens/GeneralScreens/SignupScreen";
import ContractScreen from "../../screens/GeneralScreens/ContractScreen";
import LikeScreen from "../../screens/GeneralScreens/LikeScreen";
import PaperbinScreen from "../../screens/GeneralScreens/PaperbinScreen";
import CardsScreen from "../../screens/GeneralScreens/CardsScreen";
import EditDataScreen from "../../screens/GeneralScreens/EditDataScreen";
import BottomNav from "./BottomNav";
import AdopterCuestionary from "../../screens/AdopterScreens/AdopterCuestionaryScreen";
import AdopterPreferencesCuestionary from "../../screens/AdopterScreens/AdopterPreferencesCuestionaryScreen";
import AdoptedCuestionary from "../../screens/AdoptedScreens/AdoptedCuestionaryScreen";
import AdoptedPetInfo from "../../screens/AdoptedScreens/AdoptedPetInfoScreen";
import AdoptedPetProfileScreen from "../../screens/AdoptedScreens/AdoptedPetProfileScreen";

//Auth
import { AuthContext } from "../../context/Auth";

const RootStack = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerShadowVisible: false,
          headerTintColor: "#1F2937",
          headerTransparent: "true",
          headerTitle: "",
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={user.id ? BottomNav : Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="EditScreen" component={EditDataScreen} />
        <Stack.Screen name="Likes" component={LikeScreen} />
        <Stack.Screen name="Paperbin" component={PaperbinScreen} />
        <Stack.Screen name="Cards" component={CardsScreen} />
        <Stack.Screen name="Contract" component={ContractScreen} />
        <Stack.Screen
          name="AdopterCuestionary"
          component={AdopterCuestionary}
        />
        <Stack.Screen
          name="AdopterPreferencesCuestionary"
          component={AdopterPreferencesCuestionary}
        />
        <Stack.Screen
          name="AdoptedCuestionary"
          component={AdoptedCuestionary}
        />
        <Stack.Screen name="AdoptedPetInfo" component={AdoptedPetInfo} />
        <Stack.Screen name="PetProfile" component={AdoptedPetProfileScreen} />
        <Stack.Screen name="Profiles" component={BottomNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
