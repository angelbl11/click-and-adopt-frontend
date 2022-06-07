import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";

//Formik
import { Formik } from "formik";

//Components
import RadioInput from "../../components/Inputs/RadioInput";
import CheckBoxInput from "../../components/Inputs/CheckBoxInput";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Colors,
  StyledInputLabel,
} from "../../components/Utils/Styles";

//Queries
import { ADOPTER_CUESTIONARY } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";

//Colors
const { brand, darkLight } = Colors;

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../../components/Utils/KeyboardAvoidingWrapper";
import { Spinner } from "native-base";

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
                onError: (err) => {
                  console.log("Network Error");
                },

                onCompleted: () => {
                  console.log("OK");
                  console.log(variables);
                },
              });

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
                  firstValue="Chico"
                  firstCheckBoxLabel="Chico (ej. Pug o Chihuahua)"
                  secondValue="Mediano"
                  secondCheckBoxLabel="Mediano (ej. Beagle o Shnauzer)"
                  thirdValue="Grande"
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
                  firstValue="Cachorro"
                  firstCheckBoxLabel="Cachorro (2 a 6 meses)"
                  secondValue="Adolescente"
                  secondCheckBoxLabel="Adolescente (6 a 12 meses)"
                  thirdValue="Adulto"
                  thirdCheckBoxLabel="Adulto (De 1 año a 7 años)"
                  fourthValue="Senior"
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
                  firstValue="Macho"
                  firstCheckBoxLabel="Macho"
                  secondValue="Hembra"
                  secondCheckBoxLabel="Hembra"
                />
                {errors.petGenderPreferences && touched.petGenderPreferences ? (
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
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>
                    {loading ? <Spinner color={"#FFFFFF"} /> : "Siguiente"}
                  </ButtonText>
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

export default AdopterPreferencesCuestionary;
