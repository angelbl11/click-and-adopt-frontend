import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";

export const client = new ApolloClient({
  link: new createUploadLink({ uri: "http://172.20.10.2:4000/graphql" }),
  cache: new InMemoryCache(),
});
export const REGISTER_USER = gql`
  mutation register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      account
      age
      email
      fullName
      token
    }
  }
`;
export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      account
      email
      token
    }
  }
`;

export const ADOPTED_CUESTIONARY = gql`
  mutation answerAdoptedQuestionnaire(
    $adoptedQuestionnaireInput: AdoptedQuestionnaireInput!
  ) {
    answerAdoptedQuestionnaire(
      adoptedQuestionnaireInput: $adoptedQuestionnaireInput
    )
  }
`;

export const ADOPTER_CUESTIONARY = gql`
  mutation answerAdopterQuestionnaire(
    $adopterQuestionnaireInput: AdopterQuestionnaireInput!
  ) {
    answerAdopterQuestionnaire(
      adopterQuestionnaireInput: $adopterQuestionnaireInput
    )
  }
`;

export const UPLOAD_PROFILE_PICTURE = gql`
  mutation addpic($addProfilePictureId: String!, $profilePicture: Upload!) {
    addProfilePicture(id: $addProfilePictureId, profilePicture: $profilePicture)
  }
`;

export const GET_ADOPTED_INFO = gql`
  query ($getAdoptedInfoId: String!) {
    getAdoptedInfo(id: $getAdoptedInfoId) {
      adoptedPetDescription
      adoptedPetName
      adoptedPetProtocol
      ageOfAdoptedPet
      coexistenceWithOtherPets
      genderOfAdoptedPet
      isHealthyWithKids
      isHealthyWithOtherPets
      typeOfAdoptedPet
    }
  }
`;

export const GET_ADOPTER_INFO = gql`
  query getAdopterInfo($getAdopterInfoId: String!) {
    getAdopterInfo(id: $getAdopterInfoId) {
      adopterInfo {
        haveCat
        haveDog
        havePets
        hadPets
        hadPetsValue
        hadPetsDate
        numberOfDogs
        numberOfCats
        isAgreeWithProtocol
        isChildren
        petAgePreferences
        petPreferences
        petSizePreferences
        reasonToAdopt
        petGenderPreferences
        numberOfDays
        numberOfMonths
        numberOfYears
      }
      userInfo {
        account
        age
        fullName
        id
        email
      }
    }
  }
`;
