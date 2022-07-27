import { gql } from "@apollo/client";
export const MESSAGE_SUBSCRIPTION = gql`
  subscription messages($userId: String!) {
    messages(userId: $userId) {
      body
      from
      id
      to
    }
  }
`;
