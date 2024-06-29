export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FBASE_API_KEY: string;
      FBASE_APP_ID: string;
      FBASE_PROJECT_ID: string;
      FBASE_AUTH_DOMAIN: string;
      FBASE_STORAGE_BUCKET: string;
      FBASE_MESSAGING_SENDER_ID: string;
    }
  }
}
