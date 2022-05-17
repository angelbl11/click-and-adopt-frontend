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
import { ip } from "../../graphql/client";
const AdoptedProfile = ({ navigation }) => {
  const { logout, user } = useContext(AuthContext);
  const { pets, setPets, petImage, setPetImage } = useContext(PetsContext);
  const getImgUrl = `http://${ip}:4000/ProfilePictures/`;

  let images = [];

  const [getUserInfo, { data }] = useLazyQuery(GET_ADOPTER_INFO, {
    variables: {
      getAdopterInfoId: user.id,
    },
  });
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
    getUserInfo();
    getInfo();
    console.log("use effect");
  }, []);

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
                    account: data?.getAdopterInfo?.userInfo?.account,
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
              {pets?.map((item, count) => {
                return (
                  <AdoptedItemWrapper key={count}>
                    <AdoptedProfileObject
                      key={count}
                      pressed={() => {
                        console.log(petImage);
                        navigation.navigate("PetProfile", {
                          name: item?.adoptedPetName,
                          des: item?.adoptedPetDescription,
                          protocol: item?.adoptedPetProtocol,
                          age: item?.ageOfAdoptedPet,
                          coexistence: item?.coexistenceWithOtherPets,
                          gender: item?.genderOfAdoptedPet,
                          isHealthyK: item?.isHealthyWithKids,
                          isHealthyP: item?.isHealthyWithOtherPets,
                          typeOf: item?.typeOfAdoptedPet,
                          petProfdata: item?.petPicture?.filename,
                          petId: item?.id,
                          petProfPic: petImage[count],
                          count: count,
                          imageArray: images,
                        });
                      }}
                      url={
                        loading
                          ? getImgUrl + "defaultprof.jpg"
                          : petImage[count]
                      }
                    />
                  </AdoptedItemWrapper>
                );
              })}
            </ChildWrapper>
            <PageTitle about={true}>Acerca De</PageTitle>
            <SubTitle profile={true}>
              {data?.getAdopterInfo?.userInfo?.fullName}
            </SubTitle>

            <SubTitle typeOfUserLabel={true}>
              {data?.getAdopterInfo?.userInfo?.account}
            </SubTitle>

            <SubTitle atributes={true}>Información</SubTitle>
            <ReasonTextContainer otherInfo={true} marginBottom={3}>
              <ReasonText>Edad:</ReasonText>
              <ReasonText>
                {data?.getAdopterInfo?.userInfo?.age} años
              </ReasonText>
            </ReasonTextContainer>
            <ReasonTextContainer otherInfo={true} marginBottom={3}>
              <ReasonText>Email:</ReasonText>
              <ReasonText>{data?.getAdopterInfo?.userInfo?.email}</ReasonText>
            </ReasonTextContainer>
          </InnerContainer>
        </ScrollView>
      </StyledContainer>
    </NativeBaseProvider>
  );
};

export default AdoptedProfile;
