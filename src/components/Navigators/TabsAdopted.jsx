import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
//Screens
import AdoptedProfile from "../../screens/AdoptedScreens/AdoptedProfileScreen";
import AdoptedCardsScreen from "../../screens/AdoptedScreens/AdoptedCardsScreen";
import ChatScreen from "../../screens/GeneralScreens/ChatScreen";
import AdoptedLikesScreen from "../../screens/AdoptedScreens/AdoptedLikesScreen";

//Components & Libraries
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";

const Tabs = () => {
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
        component={AdoptedCardsScreen}
        options={{
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
        component={AdoptedLikesScreen}
        options={{
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
        component={AdoptedProfile}
        options={{
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

export default Tabs;
