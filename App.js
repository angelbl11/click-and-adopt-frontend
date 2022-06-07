import React from "react";
import { AppRegistry } from "react-native";
import RootStack from "./src/components/Navigators/RootStack";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/graphql/client";
import { AuthProvider } from "./src/context/Auth";
import { PetsProvider } from "./src/context/PetsContext";
import { NativeBaseProvider } from "native-base";
import { ThemeProvider } from "@rneui/themed";
export default function App() {
  return (
    <ThemeProvider>
      <NativeBaseProvider>
        <ApolloProvider client={client}>
          <PetsProvider>
            <AuthProvider>
              <RootStack />
            </AuthProvider>
          </PetsProvider>
        </ApolloProvider>
      </NativeBaseProvider>
    </ThemeProvider>
  );
}

AppRegistry.registerComponent("Click&Adopt", () => App);
