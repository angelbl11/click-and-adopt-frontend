import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { createUploadLink } from "apollo-upload-client";
import { SubscriptionClient } from "subscriptions-transport-ws";
export const ip = "https://click-and-adopt-dev.up.railway.app/graphql";
const wsLink = new WebSocketLink(
  new SubscriptionClient(`wss://click-and-adopt-dev.up.railway.app/graphql`)
);
const httpLink = new createUploadLink({
  uri: ip,
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
