import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({ uri: "http://192.168.100.17:4000/graphql" }),
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
  mutation addPicture($addProfilePictureId: String!, $profilePicture: Upload!) {
    addProfilePicture(id: $addProfilePictureId, profilePicture: $profilePicture)
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
