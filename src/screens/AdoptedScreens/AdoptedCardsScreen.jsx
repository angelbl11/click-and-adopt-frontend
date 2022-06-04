import React, { useState, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import TinderCard from "react-tinder-card";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  CardContainer,
  Card,
  CardImage,
  CardTitle,
  CarruselButtonsWrapper,
  CarruselButton,
} from "../../components/Styles";
import { Pressable, IconButton, View } from "native-base";
const db = [
  {
    name: "Richard Hendricks",
    img: require("../../assets/person1.jpg"),
  },
  {
    name: "Erlich Bachman",
    img: require("../../assets/person2.jpg"),
  },
  {
    name: "Monica Hall",
    img: require("../../assets/person3.jpg"),
  },
];

const alreadyRemoved = [];
let charactersState = db; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

const AdoptedCardsScreen = ({ navigation }) => {
  const [characters, setCharacters] = useState(db);
  const [lastDirection, setLastDirection] = useState();

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const swiped = (direction, nameToDelete) => {
    console.log(
      "saliendo del carrusel: " + nameToDelete + " hacia la " + direction
    );
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " salió de la pantalla");
    charactersState = charactersState.filter(
      (character) => character.name !== name
    );
    setCharacters(charactersState);
  };

  const swipe = (dir) => {
    const cardsLeft = characters.filter(
      (person) => !alreadyRemoved.includes(person.name)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
      const index = db.map((person) => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle>Encuentra Adoptantes</PageTitle>

        <CardContainer>
          {characters.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <Card flexDir={"row"}>
                <CardImage source={character.img}></CardImage>

                <CardTitle flexDir={"row"}>
                  {character.name}
                  <IconButton
                    _icon={{
                      as: MaterialIcons,
                      name: "info-outline",
                      color: "white",
                      bottom: "0",
                      marginLeft: "90px",
                      position: "absolute",
                    }}
                    onPress={() => {
                      navigation.navigate("Login");
                    }}
                  ></IconButton>
                </CardTitle>
              </Card>
            </TinderCard>
          ))}
        </CardContainer>

        <CarruselButtonsWrapper>
          <CarruselButton
            onPress={() => swipe("left")}
            _icon={{
              as: MaterialIcons,
              name: "close",
              color: "#9CA3AF",
            }}
          ></CarruselButton>
          <CarruselButton
            onPress={() => swipe("right")}
            _icon={{
              as: MaterialIcons,
              name: "favorite",
              color: "#BC4749",
            }}
          ></CarruselButton>
        </CarruselButtonsWrapper>
      </InnerContainer>
    </StyledContainer>
  );
};

export default AdoptedCardsScreen;
