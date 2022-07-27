import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
//Formik
import { Formik } from "formik";

//Components
import RadioInput from "../../components/Inputs/RadioInput";
import CheckBoxInput from "../../components/Inputs/CheckBoxInput";

//Queries
import { ADOPTER_CUESTIONARY } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";

import { Spinner, View, Text, Heading, VStack, Pressable } from "native-base";

//Yup
import * as Yup from "yup";
import { AuthContext } from "../../context/Auth";

//Form fields validation
const AdopterPreferencesCuestionarySchema = Yup.object().shape({
  petSizePreferences: Yup.array().min(1, "Debes elegir al menos una opción"),
  petAgePreferences: Yup.array().min(1, "Debes elegir al menos una opción"),
  petGenderPreferences: Yup.array().min(1, "Debes elegir al menos una opción"),
});

const AdopterPreferencesCuestionary = ({ navigation, route }) => {
  const [groupSizeValues, setGroupSizeValues] = useState([]);
  const [groupAgeValues, setGroupAgeValues] = useState([]);
  const [groupGenderValues, setGroupGenderValues] = useState([]);
  const [isAgree, setIsAgree] = useState(true);
  const [createAdopterUser, { loading }] = useMutation(ADOPTER_CUESTIONARY);
  const { user } = useContext(AuthContext);
  //Variables for screensize
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const {
    reasonsToAdopt,
    petPreferences,
    havePets,
    hadPets,
    hadPetsValue,
    hadPetsDate,
    numberOfDogs,
    numberOfCats,
    haveChildren,
    numberOfDays,
    numberOfMonths,
    numberOfYears,
    haveDog,
    haveCat,
  } = route.params;

  return (
    <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
      <StatusBar style="dark" />
      <VStack alignItems={"center"} bgColor="#FFFFFF">
        <Heading
          fontSize={"26px"}
          textAlign={"center"}
          fontWeight="bold"
          color="#6A994E"
          marginBottom={"15px"}
        >
          Cuestionario sobre preferencias de mascotas
        </Heading>
        <Formik
          initialValues={{
            petSizePreferences: [],
            petAgePreferences: [],
            petGenderPreferences: [],
            isAgreeWithProtocol: true,
          }}
          validationSchema={AdopterPreferencesCuestionarySchema}
          onSubmit={async (values) => {
            await values.petSizePreferences;
            values.petSizePreferences = [...groupSizeValues];
            values.petAgePreferences = [...groupAgeValues];
            values.petGenderPreferences = [...groupGenderValues];
            createAdopterUser({
              variables: {
                adopterQuestionnaireInput: {
                  isAgreeWithProtocol: values.isAgreeWithProtocol,
                  petAgePreferences: values.petAgePreferences,
                  haveDog: haveDog,
                  haveCat: haveCat,
                  numberOfDogs: parseInt(numberOfDogs),
                  numberOfCats: parseInt(numberOfCats),
                  petPreferences: petPreferences,
                  petSizePreferences: values.petSizePreferences,
                  petGenderPreferences: values.petGenderPreferences,
                  reasonToAdopt: reasonsToAdopt,
                  havePets: havePets,
                  isChildren: haveChildren,
                  hadPets: hadPets,
                  hadPetsDate: hadPetsDate,
                  hadPetsValue: hadPetsValue,
                  numberOfDays: parseInt(numberOfDays),
                  numberOfMonths: parseInt(numberOfMonths),
                  numberOfYears: parseInt(numberOfYears),
                  userId: user.id,
                },
              },
              onCompleted: (data) => {
                navigation.navigate("Profiles");
                console.log("si");
              },
              onError: (err) => {
                console.log(user.id);
                console.log(err.message);
              },
            });
          }}
        >
          {({ handleSubmit, values, errors, touched }) => (
            <VStack width={screenWidth - 30} space={"8px"} marginTop={2}>
              <CheckBoxInput
                isThird={true}
                label="¿Qué talla o tamaño prefieres para tu mascota?"
                groupValue={
                  groupSizeValues
                    ? (values.petSizePreferences = [...groupSizeValues])
                    : undefined
                }
                onChange={setGroupSizeValues}
                firstValue="Chico"
                firstCheckBoxLabel="Chico (ej. Pug o Chihuahua)"
                secondValue="Mediano"
                secondCheckBoxLabel="Mediano (ej. Beagle o Shnauzer)"
                thirdValue="Grande"
                thirdCheckBoxLabel="Grande (ej. Husky o Samoyedo)"
              />
              {errors.petSizePreferences && touched.petSizePreferences ? (
                <Text fontSize={"13px"} color={"#BC4749"}>
                  {errors.petSizePreferences}
                </Text>
              ) : undefined}
              <CheckBoxInput
                isFourth={true}
                isThird={true}
                label="¿Entre que rango de edad te gustaría que fuera tu futura mascota?"
                groupValue={
                  groupAgeValues
                    ? (values.petAgePreferences = [...groupAgeValues])
                    : undefined
                }
                onChange={setGroupAgeValues}
                firstValue="Cachorro"
                firstCheckBoxLabel="Cachorro (2 a 6 meses)"
                secondValue="Adolescente"
                secondCheckBoxLabel="Adolescente (6 a 12 meses)"
                thirdValue="Adulto"
                thirdCheckBoxLabel="Adulto (1 año a 7 años)"
                fourthValue="Senior"
                fourthCheckBoxLabel="Senior (7 o más años)"
              />
              {errors.petAgePreferences && touched.petAgePreferences ? (
                <Text fontSize={"13px"} color={"#BC4749"}>
                  {errors.petAgePreferences}
                </Text>
              ) : undefined}
              <CheckBoxInput
                label="¿Qué sexo prefieres para tu mascota?"
                groupValue={
                  groupGenderValues
                    ? (values.petGenderPreferences = [...groupGenderValues])
                    : undefined
                }
                onChange={setGroupGenderValues}
                firstValue="Macho"
                firstCheckBoxLabel="Macho"
                secondValue="Hembra"
                secondCheckBoxLabel="Hembra"
              />
              {errors.petGenderPreferences && touched.petGenderPreferences ? (
                <Text fontSize={"13px"} color={"#BC4749"}>
                  {errors.petGenderPreferences}
                </Text>
              ) : undefined}
              <RadioInput
                label="¿Tienes inconvenientes con el protocolo de la mascota?"
                linkLabel={"Protocolo"}
                marginLeftLink={"-270"}
                toastDescription={
                  "Un protocolo es si cuenta con vacunas, desparasitación,esterilización y otro tipo de tratamientos"
                }
                groupValue={
                  isAgree == true
                    ? (values.isAgreeWithProtocol = true)
                    : (values.isAgreeWithProtocol = false)
                }
                onChange={(nextValue) => {
                  setIsAgree(nextValue);
                }}
                firstRadioLabel="Sí"
                firstValue={true}
                secondRadioLabel="No"
                secondValue={false}
              />
              <Pressable
                onPress={handleSubmit}
                disabled={loading}
                justifyContent={"center"}
                alignItems={"center"}
                borderRadius={"5px"}
                height={"60px"}
                width={screenWidth - 30}
                mt={"20px"}
                mb={"12px"}
                backgroundColor={"#6A994E"}
              >
                <Text fontSize={"18px"} color="white" fontWeight={"medium"}>
                  {loading ? <Spinner color={"#FFFFFF"} /> : "Siguiente"}
                </Text>
              </Pressable>
            </VStack>
          )}
        </Formik>
      </VStack>
    </View>
  );
};

export default AdopterPreferencesCuestionary;
