import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SERVER_URL } from "../constants";

const client = new ApolloClient({
  uri: SERVER_URL,
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
