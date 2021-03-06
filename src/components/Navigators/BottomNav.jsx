import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

//Screens
import AdopterProfileScreen from "../../screens/AdopterScreens/AdopterProfileScreen";
import AdoptedProfileScreen from "../../screens/AdoptedScreens/AdoptedProfileScreen";
import ChatScreen from "../../screens/GeneralScreens/ChatScreen";
import CardsScreen from "../../screens/GeneralScreens/CardsScreen";
import LikeScreen from "../../screens/GeneralScreens/LikeScreen";

//Auth
import { AuthContext } from "../../context/Auth";

//Components & Libraries
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const BottomNav = () => {
  const { user } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2,
        },
        tabBarActiveTintColor: "#6A994E",
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          elevation: 0,
          backgroundColor: "#FFFFFF",
        },
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
        },
        headerTintColor: "#1F2937",
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
          unmountOnBlur: user.account === "Adoptado" ? false : true,
          tabBarIcon: ({ focused }) => (
            <>
              <Icon
                mt={2}
                as={<Ionicons name="paw" />}
                size={"md"}
                color={focused ? "#6A994E" : "#9CA3AF"}
              ></Icon>
            </>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Likes"
        component={LikeScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <>
              <Icon
                mt={2}
                as={<Ionicons name="heart" />}
                size={"md"}
                color={focused ? "#6A994E" : "#9CA3AF"}
              ></Icon>
            </>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Chats"
        component={ChatScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <>
              <Icon
                mt={2}
                as={<Ionicons name="chatbubbles" />}
                size={"md"}
                color={focused ? "#6A994E" : "#9CA3AF"}
              ></Icon>
            </>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Perfil"
        component={
          user.account === "Adoptante"
            ? AdopterProfileScreen
            : AdoptedProfileScreen
        }
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <>
              <Icon
                mt={2}
                as={<Ionicons name="person-circle" />}
                size={"md"}
                color={focused ? "#6A994E" : "#9CA3AF"}
              ></Icon>
            </>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomNav;
