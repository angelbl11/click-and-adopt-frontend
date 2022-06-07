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
} from "../../components/Utils/Styles";

import AdoptedProfileObject from "../../components/RenderObjects/AdoptedProfileObject";

//Native Base Components
import { ScrollView, View, IconButton } from "native-base";

//Auth
import { AuthContext } from "../../context/Auth";
import { PetsContext } from "../../context/PetsContext";

//Graphql
import { GET_ADOPTED_INFO } from "../../graphql/queries";
import { useLazyQuery } from "@apollo/client";

const AdoptedProfile = ({ navigation }) => {
  const { logout, user } = useContext(AuthContext);
  const { pets, setPets, petImage, setPetImage, num } = useContext(PetsContext);

  let images = [];

  const [getInfo] = useLazyQuery(GET_ADOPTED_INFO, {
    variables: {
      getAdoptedInfoId: user.id,
    },
    onCompleted: (data) => {
      setPets(data?.getAdoptedInfo);
      data.getAdoptedInfo.map((item) => {
        images.push(
          `https://calm-forest-47055.herokuapp.com/ProfilePictures/` +
            item.petPicture.filename
        );
      });
      setPetImage(images);
    },
  });

  useEffect(() => {
    getInfo();
  }, [num]);

  return (
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
                    id={pets[count]?.id}
                    status={pets[count]?.isAvailableToBeAdopted}
                    pressed={() => {
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
                    url={
                      item
                        ? item
                        : `https://calm-forest-47055.herokuapp.com/ProfilePictures/defaultprof.jpg`
                    }
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
  );
};

export default AdoptedProfile;
