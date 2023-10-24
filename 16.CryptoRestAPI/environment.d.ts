declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string;
            DATABASE_HOST: string;
            DATABASE_USERNAME: string;
            DATABASE_PASSWORD: string;
            DATABASE_NAME: string;
            DATABASE_PORT: string;
            DATABASE_URL: string;
            DATABASE_CONNECTION_STRING: string;
            NODE_ENV: "development" | "production";
        }
    }
}

export { };