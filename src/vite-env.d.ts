/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEETS_API_KEY: string
  readonly VITE_GOOGLE_SHEET_ID: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 