import { gql } from "@apollo/client";

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
      age
      email
      fullName
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

export const UPDATE_PET_STATUS = gql`
  mutation updateAdoptedStatus(
    $updateAdoptedStatusId: String!
    $petStatus: Boolean!
  ) {
    updateAdoptedStatus(id: $updateAdoptedStatusId, petStatus: $petStatus)
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation updateUserInfo($editUserInfoId: String!, $editInput: EditInput!) {
    editUserInfo(id: $editUserInfoId, editInput: $editInput)
  }
`;

export const DELETE_PET_INFO = gql`
  mutation deletePetInfo($petId: String!) {
    deletePetInfo(petId: $petId)
  }
`;

export const GIVE_LIKE_PET = gql`
  mutation adopterlike($petId: String!, $userId: String!) {
    likePet(petId: $petId, userId: $userId)
  }
`;

export const GIVE_NOPE_PET = gql`
  mutation adopternope($petId: String!, $userId: String!) {
    dislikePet(petId: $petId, userId: $userId)
  }
`;
