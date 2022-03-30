import React from "react";
import { AppRegistry } from "react-native";
import RootStack from "./src/navigators/RootStack";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/client/client";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <RootStack />
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("Click&Adopt", () => App);
