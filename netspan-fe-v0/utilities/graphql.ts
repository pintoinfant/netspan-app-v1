import * as Realm from 'realm-web';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// Connect to your MongoDB Realm app
const app = new Realm.App(process.env.NEXT_PUBLIC_MONGO_APP_ID);

// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
  // Guarantee that there's a logged in user with a valid access token
  if (!app.currentUser) {
    // If no user is logged in, log in an anonymous user. The logged in user will have a valid
    // access token.
    await app.logIn(
      Realm.Credentials.apiKey(process.env.NEXT_PUBLIC_MONGO_API_KEY),
    );
  } else {
    // An already logged in user's access token might be stale. Tokens must be refreshed after
    // 30 minutes. To guarantee that the token is valid, we refresh the user's access token.
    await app.currentUser.refreshAccessToken();
  }

  return app.currentUser.accessToken;
}

// Configure the ApolloClient to connect to your app's GraphQL endpoint
export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_MONGO_APP_SERVICE_URL,
    // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
    // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
    // access token before sending the request.
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
});
