import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//Formik
import { Formik } from "formik";

//Native Base Components
import { NativeBaseProvider, View } from "native-base";

//Components
import RadioInput from "../../components/RadioInput";
import CheckBoxInput from "../../components/CheckBoxInput";

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

//Yup
import * as Yup from "yup";

//Queries
import { ADOPTED_CUESTIONARY } from "../../graphql/client";
import { useMutation } from "@apollo/client";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledTextArea,
  StyledButton,
  ButtonText,
  StyledInputLabel,
} from "../../components/Styles";

const AdoptedPetInfoSchema = Yup.object().shape({
  adoptedPetDescription: Yup.string()
    .min(20, "Demasiado corto")
    .max(250, "Demasiado largo")
    .required("Completa este campo"),
  isHealthyWithKids: Yup.boolean().required("Elige una opción"),
  isHealthyWithOtherPets: Yup.boolean().required("Elige una opción"),
  coexistenceWithOtherPets: Yup.array().when("isHealthyWithOtherPets", {
    is: true,
    then: Yup.array().min(1, "Debes seleccionar al menos una opción"),
  }),
  adoptedPetProtocol: Yup.string().required("Elige una opción"),
});

const AdoptedPetInfo = ({ navigation, route }) => {
  const [isHealthyWithKids, setIsHealthyWithKids] = useState(true);
  const [isHealthyWithOtherPets, setIsHealthyWithOtherPets] = useState(true);
  const [coexistenceWithOtherPets, setCoexistenceWithOtherPets] = useState([]);
  const [adoptedPetProtocol, setAdoptedPetProtocol] = useState("full");
  const [createAdoptedUser] = useMutation(ADOPTED_CUESTIONARY);
  const { petName } = route.params;
  return (
    <NativeBaseProvider>
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageTitle>Cuestionario sobre mascota</PageTitle>
            <Formik
              initialValues={{
                adoptedPetDescription: "",
                isHealthyWithKids: true,
                isHealthyWithOtherPets: true,
                coexistenceWithOtherPets: [],
                adoptedPetProtocol: "",
              }}
              validationSchema={AdoptedPetInfoSchema}
              onSubmit={async (values) => {
                await values.coexistenceWithOtherPets;
                values.coexistenceWithOtherPets = [...coexistenceWithOtherPets];
                console.log(values);
                createAdoptedUser({
                  variables: {
                    adoptedPetDescription: values.adoptedPetDescription,
                    isHealthyWithKids: values.isHealthyWithKids,
                    isHealthyWithOtherPets: values.isHealthyWithOtherPets,
                    coexistenceWithOtherPets: values.coexistenceWithOtherPets,
                    adoptedPetProtocol: values.adoptedPetProtocol,
                  },
                  onError: (err) => {
                    console.log("Network Error");
                    console.log(err.networkError.result);
                  },

                  onCompleted: () => {
                    console.log("OK");
                  },
                });
                navigation.navigate("AdoptedProfile");
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
                  <SubTitle cuestionary={true}>
                    Cuéntanos un poco sobre {petName}
                  </SubTitle>
                  <StyledTextArea
                    onChangeText={handleChange("adoptedPetDescription")}
                    onBlur={handleBlur("adoptedPetDescription")}
                    value={values.adoptedPetDescription}
                    isInvalid={errors.adoptedPetDescription}
                  ></StyledTextArea>
                  {errors.adoptedPetDescription &&
                  touched.adoptedPetDescription ? (
                    <StyledInputLabel validation={true}>
                      {errors.adoptedPetDescription}
                    </StyledInputLabel>
                  ) : undefined}
                  <RadioInput
                    label={`${petName} convive o ha convivido saludablemente con niños?`}
                    groupValue={
                      isHealthyWithKids == true
                        ? (values.isHealthyWithKids = true)
                        : (values.isHealthyWithKids = false)
                    }
                    onChange={(nextValue) => {
                      setIsHealthyWithKids(nextValue);
                    }}
                    firstRadioLabel="Sí"
                    firstValue={true}
                    secondRadioLabel="No"
                    secondValue={false}
                  />
                  {errors.isHealthyWithKids && touched.isHealthyWithKids ? (
                    <StyledInputLabel validation={true}>
                      {errors.isHealthyWithKids}
                    </StyledInputLabel>
                  ) : undefined}
                  <RadioInput
                    label={`¿${petName} convive o ha convivido saludablemente con otros animales?`}
                    groupValue={
                      isHealthyWithOtherPets == true
                        ? (values.isHealthyWithOtherPets = true)
                        : (values.isHealthyWithOtherPets = false)
                    }
                    onChange={(nextValue) => {
                      setIsHealthyWithOtherPets(nextValue);
                    }}
                    firstRadioLabel="Sí"
                    firstValue={true}
                    secondRadioLabel="No"
                    secondValue={false}
                  />
                  {errors.isHealthyWithOtherPets &&
                  touched.isHealthyWithOtherPets ? (
                    <StyledInputLabel validation={true}>
                      {errors.isHealthyWithOtherPets}
                    </StyledInputLabel>
                  ) : undefined}
                  {isHealthyWithOtherPets == true ? (
                    <View>
                      <CheckBoxInput
                        label="¿Con qué tipo de animal?"
                        groupValue={
                          coexistenceWithOtherPets
                            ? (values.coexistenceWithOtherPets = [
                                ...coexistenceWithOtherPets,
                              ])
                            : undefined
                        }
                        onChange={setCoexistenceWithOtherPets}
                        firstValue="dogs"
                        firstCheckBoxLabel="Perros"
                        secondValue="cats"
                        secondCheckBoxLabel="Gatos"
                      />
                      {errors.coexistenceWithOtherPets &&
                      touched.coexistenceWithOtherPets ? (
                        <StyledInputLabel validation={true}>
                          {errors.coexistenceWithOtherPets}
                        </StyledInputLabel>
                      ) : undefined}
                    </View>
                  ) : undefined}
                  <RadioInput
                    label={`Indica el tipo de protocolo con el que cuenta ${petName} (deberás corroborarlo posteriormente)`}
                    groupValue={
                      adoptedPetProtocol == "full"
                        ? (values.adoptedPetProtocol = "full")
                        : adoptedPetProtocol == "incomplete"
                        ? (values.adoptedPetProtocol = "incomplete")
                        : (values.adoptedPetProtocol = "null")
                    }
                    onChange={(nextValue) => {
                      setAdoptedPetProtocol(nextValue);
                    }}
                    isThird={true}
                    firstRadioLabel="Completo"
                    firstValue="full"
                    secondRadioLabel="Incompleto"
                    secondValue="incomplete"
                    thirdRadioLabel="No tiene"
                    thirdValue="null"
                  />
                  {errors.adoptedPetProtocol && touched.adoptedPetProtocol ? (
                    <StyledInputLabel validation={true}>
                      {errors.adoptedPetProtocol}
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

export default AdoptedPetInfo;
