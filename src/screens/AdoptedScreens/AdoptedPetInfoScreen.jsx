import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";

//Formik
import { Formik } from "formik";

//Native Base Components
import {
  View,
  Spinner,
  Heading,
  Pressable,
  VStack,
  Text,
  TextArea,
  ScrollView,
} from "native-base";

//Components
import RadioInput from "../../components/Inputs/RadioInput";
import CheckBoxInput from "../../components/Inputs/CheckBoxInput";

//Yup
import * as Yup from "yup";

//Graphql
import { ADOPTED_CUESTIONARY, EDIT_PET_INFO } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";

//Auth
import { AuthContext } from "../../context/Auth";

import { PetsContext } from "../../context/PetsContext";
import { Alert, Dimensions } from "react-native";

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
  const {
    petName,
    typeOfAdoptedPet,
    genderOfAdoptedPet,
    ageOfAdoptedPet,
    petId,
    protocol,
    isHealthyWithChild,
    isHealthyWithPets,
    isEdited,
    description,
  } = route.params;

  const [isHealthyWithKids, setIsHealthyWithKids] = useState(
    isHealthyWithChild || true
  );
  const [isHealthyWithOtherPets, setIsHealthyWithOtherPets] = useState(
    isHealthyWithPets || true
  );
  const [coexistenceWithOtherPets, setCoexistenceWithOtherPets] = useState([]);
  const [adoptedPetProtocol, setAdoptedPetProtocol] = useState(
    protocol || "Completo"
  );
  const [createAdoptedUser, { loading }] = useMutation(ADOPTED_CUESTIONARY);
  const [editPetInfo, { loading: petInfoLoading }] = useMutation(EDIT_PET_INFO);
  const { user } = useContext(AuthContext);
  //Variables for screensize
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const { setPets, setPetImage } = useContext(PetsContext);

  return (
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
            Información importante sobre tu mascota
          </Heading>
          <Formik
            initialValues={{
              adoptedPetDescription: description,
              isHealthyWithKids: true,
              isHealthyWithOtherPets: true,
              coexistenceWithOtherPets: [],
              adoptedPetProtocol: "",
            }}
            validationSchema={AdoptedPetInfoSchema}
            onSubmit={async (values, { resetForm }) => {
              await values.coexistenceWithOtherPets;
              values.coexistenceWithOtherPets = [...coexistenceWithOtherPets];
              {
                !isEdited
                  ? createAdoptedUser({
                      variables: {
                        adoptedQuestionnaireInput: {
                          typeOfAdoptedPet: typeOfAdoptedPet,
                          genderOfAdoptedPet: genderOfAdoptedPet,
                          adoptedPetName: petName,
                          ageOfAdoptedPet: ageOfAdoptedPet,
                          userId: user.id,
                          adoptedPetDescription: values.adoptedPetDescription,
                          isHealthyWithKids: values.isHealthyWithKids,
                          isHealthyWithOtherPets: values.isHealthyWithOtherPets,
                          coexistenceWithOtherPets:
                            values.coexistenceWithOtherPets,
                          adoptedPetProtocol: values.adoptedPetProtocol,
                          isAvailableToBeAdopted: false,
                        },
                      },
                      onCompleted: (data) => {
                        setPetImage((oldArray) => [
                          ...oldArray,
                          `https://click-and-adopt.herokuapp.com/ProfilePictures/defaultprof.jpg`,
                        ]);

                        setPets((oldArray) => [
                          ...oldArray,
                          {
                            typeOfAdoptedPet: typeOfAdoptedPet,
                            genderOfAdoptedPet: genderOfAdoptedPet,
                            adoptedPetName: petName,
                            ageOfAdoptedPet: ageOfAdoptedPet,
                            isAvailableToBeAdopted: false,
                            userId: user.id,
                            adoptedPetDescription: values.adoptedPetDescription,
                            isHealthyWithKids: values.isHealthyWithKids,
                            isHealthyWithOtherPets:
                              values.isHealthyWithOtherPets,
                            coexistenceWithOtherPets:
                              values.coexistenceWithOtherPets,
                            adoptedPetProtocol: values.adoptedPetProtocol,
                            id: data?.answerAdoptedQuestionnaire,
                          },
                        ]);
                        navigation.reset({
                          index: 0,
                          routes: [{ name: "Profiles" }],
                        });
                        resetForm();
                      },
                      onError: (err) => {
                        console.log(err.message);
                      },
                    })
                  : Alert.alert(
                      "¿Estás seguro que quieres actualizar estos datos de tu mascota?",
                      "",
                      [
                        {
                          text: "Cancelar",
                          style: "cancel",
                        },
                        {
                          text: "Actualizar",
                          onPress: () => {
                            editPetInfo({
                              variables: {
                                petId: petId,
                                editPetInput: {
                                  adoptedPetDescription:
                                    values.adoptedPetDescription,
                                  adoptedPetName: petName,
                                  adoptedPetProtocol: values.adoptedPetProtocol,
                                  ageOfAdoptedPet: ageOfAdoptedPet,
                                  coexistenceWithOtherPets:
                                    values.coexistenceWithOtherPets,
                                  genderOfAdoptedPet: genderOfAdoptedPet,
                                  isHealthyWithKids: values.isHealthyWithKids,
                                  isHealthyWithOtherPets:
                                    values.isHealthyWithOtherPets,
                                  typeOfAdoptedPet: typeOfAdoptedPet,
                                },
                              },
                              onCompleted: (data) => {
                                navigation.reset({
                                  index: 0,
                                  routes: [{ name: "Profiles" }],
                                });
                              },
                              onError: (err) => {
                                console.log(err);
                              },
                            });
                          },
                        },
                      ]
                    );
              }
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
                <Text
                  fontSize={"16px"}
                  fontWeight={"semibold"}
                  color={"#1F2937"}
                  textAlign={"left"}
                  mb={2}
                >
                  Cuéntanos un poco sobre {petName}
                </Text>
                <TextArea
                  bg={"#E5E7EB"}
                  color={"#1F2937"}
                  fontSize={"13px"}
                  onChangeText={handleChange("adoptedPetDescription")}
                  onBlur={handleBlur("adoptedPetDescription")}
                  value={values.adoptedPetDescription}
                  isInvalid={errors.adoptedPetDescription}
                />

                {errors.adoptedPetDescription &&
                touched.adoptedPetDescription ? (
                  <Text fontSize={"13px"} color={"#BC4749"}>
                    {errors.adoptedPetDescription}
                  </Text>
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
                  <Text fontSize={"13px"} color={"#BC4749"}>
                    {errors.isHealthyWithKids}
                  </Text>
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
                  <Text fontSize={"13px"} color={"#BC4749"}>
                    {errors.isHealthyWithOtherPets}
                  </Text>
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
                      firstValue="Perros"
                      firstCheckBoxLabel="Perros"
                      secondValue="Gatos"
                      secondCheckBoxLabel="Gatos"
                    />
                    {errors.coexistenceWithOtherPets &&
                    touched.coexistenceWithOtherPets ? (
                      <Text fontSize={"13px"} color={"#BC4749"}>
                        {errors.coexistenceWithOtherPets}
                      </Text>
                    ) : undefined}
                  </View>
                ) : undefined}
                <RadioInput
                  label={`Indica el tipo de protocolo con el que cuenta ${petName}`}
                  linkLabel={"Protocolo"}
                  marginLeftLink={
                    petName.length < 5
                      ? "-360"
                      : petName.length >= 5 && petName.length < 9
                      ? "-260"
                      : petName.length >= 9
                      ? "-230"
                      : undefined
                  }
                  groupValue={
                    adoptedPetProtocol == "Completo"
                      ? (values.adoptedPetProtocol = "Completo")
                      : adoptedPetProtocol == "Incompleto"
                      ? (values.adoptedPetProtocol = "Incompleto")
                      : (values.adoptedPetProtocol = "No tiene")
                  }
                  onChange={(nextValue) => {
                    setAdoptedPetProtocol(nextValue);
                  }}
                  isThird={true}
                  firstRadioLabel="Completo"
                  firstValue="Completo"
                  secondRadioLabel="Incompleto"
                  secondValue="Incompleto"
                  thirdRadioLabel="No tiene"
                  thirdValue="No tiene"
                />
                {errors.adoptedPetProtocol && touched.adoptedPetProtocol ? (
                  <Text fontSize={"13px"} color={"#BC4749"}>
                    {errors.adoptedPetProtocol}
                  </Text>
                ) : undefined}
                <Pressable
                  onPress={handleSubmit}
                  disabled={loading}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderRadius={"5px"}
                  height={"60px"}
                  width={screenWidth - 30}
                  mt={"6px"}
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
      </ScrollView>
    </View>
  );
};

export default AdoptedPetInfo;
