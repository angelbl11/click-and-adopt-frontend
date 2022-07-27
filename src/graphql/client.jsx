import { ApolloClient, InMemoryCache } from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";
export const ip = "http://192.168.100.6:4000/graphql";
export const client = new ApolloClient({
  link: new createUploadLink({
    uri: ip,
  }),
  cache: new InMemoryCache(),
});
