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
export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription notifications($userId: String!) {
    pushNotifications(userId: $userId) {
      receiverUser {
        id
        fullName
      }
      senderUser {
        id
        fullName
      }
    }
  }
`;
