interface ImportMetaEnv {
    readonly VITE_AUTH_ENDPOINT : string;
    readonly VITE_AUTH_TOKEN_ENDPOINT : string;
    readonly VITE_REDIRECT_URI : string;
    readonly VITE_BASE_API_URI : string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}