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
} from "../components/Styles";

import { NativeBaseProvider, Checkbox, ScrollView } from "native-base";

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
              onSubmit={(values) => {
                console.log(values);
                navigation.navigate("AdoptedCuestionary");
                values.isAccepted == check;
              }}
            >
              {({ handleSubmit, values }) => (
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
