import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  StyledButton,
  ButtonText,
  StyledFormArea,
  ContractText,
  ContractView,
  ContractCheckBoxView,
  StyledInputLabel,
  MsgBox,
  Colors,
} from "../components/Styles";
//Colors
const { primary } = Colors;

import { NativeBaseProvider, Checkbox, ScrollView, Spinner } from "native-base";

//Yup
import * as Yup from "yup";

//API client
import axios from "axios";

const AdopterContractSchema = Yup.object().shape({
  isAccepted: Yup.boolean()
    .required("Debes aceptar los términos para continuar")
    .oneOf([true], "Debes aceptar los términos y condiciones"),
});

const AdopterContract = ({ navigation }) => {
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleContract = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = "http://192.168.100.100:3000/user/signup";
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;
        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          navigation.navigate("AdopterCuestionary", { ...data });
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
      <ScrollView>
        <StyledContainer>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageTitle>Acuerdo de Responsabilidad</PageTitle>
            <Formik
              initialValues={{ isAccepted: false }}
              validationSchema={AdopterContractSchema}
              onSubmit={(values, { setSubmitting }) => {
                values.isAccepted == check;
                setSubmitting(false);
                handleContract(values, setSubmitting);
              }}
            >
              {({ handleSubmit, values, errors, touched, isSubmitting }) => (
                <StyledFormArea>
                  <ContractView>
                    <ContractText>
                      Click&Adopt pretende brindar una herramienta eficaz a
                      todas aquellas organizaciones y/o personas interesadas en
                      llevar un proceso de adopción animal confiable, seguro y
                      sobre todo intuitivo. {"\n"}
                      El objetivo principal de Click&Adopt es el de facilitar el
                      proceso de difusión de un animal o de búsqueda de este,
                      permitiendo así seleccionar características de la mascota
                      para su fácil identificación ante los interesados y la
                      conexión con las necesidades o requisitos del adoptante.{" "}
                      {"\n"}
                      Al aceptar los siguientes términos y condiciones, el
                      usuario que adopta se compromete a cumplir con una sana
                      convivencia con todos los usuarios de la aplicación además
                      de brindar un uso responsable y consciente de la misma.{" "}
                      {"\n"}
                      Así pues, un proceso de adopción es una responsabilidad
                      para toda la vida del animal en cuestión por lo que al
                      aceptar estos términos el usuario acredita que es una
                      persona mayor de edad y que los datos proporcionados a
                      Click&Adopt son fidedignos. {"\n"}A su vez, el usuario
                      interesado en adoptar acredita que entiende lo que es un
                      proceso de adopción, valora, cuida y ama la vida animal y
                      es partidario de los derechos animales. Por lo que, al
                      aceptar este documento el usuario afirma ser completamente
                      capaz de solventar gastos para la o las mascotas que se
                      adopten dentro de la plataforma, siendo alguna de ellas
                      consultas veterinarias, tratamientos veterinarios (tales
                      como la esterilización, desparasitación, intervenciones
                      quirúrgicas, etc.), alimento de calidad, un espacio digno
                      para que habite la mascota con el interesado o el próximo
                      responsable de la mascota entre otras.
                    </ContractText>
                  </ContractView>
                  <ContractCheckBoxView>
                    <MsgBox type={messageType}>{message}</MsgBox>
                    <Checkbox
                      colorScheme="green"
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
                      <StyledInputLabel validation={true}>
                        {errors.isAccepted}
                      </StyledInputLabel>
                    ) : undefined}
                  </ContractCheckBoxView>
                  {!isSubmitting && (
                    <StyledButton onPress={handleSubmit}>
                      <ButtonText> Continuar </ButtonText>
                    </StyledButton>
                  )}
                  {isSubmitting && (
                    <StyledButton disabled={true}>
                      <Spinner size="lg" color={primary} />
                    </StyledButton>
                  )}
                </StyledFormArea>
              )}
            </Formik>
          </InnerContainer>
        </StyledContainer>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default AdopterContract;
