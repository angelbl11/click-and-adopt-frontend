import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//Formik
import { Formik } from "formik";

//Native Base Components
import { NativeBaseProvider, View } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

//Components
import RadioInput from "../components/RadioInput";

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

//Yup
import * as Yup from "yup";

//Colors
const { brand, darkLight } = Colors;

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledTextInput,
  StyledTextArea,
  StyledInputLabel,
  LeftIcon,
  StyledButton,
  ButtonText,
  Colors,
  Separation,
} from "./../components/Styles";

const AdoptedCuestionarySchema = Yup.object().shape({
  typeOfAdoptedPet: Yup.string().required("Debes seleccionar una opción"),
  genderOfAdoptedPet: Yup.string().required("Debes seleccionar una opción"),
  adoptedPetName: Yup.string()
    .required(
      "Debes introducir el nombre de la mascota o asignarle uno temporal"
    )
    .matches(/^[ñíóáéúÁÉÍÓÚÑ a-zA-Z]+$/, "Introduce únicamente letras "),
  ageOfAdoptedPet: Yup.string().required(
    "Debes seleccionar la edad de la mascota"
  ),
});

const AdoptedCuestionary = ({ navigation }) => {
  const [typeOfAdoptedPet, setTypeOfAdoptedPet] = useState("dog");
  const [genderOfAdoptedPet, setGenderOfAdoptedPet] = useState("male");
  const [ageOfAdoptedPet, setAgeOfAdoptedPet] = useState("puppy");
  return (
    <NativeBaseProvider>
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageTitle>Cuestionario sobre mascota</PageTitle>
            <Formik
              initialValues={{
                typeOfAdoptedPet: "",
                genderOfAdoptedPet: "",
                adoptedPetName: "",
                ageOfAdoptedPet: "",
              }}
              validationSchema={AdoptedCuestionarySchema}
              onSubmit={(values) => {
                console.log(values);
                navigation.navigate("AdoptedPetInfo", {
                  petName: values.adoptedPetName,
                });
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
                <StyledFormArea>
                  <RadioInput
                    label="¿Qué tipo de mascota es la que darás en adopción?"
                    groupValue={
                      typeOfAdoptedPet == "dog"
                        ? (values.typeOfAdoptedPet = "dog")
                        : (values.typeOfAdoptedPet = "cat")
                    }
                    onChange={(nextValue) => {
                      setTypeOfAdoptedPet(nextValue);
                    }}
                    firstRadioLabel="Perro"
                    firstValue="dog"
                    secondRadioLabel="Gato"
                    secondValue="cat"
                  />
                  {errors.typeOfAdoptedPet && touched.typeOfAdoptedPet ? (
                    <StyledInputLabel validation={true}>
                      {errors.typeOfAdoptedPet}
                    </StyledInputLabel>
                  ) : undefined}
                  <RadioInput
                    label="¿Cuál es el sexo de tu mascota?"
                    groupValue={
                      genderOfAdoptedPet == "male"
                        ? (values.genderOfAdoptedPet = "male")
                        : (values.genderOfAdoptedPet = "female")
                    }
                    onChange={(nextValue) => {
                      setGenderOfAdoptedPet(nextValue);
                    }}
                    firstRadioLabel="Macho"
                    firstValue="male"
                    secondRadioLabel="Hembra"
                    secondValue="female"
                  />
                  {errors.genderOfAdoptedPet && touched.genderOfAdoptedPet ? (
                    <StyledInputLabel validation={true}>
                      {errors.genderOfAdoptedPet}
                    </StyledInputLabel>
                  ) : undefined}
                  <TextInput
                    label="¿Cuál es el nombre de tu mascota?"
                    isDog={typeOfAdoptedPet == "dog" ? true : false}
                    onChangeText={handleChange("adoptedPetName")}
                    onBlur={handleBlur("adoptedPetName")}
                    value={values.adoptedPetName}
                  />
                  {errors.adoptedPetName && touched.adoptedPetName ? (
                    <StyledInputLabel validation={true}>
                      {errors.adoptedPetName}
                    </StyledInputLabel>
                  ) : undefined}
                  <RadioInput
                    label={`¿En qué rango de edad se encuentra ${values.adoptedPetName}?`}
                    groupValue={
                      ageOfAdoptedPet == "puppy"
                        ? (values.ageOfAdoptedPet = "puppy")
                        : ageOfAdoptedPet == "teenager"
                        ? (values.ageOfAdoptedPet = "teenager")
                        : ageOfAdoptedPet == "adult"
                        ? (values.ageOfAdoptedPet = "adult")
                        : (values.ageOfAdoptedPet = "senior")
                    }
                    onChange={(nextValue) => {
                      setAgeOfAdoptedPet(nextValue);
                    }}
                    firstRadioLabel="Cachorro (2 a 6 meses)"
                    firstValue="puppy"
                    secondRadioLabel="Adolescente (6 a 12 meses)"
                    secondValue="teenager"
                    thirdRadioLabel="Adulto (De 1 año a 7 años)"
                    thirdValue="adult"
                    fourthRadioLabel="Senior (7 o más años)"
                    fourthValue="senior"
                    isThird={true}
                    isFourth={true}
                  />
                  {errors.ageOfAdoptedPet && touched.ageOfAdoptedPet ? (
                    <StyledInputLabel validation={true}>
                      {errors.ageOfAdoptedPet}
                    </StyledInputLabel>
                  ) : undefined}
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Siguiente</ButtonText>
                  </StyledButton>
                </StyledFormArea>
              )}
            </Formik>
          </InnerContainer>
        </StyledContainer>
      </KeyboardAvoidingWrapper>
    </NativeBaseProvider>
  );
};

const TextInput = ({ label, icon, isInvalid, isDog, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <FontAwesome5
          name={isDog == true ? "dog" : "cat"}
          size={30}
          color={brand}
        ></FontAwesome5>
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} isInvalid={isInvalid}></StyledTextInput>
    </View>
  );
};

export default AdoptedCuestionary;
