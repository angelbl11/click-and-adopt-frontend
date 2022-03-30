import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  useMutation,
  gql,
  HttpLink,
} from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({ uri: "http://172.20.10.2:4000/graphql" }),
  cache: new InMemoryCache(),
});

export const REGISTER_USER = gql`
  mutation register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      account
      age
      email
      fullName
    }
  }
`;
const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      id
      account
      age
      email
      fullName
      password
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
