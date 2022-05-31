import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//Formik
import { Formik } from "formik";

//Native Base Components
import { Checkbox, View } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

//Components
import RadioInput from "../../components/RadioInput";
import CheckBoxInput from "../../components/CheckBoxInput";
import ThreeOptionsRadioInput from "../../components/ThreeOptionsRadioInput";

//Yup
import * as Yup from "yup";

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
} from "../../components/Styles";

//Colors
const { brand } = Colors;

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

//Form fields validation
const AdopterCuestionarySchema = Yup.object().shape({
  reasonsToAdopt: Yup.string()
    .min(20, "Demasiado corto")
    .max(250, "Demasiado largo")
    .required("Completa este campo"),
  petPreferences: Yup.array().min(1, "Debes seleccionar al menos una opción"),
  haveDog: Yup.boolean(),
  numberOfDogs: Yup.number("Ingresa un valor númerico").when("haveDog", {
    is: true,
    then: Yup.number()
      .positive("Introduce un número válido")
      .integer("Introduce un número válido")
      .min(1, "Debes tener al menos un perro")
      .max(10, "Demasiados perros")
      .required("Ingresa el número de perros que tienes"),
  }),
  haveCat: Yup.boolean(),
  numberOfCats: Yup.number().when("haveCat", {
    is: true,
    then: Yup.number()
      .positive("Introduce un número válido")
      .integer("Introduce un número válido")
      .min(1, "Debes tener al menos un gato")
      .max(10, "Demasiados gatos")
      .required("Ingresa el número de gatos que tienes"),
  }),
  hadPetsDate: Yup.string(),
  numberOfDays: Yup.number().when("hadPetsDate", {
    is: "days",
    then: Yup.number()
      .integer()
      .positive()
      .min(1, "Debe ser al menos un día")
      .max(29, "Demasiados días, elige otra opción")
      .required("Ingresa el número de días"),
    otherwise: Yup.number(),
  }),
  numberOfMonths: Yup.number().when("hadPetsDate", {
    is: "months",
    then: Yup.number()
      .integer()
      .positive()
      .min(1, "Debe ser al menos un mes")
      .max(11, "Demasiados meses, elige otra opción")
      .required("Ingresa el número de meses"),
    otherwise: Yup.number(),
  }),
  numberOfYears: Yup.number().when("hadPetsDate", {
    is: "years",
    then: Yup.number()
      .integer()
      .positive()
      .min(1, "Debe ser al menos un año")
      .max(4, "Ha pasado demasiado tiempo, límite superado")
      .required("Ingresa el número de años"),
    otherwise: Yup.number(),
  }),
});

const AdopterCuestionary = ({ navigation }) => {
  const [groupValues, setGroupValues] = useState([]);
  const [haveDog, setHaveDog] = useState(false);
  const [haveCat, setHaveCat] = useState(false);
  const [value, setValue] = useState(true);
  const [hadPets, setHadPets] = useState(false);
  const [hadPetsValue, setHadPetsValue] = useState("dog");
  const [hadPetsDate, setHadPetsDate] = useState("days");
  const [haveChildren, setHaveChildren] = useState(true);

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>
            Cuestionario de seguridad y responsabilidad del adoptante
          </PageTitle>
          <Formik
            initialValues={{
              reasonsToAdopt: "",
              petPreferences: [],
              havePets: true,
              hadPets: false,
              hadPetsValue: "",
              hadPetsDate: "",
              numberOfDogs: "",
              numberOfCats: "",
              isChildren: true,
              isRequireToValidateDog: false,
              isRequireToValidateCat: false,
              numberOfDays: "",
              numberOfYears: "",
              numberOfMonths: "",
              haveDog: false,
              haveCat: false,
            }}
            validationSchema={AdopterCuestionarySchema}
            validateOnChange={(values) => {
              values.petPreferences = [...groupValues];
            }}
            onSubmit={async (values, { resetForm }) => {
              await values.petPreferences;
              values.petPreferences = [...groupValues];
              console.log(values);
              navigation.navigate("AdopterPreferencesCuestionary", {
                reasonsToAdopt: values.reasonsToAdopt,
                petPreferences: values.petPreferences,
                havePets: values.havePets,
                hadPets: values.hadPets,
                hadPetsValue: values.hadPetsValue,
                hadPetsDate: values.hadPetsDate,
                numberOfDogs: values.numberOfDogs,
                numberOfCats: values.numberOfCats,
                haveChildren: values.isChildren,
                numberOfDays: values.numberOfDays,
                numberOfMonths: values.numberOfMonths,
                numberOfYears: values.numberOfYears,
                haveDog: values.haveDog,
                haveCat: values.haveCat,
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
                <SubTitle cuestionary={true}>
                  Escribe brevemente, ¿Por qué te gustaría adoptar una mascota?
                </SubTitle>
                <StyledTextArea
                  onChangeText={handleChange("reasonsToAdopt")}
                  onBlur={handleBlur("reasonsToAdopt")}
                  value={values.reasonsToAdopt}
                  isInvalid={errors.reasonsToAdopt}
                ></StyledTextArea>
                {errors.reasonsToAdopt && touched.reasonsToAdopt ? (
                  <StyledInputLabel validation={true}>
                    {errors.reasonsToAdopt}
                  </StyledInputLabel>
                ) : undefined}
                <CheckBoxInput
                  label="¿Qué tipo de mascota buscas?"
                  groupValue={
                    groupValues
                      ? (values.petPreferences = [...groupValues])
                      : undefined
                  }
                  onChange={setGroupValues}
                  firstValue="Perros"
                  firstCheckBoxLabel="Perros"
                  secondValue="Gatos"
                  secondCheckBoxLabel="Gatos"
                />
                {errors.petPreferences && touched.petPreferences ? (
                  <StyledInputLabel validation={true}>
                    {errors.petPreferences}
                  </StyledInputLabel>
                ) : undefined}
                <RadioInput
                  label="En el lugar donde vivirá tu futura mascota, ¿Viven niños menores de edad?"
                  groupValue={
                    haveChildren == true
                      ? (values.isChildren = true)
                      : (values.isChildren = false)
                  }
                  onChange={(nextValue) => {
                    setHaveChildren(nextValue);
                  }}
                  firstRadioLabel="Sí"
                  firstValue={true}
                  secondRadioLabel="No"
                  secondValue={false}
                />

                <RadioInput
                  label="¿Actualmente, tienes mascotas viviendo contigo?"
                  groupValue={
                    value == true
                      ? (values.havePets = true)
                      : (values.havePets = false)
                  }
                  onChange={(nextValue) => {
                    setValue(nextValue);
                  }}
                  firstRadioLabel="Sí"
                  firstValue={true}
                  secondRadioLabel="No"
                  secondValue={false}
                />
                {values.havePets == true ? (
                  <View>
                    <View>
                      <SubTitle cuestionary={true}>
                        ¿Qué tipo de mascota es?
                      </SubTitle>
                      <Checkbox
                        colorScheme="green"
                        value={
                          haveDog === true
                            ? (values.haveDog = true)
                            : (values.haveDog = false)
                        }
                        isChecked={haveDog}
                        onPress={() => {
                          setHaveDog(!haveDog);
                          values.numberOfDogs = null;
                        }}
                      >
                        Perro
                      </Checkbox>
                      <Checkbox
                        colorScheme="green"
                        value={
                          haveCat === true
                            ? (values.haveCat = true)
                            : (values.haveCat = false)
                        }
                        isChecked={haveCat}
                        onPress={() => {
                          setHaveCat(!haveCat);
                          values.numberOfCats = null;
                        }}
                      >
                        Gato
                      </Checkbox>
                    </View>
                    {haveDog == true ? (
                      <View>
                        <TextInput
                          label="Número de perros que tienes:"
                          icon="dog"
                          onChangeText={handleChange("numberOfDogs")}
                          onBlur={handleBlur("numberOfDogs")}
                          value={values.numberOfDogs}
                          keyboardType="number-pad"
                          isInvalid={errors.numberOfDogs}
                          isBooleanDog={(values.isRequireToValidateDog = true)}
                          isBooleanCat={(values.isRequireToValidateCat = false)}
                        />
                        {errors.numberOfDogs && touched.numberOfDogs ? (
                          <StyledInputLabel validation={true}>
                            {errors.numberOfDogs}
                          </StyledInputLabel>
                        ) : undefined}
                      </View>
                    ) : undefined}

                    {haveCat == true ? (
                      <View>
                        <TextInput
                          label="Número de gatos que tienes:"
                          icon="cat"
                          onChangeText={handleChange("numberOfCats")}
                          onBlur={handleBlur("numberOfCats")}
                          value={values.numberOfCats}
                          keyboardType="number-pad"
                          isInvalid={errors.numberOfCats}
                          isBooleanCat={(values.isRequireToValidateCat = true)}
                          isBooleanDog={(values.isRequireToValidateDog = false)}
                        />
                        {errors.numberOfCats && touched.numberOfCats ? (
                          <StyledInputLabel validation={true}>
                            {errors.numberOfCats}
                          </StyledInputLabel>
                        ) : undefined}
                      </View>
                    ) : undefined}
                  </View>
                ) : (
                  <View>
                    <RadioInput
                      label="¿Has tenido mascotas antes? Llena las siguientes preguntas con la más actual"
                      groupValue={
                        hadPets == true
                          ? (values.hadPets = true)
                          : (values.hadPets = false)
                      }
                      onChange={(nextValue) => {
                        setHadPets(nextValue);
                      }}
                      firstRadioLabel="Sí"
                      firstValue={true}
                      secondRadioLabel="No"
                      secondValue={false}
                    />
                    {hadPets == true ? (
                      <View>
                        <RadioInput
                          label="¿Qué tipo de mascota era?"
                          groupValue={
                            hadPetsValue == "Perro"
                              ? (values.hadPetsValue = "Perro")
                              : (values.hadPetsValue = "Gato")
                          }
                          onChange={(nextValue) => {
                            setHadPetsValue(nextValue);
                          }}
                          firstRadioLabel="Perro"
                          firstValue="Perro"
                          secondRadioLabel="Gato"
                          secondValue="Gato"
                        />
                        <ThreeOptionsRadioInput
                          label="¿Hace cuánto tiempo fue esto?"
                          groupValue={
                            hadPetsDate == "Días"
                              ? (values.hadPetsDate = "Días")
                              : hadPetsDate == "Meses"
                              ? (values.hadPetsDate = "Meses")
                              : (values.hadPetsDate = "Años")
                          }
                          onChange={(nextValue) => {
                            setHadPetsDate(nextValue);
                          }}
                          firstRadioLabel="Días"
                          firstValue="Días"
                          secondRadioLabel="Meses"
                          secondValue="Meses"
                          thirdRadioLabel="Años"
                          thirdValue="Años"
                          keyboardType="number-pad"
                        />
                        {hadPetsDate == "Días" ? (
                          <View>
                            <TextInput
                              label="Introduce el numero de días"
                              icon="calendar-alt"
                              keyboardType="number-pad"
                              onChangeText={handleChange("numberOfDays")}
                              onBlur={handleBlur("numberOfDays")}
                              value={values.numberOfDays}
                              isInvalid={errors.numberOfDays}
                            ></TextInput>
                            {errors.numberOfDays && touched.numberOfDays ? (
                              <StyledInputLabel validation={true}>
                                {errors.numberOfDays}
                              </StyledInputLabel>
                            ) : undefined}
                          </View>
                        ) : hadPetsDate == "Meses" ? (
                          <View>
                            <TextInput
                              label="Introduce el numero de meses"
                              icon="calendar-alt"
                              keyboardType="number-pad"
                              onChangeText={handleChange("numberOfMonths")}
                              onBlur={handleBlur("numberOfMonths")}
                              value={values.numberOfMonths}
                            ></TextInput>
                            {errors.numberOfMonths && touched.numberOfMonths ? (
                              <StyledInputLabel validation={true}>
                                {errors.numberOfMonths}
                              </StyledInputLabel>
                            ) : undefined}
                          </View>
                        ) : (
                          <View>
                            <TextInput
                              label="Introduce el numero de años"
                              icon="calendar-alt"
                              keyboardType="number-pad"
                              onChangeText={handleChange("numberOfYears")}
                              onBlur={handleBlur("numberOfYears")}
                              value={values.numberOfYears}
                            ></TextInput>
                            {errors.numberOfYears && touched.numberOfYears ? (
                              <StyledInputLabel validation={true}>
                                {errors.numberOfYears}
                              </StyledInputLabel>
                            ) : undefined}
                          </View>
                        )}
                      </View>
                    ) : undefined}
                  </View>
                )}
                <Separation />
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Siguiente</ButtonText>
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const TextInput = ({
  label,
  icon,
  isInvalid,
  isBooleanDog,
  isBooleanCat,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <FontAwesome5 name={icon} size={30} color={brand}></FontAwesome5>
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput
        {...props}
        isInvalid={isInvalid}
        isBooleanDog={isBooleanDog}
        isBooleanCat={isBooleanCat}
      ></StyledTextInput>
    </View>
  );
};

export default AdopterCuestionary;
