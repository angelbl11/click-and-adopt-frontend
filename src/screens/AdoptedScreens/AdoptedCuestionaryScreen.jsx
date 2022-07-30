import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//Formik
import { Formik } from "formik";

//Native Base Components
import {
  View,
  VStack,
  Text,
  Pressable,
  Heading,
  KeyboardAvoidingView,
  Icon,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//Components
import RadioInput from "../../components/Inputs/RadioInput";
import CustomTextInput from "../../components/Inputs/CustomTextInput";

//Yup
import * as Yup from "yup";

import { Dimensions, Platform } from "react-native";

const AdoptedCuestionarySchema = Yup.object().shape({
  typeOfAdoptedPet: Yup.string().required("Debes seleccionar una opción"),
  genderOfAdoptedPet: Yup.string().required("Debes seleccionar una opción"),
  adoptedPetName: Yup.string()
    .required(
      "Debes introducir el nombre de la mascota o asignarle uno temporal"
    )
    .matches(/^[ñíóáéúÁÉÍÓÚÑ a-zA-Z]+$/, "Introduce únicamente letras ")
    .min(1, "Introduce un nombre válido")
    .max(12, "Nombre demasiado largo"),
  ageOfAdoptedPet: Yup.string().required(
    "Debes seleccionar la edad de la mascota"
  ),
});

const AdoptedCuestionary = ({ navigation, route }) => {
  const {
    isEdited,
    typeOf,
    gender,
    age,
    petId,
    protocol,
    isHealthyWithKids,
    isHealthyWithPets,
    petName,
    description,
  } = route.params;
  const [typeOfAdoptedPet, setTypeOfAdoptedPet] = useState(typeOf || "Perro");
  const [genderOfAdoptedPet, setGenderOfAdoptedPet] = useState(
    gender || "Macho"
  );
  const [ageOfAdoptedPet, setAgeOfAdoptedPet] = useState(age || "Cachorro");
  //Variables for screensize
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
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
          Cuestionario sobre mascota
        </Heading>
        <Formik
          initialValues={{
            typeOfAdoptedPet: "",
            genderOfAdoptedPet: "",
            adoptedPetName: petName,
            ageOfAdoptedPet: "",
          }}
          validationSchema={AdoptedCuestionarySchema}
          onSubmit={(values, { resetForm }) => {
            navigation.navigate("AdoptedPetInfo", {
              petName: values.adoptedPetName,
              typeOfAdoptedPet: values.typeOfAdoptedPet,
              genderOfAdoptedPet: values.genderOfAdoptedPet,
              ageOfAdoptedPet: values.ageOfAdoptedPet,
              petId: petId,
              protocol: protocol,
              isHealthyWithChild: isHealthyWithKids,
              isHealthyWithPets: isHealthyWithPets,
              isEdited: isEdited,
              description: description,
            });
            resetForm();
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <VStack width={screenWidth - 30} space={"8px"} marginTop={2}>
              <KeyboardAvoidingView
                h={{
                  base: "400px",
                  lg: "auto",
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <RadioInput
                  label="¿Qué tipo de mascota es la que darás en adopción?"
                  groupValue={
                    typeOfAdoptedPet == "Perro"
                      ? (values.typeOfAdoptedPet = "Perro")
                      : (values.typeOfAdoptedPet = "Gato")
                  }
                  onChange={(nextValue) => {
                    setTypeOfAdoptedPet(nextValue);
                  }}
                  firstRadioLabel="Perro"
                  isDisabled={isEdited}
                  firstValue="Perro"
                  secondRadioLabel="Gato"
                  secondValue="Gato"
                />
                {errors.typeOfAdoptedPet && touched.typeOfAdoptedPet ? (
                  <Text fontSize={"13px"} color={"#BC4749"}>
                    {errors.typeOfAdoptedPet}
                  </Text>
                ) : undefined}
                <RadioInput
                  label="¿Cuál es el sexo de tu mascota?"
                  groupValue={
                    genderOfAdoptedPet == "Macho"
                      ? (values.genderOfAdoptedPet = "Macho")
                      : (values.genderOfAdoptedPet = "Hembra")
                  }
                  onChange={(nextValue) => {
                    setGenderOfAdoptedPet(nextValue);
                  }}
                  firstRadioLabel="Macho"
                  firstValue="Macho"
                  secondRadioLabel="Hembra"
                  secondValue="Hembra"
                />
                {errors.genderOfAdoptedPet && touched.genderOfAdoptedPet ? (
                  <Text fontSize={"13px"} color={"#BC4749"}>
                    {errors.genderOfAdoptedPet}
                  </Text>
                ) : undefined}
                <Text
                  fontSize={"16px"}
                  fontWeight={"semibold"}
                  color={"#1F2937"}
                  textAlign={"left"}
                  mb={2}
                  mt={4}
                >
                  ¿Cuál es el nombre de tu mascota?
                </Text>
                <CustomTextInput
                  placeholder="Introduce el nombre de tu mascota"
                  onChangeText={(text) =>
                    handleChange("adoptedPetName")(text.trim())
                  }
                  onBlur={handleBlur("adoptedPetName")}
                  value={values.adoptedPetName}
                  isInvalid={errors.adoptedPetName}
                  _focus={{ borderColor: "#6A994E" }}
                  InputLeftElement={
                    <Icon
                      as={
                        <MaterialCommunityIcons
                          name={typeOfAdoptedPet == "Perro" ? "dog" : "cat"}
                        />
                      }
                      size="25px"
                      color="#6A994E"
                      ml={"17px"}
                      mr={"3px"}
                    />
                  }
                />
                {errors.adoptedPetName && touched.adoptedPetName ? (
                  <Text fontSize={"13px"} color={"#BC4749"}>
                    {errors.adoptedPetName}
                  </Text>
                ) : undefined}
                <RadioInput
                  label={`¿En qué rango de edad se encuentra ${values.adoptedPetName}?`}
                  groupValue={
                    ageOfAdoptedPet == "Cachorro"
                      ? (values.ageOfAdoptedPet = "Cachorro")
                      : ageOfAdoptedPet == "Adolescente"
                      ? (values.ageOfAdoptedPet = "Adolescente")
                      : ageOfAdoptedPet == "Adulto"
                      ? (values.ageOfAdoptedPet = "Adulto")
                      : (values.ageOfAdoptedPet = "Senior")
                  }
                  onChange={(nextValue) => {
                    setAgeOfAdoptedPet(nextValue);
                  }}
                  firstRadioLabel="Cachorro (2 a 6 meses)"
                  firstValue="Cachorro"
                  secondRadioLabel="Adolescente (6 a 12 meses)"
                  secondValue="Adolescente"
                  thirdRadioLabel="Adulto (De 1 año a 7 años)"
                  thirdValue="Adulto"
                  fourthRadioLabel="Senior (7 o más años)"
                  fourthValue="Senior"
                  isThird={true}
                  isFourth={true}
                />
                {errors.ageOfAdoptedPet && touched.ageOfAdoptedPet ? (
                  <Text fontSize={"13px"} color={"#BC4749"}>
                    {errors.ageOfAdoptedPet}
                  </Text>
                ) : undefined}
                <Pressable
                  onPress={handleSubmit}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderRadius={"5px"}
                  height={"60px"}
                  width={screenWidth - 30}
                  mt={8}
                  mb={"12px"}
                  backgroundColor={"#6A994E"}
                >
                  <Text fontSize={"18px"} color="white" fontWeight={"medium"}>
                    Siguiente
                  </Text>
                </Pressable>
              </KeyboardAvoidingView>
            </VStack>
          )}
        </Formik>
      </VStack>
    </View>
  );
};

export default AdoptedCuestionary;
