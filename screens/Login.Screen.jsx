import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

//Yup
import * as Yup from "yup";

//Formik
import { Formik } from "formik";

//Native Base Components
import { NativeBaseProvider } from "native-base";

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

//Form fields validation
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email incorrecto").required("Ingresa tu email"),
  password: Yup.string().required("Ingresa tu contraseña"),
});

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

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
              onSubmit={(values) => {
                console.log(values);
                navigation.navigate("Welcome");
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
                  <MsgBox>...</MsgBox>

                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Iniciar Sesión</ButtonText>
                  </StyledButton>
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
