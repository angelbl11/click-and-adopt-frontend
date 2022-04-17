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
