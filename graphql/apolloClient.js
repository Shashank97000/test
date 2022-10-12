import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API_KEY}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
