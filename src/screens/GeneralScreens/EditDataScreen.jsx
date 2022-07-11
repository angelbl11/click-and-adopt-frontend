import React, { useContext } from "react";
import { Alert, Dimensions } from "react-native";

//Libraries
import {
  View,
  Pressable,
  VStack,
  Heading,
  Text,
  Icon,
  Spinner,
} from "native-base";

import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import * as Yup from "yup";
import { Formik } from "formik";

//GraphQL
import { UPDATE_USER_INFO } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";

//Auth
import { AuthContext } from "../../context/Auth";

//Custom components
import CustomTextInput from "../../components/Inputs/CustomTextInput";

//Form input validation
const UpdateInfoSchema = Yup.object().shape({
  email: Yup.string().email("Email incorrecto").required("Introduce un email"),
  age: Yup.number("Ingresa un valor númerico")
    .positive("Ingresa una edad válida")
    .integer("Ingresa una edad válida")
    .min(18, "Debes ser mayor de edad")
    .max(99, "Introduce una edad válida")
    .required("Introduce una edad"),
  fullName: Yup.string()
    .min(2, "Demasiado corto")
    .max(30, "Demasiado largo")
    .matches(/^[ñíóáéúÁÉÍÓÚÑ a-zA-Z]+$/, "Introduce únicamente letras ")
    .required("Introduce tu nombre"),
});

const EditDataScreen = ({ navigation, route }) => {
  const { account } = route.params;
  const [updateUser, { loading }] = useMutation(UPDATE_USER_INFO);
  const { user, setUser } = useContext(AuthContext);
  //Variables for screensize
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  return (
    <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
      <StatusBar style="dark" />
      <VStack alignItems={"center"} bgColor="#FFFFFF">
        <Heading
          fontSize={"38px"}
          textAlign={"center"}
          fontWeight="bold"
          color="#6A994E"
          marginBottom={"15px"}
        >
          Editar información
        </Heading>
        <Text fontSize={"22px"} fontWeight={"semibold"} color={"#1F2937"}>
          Modifica los campos deseados
        </Text>
        <Formik
          initialValues={{
            fullName: user.fullName,
            email: user.email,
            age: user.age + "",
          }}
          validationSchema={UpdateInfoSchema}
          onSubmit={(values, { resetForm }) => {
            Alert.alert(
              "¿Estás seguro que quieres actualizar tu información?",
              "",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Actualizar",
                  onPress: () => {
                    updateUser({
                      variables: {
                        editUserInfoId: user.id,
                        editInput: {
                          age: values.age ? parseInt(values.age) : user.age,
                          email: values.email ? values.email : user.email,
                          fullName: values.fullName
                            ? values.fullName
                            : user.fullName,
                        },
                      },
                      update: (proxy, { data }) => {
                        resetForm();
                        setUser({
                          age: values.age,
                          email: values.email,
                          fullName: values.fullName,
                          id: user.id,
                          account: user.account,
                        });
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
                <StyledInputLabel validation={true}>
                  {errors.fullName}
                </StyledInputLabel>
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
              />
              {errors.email && touched.email ? (
                <Text fontSize={"13px"} color={"#BC4749"}>
                  {errors.email}
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
                mt={"20px"}
                mb={"12px"}
                backgroundColor={"#6A994E"}
              >
                <Text fontSize={"18px"} color="white" fontWeight={"medium"}>
                  {loading ? <Spinner color={"#FFFFFF"} /> : "Aceptar"}
                </Text>
              </Pressable>
            </VStack>
          )}
        </Formik>
      </VStack>
    </View>
  );
};

export default EditDataScreen;
