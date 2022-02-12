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
} from "../components/Styles";

import { NativeBaseProvider, Checkbox, ScrollView } from "native-base";

//Yup
import * as Yup from "yup";

const AdoptedContractSchema = Yup.object().shape({
  isAccepted: Yup.boolean()
    .required("Debes aceptar los términos para continuar")
    .oneOf([true], "Debes aceptar los términos y condiciones"),
});

const AdoptedContract = ({ navigation }) => {
  const [check, setCheck] = useState(false);
  return (
    <NativeBaseProvider>
      <ScrollView>
        <StyledContainer>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageTitle>Acuerdo de Responsabilidad</PageTitle>
            <Formik
              initialValues={{ isAccepted: false }}
              validationSchema={AdoptedContractSchema}
              onSubmit={(values) => {
                values.isAccepted == check;
                console.log(values);
                navigation.navigate("AdoptedCuestionary");
              }}
            >
              {({ handleSubmit, values, errors, touched }) => (
                <StyledFormArea>
                  <ContractView>
                    <ContractText>Cuestionario adoptado.</ContractText>
                  </ContractView>
                  <ContractCheckBoxView>
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
                  <StyledButton secondButton={true} onPress={handleSubmit}>
                    <ButtonText>Continuar</ButtonText>
                  </StyledButton>
                </StyledFormArea>
              )}
            </Formik>
          </InnerContainer>
        </StyledContainer>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default AdoptedContract;
