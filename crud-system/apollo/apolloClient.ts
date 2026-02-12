import { HttpLink } from '@apollo/client'
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs'

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const uri =
    process.env.NODE_ENV === 'production'
      ? '/api/graphql'
      : process.env.GRAPHQL_URI || '/api/graphql'

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (uri !== '/api/graphql' && process.env.GRAPHQL_API_KEY) {
    headers['x-api-key'] = process.env.GRAPHQL_API_KEY
  }

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri,
      headers,
      credentials: 'include', // Send cookies with server-side requests
      fetchOptions: {
        cache: 'no-store',
      },
    }),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
        fetchPolicy: 'network-only',
      },
    },
  })
})
