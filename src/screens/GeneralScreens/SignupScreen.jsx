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
import { Pressable, Spinner } from "native-base";
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
  MsgBox,
} from "../../components/Styles";

//Colors
const { darkLight } = Colors;

//keyboard avoiding view
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

//Auth
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
  const [value, setValue] = useState("Adoptante");
  const [createUser, { loading }] = useMutation(REGISTER_USER);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const handleMessage = (message, type = "Error") => {
    setMessage(message);
    setMessageType(type);
  };
  const auth = useContext(AuthContext);
  return (
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
            onSubmit={(values, { resetForm }) => {
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
                  try {
                    handleMessage(
                      err?.graphQLErrors[0].extensions.errors,
                      "Error"
                    );
                  } catch (error) {
                    return;
                  }
                },
                update(cache, { data }) {
                  auth.login(data?.register);
                  if (data?.register?.account === "Adoptante")
                    navigation.navigate("AdopterContract");
                  else navigation.navigate("AdoptedContract");
                  resetForm();
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
                    value === "Adoptante"
                      ? (values.account = "Adoptante")
                      : (values.account = "Adoptado")
                  }
                  onChange={(nextValue) => {
                    setValue(nextValue);
                  }}
                  firstRadioLabel="Adoptar"
                  firstValue="Adoptante"
                  secondRadioLabel="Dar en Adopción"
                  secondValue="Adoptado"
                />
                <MsgBox type={messageType}>{message}</MsgBox>
                <Pressable
                  disabled={loading}
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
                  <ButtonText>
                    {loading ? <Spinner color={"#FFFFFF"} /> : "Registrate"}
                  </ButtonText>
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
  );
};

export default SignUp;
