import { ApolloClient, InMemoryCache } from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";
export const ip = "https://click-and-adopt.herokuapp.com/graphql";
export const client = new ApolloClient({
  link: new createUploadLink({
    uri: ip,
  }),
  cache: new InMemoryCache(),
});
