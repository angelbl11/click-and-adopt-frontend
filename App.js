import React from "react";
import { AppRegistry } from "react-native";
import RootStack from "./src/navigators/RootStack";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/graphql/client";
import { AuthProvider } from "./src/context/Auth";
import { PetsProvider } from "./src/context/PetsContext";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PetsProvider>
        <AuthProvider>
          <RootStack />
        </AuthProvider>
      </PetsProvider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("Click&Adopt", () => App);
