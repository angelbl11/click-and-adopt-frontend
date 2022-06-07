import { ApolloClient, InMemoryCache } from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";
export const ip = "https://calm-forest-47055.herokuapp.com/graphql";
export const client = new ApolloClient({
  link: new createUploadLink({
    uri: ip,
  }),
  cache: new InMemoryCache(),
});
