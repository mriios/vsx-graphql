import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://fakerql.nplan.io/graphql",
  cache: new InMemoryCache()
});
