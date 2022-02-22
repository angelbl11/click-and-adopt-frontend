import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdoptedProfile from "../screens/AdoptedScreens/AdoptedProfile";
import CardsScreen from "../screens/GeneralScreens/CardsScreen";
import ChatScreen from "../screens/GeneralScreens/ChatScreen";
import LikesScreen from "../screens/GeneralScreens/LikesScreen";
const Tab = createBottomTabNavigator();

import { NativeBaseProvider, View, Image } from "native-base";
import { Colors } from "../components/Styles";
const { primary, tertiary, brand, darkLight } = Colors;

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 8,
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
        component={CardsScreen}
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
        component={LikesScreen}
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
