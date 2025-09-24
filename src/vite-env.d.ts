/// <reference types="vite/client" />

declare global {
  interface Window {
    _env_: {
      VITE_APIGEE_URL: string;
      VITE_APIGEE_CLIENT: string;
      VITE_APIGEE_SECRET: string;
    };
  }
}
