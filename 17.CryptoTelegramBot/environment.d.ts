declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string;
            BOT_TOKEN: string;
        }
    }
}

export { };