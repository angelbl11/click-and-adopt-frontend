import React, { useContext } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

//Yup
import * as Yup from "yup";

//Formik
import { Formik } from "formik";

//GraphQL Components
import { UPDATE_USER_INFO } from "../../graphql/client";
import { useMutation } from "@apollo/client";

//Native Base Components
import { NativeBaseProvider, View, Pressable } from "native-base";
import TextInputWithPassword from "../../components/TextInputWithPassword";

//Auth
import { AuthContext } from "../../context/Auth";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  StyledFormArea,
  ButtonText,
  Colors,
  StyledInputLabel,
} from "../../components/Styles";

//Colors
const { darkLight } = Colors;

//Form input validation
const UpdateInfoSchema = Yup.object().shape({
  email: Yup.string().email("Email incorrecto"),
  age: Yup.number("Ingresa un valor númerico")
    .positive("Ingresa una edad válida")
    .integer("Ingresa una edad válida")
    .min(18, "Debes ser mayor de edad")
    .max(99, "Introduce una edad válida"),
  fullName: Yup.string()
    .min(2, "Demasiado corto")
    .max(30, "Demasiado largo")
    .matches(/^[ñíóáéúÁÉÍÓÚÑ a-zA-Z]+$/, "Introduce únicamente letras "),
});

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

const EditDataScreen = ({ navigation, route }) => {
  const { account } = route.params;
  const [updateUser] = useMutation(UPDATE_USER_INFO);
  const { user } = useContext(AuthContext);
  return (
    <NativeBaseProvider>
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageTitle>Editar información</PageTitle>
            <Formik
              initialValues={{ fullName: "", email: "", age: "" }}
              validationSchema={UpdateInfoSchema}
              onSubmit={(values, { resetForm }) => {
                Alert.alert(
                  "¿Estás seguro que quieres actualizar tu información?",
                  "",
                  [
                    {
                      text: "Cancelar",
                      onPress: () => console.log("cancelado"),
                      style: "cancel",
                    },
                    {
                      text: "Actualizar",
                      onPress: () => {
                        updateUser({
                          variables: {
                            editUserInfoId: user.id,
                            editInput: {
                              age: values.age
                                ? parseInt(values.age)
                                : undefined,
                              email: values.email ? values.email : undefined,
                              fullName: values.fullName
                                ? values.fullName
                                : undefined,
                            },
                          },
                          onCompleted: (data) => {
                            resetForm();
                            console.log("Info actualizada");
                            console.log(data);
                            navigation.navigate(
                              account === "Adoptante"
                                ? "AdopterProfile"
                                : "AdoptedProfile"
                            );
                          },
                          onError: (err) => {
                            console.log("Error:", err.networkError);
                          },
                        });
                      },
                    },
                  ]
                );
                console.log(values);
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
                <StyledFormArea height={800}>
                  <View marginTop={50}></View>
                  <TextInputWithPassword
                    label="Nombre Completo"
                    icon="person"
                    placeholder="ej: Benito Martinez"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    value={values.fullName}
                    isInvalid={errors.fullName}
                  />
                  {errors.fullName && touched.fullName ? (
                    <StyledInputLabel validation={true}>
                      {errors.fullName}
                    </StyledInputLabel>
                  ) : undefined}

                  <TextInputWithPassword
                    label="Edad"
                    icon="calendar"
                    onChangeText={handleChange("age")}
                    onBlur={handleBlur("age")}
                    value={values.age}
                    keyboardType="number-pad"
                    isInvalid={errors.age}
                  />
                  {errors.age && touched.age ? (
                    <StyledInputLabel validation={true}>
                      {errors.age}
                    </StyledInputLabel>
                  ) : undefined}
                  <TextInputWithPassword
                    label="Email"
                    icon="mail"
                    placeholder="mail@example.com"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                    isInvalid={errors.email}
                  />
                  {errors.email && touched.email ? (
                    <StyledInputLabel validation={true}>
                      {errors.email}
                    </StyledInputLabel>
                  ) : undefined}
                  <Pressable
                    onPress={() => {
                      handleSubmit();
                    }}
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius={"5px"}
                    height={"60px"}
                    width={"60%"}
                    margin={"auto"}
                    mt={"22px"}
                    backgroundColor={"#6A994E"}
                  >
                    <ButtonText>Aceptar</ButtonText>
                  </Pressable>
                </StyledFormArea>
              )}
            </Formik>
          </InnerContainer>
        </StyledContainer>
      </KeyboardAvoidingWrapper>
    </NativeBaseProvider>
  );
};

export default EditDataScreen;
