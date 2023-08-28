"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import client from "../config/apolloClient";
import { HomePageProvider } from "../context/HomePageContext";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <HomePageProvider>{children}</HomePageProvider>
      </Provider>
    </ApolloProvider>
  );
}
