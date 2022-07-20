import React, { useState } from "react";
import { Dimensions, SafeAreaView } from "react-native";
//Libraries
import {
  Center,
  Checkbox,
  Heading,
  Pressable,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import * as Yup from "yup";

//Validation Inputs
const AdopterContractSchema = Yup.object().shape({
  isAccepted: Yup.boolean()
    .required("Debes aceptar los términos para continuar")
    .oneOf([true], "Debes aceptar los términos y condiciones"),
});

const AdopterContract = ({ navigation }) => {
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
            validationSchema={AdopterContractSchema}
            onSubmit={(values) => {
              values.isAccepted == check;
              navigation.navigate("AdopterCuestionary");
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
                      Click&Adopt pretende brindar una herramienta eficaz a
                      todas aquellas organizaciones y/o personas interesadas en
                      llevar un proceso de adopción animal confiable, seguro y
                      sobre todo intuitivo. El objetivo principal de Click&Adopt
                      es el de facilitar el proceso de difusión de un animal o
                      de búsqueda de este, permitiendo así seleccionar
                      características de la mascota para su fácil identificación
                      ante los interesados y la conexión con las necesidades o
                      requisitos del adoptante. Al aceptar los siguientes
                      términos y condiciones, el usuario que adopta se
                      compromete a cumplir con una sana convivencia con todos
                      los usuarios de la aplicación además de brindar un uso
                      responsable y consciente de la misma. Así pues, un proceso
                      de adopción es una responsabilidad para toda la vida del
                      animal en cuestión por lo que al aceptar estos términos el
                      usuario acredita que es una persona mayor de edad y que
                      los datos proporcionados a Click&Adopt son fidedignos. A
                      su vez, el usuario interesado en adoptar acredita que
                      entiende lo que es un proceso de adopción, valora, cuida y
                      ama la vida animal y es partidario de los derechos
                      animales. Por lo que, al aceptar este documento el usuario
                      afirma ser completamente capaz de solventar gastos para la
                      o las mascotas que se adopten dentro de la plataforma,
                      siendo alguna de ellas consultas veterinarias,
                      tratamientos veterinarios (tales como la esterilización,
                      desparasitación, intervenciones quirúrgicas, etc),
                      alimento de calidad, un espacio digno para que habite la
                      mascota con el interesado o el próximo responsable de la
                      mascota entre otras.
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

export default AdopterContract;
