import React, { useState } from "react";
import { Dimensions, SafeAreaView } from "react-native";

//Libraries
import {
  Checkbox,
  View,
  Text,
  VStack,
  Heading,
  TextArea,
  Icon,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
} from "native-base";
import { Formik } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Yup from "yup";

//Custom Components
import RadioInput from "../../components/Inputs/RadioInput";
import CheckBoxInput from "../../components/Inputs/CheckBoxInput";
import CustomTextInput from "../../components/Inputs/CustomTextInput";

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
    then: Yup.number("Ingresa un valor númerico")
      .positive("Introduce un número válido")
      .integer("Introduce un número válido")
      .min(1, "Debes tener al menos un perro")
      .max(10, "Demasiados perros")
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
  }),
  haveCat: Yup.boolean(),
  numberOfCats: Yup.number().when("haveCat", {
    is: true,
    then: Yup.number()
      .positive("Introduce un número válido")
      .integer("Introduce un número válido")
      .min(1, "Debes tener al menos un gato")
      .max(10, "Demasiados gatos")
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
  }),
  hadPetsDate: Yup.string(),
  numberOfDays: Yup.number().when("hadPetsDate", {
    is: "days",
    then: Yup.number()
      .integer()
      .positive()
      .min(1, "Debe ser al menos un día")
      .max(29, "Demasiados días, elige otra opción")
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
  }),
  numberOfMonths: Yup.number().when("hadPetsDate", {
    is: "months",
    then: Yup.number()
      .integer()
      .positive()
      .min(1, "Debe ser al menos un mes")
      .max(11, "Demasiados meses, elige otra opción")
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
  }),
  numberOfYears: Yup.number().when("hadPetsDate", {
    is: "years",
    then: Yup.number()
      .integer()
      .positive()
      .min(1, "Debe ser al menos un año")
      .max(4, "Ha pasado demasiado tiempo, límite superado")
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
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
  //Variables for screensize
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView flex={1}>
      <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
        <StatusBar style="dark" />
        <ScrollView>
          <VStack alignItems={"center"} bgColor="#FFFFFF">
            <Heading
              fontSize={"26px"}
              textAlign={"center"}
              fontWeight="bold"
              color="#6A994E"
              marginBottom={"15px"}
            >
              Cuestionario de seguridad y responsabilidad del adoptante
            </Heading>
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
                <VStack width={screenWidth - 30} space={"8px"} marginTop={2}>
                  <KeyboardAvoidingView
                    height={"auto"}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                  >
                    <Text
                      fontSize={"16px"}
                      fontWeight={"semibold"}
                      color={"#1F2937"}
                      textAlign={"left"}
                      mb={2}
                    >
                      Escribe brevemente, ¿Por qué te gustaría adoptar una
                      mascota?
                    </Text>
                    <TextArea
                      bg={"#E5E7EB"}
                      color={"#1F2937"}
                      fontSize={"13px"}
                      onChangeText={handleChange("reasonsToAdopt")}
                      onBlur={handleBlur("reasonsToAdopt")}
                      value={values.reasonsToAdopt}
                      isInvalid={errors.reasonsToAdopt}
                    />
                    {errors.reasonsToAdopt && touched.reasonsToAdopt ? (
                      <Text fontSize={"13px"} color={"#BC4749"}>
                        {errors.reasonsToAdopt}
                      </Text>
                    ) : undefined}
                    <CheckBoxInput
                      label="¿Qué tipo de mascota buscas?"
                      groupValue={
                        groupValues
                          ? (values.petPreferences = [...groupValues])
                          : undefined
                      }
                      onChange={setGroupValues}
                      firstValue="Perro"
                      firstCheckBoxLabel="Perros"
                      secondValue="Gato"
                      secondCheckBoxLabel="Gatos"
                    />
                    {errors.petPreferences && touched.petPreferences ? (
                      <Text fontSize={"13px"} color={"#BC4749"}>
                        {errors.petPreferences}
                      </Text>
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
                      <>
                        <Text
                          fontSize={"16px"}
                          fontWeight={"semibold"}
                          color={"#1F2937"}
                          textAlign={"left"}
                          mb={2}
                          mt={2}
                        >
                          ¿Qué tipo de mascota es?
                        </Text>

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
                        {haveDog == true ? (
                          <>
                            <CustomTextInput
                              placeholder="Número de perros que tienes"
                              onChangeText={handleChange("numberOfDogs")}
                              onBlur={handleBlur("numberOfDogs")}
                              value={values.numberOfDogs}
                              keyboardType="number-pad"
                              isInvalid={errors.numberOfDogs}
                              mt={4}
                              InputLeftElement={
                                <Icon
                                  as={<MaterialCommunityIcons name="dog" />}
                                  size="25px"
                                  color="#6A994E"
                                  ml={"17px"}
                                  mr={"3px"}
                                />
                              }
                            />
                            {errors.numberOfDogs && touched.numberOfDogs ? (
                              <Text fontSize={"13px"} color={"#BC4749"}>
                                {errors.numberOfDogs}
                              </Text>
                            ) : undefined}
                          </>
                        ) : undefined}

                        {haveCat == true ? (
                          <>
                            <CustomTextInput
                              placeholder="Número de gatos que tienes"
                              onChangeText={handleChange("numberOfCats")}
                              onBlur={handleBlur("numberOfCats")}
                              value={values.numberOfCats}
                              keyboardType="number-pad"
                              isInvalid={errors.numberOfCats}
                              mt={4}
                              InputLeftElement={
                                <Icon
                                  as={<MaterialCommunityIcons name="cat" />}
                                  size="25px"
                                  color="#6A994E"
                                  ml={"17px"}
                                  mr={"3px"}
                                />
                              }
                            />
                            {errors.numberOfCats && touched.numberOfCats ? (
                              <Text fontSize={"13px"} color={"#BC4749"}>
                                {errors.numberOfCats}
                              </Text>
                            ) : undefined}
                          </>
                        ) : undefined}
                      </>
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
                            <RadioInput
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
                              isThird={true}
                              keyboardType="number-pad"
                            />
                            {hadPetsDate == "Días" ? (
                              <>
                                <CustomTextInput
                                  placeholder="Introduce el numero de días"
                                  keyboardType="number-pad"
                                  onChangeText={handleChange("numberOfDays")}
                                  onBlur={handleBlur("numberOfDays")}
                                  value={values.numberOfDays}
                                  isInvalid={errors.numberOfDays}
                                  mt={4}
                                  InputLeftElement={
                                    <Icon
                                      as={<Ionicons name="calendar" />}
                                      size="25px"
                                      color="#6A994E"
                                      ml={"17px"}
                                      mr={"3px"}
                                    />
                                  }
                                />
                                {errors.numberOfDays && touched.numberOfDays ? (
                                  <Text fontSize={"13px"} color={"#BC4749"}>
                                    {errors.numberOfDays}
                                  </Text>
                                ) : undefined}
                              </>
                            ) : hadPetsDate == "Meses" ? (
                              <>
                                <CustomTextInput
                                  placeholder="Introduce el numero de meses"
                                  keyboardType="number-pad"
                                  onChangeText={handleChange("numberOfMonths")}
                                  onBlur={handleBlur("numberOfMonths")}
                                  value={values.numberOfMonths}
                                  isInvalid={errors.numberOfMonths}
                                  mt={4}
                                  InputLeftElement={
                                    <Icon
                                      as={<Ionicons name="calendar" />}
                                      size="25px"
                                      color="#6A994E"
                                      ml={"17px"}
                                      mr={"3px"}
                                    />
                                  }
                                />
                                {errors.numberOfMonths &&
                                touched.numberOfMonths ? (
                                  <Text fontSize={"13px"} color={"#BC4749"}>
                                    {errors.numberOfMonths}
                                  </Text>
                                ) : undefined}
                              </>
                            ) : (
                              <>
                                <CustomTextInput
                                  placeholder="Introduce el numero de años"
                                  keyboardType="number-pad"
                                  onChangeText={handleChange("numberOfYears")}
                                  onBlur={handleBlur("numberOfYears")}
                                  value={values.numberOfYears}
                                  isInvalid={errors.numberOfYears}
                                  mt={4}
                                  InputLeftElement={
                                    <Icon
                                      as={<Ionicons name="calendar" />}
                                      size="25px"
                                      color="#6A994E"
                                      ml={"17px"}
                                      mr={"3px"}
                                    />
                                  }
                                />
                                {errors.numberOfYears &&
                                touched.numberOfYears ? (
                                  <Text fontSize={"13px"} color={"#BC4749"}>
                                    {errors.numberOfYears}
                                  </Text>
                                ) : undefined}
                              </>
                            )}
                          </View>
                        ) : undefined}
                      </View>
                    )}
                    <Pressable
                      onPress={handleSubmit}
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderRadius={"5px"}
                      height={"60px"}
                      width={screenWidth - 30}
                      mt={"6px"}
                      mb={"12px"}
                      backgroundColor={"#6A994E"}
                    >
                      <Text
                        fontSize={"18px"}
                        color="white"
                        fontWeight={"medium"}
                      >
                        Siguiente
                      </Text>
                    </Pressable>
                  </KeyboardAvoidingView>
                </VStack>
              )}
            </Formik>
          </VStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default AdopterCuestionary;
