import React, { useState } from "react";
import { Dimensions, SafeAreaView } from "react-native";

//Libraries
import {
  Checkbox,
  Heading,
  ScrollView,
  View,
  VStack,
  Center,
  Text,
  Pressable,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import * as Yup from "yup";

//Contracts
import { contracts } from "../../components/Utils/contracts";

//Validation inputs
const ContractSchema = Yup.object().shape({
  isAccepted: Yup.boolean()
    .required("Debes aceptar los términos para continuar")
    .oneOf([true], "Debes aceptar los términos y condiciones"),
});

const ContractScreen = ({ navigation, route }) => {
  const { account } = route.params;
  const [check, setCheck] = useState(false);
  //Variables for screensize
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View bgColor="#FFFFFF" height={screenHeight} flex={1}>
        <StatusBar style="dark" />
        <VStack
          alignItems={"center"}
          bgColor="#FFFFFF"
          flex={1}
          height={screenHeight}
        >
          <Heading
            fontSize={"38px"}
            textAlign={"center"}
            fontWeight="bold"
            color="#6A994E"
          >
            Acuerdo de Responsabilidad
          </Heading>
          <Formik
            initialValues={{ isAccepted: false }}
            validationSchema={ContractSchema}
            onSubmit={(values) => {
              values.isAccepted == check;
              account === "Adoptado"
                ? navigation.navigate("AdoptedCuestionary", { isEdited: false })
                : navigation.navigate("AdopterCuestionary");
            }}
          >
            {({ handleSubmit, values, errors, touched }) => (
              <VStack
                width={screenWidth - 30}
                marginTop={10}
                height={screenHeight}
                flex={1}
              >
                <ScrollView>
                  <Center
                    mb={"12px"}
                    marginLeft={"18px"}
                    marginRight={"20px"}
                    width={screenWidth - 50}
                  >
                    <Text fontSize={14} flexShrink={1}>
                      {account === "Adoptado"
                        ? contracts.AdoptedContract
                        : contracts.AdopterContract}
                    </Text>
                  </Center>
                </ScrollView>
                <Center>
                  <Checkbox
                    colorScheme="green"
                    _pressed={{ colorScheme: "green" }}
                    value={
                      check === true
                        ? (values.isAccepted = true)
                        : (values.isAccepted = false)
                    }
                    isChecked={check}
                    onPress={() => setCheck(!check)}
                  >
                    He Leído y acepto
                  </Checkbox>

                  {errors.isAccepted && touched.isAccepted ? (
                    <Text fontSize={"13px"} color={"#BC4749"}>
                      {errors.isAccepted}
                    </Text>
                  ) : undefined}
                </Center>
                <Pressable
                  onPress={handleSubmit}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderRadius={"5px"}
                  height={"60px"}
                  width={screenWidth - 30}
                  mb={"12px"}
                  mt={"16px"}
                  backgroundColor={"#6A994E"}
                >
                  <Text fontSize={"18px"} color="white" fontWeight={"medium"}>
                    Siguiente
                  </Text>
                </Pressable>
              </VStack>
            )}
          </Formik>
        </VStack>
      </View>
    </SafeAreaView>
  );
};

export default ContractScreen;
