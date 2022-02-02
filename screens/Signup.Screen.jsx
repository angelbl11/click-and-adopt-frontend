import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//Formik
import { Formik } from "formik";

//Yup
import * as Yup from "yup";

//Native Base Components
import { NativeBaseProvider, Spinner } from "native-base";

//Components
import RadioInput from "./../components/RadioInput";
import TextInputWithPassword from "../components/TextInputWithPassword";

//API client
import axios from "axios";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  StyledInputLabel,
} from "../components/Styles";

//Colors
const { darkLight, primary } = Colors;

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

//Form fields validation
const SingupSchema = Yup.object().shape({
  email: Yup.string().email("Email incorrecto").required("Ingresa tu email"),
  password: Yup.string()
    .min(8, "Demasiado corta")
    .required("Ingresa tu contraseña"),
  age: Yup.number("Ingresa un valor númerico")
    .positive("Ingresa una edad válida")
    .integer("Ingresa una edad válida")
    .min(18, "Debes ser mayor de edad")
    .required("Ingresa tu edad"),
  fullName: Yup.string()
    .min(2, "Demasiado corto")
    .max(30, "Demasiado largo")
    .required("Ingresa tu nombre completo"),
});

const SignUp = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [value, setValue] = useState("adopter");
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleSignup = (credentials, setSubmitting, account) => {
    handleMessage(null);
    const url = "http://192.168.100.100:3000/user/signup";
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;
        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else if (account == "adopter") {
          navigation.navigate("AdopterContract", { ...data });
        } else if (account == "adopted") {
          navigation.navigate("AdoptedContract", { ...data });
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        handleMessage("Error de conexión");
      });
  };

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageTitle>Click&Adopt</PageTitle>
            <SubTitle> Regístrate</SubTitle>
            <Formik
              initialValues={{
                fullName: "",
                email: "",
                age: "",
                password: "",
                account: "",
              }}
              validationSchema={SingupSchema}
              onSubmit={(values, { setSubmitting }) => {
                values.account == value;
                setSubmitting(false);
                handleSignup(values, setSubmitting, values.account);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <StyledFormArea>
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
                    keyboardType="numeric"
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
                  <TextInputWithPassword
                    label="Contraseña"
                    icon="lock"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                    isInvalid={errors.password}
                  />
                  {errors.password && touched.password ? (
                    <StyledInputLabel validation={true}>
                      {errors.password}
                    </StyledInputLabel>
                  ) : undefined}
                  <RadioInput
                    label="Quiero"
                    groupValue={
                      value == "adopter"
                        ? (values.account = "adopter")
                        : (values.account = "adopted")
                    }
                    onChange={(nextValue) => {
                      setValue(nextValue);
                    }}
                    firstRadioLabel="Adoptar"
                    firstValue="adopter"
                    secondRadioLabel="Dar en Adopción"
                    secondValue="adopted"
                  />
                  <MsgBox type={messageType}>{message}</MsgBox>

                  {!isSubmitting && (
                    <StyledButton onPress={handleSubmit}>
                      <ButtonText> Registrate </ButtonText>
                    </StyledButton>
                  )}
                  {isSubmitting && (
                    <StyledButton disabled={true}>
                      <Spinner size="lg" color={primary} />
                    </StyledButton>
                  )}
                  <ExtraView>
                    <ExtraText>¿Ya tienes una cuenta? </ExtraText>
                    <TextLink onPress={() => navigation.navigate("Login")}>
                      <TextLinkContent>Inicia sesión</TextLinkContent>
                    </TextLink>
                  </ExtraView>
                </StyledFormArea>
              )}
            </Formik>
          </InnerContainer>
        </StyledContainer>
      </KeyboardAvoidingWrapper>
    </NativeBaseProvider>
  );
};

export default SignUp;
