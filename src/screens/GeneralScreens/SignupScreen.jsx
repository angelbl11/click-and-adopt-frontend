import React, { useState, useContext } from "react";
import { Platform, Dimensions, LogBox } from "react-native";
LogBox.ignoreLogs(["NativeBase:"]);

//Libraries
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Pressable,
  Spinner,
  View,
  KeyboardAvoidingView,
  ScrollView,
  VStack,
  HStack,
  Link,
  Text,
  Icon,
  Heading,
  Input,
} from "native-base";

//Graphql
import { REGISTER_USER } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";

//Custom Components
import RadioInput from "../../components/Inputs/RadioInput";
import CustomTextInput from "../../components/Inputs/CustomTextInput";

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
  //Variables for screensize
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const handleMessage = (message) => {
    setMessage(message);
  };
  const auth = useContext(AuthContext);
  return (
    <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
      <StatusBar style="dark" />
      <ScrollView>
        <VStack alignItems={"center"} bgColor="#FFFFFF">
          <Heading
            fontSize={"38px"}
            textAlign={"center"}
            fontWeight="bold"
            color="#6A994E"
            marginBottom={"15px"}
          >
            Click&Adopt
          </Heading>
          <Text fontSize={"22px"} fontWeight={"semibold"} color={"#1F2937"}>
            Registrate
          </Text>
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
                  handleMessage(err.message);
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
              <VStack
                width={screenWidth - 30}
                space={"8px"}
                marginTop={10}
                height={screenHeight}
              >
                <KeyboardAvoidingView
                  h={{
                    base: "400px",
                    lg: "auto",
                  }}
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <CustomTextInput
                    onChangeText={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    value={values.fullName}
                    isInvalid={errors.fullName}
                    placeholder="Nombre completo"
                    InputLeftElement={
                      <Icon
                        as={<Ionicons name="person" />}
                        size="25px"
                        color="#6A994E"
                        ml={"17px"}
                        mr={"3px"}
                      />
                    }
                    mb={errors.fullName ? "8px" : "30px"}
                  />
                  {errors.fullName && touched.fullName ? (
                    <Text fontSize={"13px"} color={"#BC4749"}>
                      {errors.fullName}
                    </Text>
                  ) : undefined}
                  <CustomTextInput
                    onChangeText={handleChange("age")}
                    onBlur={handleBlur("age")}
                    value={values.age}
                    keyboardType="number-pad"
                    isInvalid={errors.age}
                    placeholder="Edad"
                    InputLeftElement={
                      <Icon
                        as={<Ionicons name="calendar" />}
                        size="25px"
                        color="#6A994E"
                        ml={"17px"}
                        mr={"3px"}
                      />
                    }
                    mb={errors.age ? "8px" : "30px"}
                  />
                  {errors.age && touched.age ? (
                    <Text fontSize={"13px"} color={"#BC4749"}>
                      {errors.age}
                    </Text>
                  ) : undefined}
                  <CustomTextInput
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                    isInvalid={errors.email}
                    placeholder="Correo electrónico"
                    InputLeftElement={
                      <Icon
                        as={<Ionicons name="mail" />}
                        size="25px"
                        color="#6A994E"
                        ml={"17px"}
                        mr={"3px"}
                      />
                    }
                    mb={errors.email ? "8px" : "30px"}
                  />
                  {errors.email && touched.email ? (
                    <Text fontSize={"13px"} color={"#BC4749"}>
                      {errors.email}
                    </Text>
                  ) : undefined}
                  <Input
                    placeholder="Contraseña"
                    placeholderTextColor={"#9CA3AF"}
                    onChangeText={handleChange("password")}
                    secureTextEntry={hidePassword}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    fontSize={"16px"}
                    height="60px"
                    borderRadius={"6px"}
                    color={"#1F2937"}
                    bgColor={"#E5E7EB"}
                    isInvalid={errors.password}
                    mb={errors.password ? "8px" : "30px"}
                    _focus={{ borderColor: "#6A994E" }}
                    InputLeftElement={
                      <Icon
                        as={<Ionicons name="lock-closed" />}
                        size="25px"
                        color="#6A994E"
                        ml={"17px"}
                        mr={"3px"}
                      />
                    }
                    InputRightElement={
                      <Icon
                        onPress={() => setHidePassword(!hidePassword)}
                        as={
                          <Ionicons
                            name={hidePassword ? "md-eye-off" : "md-eye"}
                          />
                        }
                        size="25px"
                        color="#9CA3AF"
                        mr={"15px"}
                      />
                    }
                  />
                  {errors.password && touched.password ? (
                    <Text fontSize={"13px"} color={"#BC4749"}>
                      {errors.password}
                    </Text>
                  ) : undefined}
                  <Input
                    placeholder="Repite la contraseña"
                    placeholderTextColor={"#9CA3AF"}
                    onChangeText={handleChange("repeatPassword")}
                    secureTextEntry={hidePassword}
                    onBlur={handleBlur("repeatPassword")}
                    value={values.repeatPassword}
                    fontSize={"16px"}
                    height="60px"
                    mb={errors.repeatPassword ? "2px" : "0px"}
                    borderRadius={"6px"}
                    color={"#1F2937"}
                    bgColor={"#E5E7EB"}
                    isInvalid={errors.repeatPassword}
                    _focus={{ borderColor: "#6A994E" }}
                    InputLeftElement={
                      <Icon
                        as={<Ionicons name="lock-closed" />}
                        size="25px"
                        color="#6A994E"
                        ml={"17px"}
                        mr={"3px"}
                      />
                    }
                    InputRightElement={
                      <Icon
                        onPress={() => setHidePassword(!hidePassword)}
                        as={
                          <Ionicons
                            name={hidePassword ? "md-eye-off" : "md-eye"}
                          />
                        }
                        size="25px"
                        color="#9CA3AF"
                        mr={"15px"}
                      />
                    }
                  />
                  {errors.repeatPassword && touched.repeatPassword ? (
                    <Text fontSize={"13px"} color={"#BC4749"}>
                      {errors.repeatPassword}
                    </Text>
                  ) : undefined}
                  <VStack space={2} mt="6px">
                    <RadioInput
                      label="Selecciona una opción"
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
                  </VStack>
                  <Text
                    textAlign={"center"}
                    fontSize="16px"
                    fontWeight={"normal"}
                    color="#BC4749"
                  >
                    {message}
                  </Text>
                  <Pressable
                    onPress={handleSubmit}
                    disabled={loading}
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius={"5px"}
                    height={"60px"}
                    width={screenWidth - 30}
                    mb={"12px"}
                    backgroundColor={"#6A994E"}
                  >
                    <Text fontSize={"18px"} color="white" fontWeight={"medium"}>
                      {loading ? <Spinner color={"#FFFFFF"} /> : "Siguiente"}
                    </Text>
                  </Pressable>
                  <HStack space={2} justifyContent="center">
                    <Text color="#1F2937" fontSize={16}>
                      ¿Ya tienes una cuenta?
                    </Text>
                    <Link
                      onPress={() => navigation.navigate("Login")}
                      isUnderlined={false}
                      _text={{
                        fontSize: 16,
                        color: "#6A994E",
                        fontWeight: "semibold",
                      }}
                    >
                      Inicia sesión
                    </Link>
                  </HStack>
                </KeyboardAvoidingView>
              </VStack>
            )}
          </Formik>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default SignUp;
