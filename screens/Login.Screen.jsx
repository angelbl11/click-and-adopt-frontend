import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//Yup
import * as Yup from "yup";

//Formik
import { Formik } from "formik";

//Native Base Components
import { NativeBaseProvider, Spinner } from "native-base";

//Components
import TextInputWithPassword from "../components/TextInputWithPassword";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
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
} from "./../components/Styles";

//Colors
const { darkLight, primary } = Colors;

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

//API client
import axios from "axios";

//Form fields validation
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email incorrecto").required("Ingresa tu email"),
  password: Yup.string().required("Ingresa tu contraseña"),
});

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = "http://192.168.100.100:3000/user/signin";
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;
        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          navigation.navigate("Welcome", { ...data[0] });
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        handleMessage("Error de red");
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
            <PageLogo
              resizeMode="cover"
              source={require("./../assets/logo.png")}
              alt="logo"
            />
            <PageTitle>Click&Adopt</PageTitle>
            <SubTitle> Iniciar Sesión</SubTitle>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                handleLogin(values, setSubmitting);
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
                  <MsgBox type={messageType}>{message}</MsgBox>
                  {!isSubmitting && (
                    <StyledButton onPress={handleSubmit}>
                      <ButtonText>Iniciar Sesión</ButtonText>
                    </StyledButton>
                  )}
                  {isSubmitting && (
                    <StyledButton disabled={true}>
                      <Spinner size="lg" color={primary} />
                    </StyledButton>
                  )}
                  <ExtraView>
                    <ExtraText>¿No tienes cuenta? </ExtraText>
                    <TextLink onPress={() => navigation.navigate("SignUp")}>
                      <TextLinkContent>Registrate aquí</TextLinkContent>
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

export default Login;
