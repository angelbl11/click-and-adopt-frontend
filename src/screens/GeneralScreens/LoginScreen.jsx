import React, { useContext, useState } from "react";
import { Platform, Dimensions, LogBox } from "react-native";
LogBox.ignoreLogs(["NativeBase:"]);

//Libraries
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Heading,
  Image,
  Text,
  VStack,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  HStack,
  Link,
  Input,
  Icon,
  Spinner,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import * as Yup from "yup";

//Graphql
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/mutations";

//Authentication
import { AuthContext } from "../../context/Auth";

//Form fields validation
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email incorrecto").required("Ingresa tu email"),
  password: Yup.string().required("Ingresa tu contraseña"),
});

const Login = ({ navigation }) => {
  //Hooks
  const [hidePassword, setHidePassword] = useState(true);
  const [loginUser, { loading }] = useMutation(LOGIN);
  const [message, setMessage] = useState();
  const handleMessage = (message) => {
    setMessage(message);
  };
  const auth = useContext(AuthContext);
  //Variables for screensize
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  return (
    <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
      <StatusBar style="dark" />
      <ScrollView>
        <VStack alignItems={"center"} bgColor="#FFFFFF">
          <Image
            resizeMode="cover"
            source={require("../../assets/logo.png")}
            alt="logo"
            width={"150px"}
            height={"150px"}
            marginLeft={"auto"}
            marginRight={"auto"}
            marginBottom={"5px"}
            marginTop="12px"
          />
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
            Iniciar Sesión
          </Text>
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
                  handleMessage(err.message);
                },
                onCompleted: (data) => {
                  auth.login(data.login);
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Profiles" }],
                  });
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
              <VStack width={screenWidth - 30} space={"8px"} marginTop={10}>
                <KeyboardAvoidingView
                  h={{
                    base: "400px",
                    lg: "auto",
                  }}
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <Input
                    placeholder="Correo electrónico"
                    placeholderTextColor={"#9CA3AF"}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                    fontSize={"16px"}
                    height="60px"
                    borderRadius={"6px"}
                    color={"#1F2937"}
                    bgColor={"#E5E7EB"}
                    isInvalid={errors.password}
                    _focus={{ borderColor: "#6A994E" }}
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
                    mt={"20px"}
                    mb={"12px"}
                    backgroundColor={"#6A994E"}
                  >
                    <Text fontSize={"18px"} color="white" fontWeight={"medium"}>
                      {loading ? <Spinner color={"#FFFFFF"} /> : "Ingresar"}
                    </Text>
                  </Pressable>
                  <HStack space={2} justifyContent="center">
                    <Text color="#1F2937" fontSize={16}>
                      ¿No tienes cuenta?
                    </Text>
                    <Link
                      onPress={() => navigation.navigate("SignUp")}
                      isUnderlined={false}
                      _text={{
                        fontSize: 16,
                        color: "#6A994E",
                        fontWeight: "semibold",
                      }}
                    >
                      Registrate aquí
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

export default Login;
