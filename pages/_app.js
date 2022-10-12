import Layout from "../components/Layout";
import client from "../graphql/apolloClient";
import { ApolloProvider } from "@apollo/client";
import "../styles/app.css";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
