/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_MSAL_CLIENT_ID: string;

  // add more env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
