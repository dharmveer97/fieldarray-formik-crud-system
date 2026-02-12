'use client';

import { ApolloLink, HttpLink, Observable } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';
import { GraphQLError } from 'graphql';

const PROTECTED_OPERATIONS = [
  'Me',
  'UpdateProfile',
  'CompleteProfile',
  'ListUsers',
];

// Track if we're currently refreshing to avoid duplicate refresh calls
let isRefreshing = false;
const pendingRequests: (() => void)[] = [];

function makeClient() {
  const httpLink = new HttpLink({
    uri: '/api/graphql',
    credentials: 'include', // Send cookies with requests
    fetchOptions: {
      cache: 'no-store',
    },
  });

  // Error handling link for token refresh
  const errorLink = new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
      const subscription = forward(operation).subscribe({
        next: (result) => {
          // Check for authentication errors
          if (result.errors && Array.isArray(result.errors)) {
            for (const err of result.errors as readonly GraphQLError[]) {
              const extensions = err.extensions as
                | Record<string, unknown>
                | undefined;
              const code = extensions?.code as string | undefined;
              const message = err.message;

              if (
                code === 'UNAUTHENTICATED' ||
                message?.includes('Unauthorized') ||
                message?.includes('Token expired') ||
                message?.includes('Invalid token')
              ) {
                // Don't try to refresh on the refresh mutation itself
                if (operation.operationName === 'RefreshAuthTokens') {
                  console.error('Refresh token failed, redirecting to login');
                  if (typeof window !== 'undefined') {
                    // Clear cookies first to avoid proxy redirect issues
                    fetch('/api/auth/clear-cookies', { method: 'POST' })
                      .then(() => {
                        window.location.href = '/auth/login';
                      })
                      .catch(() => {
                        // Even if clearing fails, still sign out
                        window.location.href = '/auth/login';
                      });
                  }
                  observer.error(err);
                  return;
                }

                // If already refreshing, queue the request
                if (isRefreshing) {
                  pendingRequests.push(() => {
                    forward(operation).subscribe(observer);
                  });
                  return;
                }

                isRefreshing = true;

                // Try to refresh the token

                return;
              }
            }
          }

          observer.next(result);
        },
        error: (networkError) => {
          console.error('[Network error]:', networkError);
          observer.error(networkError);
        },
        complete: () => {
          observer.complete();
        },
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  });

  // Auth link to attach tokens to requests
  const authLink = new ApolloLink((operation, forward) => {
    const operationName = operation.operationName;

    operation.setContext(
      (prevContext: { headers?: Record<string, string> }) => {
        const prevHeaders = prevContext.headers ?? {};

        // Only attach token for protected operations
        if (operationName && PROTECTED_OPERATIONS.includes(operationName)) {
          return {
            headers: {
              ...prevHeaders,
            },
          };
        }

        return {
          headers: {
            ...prevHeaders,
          },
        };
      },
    );

    return forward(operation);
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    defaultOptions: {
      watchQuery: { errorPolicy: 'all' },
      query: {
        errorPolicy: 'all',
        fetchPolicy: 'network-only',
      },
      mutate: { errorPolicy: 'all' },
    },
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
