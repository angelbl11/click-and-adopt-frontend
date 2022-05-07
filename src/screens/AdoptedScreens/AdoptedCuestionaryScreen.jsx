import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";

//Formik
import { Formik } from "formik";

//Queries
import { ADOPTED_CUESTIONARY } from "../../graphql/client";
import { useMutation } from "@apollo/client";

//Native Base Components
import { NativeBaseProvider, View } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

//Components
import RadioInput from "../../components/RadioInput";

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

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
} from "../../components/Styles";

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

const AdoptedCuestionary = ({ navigation, route }) => {
  const [typeOfAdoptedPet, setTypeOfAdoptedPet] = useState("Perro");
  const [genderOfAdoptedPet, setGenderOfAdoptedPet] = useState("Macho");
  const [ageOfAdoptedPet, setAgeOfAdoptedPet] = useState("Cachorro");

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
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                navigation.navigate("AdoptedPetInfo", {
                  petName: values.adoptedPetName,
                  typeOfAdoptedPet: values.typeOfAdoptedPet,
                  genderOfAdoptedPet: values.genderOfAdoptedPet,
                  ageOfAdoptedPet: values.ageOfAdoptedPet,
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
                <StyledFormArea>
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
                    firstValue="Perro"
                    secondRadioLabel="Gato"
                    secondValue="Gato"
                  />
                  {errors.typeOfAdoptedPet && touched.typeOfAdoptedPet ? (
                    <StyledInputLabel validation={true}>
                      {errors.typeOfAdoptedPet}
                    </StyledInputLabel>
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
                    <StyledInputLabel validation={true}>
                      {errors.genderOfAdoptedPet}
                    </StyledInputLabel>
                  ) : undefined}
                  <TextInput
                    label="¿Cuál es el nombre de tu mascota?"
                    isDog={typeOfAdoptedPet == "Perro" ? true : false}
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