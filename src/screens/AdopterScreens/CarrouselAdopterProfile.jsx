import React from "react";

//Libraries
import { ScrollView, View, HStack, VStack, Heading, Text } from "native-base";
import { StatusBar } from "expo-status-bar";
import { Avatar } from "@rneui/themed";
import { Dimensions } from "react-native";

const CarrouselAdopterProfile = ({ route }) => {
  const {
    petGenderPreferences,
    petPreferences,
    petAgePreferences,
    reasonToAdopt,
    haveChildren,
    havePets,
    haveDog,
    haveCat,
    numberOfDogs,
    numberOfCats,
    isAgreeWithProtocol,
    hadPets,
    hadPetsValue,
    hadPetsDate,
    numberOfDays,
    numberOfMonths,
    numberOfYears,
    petSizePreferences,
    profilePic,
    fullName,
    account,
    age,
    email,
  } = route.params;
  //Variables for screensize
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView flex={1}>
      <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
        <StatusBar style="dark" />
        <ScrollView>
          <VStack alignItems={"center"} width={screenWidth - 10}>
            <HStack textAlign={"left"} ml={12} mt={3}>
              <Heading fontSize={"38px"} fontWeight="bold" color="#6A994E">
                Perfil
              </Heading>
            </HStack>
            <VStack mt={6} alignItems="center">
              {image && (
                <Avatar
                  size={140}
                  rounded
                  source={{
                    uri: profilePic
                      ? profilePic
                      : "https://calm-forest-47055.herokuapp.com/ProfilePictures/defaultprof.jpg",
                  }}
                ></Avatar>
              )}
              <Text
                fontSize={"22px"}
                fontWeight={"semibold"}
                color={"#1F2937"}
                mt={3}
                mb={2}
              >
                {fullName}
              </Text>
              <Text
                fontSize={"16px"}
                color={"#9CA3AF"}
                mb={3}
                fontWeight="medium"
              >
                {account}
              </Text>
            </VStack>
            <VStack mt={6} space={2.3} mb={3} left={3}>
              <Heading
                fontSize={"28px"}
                textAlign={"left"}
                fontWeight="bold"
                color="#6A994E"
              >
                Acerca de
              </Heading>
              <Text
                fontSize={"20px"}
                fontWeight="semibold"
                color={"#1F2937"}
                mt={3}
              >
                Información
              </Text>
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Edad:
              </Text>
              <Text fontSize={"18px"} color={"#1F2937"}>
                {age} años
              </Text>
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Correo electrónico:
              </Text>
              <Text fontSize={"18px"} color={"#1F2937"}>
                {email}
              </Text>
              <Text
                fontSize={"20px"}
                fontWeight="semibold"
                color={"#1F2937"}
                mt={3}
              >
                Preferencias
              </Text>
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Razones para adoptar:
              </Text>
              <Text fontSize={"18px"} color={"#1F2937"}>
                {reasonToAdopt}
              </Text>
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                En busca de:
              </Text>
              {petPreferences.map((pref) => (
                <Text fontSize={"18px"} key={pref}>
                  {pref}
                </Text>
              ))}
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Prefiere en edades:
              </Text>
              {petAgePreferences.map((pref) => (
                <Text fontSize={"18px"} key={pref}>
                  {pref}
                </Text>
              ))}
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Prefiere en tamaño:
              </Text>
              {petSizePreferences.map((pref) => (
                <Text fontSize={"18px"} key={pref}>
                  {pref}
                </Text>
              ))}
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Prefiere que sea:
              </Text>
              {petGenderPreferences.map((pref) => (
                <Text fontSize={"18px"} key={pref}>
                  {pref}
                </Text>
              ))}
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Menores de edad en su hogar:
              </Text>
              {haveChildren === true ? (
                <Text fontSize={"18px"}>Si hay</Text>
              ) : (
                <Text fontSize={"18px"}>No hay</Text>
              )}
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Mascotas actuales:
              </Text>
              {havePets === false ? (
                <Text fontSize={"18px"}>No tiene mascotas</Text>
              ) : haveDog === true ? (
                <Text fontSize={"18px"}>Perros: {numberOfDogs}</Text>
              ) : undefined}
              {haveCat === true ? (
                <Text fontSize={"18px"}>Gatos: {numberOfCats}</Text>
              ) : undefined}
              <Text fontSize={"18px"} fontWeight="semibold" color={"#1F2937"}>
                Preferencias de protocolo:
              </Text>
              {isAgreeWithProtocol === true ? (
                <Text fontSize={"18px"}>Tiene incovenientes</Text>
              ) : (
                <Text fontSize={"18px"}>No tiene inconvenientes</Text>
              )}
              <Text
                fontSize={"20px"}
                fontWeight="semibold"
                color={"#1F2937"}
                mt={3}
              >
                Historial
              </Text>
              {hadPets === true ? (
                <>
                  <Text
                    fontSize={"18px"}
                    fontWeight="semibold"
                    color={"#1F2937"}
                  >
                    Su mascota más reciente fue un:
                  </Text>
                  <Text fontSize={"18px"}>{hadPetsValue}</Text>
                  <Text
                    fontSize={"18px"}
                    fontWeight="semibold"
                    color={"#1F2937"}
                  >
                    Aproximadamente hace:
                  </Text>
                  {hadPetsDate === "Días" ? (
                    <Text fontSize={"18px"}>{numberOfDays} días</Text>
                  ) : hadPetsDate === "Meses" ? (
                    <Text fontSize={"18px"}>{numberOfMonths} meses</Text>
                  ) : (
                    <Text fontSize={"18px"}>{numberOfYears} años</Text>
                  )}
                </>
              ) : (
                <Text fontSize={"18px"}>
                  No ha tenido mascotas anteriormente
                </Text>
              )}
            </VStack>
          </VStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CarrouselAdopterProfile;
