import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
//Styles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  ChildWrapper,
  AdoptedItemWrapper,
  SubTitle,
  ReasonText,
  ReasonTextContainer,
} from "../../components/Styles";

import AdoptedProfileObject from "../../components/AdoptedProfileObject";

//Native Base Components
import { NativeBaseProvider, ScrollView, View, IconButton } from "native-base";

import { AuthContext } from "../../context/Auth";
import { GET_ADOPTED_INFO, GET_ADOPTER_INFO } from "../../graphql/client";
import { useQuery, useLazyQuery } from "@apollo/client";
import { PetsContext } from "../../context/PetsContext";
const AdoptedProfile = ({ navigation }) => {
  const { logout, user } = useContext(AuthContext);
  const { pets, setPets, petImage, setPetImage, num } = useContext(PetsContext);
  const getImgUrl = `https://calm-forest-47055.herokuapp.com/ProfilePictures/`;

  let images = [];

  const [getInfo, { loading }] = useLazyQuery(GET_ADOPTED_INFO, {
    variables: {
      getAdoptedInfoId: user.id,
    },
    onCompleted: (data) => {
      setPets(data?.getAdoptedInfo);
      //console.log(data?.getAdoptedInfo);
      data.getAdoptedInfo.map((item) => {
        images.push(getImgUrl + item.petPicture.filename);
      });
      setPetImage(images);
      console.log("hola");
      console.log(petImage);
    },
  });

  useEffect(() => {
    getInfo();
    console.log("use effect");
  }, [num]);

  return (
    <NativeBaseProvider>
      <StyledContainer>
        <StatusBar style="dark" />
        <ScrollView>
          <InnerContainer>
            <View flexDir={"row"} width={420} marginLeft={2} marginRight={12}>
              <View width={40} marginLeft={6}>
                <PageTitle profile={true}>Perfil</PageTitle>
              </View>
              <IconButton
                _icon={{
                  as: MaterialIcons,
                  name: "edit",
                  color: "#1F2937",
                }}
                marginLeft={100}
                onPress={() => {
                  navigation.navigate("EditScreen", {
                    account: user.account,
                  });
                }}
              ></IconButton>
              <IconButton
                _icon={{
                  as: Entypo,
                  name: "plus",
                  color: "#1F2937",
                }}
                onPress={() => {
                  navigation.navigate("AdoptedCuestionary");
                }}
              ></IconButton>
              <IconButton
                _icon={{
                  as: MaterialIcons,
                  name: "logout",
                  color: "#1F2937",
                }}
                onPress={() => {
                  logout();
                  navigation.navigate("Login");
                }}
              ></IconButton>
            </View>
            <ChildWrapper>
              {petImage?.map((item, count) => {
                return (
                  <AdoptedItemWrapper key={count}>
                    <AdoptedProfileObject
                      key={count}
                      pressed={() => {
                        console.log(petImage);
                        navigation.navigate("PetProfile", {
                          name: pets[count].adoptedPetName,
                          des: pets[count].adoptedPetDescription,
                          protocol: pets[count].adoptedPetProtocol,
                          age: pets[count].ageOfAdoptedPet,
                          coexistence: pets[count].coexistenceWithOtherPets,
                          gender: pets[count].genderOfAdoptedPet,
                          isHealthyK: pets[count].isHealthyWithKids,
                          isHealthyP: pets[count].isHealthyWithOtherPets,
                          typeOf: pets[count].typeOfAdoptedPet,
                          petProfdata: pets[count].petPicture?.filename,
                          petId: pets[count].id,
                          petProfPic: item,
                          count: count,
                          imageArray: images,
                        });
                      }}
                      url={item ? item : getImgUrl + "defaultprof.jpg"}
                    />
                  </AdoptedItemWrapper>
                );
              })}
            </ChildWrapper>
            <PageTitle about={true}>Acerca De</PageTitle>
            <SubTitle profile={true}>{user.fullName}</SubTitle>

            <SubTitle typeOfUserLabel={true}>
              {user.account === "Adoptado" ? "Responsable" : null}
            </SubTitle>

            <SubTitle atributes={true}>Información</SubTitle>
            <ReasonTextContainer otherInfo={true} marginBottom={3}>
              <ReasonText>Edad:</ReasonText>
              <ReasonText>{user.age} años</ReasonText>
            </ReasonTextContainer>
            <ReasonTextContainer otherInfo={true} marginBottom={3}>
              <ReasonText>Email:</ReasonText>
              <ReasonText>{user.email}</ReasonText>
            </ReasonTextContainer>
          </InnerContainer>
        </ScrollView>
      </StyledContainer>
    </NativeBaseProvider>
  );
};

export default AdoptedProfile;
