import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { StatusBar } from "expo-status-bar";
import CardComponent from "../../components/Card/CardComponent";
import { PageTitle, CardCont } from "../../components/Utils/Styles";
import FooterButtons from "../../components/Card/FooterButtons";
import { Animated, PanResponder } from "react-native";
import { CARD, ACTION_OFFSET } from "../../components/Card/CardConstants";
import { View } from "native-base";
import { AuthContext } from "../../context/Auth";
//Graphql
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_RANDOM_PETS } from "../../graphql/queries";
import { GIVE_LIKE_PET } from "../../graphql/mutations";
import TheCard from "../../components/TheCard/TheCard";
const CardsScreen = ({ navigation }) => {
  const [petsCards, setPetsCards] = useState([]);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  const { user } = useContext(AuthContext);
  const url = "https://calm-forest-47055.herokuapp.com/ProfilePictures/";

  return (
    <View bgColor={"#FFFFFF"} flex={1}>
      <StatusBar style="dark" />
      <PageTitle>Encuentra Mascotas</PageTitle>
      <TheCard></TheCard>
    </View>
  );
};

export default CardsScreen;
