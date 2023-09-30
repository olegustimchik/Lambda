declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            MONGODB_URL: string;
            PORT: string;
            SECRET: string; 
            NODE_ENV: "development" | "production";
        }
    }
}

export {};