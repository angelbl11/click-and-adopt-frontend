import React, { useContext, useEffect } from "react";

//Libraries
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  ScrollView,
  View,
  IconButton,
  Text,
  VStack,
  HStack,
  Heading,
  Center,
} from "native-base";

//Custom Components
import AdoptedProfileObject from "../../components/RenderObjects/AdoptedProfileObject";

//Auth
import { AuthContext } from "../../context/Auth";
import { PetsContext } from "../../context/PetsContext";

//Graphql
import { GET_ADOPTED_INFO } from "../../graphql/queries";
import { useLazyQuery } from "@apollo/client";
import { Dimensions, SafeAreaView } from "react-native";

const AdoptedProfile = ({ navigation }) => {
  //Variables for screensize
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const { logout, user } = useContext(AuthContext);
  const { pets, setPets, petImage, setPetImage, num } = useContext(PetsContext);
  let images = [];

  const [getInfo] = useLazyQuery(GET_ADOPTED_INFO, {
    variables: {
      getAdoptedInfoId: user.id,
    },
    onCompleted: (data) => {
      setPets(data?.getAdoptedInfo);
      data.getAdoptedInfo.map((item) => {
        images.push(
          `https://calm-forest-47055.herokuapp.com/ProfilePictures/` +
            item.petPicture.filename
        );
      });
      setPetImage(images);
    },
  });

  useEffect(() => {
    getInfo();
  }, [num]);

  return (
    <SafeAreaView flex={1}>
      <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
        <StatusBar style="dark" />
        <ScrollView>
          <VStack alignItems={"center"} width={screenWidth - 10}>
            <HStack textAlign={"left"} mt={3} mb={4}>
              <Heading
                fontSize={"38px"}
                fontWeight="bold"
                color="#6A994E"
                right={70}
              >
                Perfil
              </Heading>
              <IconButton
                left={60}
                _icon={{
                  as: MaterialIcons,
                  name: "edit",
                  color: "#1F2937",
                  size: "md",
                }}
                _pressed={{
                  bg: "#7db85c",
                  borderRadius: 100,
                }}
                onPress={() => {
                  navigation.navigate("EditScreen", {
                    account: user.account,
                  });
                }}
              />
              <IconButton
                left={70}
                _icon={{
                  as: MaterialIcons,
                  name: "add",
                  color: "#1F2937",
                  size: "md",
                }}
                _pressed={{
                  bg: "#7db85c",
                  borderRadius: 100,
                }}
                onPress={() => {
                  navigation.navigate("AdoptedCuestionary");
                }}
              />
              <IconButton
                left={20}
                _icon={{
                  as: MaterialIcons,
                  name: "logout",
                  color: "#1F2937",
                  size: "md",
                }}
                _pressed={{
                  bg: "#7db85c",
                  borderRadius: 100,
                }}
                onPress={() => {
                  logout();
                  navigation.navigate("Login");
                }}
              />
            </HStack>
            <View
              flex={0.5}
              flexWrap="wrap"
              flexDir={"row"}
              height="auto"
              justifyContent={"center"}
              mb={"10px"}
              mt={"12px"}
            >
              {petImage?.map((item, count) => {
                return (
                  <View
                    key={count}
                    width={"auto"}
                    mr="20px"
                    ml="20px"
                    mb={"10px"}
                  >
                    <AdoptedProfileObject
                      key={count}
                      id={pets[count]?.id}
                      status={pets[count]?.isAvailableToBeAdopted}
                      pressed={() => {
                        navigation.navigate("PetProfile", {
                          name: pets[count].adoptedPetName,
                          des: pets[count].adoptedPetDescription,
                          protocol: pets[count].adoptedPetProtocol,
                          age: pets[count].ageOfAdoptedPet,
                          coexistence: pets[count].coexistenceWithOtherPets,
                          gender: pets[count].genderOfAdoptedPet,
                          isHealthyK: pets[count].isHealthyWithKids,
                          isHealthyP: pets[count].isHealthyWithOtherPets,
                          typeOf: pets[count].typeOfAdoptedPet,
                          petProfdata: pets[count].petPicture?.filename,
                          petId: pets[count].id,
                          petProfPic: item,
                          count: count,
                          imageArray: images,
                          isVisible: true,
                        });
                      }}
                      url={
                        item
                          ? item
                          : `https://calm-forest-47055.herokuapp.com/ProfilePictures/defaultprof.jpg`
                      }
                    />
                  </View>
                );
              })}
            </View>
            <VStack mt={3} space={2.3} mb={3}>
              <Heading
                fontSize={"28px"}
                textAlign={"left"}
                fontWeight="bold"
                color="#6A994E"
                left={"-105"}
              >
                Acerca de
              </Heading>
              <Center>
                <Text
                  fontSize={"22px"}
                  fontWeight={"semibold"}
                  color={"#1F2937"}
                  mt={3}
                  mb={2}
                >
                  {user.fullName}
                </Text>
                <Text
                  fontSize={"16px"}
                  color={"#9CA3AF"}
                  mb={1.5}
                  fontWeight="medium"
                >
                  {user.account === "Adoptado" ? "Responsable" : null}
                </Text>
              </Center>
              <Text
                fontSize={"20px"}
                fontWeight="semibold"
                color={"#1F2937"}
                left={"-105"}
              >
                Información
              </Text>
              <Text
                fontSize={"18px"}
                fontWeight="semibold"
                color={"#1F2937"}
                left={"-105"}
              >
                Edad:
              </Text>
              <Text fontSize={"18px"} color={"#1F2937"} left={"-105"}>
                {user.age} años
              </Text>
              <Text
                fontSize={"18px"}
                fontWeight="semibold"
                color={"#1F2937"}
                left={"-105"}
              >
                Correo electrónico:
              </Text>
              <Text fontSize={"18px"} color={"#1F2937"} left={"-105"}>
                {user.email}
              </Text>
            </VStack>
          </VStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AdoptedProfile;
