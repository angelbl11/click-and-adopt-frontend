import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";
export const ip = "192.168.100.17";
export const client = new ApolloClient({
  link: new createUploadLink({ uri: `http://${ip}:4000/graphql` }),
  cache: new InMemoryCache(),
});

//Mutations
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

export const UPLOAD_PET_PROFILE_PICTURE = gql`
  mutation addpetimage(
    $addProfilePetPictureId: String!
    $petProfilePicture: Upload!
  ) {
    addProfilePetPicture(
      id: $addProfilePetPictureId
      petProfilePicture: $petProfilePicture
    )
  }
`;

export const UPDATE_ADOPTER_STATUS = gql`
  mutation updateAdopterStatus(
    $updateAdopterStatusId: String!
    $userStatus: Boolean!
  ) {
    updateAdopterStatus(id: $updateAdopterStatusId, userStatus: $userStatus)
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation updateUserInfo($editUserInfoId: String!, $editInput: EditInput!) {
    editUserInfo(id: $editUserInfoId, editInput: $editInput)
  }
`;

// QUERIES
export const GET_ADOPTED_INFO = gql`
  query ($getAdoptedInfoId: String!) {
    getAdoptedInfo(id: $getAdoptedInfoId) {
      id
      adoptedPetDescription
      adoptedPetName
      adoptedPetProtocol
      ageOfAdoptedPet
      coexistenceWithOtherPets
      genderOfAdoptedPet
      isHealthyWithKids
      isHealthyWithOtherPets
      isAvailableToBeAdopted
      typeOfAdoptedPet
      petPicture {
        filename
      }
    }
  }
`;

export const GET_ADOPTER_INFO = gql`
  query getAdopterInfo($getAdopterInfoId: String!) {
    getAdopterInfo(id: $getAdopterInfoId) {
      adopterInfo {
        id
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
        isAvailableToAdopt
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
        profilePicture {
          filename
        }
      }
    }
  }
`;
