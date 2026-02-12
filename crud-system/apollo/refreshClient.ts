import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export const refreshApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: '/api/graphql',
    credentials: 'include',
    fetchOptions: {
      cache: 'no-store',
    },
  }),
})
