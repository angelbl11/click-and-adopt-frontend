import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";

//Queries
import { REGISTER_USER } from "../../graphql/client";
import { useMutation } from "@apollo/client";

//Formik
import { Formik } from "formik";

//Yup
import * as Yup from "yup";

//Native Base Components
import { NativeBaseProvider, Pressable } from "native-base";

//Components
import RadioInput from "../../components/RadioInput";
import TextInputWithPassword from "../../components/TextInputWithPassword";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  ButtonText,
  Colors,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  StyledInputLabel,
} from "../../components/Styles";

//Colors
const { darkLight, primary } = Colors;

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

//
import { AuthContext } from "../../context/Auth";

//Form fields validation
const SingupSchema = Yup.object().shape({
  email: Yup.string().email("Email incorrecto").required("Ingresa tu email"),
  password: Yup.string()
    .min(8, "Demasiado corta")
    .required("Ingresa tu contraseña"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
  age: Yup.number("Ingresa un valor númerico")
    .positive("Ingresa una edad válida")
    .integer("Ingresa una edad válida")
    .min(18, "Debes ser mayor de edad")
    .max(99, "Introduce una edad válida")
    .required("Ingresa tu edad"),
  fullName: Yup.string()
    .min(2, "Demasiado corto")
    .max(30, "Demasiado largo")
    .required("Ingresa tu nombre completo")
    .matches(/^[ñíóáéúÁÉÍÓÚÑ a-zA-Z]+$/, "Introduce únicamente letras "),
});

const SignUp = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [value, setValue] = useState("adopter");
  const [createUser] = useMutation(REGISTER_USER);

  const auth = useContext(AuthContext);
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
                repeatPassword: "",
              }}
              validationSchema={SingupSchema}
              onSubmit={(values) => {
                values.account == value;
                createUser({
                  variables: {
                    registerInput: {
                      account: values.account,
                      age: parseInt(values.age),
                      email: values.email,
                      fullName: values.fullName,
                      password: values.password,
                      repeatPassword: values.repeatPassword,
                    },
                  },

                  onError: (err) => {
                    console.log("Network Error");
                  },

                  onCompleted: () => {
                    console.log("Registrado correctamente");
                  },
                  update(proxy, { data }) {
                    auth.register(data.register);
                    console.log(data.register);
                    if (data.register.account === "adopter")
                      navigation.navigate("AdopterContract");
                    else navigation.navigate("AdoptedContract");
                  },
                });
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
                  <TextInputWithPassword
                    label="Repite tu contraseña"
                    icon="lock"
                    onChangeText={handleChange("repeatPassword")}
                    onBlur={handleBlur("repeatPassword")}
                    value={values.repeatPassword}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                    isInvalid={errors.repeatPassword}
                  />
                  {errors.repeatPassword && touched.repeatPassword ? (
                    <StyledInputLabel validation={true}>
                      {errors.repeatPassword}
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

                  <Pressable
                    onPress={handleSubmit}
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius={"5px"}
                    height={"60px"}
                    width={"60%"}
                    margin={"auto"}
                    mt={"22px"}
                    backgroundColor={"#6A994E"}
                  >
                    <ButtonText> Registrate </ButtonText>
                  </Pressable>

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
