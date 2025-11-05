import type { Configuration } from '@azure/msal-browser';

export const authConfig: Configuration = {
  auth: {
    clientId: 'f4d26f03-9381-43bf-96cf-555402a8f8d4', // you can register a free app in Azure if needed, optional
    authority: 'https://login.microsoftonline.com/consumers', // multi-tenant endpoint
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ['User.Read'],
};
