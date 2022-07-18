import React, { useContext } from "react";

//React navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

//Screens
import Login from "../../screens/GeneralScreens/LoginScreen";
import SignUp from "../../screens/GeneralScreens/SignupScreen";
import AdopterContract from "../../screens/AdopterScreens/AdopterContractScreen";
import AdopterCuestionary from "../../screens/AdopterScreens/AdopterCuestionaryScreen";
import AdopterPreferencesCuestionary from "../../screens/AdopterScreens/AdopterPreferencesCuestionaryScreen";
import AdoptedContract from "../../screens/AdoptedScreens/AdoptedContractScreen";
import AdoptedCuestionary from "../../screens/AdoptedScreens/AdoptedCuestionaryScreen";
import AdoptedPetInfo from "../../screens/AdoptedScreens/AdoptedPetInfoScreen";
import AdoptedPetProfileScreen from "../../screens/AdoptedScreens/AdoptedPetProfileScreen";
import AdoptedCardsScreen from "../../screens/AdoptedScreens/AdoptedCardsScreen";
import CardsScreen from "../../screens/AdopterScreens/CardsScreen";
import EditDataScreen from "../../screens/GeneralScreens/EditDataScreen";
import CarrouselAdopterProfile from "../../screens/AdopterScreens/CarrouselAdopterProfile";
import PaperbinAdopted from "../../screens/AdoptedScreens/PaperbinAdopted";
import PaperbinAdopter from "../../screens/AdopterScreens/PaperbinAdopter";

//Tabs
import TabsAdopter from "./TabsAdopter";
import TabsAdopted from "./TabsAdopted";

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
        <Stack.Screen
          name="Login"
          component={
            user.id
              ? user.account === "Adoptante"
                ? TabsAdopter
                : TabsAdopted
              : Login
          }
        />
        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen name="AdopterContract" component={AdopterContract} />
        <Stack.Screen name="AdoptedContract" component={AdoptedContract} />
        <Stack.Screen
          name="AdopterCuestionary"
          component={AdopterCuestionary}
        />
        <Stack.Screen
          name="AdoptedCuestionary"
          component={AdoptedCuestionary}
        />
        <Stack.Screen
          name="AdopterPreferencesCuestionary"
          component={AdopterPreferencesCuestionary}
        />
        <Stack.Screen name="AdoptedPetInfo" component={AdoptedPetInfo} />
        <Stack.Screen name="PetProfile" component={AdoptedPetProfileScreen} />
        <Stack.Screen name="AdopterProfile" component={TabsAdopter} />
        <Stack.Screen name="AdoptedProfile" component={TabsAdopted} />
        <Stack.Screen name="AdopterCarrousel" component={CardsScreen} />
        <Stack.Screen name="AdoptedCarrousel" component={AdoptedCardsScreen} />
        <Stack.Screen name="EditScreen" component={EditDataScreen} />
        <Stack.Screen
          name="CarrouselAdopter"
          component={CarrouselAdopterProfile}
        />
        <Stack.Screen name="PaperbinAdopter" component={PaperbinAdopter} />
        <Stack.Screen name="PaperbinAdopted" component={PaperbinAdopted} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
