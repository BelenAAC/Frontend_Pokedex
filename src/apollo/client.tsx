import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';


const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql', // Reemplaza esto con la URL de tu API GraphQL
});


const client = new ApolloClient({
  link:httpLink,// Reemplaza con la URL de tu servidor GraphQL
  cache: new InMemoryCache(),
});

export default client;