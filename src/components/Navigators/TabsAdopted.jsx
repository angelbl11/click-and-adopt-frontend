import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdoptedProfile from "../../screens/AdoptedScreens/AdoptedProfileScreen";
import AdoptedCardsScreen from "../../screens/AdoptedScreens/AdoptedCardsScreen";
import ChatScreen from "../../screens/GeneralScreens/ChatScreen";
import AdoptedLikesScreen from "../../screens/AdoptedScreens/AdoptedLikesScreen";
const Tab = createBottomTabNavigator();

import { NativeBaseProvider, View, Image } from "native-base";
import { Colors } from "../Utils/Styles";
const { primary, tertiary, brand, darkLight } = Colors;

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          elevation: 0,
          backgroundColor: primary,
        },
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
      initialRouteName="Perfil"
    >
      <Tab.Screen
        name="Inicio"
        component={AdoptedCardsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NativeBaseProvider>
              <View>
                <Image
                  source={require("../../assets/home.png")}
                  resizeMode="contain"
                  alt="home-logo"
                  style={{
                    width: 45,
                    height: 55,
                    tintColor: focused ? brand : darkLight,
                  }}
                ></Image>
              </View>
            </NativeBaseProvider>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Likes"
        component={AdoptedLikesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NativeBaseProvider>
              <View>
                <Image
                  source={require("../../assets/like.png")}
                  resizeMode="contain"
                  alt="like-logo"
                  style={{
                    width: 35,
                    height: 55,
                    tintColor: focused ? brand : darkLight,
                  }}
                ></Image>
              </View>
            </NativeBaseProvider>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Chats"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <NativeBaseProvider>
              <View>
                <Image
                  source={require("../../assets/chat.png")}
                  resizeMode="contain"
                  alt="chat-logo"
                  style={{
                    width: 35,
                    height: 55,
                    tintColor: focused ? brand : darkLight,
                  }}
                ></Image>
              </View>
            </NativeBaseProvider>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Perfil"
        component={AdoptedProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <NativeBaseProvider>
              <View>
                <Image
                  source={require("../../assets/profile.png")}
                  resizeMode="contain"
                  alt="profile-logo"
                  style={{
                    width: 35,
                    height: 55,
                    tintColor: focused ? brand : darkLight,
                  }}
                ></Image>
              </View>
            </NativeBaseProvider>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default Tabs;