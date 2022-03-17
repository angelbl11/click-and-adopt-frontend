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
} from "../../components/Styles";

import { NativeBaseProvider, Checkbox, ScrollView, View } from "native-base";

//Yup
import * as Yup from "yup";

const AdopterContractSchema = Yup.object().shape({
  isAccepted: Yup.boolean()
    .required("Debes aceptar los términos para continuar")
    .oneOf([true], "Debes aceptar los términos y condiciones"),
});

const AdopterContract = ({ navigation }) => {
  const [check, setCheck] = useState(false);

  return (
    <NativeBaseProvider>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Acuerdo de Responsabilidad</PageTitle>
          <ScrollView>
            <ContractView>
              <ContractText>
                Click&Adopt pretende brindar una herramienta eficaz a todas
                aquellas organizaciones y/o personas interesadas en llevar un
                proceso de adopción animal confiable, seguro y sobre todo
                intuitivo. El objetivo principal de Click&Adopt es el de
                facilitar el proceso de difusión de un animal o de búsqueda de
                este, permitiendo así seleccionar características de la mascota
                para su fácil identificación ante los interesados y la conexión
                con las necesidades o requisitos del adoptante. {"\n"}
                Al aceptar los siguientes términos y condiciones, el usuario que
                adopta se compromete a cumplir con una sana convivencia con
                todos los usuarios de la aplicación además de brindar un uso
                responsable y consciente de la misma. {"\n"}
                Así pues, un proceso de adopción es una responsabilidad para
                toda la vida del animal en cuestión por lo que al aceptar estos
                términos el usuario acredita que es una persona mayor de edad y
                que los datos proporcionados a Click&Adopt son fidedignos.{" "}
                {"\n"}A su vez, el usuario interesado en adoptar acredita que
                entiende lo que es un proceso de adopción, valora, cuida y ama
                la vida animal y es partidario de los derechos animales. Por lo
                que, al aceptar este documento el usuario afirma ser
                completamente capaz de solventar gastos para la o las mascotas
                que se adopten dentro de la plataforma, siendo alguna de ellas
                consultas veterinarias, tratamientos veterinarios (tales como la
                esterilización, desparasitación, intervenciones quirúrgicas,
                etc.), alimento de calidad, un espacio digno para que habite la
                mascota con el interesado o el próximo responsable de la mascota
                entre otras.
              </ContractText>
            </ContractView>
          </ScrollView>
          <Formik
            initialValues={{ isAccepted: false }}
            validationSchema={AdopterContractSchema}
            onSubmit={(values) => {
              values.isAccepted == check;
              navigation.navigate("AdopterCuestionary");
              console.log(values);
            }}
          >
            {({ handleSubmit, values, errors, touched }) => (
              <View>
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
                <StyledButton onPress={handleSubmit}>
                  <ButtonText> Continuar </ButtonText>
                </StyledButton>
              </View>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </NativeBaseProvider>
  );
};

export default AdopterContract;
