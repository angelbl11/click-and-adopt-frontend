import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

import { createUploadLink } from "apollo-upload-client";
export const ip = "https://click-and-adopt.herokuapp.com/graphql";
const httpLink = new createUploadLink({
  uri: ip,
});
const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === "OperationDefinition" &&
    definition.operation === "subscription"
  );
}, httpLink);
export const client = new ApolloClient({
  link: new splitLink(),
  cache: new InMemoryCache(),
});
