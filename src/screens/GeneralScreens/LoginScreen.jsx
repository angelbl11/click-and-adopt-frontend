import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";

//Yup
import * as Yup from "yup";

//Queries
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/client";

//Formik
import { Formik } from "formik";

//Native Base Components
import { NativeBaseProvider, Image, Pressable } from "native-base";

//Components
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
  MsgBox,
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
import { AuthContext } from "../../context/Auth";

//Form fields validation
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email incorrecto").required("Ingresa tu email"),
  password: Yup.string().required("Ingresa tu contraseña"),
});

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [loginUser] = useMutation(LOGIN);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const handleMessage = (message, type = "Error") => {
    setMessage(message);
    setMessageType(type);
  };

  const { user } = useContext(AuthContext);

  const auth = useContext(AuthContext);

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <StatusBar style="dark" />
          <InnerContainer>
            <Image
              resizeMode="cover"
              source={require("../../assets/logo.png")}
              alt="logo"
              width={"150px"}
              height={"150px"}
              marginBottom={"2"}
            />
            <PageTitle>Click&Adopt</PageTitle>
            <SubTitle> Iniciar Sesión</SubTitle>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                loginUser({
                  variables: {
                    loginInput: {
                      email: values.email,
                      password: values.password,
                    },
                  },
                  onError: (err) => {
                    handleMessage("Error de conexión", "Error");
                    console.log(err.networkError.result);
                  },

                  onCompleted: () => {
                    handleMessage("Inicio de sesión correcto", "Success");
                  },
                  update(proxy, { data }) {
                    auth.login(data.login);
                    if (data.login.account === "Adoptante")
                      navigation.navigate("AdopterProfile");
                    else navigation.navigate("AdoptedProfile");
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

                  <Pressable
                    onPress={handleSubmit}
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius={"5px"}
                    height={"60px"}
                    width={"60%"}
                    margin={"auto"}
                    mt={"20px"}
                    backgroundColor={"#6A994E"}
                  >
                    <ButtonText>Iniciar Sesión</ButtonText>
                  </Pressable>
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
