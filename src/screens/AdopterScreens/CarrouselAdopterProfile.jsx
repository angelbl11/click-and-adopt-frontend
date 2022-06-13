import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Avatar } from "@rneui/themed";

//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  ReasonTextContainer,
  ReasonText,
} from "../../components/Utils/Styles";

//Auth
import { AuthContext } from "../../context/Auth";

//Native Base Components
import { ScrollView, View } from "native-base";

const CarrouselAdopterProfile = ({ route }) => {
  const { user } = useContext(AuthContext);
  const {
    petGenderPreferences,
    petPreferences,
    petAgePreferences,
    reasonToAdopt,
    haveChildren,
    havePets,
    haveDog,
    haveCat,
    numberOfDogs,
    numberOfCats,
    isAgreeWithProtocol,
    hadPets,
    hadPetsValue,
    hadPetsDate,
    numberOfDays,
    numberOfMonths,
    numberOfYears,
    petSizePreferences,
    profilePic,
    fullName,
    account,
    age,
    email,
  } = route.params;

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <ScrollView>
        <InnerContainer>
          <View flexDir={"row"} width={420} marginLeft={2} marginRight={12}>
            <View width={40} marginLeft={6}>
              <PageTitle profile={true}>Perfil</PageTitle>
            </View>
          </View>
          <View marginTop={5}>
            {profilePic && (
              <Avatar
                size={140}
                rounded
                source={{
                  uri: profilePic
                    ? profilePic
                    : "https://calm-forest-47055.herokuapp.com/ProfilePictures/defaultprof.jpg",
                }}
              ></Avatar>
            )}
          </View>

          <SubTitle profile={true}>{fullName}</SubTitle>

          <SubTitle typeOfUserLabel={true}>{account}</SubTitle>

          <PageTitle about={true}>Acerca De</PageTitle>
          <SubTitle atributes={true}>Información</SubTitle>

          <ReasonTextContainer otherInfo={true} marginBottom={3}>
            <ReasonText>Edad:</ReasonText>
            <ReasonText>{age} años</ReasonText>
          </ReasonTextContainer>
          <ReasonTextContainer otherInfo={true} marginBottom={3}>
            <ReasonText>Email:</ReasonText>
            <ReasonText>{email}</ReasonText>
          </ReasonTextContainer>

          <SubTitle atributes={true}>Preferencias</SubTitle>
          <ReasonTextContainer>
            <ReasonText marginRight={12}>
              Razones para adoptar:{"\n"}
              {reasonToAdopt}
            </ReasonText>
          </ReasonTextContainer>
          <ReasonTextContainer marginTop={3} otherInfo={true}>
            <ReasonText>En busca de:</ReasonText>
            {petPreferences.map((pref) => (
              <ReasonText key={pref}>{pref}</ReasonText>
            ))}
          </ReasonTextContainer>
          <ReasonTextContainer marginTop={3} otherInfo={true}>
            <ReasonText>Prefiere en edades:</ReasonText>
            {petAgePreferences.map((pref) => (
              <ReasonText key={pref}>{pref}</ReasonText>
            ))}
          </ReasonTextContainer>
          <ReasonTextContainer marginTop={3} otherInfo={true}>
            <ReasonText>Prefiere en tamaño:</ReasonText>
            {petSizePreferences.map((pref) => (
              <ReasonText key={pref}>{pref}</ReasonText>
            ))}
          </ReasonTextContainer>
          <ReasonTextContainer marginTop={3} otherInfo={true}>
            <ReasonText>Prefiere que sea:</ReasonText>
            {petGenderPreferences.map((pref) => (
              <ReasonText key={pref}>{pref}</ReasonText>
            ))}
          </ReasonTextContainer>
          <ReasonTextContainer marginTop={3} otherInfo={true} marginBottom={3}>
            <ReasonText>Menores de edad en su hogar:</ReasonText>
            {haveChildren === true ? (
              <ReasonText>Si hay</ReasonText>
            ) : (
              <ReasonText>No hay</ReasonText>
            )}
          </ReasonTextContainer>

          <ReasonTextContainer marginTop={3} otherInfo={true} marginBottom={3}>
            <ReasonText>Mascotas actuales:</ReasonText>
            {havePets === false ? (
              <ReasonText>No tiene mascotas</ReasonText>
            ) : haveDog === true ? (
              <ReasonText>Perros: {numberOfDogs}</ReasonText>
            ) : undefined}
            {haveCat === true ? (
              <ReasonText>Gatos: {numberOfCats}</ReasonText>
            ) : undefined}
          </ReasonTextContainer>

          <ReasonTextContainer marginTop={3} otherInfo={true} marginBottom={3}>
            <ReasonText>Preferencias de Protocolo:</ReasonText>
            {isAgreeWithProtocol === true ? (
              <ReasonText>Está de acuerdo</ReasonText>
            ) : (
              <ReasonText>No está de acuerdo</ReasonText>
            )}
          </ReasonTextContainer>

          <SubTitle atributes={true}>Historial</SubTitle>
          {hadPets === true ? (
            <ReasonTextContainer
              marginTop={3}
              otherInfo={true}
              marginBottom={3}
            >
              <ReasonTextContainer otherInfo={true} marginBottom={3}>
                <ReasonText>Su mascota más reciente fue un:</ReasonText>
                <ReasonText>{hadPetsValue}</ReasonText>
              </ReasonTextContainer>
              <ReasonText>Aproximadamente hace: </ReasonText>
              {hadPetsDate === "Días" ? (
                <ReasonText>{numberOfDays} días</ReasonText>
              ) : hadPetsDate === "Meses" ? (
                <ReasonText>{numberOfMonths} meses</ReasonText>
              ) : (
                <ReasonText>{numberOfYears} años</ReasonText>
              )}
            </ReasonTextContainer>
          ) : (
            <ReasonTextContainer>
              <ReasonText>No ha tenido mascotas anteriormente</ReasonText>
            </ReasonTextContainer>
          )}
        </InnerContainer>
      </ScrollView>
    </StyledContainer>
  );
};

export default CarrouselAdopterProfile;
