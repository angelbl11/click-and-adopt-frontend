import React, { useRef, useState, useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { pets as petsArray } from "./data";
import CardComponent from "../../components/CardComponent";
import { StyledContainer, PageTitle, CardCont } from "../../components/Styles";
import FooterButtons from "../../components/FooterButtons";
import { Animated, PanResponder } from "react-native";
import { CARD, ACTION_OFFSET } from "../../components/CardConstants";
import { View } from "native-base";
const CardsScreen = ({ navigation }) => {
  const [petsCards, setPetsCards] = useState(petsArray);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!petsCards.length) {
      setPetsCards(petsArray);
    }
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setPetsCards((previousState) => previousState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleChoice = useCallback(
    (direction) => {
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCREEN,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x]
  );
  return (
    <View bgColor={"#FFFFFF"} flex={1}>
      <StatusBar style="dark" />
      <PageTitle>Encuentra Mascotas</PageTitle>
      <CardCont>
        {petsCards
          .map(({ name, source }, index) => {
            const isFirst = index === 0;
            const dragHandler = isFirst ? panResponder.panHandlers : {};
            return (
              <CardComponent
                key={name}
                name={name}
                source={source}
                isFirst={isFirst}
                {...dragHandler}
                swipe={swipe}
                tiltSign={tiltSign}
                pressed={() => {
                  navigation.navigate("Login");
                }}
              />
            );
          })
          .reverse()}
      </CardCont>
      <FooterButtons handleChoice={handleChoice}></FooterButtons>
    </View>
  );
};

export default CardsScreen;
