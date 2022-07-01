import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdopterProfileScreen from "../../screens/AdopterScreens/AdopterProfileScreen";
import CardsScreen from "../../screens/AdopterScreens/CardsScreen";
import ChatScreen from "../../screens/GeneralScreens/ChatScreen";
import AdopterLikeScreen from "../../screens/AdopterScreens/AdopterLikeScreen";
const Tab = createBottomTabNavigator();
import { AuthContext } from "../../context/Auth";
import { View, Image, Pressable } from "native-base";
import { Colors } from "../Utils/Styles";
import { useLazyQuery } from "@apollo/client";
import { GET_ADOPTER_LIKES } from "../../graphql/queries";
import { useContext } from "react";
const { primary, tertiary, brand, darkLight } = Colors;

const TabsAdopter = () => {
  const { user } = useContext(AuthContext);
  const [getAdopterLikes, { data, loading }] = useLazyQuery(GET_ADOPTER_LIKES, {
    variables: {
      userId: user.id,
    },
    onError: (err) => {
      console.log("Network error:");
      console.log(err.graphQLErrors);
    },

    onCompleted: (data) => {
      setAdopterLikes(data?.getPetsLikes?.likes);
      console.log("HECHO");
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 7,
          elevation: 0,
          backgroundColor: primary,
        },
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
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
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Likes"
        component={AdopterLikeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
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
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Chats"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
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
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Perfil"
        component={AdopterProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
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
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabsAdopter;
