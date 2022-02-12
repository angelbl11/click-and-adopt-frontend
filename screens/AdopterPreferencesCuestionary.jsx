import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//Formik
import { Formik, yupToFormErrors } from "formik";

//Components
import RadioInput from "../components/RadioInput";
import CheckBoxInput from "../components/CheckBoxInput";
import ThreeOptionsRadioInput from "../components/ThreeOptionsRadioInput";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Colors,
  Separation,
  StyledInputLabel,
} from "./../components/Styles";

//Colors
const { brand, darkLight } = Colors;

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { NativeBaseProvider } from "native-base";

//Yup
import * as Yup from "yup";

//Form fields validation
const AdopterPreferencesCuestionarySchema = Yup.object().shape({
  petSizePreferences: Yup.array().min(1, "Debes elegir al menos una opción"),
  petAgePreferences: Yup.array().min(1, "Debes elegir al menos una opción"),
  petGenderPreferences: Yup.array().min(1, "Debes elegir al menos una opción"),
});

const AdopterPreferencesCuestionary = ({ navigation }) => {
  const [groupSizeValues, setGroupSizeValues] = useState([]);
  const [groupAgeValues, setGroupAgeValues] = useState([]);
  const [groupGenderValues, setGroupGenderValues] = useState([]);
  const [isAgree, setIsAgree] = useState(true);
  return (
    <NativeBaseProvider>
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageTitle>Cuestionario sobre preferencias de mascotas.</PageTitle>
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
                console.log(values);
                navigation.navigate("AdopterProfile");
              }}
            >
              {({ handleSubmit, values, errors, touched }) => (
                <StyledFormArea>
                  <CheckBoxInput
                    isThird={true}
                    label="¿Qué talla o tamaño prefieres para tu mascota?"
                    groupValue={
                      groupSizeValues
                        ? (values.petSizePreferences = [...groupSizeValues])
                        : undefined
                    }
                    onChange={setGroupSizeValues}
                    firstValue="small"
                    firstCheckBoxLabel="Chico (ej. Pug o Chihuahua)"
                    secondValue={"medium"}
                    secondCheckBoxLabel="Mediano (ej. Beagle o Shnauzer)"
                    thirdValue="big"
                    thirdCheckBoxLabel="Grande (ej. Husky o Samoyedo)"
                  />
                  {errors.petSizePreferences && touched.petSizePreferences ? (
                    <StyledInputLabel validation={true}>
                      {errors.petSizePreferences}
                    </StyledInputLabel>
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
                    firstValue="puppy"
                    firstCheckBoxLabel="Cachorro (2 a 6 meses)"
                    secondValue="teenager"
                    secondCheckBoxLabel="Adolescente (6 a 12 meses)"
                    thirdValue="adult"
                    thirdCheckBoxLabel="Adulto (De 1 año a 7 años)"
                    fourthValue="senior"
                    fourthCheckBoxLabel="Senior (7 o más años)"
                  />
                  {errors.petAgePreferences && touched.petAgePreferences ? (
                    <StyledInputLabel validation={true}>
                      {errors.petAgePreferences}
                    </StyledInputLabel>
                  ) : undefined}
                  <CheckBoxInput
                    label="¿Qué sexo prefieres para tu mascota?"
                    groupValue={
                      groupGenderValues
                        ? (values.petGenderPreferences = [...groupGenderValues])
                        : undefined
                    }
                    onChange={setGroupGenderValues}
                    firstValue="male"
                    firstCheckBoxLabel="Macho"
                    secondValue="female"
                    secondCheckBoxLabel="Hembra"
                  />
                  {errors.petGenderPreferences &&
                  touched.petGenderPreferences ? (
                    <StyledInputLabel validation={true}>
                      {errors.petGenderPreferences}
                    </StyledInputLabel>
                  ) : undefined}
                  <RadioInput
                    label="¿Tienes inconvenientes con el protocolo de la mascota? 
                    (Un protocolo es si cuenta con vacunas, desparasitación,esterilización y otro tipo de tratamientos)."
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
                  <Separation></Separation>
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

export default AdopterPreferencesCuestionary;
